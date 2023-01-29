<?php

namespace Drupal\config_profile\Plugin\ConfigFilter;

use Drupal\config_filter\Plugin\ConfigFilterBase;
use Drupal\Core\Config\ImmutableConfig;
use Drupal\Core\DependencyInjection\DependencySerializationTrait;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Serialization\Yaml;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class ProfileFilter
 *
 * @package Drupal\config_profile\Plugin\ConfigFilter
 *
 * @ConfigFilter(
 *   id = "config_profile",
 *   label = "Config Profile",
 *   storages = {"config.storage.sync"},
 *   weight = 100
 * )
 */
class ProfileFilter extends ConfigFilterBase implements ContainerFactoryPluginInterface {

  use DependencySerializationTrait;

  /**
   * The config factory service.
   *
   * @var \Drupal\Core\Config\ImmutableConfig
   */
  protected $config;

  /**
   * The install profile.
   *
   * @var string
   */
  protected $profile;

  /**
   * The blacklist of config entities to exclude.
   *
   * @var array
   */
  protected $blacklist;

  /**
   * The profile absolute path.
   *
   * @var string
   */
  protected $profilePath;

  /**
   * An array contained all profile config files keyed by config name.
   *
   * @var array
   */
  protected $profileConfigFiles = [];

  /**
   * {@inheritdoc}
   */
  public function filterWrite($name, array $data) {
    if ($this->profile && !$this->source->getCollectionName()) {
      if (empty($data)) {
        return $data;
      }
      $profile_data = $data;
      if (isset($profile_data['_core'])) {
        unset($profile_data['_core']);
      }
      if (isset($profile_data['uuid'])) {
        unset($profile_data['uuid']);
      }
      $yaml_data = Yaml::encode($profile_data);

      if (isset($this->profileConfigFiles[$name])) {
        file_put_contents($this->profileConfigFiles[$name], $yaml_data);
      }
      elseif (!$this->isBlacklisted($name)) {
        file_put_contents($this->profilePath . '/config/install/' . $name . '.yml', $yaml_data);
      }
    }

    return $data;
  }

  /**
   * {@inheritdoc}
   */
  public function filterDelete($name, $delete) {
    if ($this->profile && !$this->source->getCollectionName() && isset($this->profileConfigFiles[$name])) {
      unlink($this->profileConfigFiles[$name]);
    }
    return $delete;
  }

  /**
   * ProfileFilter constructor.
   *
   * @param array $configuration
   * @param $plugin_id
   * @param $plugin_definition
   * @param \Drupal\Core\Config\ImmutableConfig $config
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, ImmutableConfig $config) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->config = $config;

    $profile = $this->config->get('profile');

    $profile_path = drupal_get_path('profile', $profile);
    if (!$profile_path) {
      return;
    }
    $this->profile = $profile;
    $this->blacklist = $this->config->get('blacklist');
    $this->profilePath = DRUPAL_ROOT . DIRECTORY_SEPARATOR . $profile_path;
    // Get all profile yamls.
    $directory = new \RecursiveDirectoryIterator($this->profilePath);
    $iterator = new \RecursiveIteratorIterator($directory);
    $regex = new \RegexIterator($iterator, '/^.+\.yml$/i', \RecursiveRegexIterator::GET_MATCH);
    foreach($regex as $file){
      $config_name = basename($file[0], '.yml');
      if (!$this->isBlacklisted($config_name)) {
        $this->profileConfigFiles[$config_name] = $file[0];
      }
    }
  }

  /**
   * Checks if a config entity should be ignored.
   *
   * @param $config_name
   *   The config entity name
   *
   * @return bool
   *   Flag checking if a config entity should be ignored.
   */
  protected function isBlacklisted($config_name) {
    foreach ($this->blacklist as $blacklist_element) {
      if (fnmatch($blacklist_element, $config_name)) {
        return TRUE;
      }
    }
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('config.factory')->get('config_profile.settings')
    );
  }

}
