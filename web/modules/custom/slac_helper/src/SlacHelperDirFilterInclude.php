<?php

namespace Drupal\slac_helper;

/**
 * Iterator to include directories.
 */
class SlacHelperDirFilterInclude extends \RecursiveFilterIterator {

  /**
   * @var array
   *   Directories to include.
   */
  protected array $includeDirs = [
    'includes',
    'templates',
    'config',
  ];

  /**
   * @var array
   *   Files to include.
   */
  protected array $includeFiles = [
    'slac.libraries.yml',
    'slac.theme',
    'theme-settings.php',
  ];

  /**
   *
   */
  public function accept() {
    return ($this->isDir() && in_array($this->getFilename(), $this->includeDirs) ||
      !$this->isDir() && in_array($this->getFilename(), $this->includeFiles));
  }

  /**
   *
   */
  public function getChildren() {
    return new SlacHelperDirFilterExclude($this->getInnerIterator()->getChildren());
  }

}
