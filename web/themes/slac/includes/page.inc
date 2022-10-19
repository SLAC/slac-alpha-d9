<?php

/**
 * @file
 * PAGE-related hook implementations.
 */

use Drupal\slac_core\Services\MicrositeUtilities;

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function slac_theme_suggestions_page_alter(array &$suggestions, array $variables) {
  $route_name = \Drupal::routeMatch()->getRouteName();
  if ($route_name == 'entity.node.canonical' && !in_array('page__node', $suggestions)) {
    $suggestions[] = 'page__node';
  }

  /** @var MicrositeUtilities $microsite_utilities */
  $microsite_utilities = \Drupal::service('slac_core.microsite_utilities');

  if ($microsite_utilities->IsMicrositePage(['page', 'news_collection'], 'field_hero_paragraph', 'microsite_hero')) {
    $suggestions[] = 'page__microsite';
  }
}
