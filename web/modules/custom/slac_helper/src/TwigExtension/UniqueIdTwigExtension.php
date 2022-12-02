<?php

namespace Drupal\slac_helper\TwigExtension;

use Drupal\Component\Utility\Crypt;
use Drupal\Component\Utility\Html;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

/**
 * Gesso theme twig extension for creating a unique ID.
 */
class UniqueIdTwigExtension extends AbstractExtension {

  /**
   * @inheritdoc
   */
  public function getName() {
    return 'slac_helper_unique_id';
  }

  /**
   * @inheritdoc
   */
  public function getFilters() {
    $filters = parent::getFilters();
    $filters[] = new TwigFilter('unique_id', [$this, 'uniqueId']);
    return $filters;
  }

  /**
   * Generate a unique ID.
   */
  public function uniqueId($id) {
    return Html::getId($id) . '--' . Crypt::randomBytesBase64(8);
  }

}
