<?php

// phpcs:ignoreFile

assert_options(ASSERT_ACTIVE, TRUE);
\Drupal\Component\Assertion\Handle::register();

/**
 * Enable local development services.
 */
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';


$config['system.logging']['error_level'] = 'verbose';

/**
 * Disable CSS and JS aggregation.
 */
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;


$settings['rebuild_access'] = TRUE;
$settings['skip_permissions_hardening'] = TRUE;

# $settings['config_exclude_modules'] = ['devel', 'stage_file_proxy'];

/*
 * There was not a really easy way to determine if memcache
 * was an active class or to see if the module is enabled.
 *
 * So the easiest part was just to verify that drupal is not being installed
 * and if the environment variable is being used.
 *
 * If you try and use memcache without the module enabled the cache default
 * will give you an error.
 *
*/
if (
  !empty(getenv('MEMCACHE_URL'))
  && !empty(getenv('MEMCACHE_PORT'))
  && \Drupal\Core\Installer\InstallerKernel::installationAttempted() === FALSE
) {
  $settings['memcache']['servers'] = [$_ENV['MEMCACHE_URL'].':'.$_ENV['MEMCACHE_PORT'] => 'default'];
  $settings['memcache']['bins'] = ['default' => 'default'];
  $settings['memcache']['key_prefix'] = 'local';
  $settings['cache']['default'] = 'cache.backend.memcache';
}

if (getenv('IS_DDEV_PROJECT') === 'true') {
  //local split goes here
  $split_env = 'local';
}
