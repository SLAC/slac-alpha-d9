<?php

/**
 * @file
 * Taxonomy-related hook implementations.
 */

require_once 'shared.inc';

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_taxonomy_term(array &$variables) {
  $variables['term_name'] = $variables['term']->getName();

  // Array of view modes to add regions to.
  $allowed_view_modes = ['full'];

  if (in_array($variables['view_mode'], $allowed_view_modes)) {
    // Array of regions to add to taxonomy term template.
    $allowed_regions = ['status'];
    _add_regions_to_template($allowed_regions, $variables);
  }

  if ($variables['view_mode'] == 'mosaic_card') {
    $term = $variables['term'];
    if ($term->hasField('field_research_area')) {
      /** @var \Drupal\Core\Field\EntityReferenceFieldItemListInterface $research_area_list */
      $research_area_list = $term->field_research_area;
      $research_areas = $research_area_list->referencedEntities();
      foreach ($research_areas as $research_area) {
        gesso_add_mosaic_filter_classes($variables, $research_area);
      }
    }
  }
}


/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_taxonomy_term_alter(array &$suggestions, array $variables) {
  $bundle = $variables['elements']['name']['#bundle'];
  $view_mode = $variables['elements']['#view_mode'];
  $suggestions[] = 'taxonomy_term__' . $view_mode;
  $suggestions[] = 'taxonomy_term__' . $bundle . '__' . $view_mode;
}
