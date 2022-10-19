<?php

namespace Drupal\slac_helper\Commands;

use Consolidation\SiteAlias\SiteAliasManagerAwareInterface;
use Consolidation\SiteAlias\SiteAliasManagerAwareTrait;
use Drupal\Core\Extension\ThemeHandlerInterface;
use Drush\Drush;
use Drush\Commands\DrushCommands;
use Symfony\Component\Filesystem\Filesystem;
use Webmozart\PathUtil\Path;
use Drupal\slac_helper\SlacHelperDirFilterExclude;
use Drupal\slac_helper\GessoHelperDirFilterInclude;

/**
 * A Drush commandfile.
 *
 * In addition to this file, you need a drush.services.yml
 * in root of your module, and a composer.json file that provides the name
 * of the services file to use.
 *
 * See these files for an example of injecting Drupal services:
 *   - http://cgit.drupalcode.org/devel/tree/src/Commands/DevelCommands.php
 *   - http://cgit.drupalcode.org/devel/tree/drush.services.yml
 */
class SlacHelperCommands extends DrushCommands implements SiteAliasManagerAwareInterface {

  use SiteAliasManagerAwareTrait;

  /**
   * The theme handler service.
   *
   * @var Drupal\Core\Extension\ThemeHandlerInterface
   */
  protected $themeHandler;

  /**
   * @var array
   */
  protected $themeList;

  /**
   * Filesystem variable.
   *
   * @var \Symfony\Component\Filesystem\Filesystem
   */
  protected $fs;

  /**
   * SlacHelperCommands constructor.
   *
   * @param Drupal\Core\Extension\ThemeHandlerInterface $themeHandler
   *   The theme handler.
   */
  public function __construct(ThemeHandlerInterface $themeHandler) {
    parent::__construct();
    $this->themeHandler = $themeHandler;
    $this->fs = new Filesystem();
  }

