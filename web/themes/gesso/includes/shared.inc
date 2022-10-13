<?php

use Drupal\taxonomy\TermInterface;

/**
* @param array $variables
* @param TermInterface $term
* @return void
*/
function gesso_add_mosaic_filter_classes(array &$variables, TermInterface $term): void
{
  $variables['attributes']['class'][] = 'js-filter-' . $term->id();
  if ($term->parent->target_id) {
    $parent = \Drupal\taxonomy\Entity\Term::load($term->parent->target_id);
    gesso_add_mosaic_filter_classes($variables, $parent);
  }
}
