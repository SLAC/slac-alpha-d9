<?php

namespace Drupal\stanford_person_importer;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Installer\InstallerKernel;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\Core\Messenger\MessengerTrait;
use Drupal\migrate\Exception\RequirementsException;
use Drupal\migrate\MigrateMessage;
use Drupal\migrate\Plugin\MigrateIdMapInterface;
use Drupal\migrate\Plugin\MigrationInterface as MigrationPluginInterface;
use Drupal\migrate\Plugin\MigrationPluginManagerInterface;
use Drupal\migrate\Plugin\RequirementsInterface;
use Drupal\migrate_plus\Entity\MigrationInterface as MigrationEntityInterface;
use Drupal\migrate_tools\MigrateExecutable;
use Drupal\node\NodeInterface;

/**
 * Stanford Migrate service to do various migration actions.
 * 
 * This was taken from the Stanford Migration module.  For the current SLAC use 
 * case, we are only using getNodesMigration.  However, I've kept the remainder 
 * of the functionality.
 */
class StanfordMigrate implements StanfordMigrateInterface {

  use MessengerTrait;

  /**
   * Logger channel service.
   *
   * @var \Drupal\Core\Logger\LoggerChannelInterface
   */
  protected $logger;

  /**
   * Flag to execute any migrations using batch process.
   *
   * @var bool
   */
  protected $batchExecuteMigrations = FALSE;

  /**
   * Already executed migrations.
   *
   * @var string[]
   */
  protected $executedMigrations = [];


  /**
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   * @param \Drupal\migrate\Plugin\MigrationPluginManagerInterface $migrationPluginManager
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   */
  public function __construct(protected EntityTypeManagerInterface $entityTypeManager, protected MigrationPluginManagerInterface $migrationPluginManager, LoggerChannelFactoryInterface $logger_factory) {
    $this->logger = $logger_factory->get('stanford_migrate');
  }

  /**
   * {@inheritDoc}
   */
  public function setBatchExecution(bool $batch_execution): self {
    $this->batchExecuteMigrations = $batch_execution;
    return $this;
  }

  /**
   * {@inheritDoc}
   */
  public function executeMigrationId(string $migration_id): void {
    $migrations = $this->getMigrationList();
    foreach ($migrations as $migration_list) {
      if (isset($migration_list[$migration_id])) {
        $this->executeMigration($migration_list[$migration_id], $migration_id);
        return;
      }
    }
  }

  /**
   * {@inheritDoc}
   */
  public function executeMigration(MigrationPluginInterface $migration, string $migration_id, array $options = []): void {

    // Reset migration status so that it can be executed again.
    $migration->interruptMigration(MigrationPluginInterface::RESULT_STOPPED);
    $migration->setStatus(MigrationPluginInterface::STATUS_IDLE);

    // Keep track of all migrations run during this command so the same
    // migration is not run multiple times.
    $executed_migrations = &$this->executedMigrations;

    // Execute all the required migrations first before running this one.
    $definition = $migration->getPluginDefinition();
    $required_migrations = $definition['migration_dependencies']['required'] ?? [];

    $required_migrations = array_filter($required_migrations, function ($value) use ($executed_migrations) {
      return !isset($executed_migrations[$value]);
    });

    if (!empty($required_migrations)) {
      $required_migrations = $this->migrationPluginManager->createInstances($required_migrations);
      $dependency_options = array_merge($options, ['is_dependency' => TRUE]);
      array_walk($required_migrations, [
        $this,
        'executeMigration',
      ], $dependency_options);
      $executed_migrations += $required_migrations;
    }

    // Finally run this migration.

    $log = new MigrateMessage();

    if ($this->batchExecuteMigrations) {
      $executable = new StanfordMigrateBatchExecutable($migration, $log, $options);
      $executable->batchImport();
    }
    else {
      $executable = new MigrateExecutable($migration, $log, $options);
      $executable->import();
    }

    $executed_migrations[$migration_id] = $migration_id;
  }

