<?php

namespace Drupal\slac_helper;

/**
 * Iterator to exclude directories.
 */
class SlacHelperDirFilterExclude extends \RecursiveFilterIterator {

  /**
   * @var array
   *   Directories to exclude.
   */
  protected array $exclude = [
    'node_modules',
    'slac_helper',
    'dist',
    '.git',
  ];

  /**
   *
   */
  public function accept() {
    return !($this->isDir() && in_array($this->getFilename(), $this->exclude));
  }

  /**
   *
   */
  public function getChildren() {
    return new SlacHelperDirFilterExclude($this->getInnerIterator()->getChildren());
  }

}
