CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Setup
 * Usage

INTRODUCTION
------------

* This module consists mostly of yaml content to be imported into a SLAC site on
initial install.  This module is dependent on the contrib YAML Content module
and content can be imported from the contained yaml files using drush.

SETUP
-----

* Within the target directory, content files may be created within a `content/`
subdirectory and follow the naming convention `*.content.yml`. Referenced images
or data files may also be added in parallel directories named `images/` and
`data_files` respectively.

USAGE
-----

* Once content is created for import, it may be imported through the one of the
custom Drush commands:

- `drush yaml-content-import <directory>`
- `drush yaml-content-import-module <module_name>`
- `drush yaml-content-import-profile <profile_name>`

-- INSTALLATION MODULE USAGE --

This is a work in progress.  Looks like we'll need a service

  // Prepare the import configuration and service.
  $my_content_module = 'slac_yaml_contente';
  $path = \Drupal\Core\Extension\ExtensionPathResolver::getPath('module', $my_content_module);
  $loader = \Drupal::service('yaml_content.content_loader');
  $loader->setContentPath($path);

  // Prepare a list of content files to import.
  $content_files = [
    'file_a.content.yml',
    'file_b.content.yml',
  ];

  // Generate the demo content and output a helpful message when complete.
  $loaded_entities = [];
  foreach ($content_files as $file_name) {
    $loaded = $loader->loadContent($file_name, $update);
    $loaded_entities = array_merge($loaded_entities, $loaded);
  }

-- INSTALLATION PROFILE USAGE --

To trigger loading content during an installation profile just add an install
task.

/**
 * Implements hook_install_tasks().
 */
function MYPROFILE_install_tasks(&$install_state) {
  $tasks = [
    // Install the demo content using YAML Content.
    'MYPROFILE_install_content' => [
      'display_name' => t('Install demo content'),
      'type' => 'normal',
    ],
  ];

  return $tasks;
}

/**
 * Callback function to install demo content.
 *
 * @see MYPROFILE_install_tasks()
 */
function MYPROFILE_install_content() {
  // Create default content.
  $loader = \Drupal::service('yaml_content.load_helper');
  $loader->importProfile('MYPROFILE');

  // Set front page to the page loaded above.
  \Drupal::configFactory()
    ->getEditable('system.site')
    ->set('page.front', '/home')
    ->save(TRUE);
}