  /**
   * {@inheritDoc}
   */
  public function getMigrationList(): array {
    $migrations = [];
    // Don't run the migrations when drupal is being installed.
    if (InstallerKernel::installationAttempted()) {
      return $migrations;
    }

    $matched_migrations = $this->migrationPluginManager->createInstances(array_keys($this->getMigrationEntities()));
    // Do not return any migrations which fail to meet requirements.
    foreach ($matched_migrations as $id => $migration) {
      if ($migration->getSourcePlugin() instanceof RequirementsInterface) {
        try {
          $migration->getSourcePlugin()->checkRequirements();
        }
        catch (RequirementsException $e) {
          $this->logger->error('Unable to execute migration @name: @message', [
            '@name' => $migration->label(),
            '@message' => $e->getMessage(),
          ]);
          unset($matched_migrations[$id]);
        }
      }
    }

    // Sort the matched migrations by group.
    /** @var \Drupal\migrate\Plugin\Migration $migration */
    foreach ($matched_migrations as $id => $migration) {
      $definition = $migration->getPluginDefinition();
      $configured_group_id = $definition['migration_group'] ?? 'default';
      $migrations[$configured_group_id][$id] = $migration;
    }

    return $migrations;
  }


  /**
   * Get the migration that imported the given node.
   *
   * @param \Drupal\node\NodeInterface $node
   *   Node entity.
   *
   * @return \Drupal\migrate_plus\Entity\MigrationInterface|null
   *   Migration entity or null if none found.
   */
  public function getNodesMigration(NodeInterface $node): ?MigrationEntityInterface {
    // Use a static variable so that it doesn't look up the migrations multiple
    // times.
    $node_migration = &drupal_static(__CLASS__ . __FUNCTION__ . '_' . $node->id());

    if (!is_null($node_migration)) {
      // If the given node was previously looked up, but it doesn't exist from a
      // migration, it's value will be false. But we have to return NULL due to
      // the return type declaration.
      return $node_migration ?: NULL;
    }
    // Set the static to false and check for null above. If the first attempt to
    // find a migration doesn't show anything, we don't want to continue
    // checking.
    $node_migration = FALSE;

    $migrations = $this->getMigrationEntities();

    // Loop through the migration entities, build their migration plugins so
    // that we can dig into their source mapping data.
    foreach ($migrations as $migration) {

      // This migration entity has methods that allow easy queries on the
      // migrate_map tables.
      /** @var \Drupal\migrate\Plugin\MigrationInterface $migrate */
      $migrate = $this->migrationPluginManager->createInstance($migration->id());

      // CSV Imported content can be ignored since it's normally a one time thing.
      if (!$migrate || $migrate->getSourcePlugin()->getPluginId() == 'csv') {
        continue;
      }

      $destination_ids = $migrate->getDestinationPlugin()->getIds();

      // Ignore any migrate plugin that doesn't map to nodes.
      if (isset($destination_ids['nid'])) {

        // If the migrate id map returns something, that means this node is tied
        // to this migration. Set the static variable for later references and
        // get out of here.
        $row_data = $migrate->getIdMap()
          ->getRowByDestination(['nid' => $node->id()]);
        if (!empty($row_data) && $row_data['source_row_status'] != MigrateIdMapInterface::STATUS_IGNORED) {
          $node_migration = $migration;
          return $migration;
        }
      }
    }
    return NULL;
  }

  /**
   * {@inheritDoc}
   */
  public function deleteEntityFromMigration(EntityInterface $entity): void {
    foreach ($this->getMigrationList() as $migrations) {
      foreach ($migrations as $migration) {
        $destination = $migration->getDestinationConfiguration();

        // It should always be set. but this is just a safety valve.
        if (!isset($destination['plugin'])) {
          continue;
        }

        if (
          str_starts_with($destination['plugin'], 'entity:') ||
          str_starts_with($destination['plugin'], 'entity_reference_revisions:')
        ) {

          [, $type] = explode(':', $destination['plugin']);

          if ($type == $entity->getEntityTypeId()) {
            $lookup_values = [];
            $lookup_ids = array_keys($migration->getDestinationPlugin()
              ->getIds());

            foreach ($lookup_ids as $id_key) {
              $lookup_values[$id_key] = $entity->get($id_key)->getString();
            }
            $migration->getIdMap()->deleteDestination($lookup_values);
          }
        }
      }
    }
  }

  /**
   * Get the migration entities.
   *
   * @return \Drupal\migrate_plus\Entity\MigrationInterface[]
   *   Keyed array of entities.
   */
  protected function getMigrationEntities(): array {
    // Load only migrations that are enabled because when getting the migration
    // plugins, it will only create instances from active entities.
    $storage = $this->entityTypeManager->getStorage('migration');
    return $storage->loadByProperties(['status' => 1]);
  }

}
