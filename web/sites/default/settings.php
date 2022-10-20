<?php

/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';

/**
 * Include the Pantheon-specific settings file.
 *
 * n.b. The settings.pantheon.php file makes some changes
 *      that affect all environments that this site
 *      exists in.  Always include this file, even in
 *      a local development environment, to ensure that
 *      the site settings remain consistent.
 */
include __DIR__ . "/settings.pantheon.php";

/**
 * Skipping permissions hardening will make scaffolding
 * work better, but will also raise a warning when you
 * install Drupal.
 *
 * https://www.drupal.org/project/drupal/issues/3091285
 */
// $settings['skip_permissions_hardening'] = TRUE;

/**
 * Secrets-based settings.
 */
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  $secrets_file = $_ENV['HOME'] . '/files/private/secrets.json';
}
else {
  $secrets_file = __DIR__ . '/secrets.json';
}

if (file_exists($secrets_file)) {
  $secrets = json_decode(file_get_contents($secrets_file), TRUE);

  // D7 Migration Source
  if (!empty($secrets['migrate_source_db_url'])) {
    $parsed_url = parse_url($secrets['migrate_source_db_url']);
    if (!empty($parsed_url['port']) && !empty($parsed_url['host']) && !empty($parsed_url['pass'])) {
      $databases['drupal7']['default'] = [
        'database' => 'pantheon',
        'username' => 'pantheon',
        'password' => $parsed_url['pass'],
        'host' => $parsed_url['host'],
        'port' => $parsed_url['port'],
        'driver' => 'mysql',
        'prefix' => '',
        'collation' => 'utf8mb4_general_ci',
      ];
    }
  }

  // Turn off email during migration
  if (!empty($secrets['migration_status']) && $secrets['migration_status'] == 'active') {
    $config['mailsystem.settings']['defaults']['sender'] = 'test_mail_collector';
  }
  // Set media migration embed token to media_embed and not entity_embed
  $settings['media_migration_embed_token_transform_destination_filter_plugin'] = 'media_embed';
}

// Configure Redis

if (defined('PANTHEON_ENVIRONMENT')) {
  // Include the Redis services.yml file. Adjust the path if you installed to a contrib or other subdirectory.
  $settings['container_yamls'][] = 'modules/redis/example.services.yml';

  //phpredis is built into the Pantheon application container.
  $settings['redis.connection']['interface'] = 'PhpRedis';
  // These are dynamic variables handled by Pantheon.
  $settings['redis.connection']['host']      = $_ENV['CACHE_HOST'];
  $settings['redis.connection']['port']      = $_ENV['CACHE_PORT'];
  $settings['redis.connection']['password']  = $_ENV['CACHE_PASSWORD'];

  $settings['redis_compress_length'] = 100;
  $settings['redis_compress_level'] = 1;

  $settings['cache']['default'] = 'cache.backend.redis'; // Use Redis as the default cache.
  $settings['cache_prefix']['default'] = 'pantheon-redis';

  $settings['cache']['bins']['form'] = 'cache.backend.database'; // Use the database for forms
}

/*
* Environment Indicator module settings.
* see: https://pantheon.io/docs/guides/environment-configuration/environment-indicator
*/
$conf['environment_indicator_overwrite'] = TRUE;
  $conf['environment_indicator_overwritten_position'] = 'top';
  $conf['environment_indicator_overwritten_fixed'] = FALSE;

  // Pantheon Env Specific Config
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
      switch ($_ENV['PANTHEON_ENVIRONMENT']) {
        case 'dev':
          $config['environment_indicator.indicator']['name'] = 'Dev';
          $config['environment_indicator.indicator']['bg_color'] = '#307b24';
          $config['environment_indicator.indicator']['fg_color'] = '#ffffff';
          $config['config_split.config_split.local']['status'] = TRUE;
          $config['config_split.config_split.prod']['status'] = FALSE;
          break;
        case 'test':
          $config['environment_indicator.indicator']['name'] = 'Test';
          $config['environment_indicator.indicator']['bg_color'] = '#b85c00';
          $config['environment_indicator.indicator']['fg_color'] = '#ffffff';
          $config['config_split.config_split.local']['status'] = TRUE;
          $config['config_split.config_split.prod']['status'] = FALSE;
          break;
        case 'live':
          $config['environment_indicator.indicator']['name'] = 'Live!';
          $config['environment_indicator.indicator']['bg_color'] = '#e7131a';
          $config['environment_indicator.indicator']['fg_color'] = '#ffffff';
          $config['config_split.config_split.local']['status'] = FALSE;
          $config['config_split.config_split.prod']['status'] = TRUE;
          break;
        default:
          //Multidev catchall
          $config['environment_indicator.indicator']['name'] = 'Multidev';
          $config['environment_indicator.indicator']['bg_color'] = '#e7131a';
          $config['environment_indicator.indicator']['fg_color'] = '#ffffff';
          $config['config_split.config_split.local']['status'] = TRUE;
          $config['config_split.config_split.prod']['status'] = FALSE;
          break;
      }
  }

/**
 * If there is a local settings file, then include it
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  include $local_settings;
}

// Set config install directory consistently across environments.
$settings['config_sync_directory'] = dirname(DRUPAL_ROOT) . '/config/sync';

// Automatically generated include for settings managed by ddev.
$ddev_settings = dirname(__FILE__) . '/settings.ddev.php';
if (getenv('IS_DDEV_PROJECT') == 'true' && is_readable($ddev_settings)) {
  require $ddev_settings;
}

// Include settings required for Redis cache.
if ((file_exists(__DIR__ . '/settings.ddev.redis.php') && getenv('IS_DDEV_PROJECT') == 'true')) {
  include __DIR__ . '/settings.ddev.redis.php';
}