  /**
   * Create a new theme based on the Gesso theme.
   *
   * @param string $name
   *   The name of your theme.
   * @param array $options
   *   An associative array of options whose values come from cli,
   *   aliases, config, etc.
   *
   * @option description
   *   A short description of your new theme.
   * @option machine-name
   *   The machine-readable name of your new theme. This will be
   *   auto-generated from the human-readable name if omitted.
   * @usage drush slac "New Theme Name"
   *   Creates a new theme called "New Theme Name" with a machine name
   *   of "new_theme_name".
   * @usage drush slac "New Theme Name" --machine-name=new_theme
   *   Creates a new theme called "New Theme Name" with a machine name
   *   of "new_theme".
   *
   * @command slac
   *
   * @throws \Exception
   */
  public function slac(
    $name,
    array $options = ['description' => NULL, 'machine-name' => NULL]
  ) {
    // Get new theme options.
    if (!isset($name)) {
      $name = $options['name'];
    }
    $machine_name = $options['machine-name'] ?: $this->slacMachineName($name);
    $description = $options['description'];

    // Validate the command.
    if (!$this->slacThemeExists('slac')) {
      throw new \Exception(dt('Where is the Gesso theme? I could not find it.'));
    }

    if ($this->slacThemeExists($machine_name)) {
      throw new \Exception(dt('A theme with that name already exists. The machine-readable name must be unique.'));
    }

    if (!$machine_name || !preg_match('/^[a-z][a-z0-9_]*$/', $machine_name)) {
      throw new \Exception(dt('The machine name was invalid or could not be generated properly. It must start '
        . 'with a letter and may only contain lowercase letters, numbers, and underscores.'));
    }

    $this->io()->text(dt('Setting up the theme. This may take a while...'));
    // Get theme paths.
    $drupalRoot = Drush::bootstrapManager()->getRoot();
    $slac_path = Path::join($drupalRoot, drupal_get_path('theme', 'slac'));
    $theme_path = substr($slac_path, 0, strrpos($slac_path, '/'));
    $new_path = Path::join($theme_path, $machine_name);

    // Copy the Gesso theme directory recursively to the new theme’s location.
    $this->fs->mirror($slac_path, $new_path, new \RecursiveIteratorIterator(new SlacHelperDirFilterExclude(new \RecursiveDirectoryIterator($slac_path))), \RecursiveIteratorIterator::SELF_FIRST);

    // Replace specific occurrences of 'slac'
    // with the machine name of the new theme.
    $files = new \RecursiveIteratorIterator(
      new GessoHelperDirFilterInclude(
        new \RecursiveDirectoryIterator(
          $new_path, \FilesystemIterator::SKIP_DOTS
        )
      ),
      \RecursiveIteratorIterator::SELF_FIRST);
    foreach ($files as $file) {
      if (!$file->isDir()) {
        $this->slacFileStrReplace(
          $file->getPathname(),
          [
            "/(?<!\[('|\")drupalSettings('|\")\]\[('|\"))slac(?!_image_path)/",
            '/Gesso/',
          ],
          [$machine_name, $name]
        );
      }
    }
    $templateFiles = new \RecursiveIteratorIterator(
        new \RecursiveDirectoryIterator(
          $new_path . '/source', \FilesystemIterator::SKIP_DOTS
        ),
      \RecursiveIteratorIterator::SELF_FIRST);
    foreach ($templateFiles as $templateFile) {
      if (!$templateFile->isDir()) {
        $this->slacFileStrReplace(
          $templateFile->getPathname(),
          ["/attach_library\((')?slac/"],
          ['attach_library($1' . $machine_name]
        );
      }
    }

    // Rename the .info.yml file.
    $slac_info_file = Path::join($new_path, 'slac.info.yml');
    $new_info_file = Path::join($new_path, $machine_name . '.info.yml');
    drush_op('rename', $slac_info_file, $new_info_file);

    // Update the .info.yml file based on the command options.
    $changes = [
      '/Gesso/' => $name,
      '/Sass-based starter theme\./' => $description,
      '/slac(?!_helper)/' => $machine_name,
    ];
    $this->slacFileStrReplace($new_info_file, array_keys($changes), $changes);

    // Rename the .breakpoints.yml file.
    $slac_info_file = Path::join($new_path, 'slac.breakpoints.yml');
    $new_info_file = Path::join($new_path, $machine_name . '.breakpoints.yml');
    if ($this->fs->exists($slac_info_file)) {
      drush_op('rename', $slac_info_file, $new_info_file);
    }

    // Rename the .libraries.yml file.
    $slac_libraries_file = Path::join($new_path, 'slac.libraries.yml');
    $new_libraries_file = Path::join($new_path, $machine_name . '.libraries.yml');
    if ($this->fs->exists($slac_libraries_file)) {
      drush_op('rename', $slac_libraries_file, $new_libraries_file);
    }

    // Rename the .layouts.yml file.
    $slac_layouts_file = Path::join($new_path, 'slac.layouts.yml');
    $new_layouts_file = Path::join($new_path, $machine_name . '.layouts.yml');
    if ($this->fs->exists($slac_layouts_file)) {
      drush_op('rename', $slac_layouts_file, $new_layouts_file);
    }

    // Rename the .theme file.
    $slac_theme_file = Path::join($new_path, 'slac.theme');
    $new_theme_file = Path::join($new_path, $machine_name . '.theme');
    if ($this->fs->exists($slac_theme_file)) {
      drush_op('rename', $slac_theme_file, $new_theme_file);
    }

    // Rename the config files.
    $configFiles = new \RecursiveIteratorIterator(
      new \RecursiveDirectoryIterator(
        $new_path . '/config', \FilesystemIterator::SKIP_DOTS
      ),
      \RecursiveIteratorIterator::SELF_FIRST);
    foreach ($configFiles as $file) {
      if (!$file->isDir()) {
        $existing_name = $file->getPathname();
        $new_name = str_replace('slac', $machine_name, $existing_name);
        drush_op('rename', $existing_name, $new_name);
      }
    }

    // Notify user of the newly created theme.
    $this->io()->block(dt(
      "\nThe \"!name\" theme has been created in: !path\n",
      [
        '!name' => $name,
        '!path' => $new_path,
      ]
    ), 'SUCCESS', 'fg=black;bg=green', ' ! ');

    // Warn the user that they might have some additional steps.
    $this->io()->caution(dt('If you want to remove the slac theme ' .
      'entirely, be sure to uninstall, move, and re-enable the '
      . 'slac_helper module first.'));
  }

  /**
   * Converts $name to a machine-readable format.
   */
  private function slacMachineName($name) {
    $name = str_replace(' ', '_', strtolower($name));
    $search = [
      // Remove characters not valid in function names.
      '/[^a-z0-9_]/',
      // Functions must begin with an alpha character.
      '/^[^a-z]+/',
    ];
    $name = preg_replace($search, '', $name);
    $name = str_replace('__', '_', $name);
    $name = trim($name, '_');

    return $name;
  }

  /**
   * Checks if $theme_name already exists in Drupal.
   */
  private function slacThemeExists($theme_name) {
    if (empty($this->themeList)) {
      $this->themeList = $this->themeHandler->rebuildThemeData();
    }

    return isset($this->themeList[$theme_name]);
  }

  /**
   * Replace strings in a file.
   */
  private function slacFileStrReplace($file_path, $find, $replace) {
    $file_path = Path::normalize($file_path);
    $file_contents = file_get_contents($file_path);
    $file_contents = preg_replace($find, $replace, $file_contents);
    drush_op('file_put_contents', $file_path, $file_contents);
  }

  /**
   * Recursively removes all files and subfolders in a directory.
   *
   * It later also removes the directory itself.
   *
   * @param string $path
   *   Path to the top-level directory.
   */
  private function slacRecursiveRm($path) {
    if (is_dir($path)) {
      $dir_contents = scandir($path);
      foreach ($dir_contents as $item) {
        if ($item !== '.' && $item !== '..') {
          $subpath = Path::join($path, $item);
          if (is_dir($subpath)) {
            $this->slacRecursiveRm($subpath);
          }
          else {
            drush_op('unlink', $subpath);
          }
        }
      }
      drush_op('rmdir', $path);
    }
  }

}
