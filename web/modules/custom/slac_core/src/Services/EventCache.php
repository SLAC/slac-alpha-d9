<?php

namespace Drupal\slac_core\Services;

use Drupal\Core\Cache\Cache;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\datetime\Plugin\Field\FieldType\DateTimeItemInterface;
use Drupal\node\Entity\Node;
use Drupal\ultimate_cron\Entity\CronJob;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\Query\QueryFactory;

/**
 * Defines a class for Event cache invalidation called by cron jobs.
 *
 * Though a service, containerInjection is needed due to cron calling eventCacheProcess
 * and constructing the class through that process, with no arguments.
 *
 */
class EventCache implements ContainerInjectionInterface {
  use StringTranslationTrait;

  /**
   * A logger instance.
   *
   * @var LoggerInterface
   */
  protected LoggerInterface $logger;

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs a logger object.
   *
   * @param LoggerInterface $logger
   *   A logger instance.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager service.
   *
   */
  public function __construct(LoggerInterface $logger, EntityTypeManagerInterface $entity_type_manager) {
    $this->logger = $logger;
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * {@inheritDoc}
   */
  public static function create(ContainerInterface $container) {
    return new static (
      $container->get('logger.channel.slac_core'),
      $container->get('entity_type.manager')
    );
  }

  /**
   * Manage event cache tags as events begin and end.
   *
   * @param \Drupal\ultimate_cron\Entity\CronJob $job
   * @throws \Exception
   */
  public function eventCacheProcess(CronJob $job) {
    // Get the set of events that started or ended since the last cron run
    // (in the past 15 minutes).
    if ($changing = $this->getChangingEvents(-900, FALSE)) {
      // Create storage and load the selected nodes.
      $storage = $this->entityTypeManager->getStorage('node');
      $nodes = $storage->loadMultiple($changing);

      // The list of tags to invalidate, defaulting to the custom tag.
      $tags = [];

      /** @var Node $event */
      foreach ($nodes as $event) {
        $tags = Cache::mergeTags($tags, $event->getCacheTags());
      }

      // If there were any changes to events, invalidate all the tags associated with those nodes
      // and the custom tag for lists, etc.
      if (count($tags)) {
        Cache::invalidateTags($tags);

        $this->logger->info('Event caching: @count @noun cache-invalidated (@nids)', [
          '@count' => count($changing),
          '@noun' => $this->formatPlural(count($changing), 'event', 'events'),
          '@nids' => implode(', ', array_values($changing)),
        ]);
      }
    }

  }

  /**
   * Get changing events.
   *
   * A "changing" event is one that is either starting or ending in the period from now until
   * now +/- some number of seconds. The lookahead could be a lookbehind, as the value of
   * $lookahead could be negative.
   *
   * @param int $lookahead
   *  Default is one hour (3600 seconds)
   * @param bool $logging
   * @return array
   *
   */
  public function getChangingEvents(int $lookahead = 3600, bool $logging = TRUE): array {
    $storage_tz = new \DateTimezone(DateTimeItemInterface::STORAGE_TIMEZONE);

    // Get the current datetime the storage timezone.
    $now = new DrupalDateTime('now', $storage_tz);
    $now_formatted = $now->format(DateTimeItemInterface::DATETIME_STORAGE_FORMAT);

    // Get the target date in the storage timezone.
    $offset_string = 'now' . ($lookahead > 0 ? "+" : '-') . abs($lookahead) . " second";
    $target_datetime = new DrupalDateTime($offset_string, $storage_tz);
    $target_formatted = $target_datetime->format(DateTimeItemInterface::DATETIME_STORAGE_FORMAT);

    $query = $this->entityTypeManager->getStorage('node')->getQuery();
    // Start time is in between left and right time boundaries.
    $start_group = $query
      ->andConditionGroup()
      ->condition('field_datetime_range.value', min($now_formatted, $target_formatted), '>=')
      ->condition('field_datetime_range.value', max($now_formatted, $target_formatted), '<=');

    // End time is in between left and right time boundaries.
    $end_group = $query
      ->andConditionGroup()
      ->condition('field_datetime_range.end_value', min($now_formatted, $target_formatted), '>=')
      ->condition('field_datetime_range.end_value', max($now_formatted, $target_formatted), '<=');

    $or_group = $query
      ->orConditionGroup()
      ->condition($start_group)
      ->condition($end_group);

    // Execute query for matching entities. Note that this is neutral as to node status, as a node may
    // change status (e.g., be published or unpublished) during the interval
    $nids = $query
      ->condition('type', 'event')
      ->condition($or_group)
      ->execute();

    if ($logging) {
      // Reset the formatted strings to the current timezone for logging clarity.
      $default_timezone = new \DateTimeZone(date_default_timezone_get());
      $now_formatted = $now
        ->setTimezone($default_timezone)
        ->format(DateTimeItemInterface::DATETIME_STORAGE_FORMAT);

      // Get the target date in the storage timezone.
      $target_formatted = $target_datetime
        ->setTimezone($default_timezone)
        ->format(DateTimeItemInterface::DATETIME_STORAGE_FORMAT);

      $this->logger->info('Event cache cronjob: @count @noun @nids changing between @leftedge and @rightedge (@direction).', [
        '@count' => count($nids),
        '@noun' => $this->formatPlural(count($nids), 'node', 'nodes'),
        '@leftedge' => min($now_formatted, $target_formatted),
        '@rightedge' => max($now_formatted, $target_formatted),
        '@nids' => count($nids) ? '(' . implode(', ', array_values($nids)) . ')' : '',
        '@direction' => $lookahead < 0 ? 'lookback' : 'lookahead',
      ]);
    }

    return array_values($nids);
  }

}
