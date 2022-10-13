<?php

/**
 * @file
 * Block-related hook implementations.
 */

use Drupal\block_content\BlockContentInterface;

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_block_alter(array &$suggestions, array $variables) {
  $content = $variables['elements']['content'];
  if (isset($content['#block_content']) and $content['#block_content'] instanceof BlockContentInterface) {
    $suggestions = [];
    $bundle = $content['#block_content']->bundle();
    $view_mode = $content['#view_mode'];
    $suggestions[] = 'block__' . $bundle;
    $suggestions[] = 'block__' . $view_mode;
    $suggestions[] = 'block__' . $bundle . '__' . $view_mode;
    if (!empty($variables['elements']['#id'])) {
      $suggestions[] = 'block__' . $variables['elements']['#id'];
    }
  }
}

/**
 * Implements hook_preprocess_block().
 */
function gesso_preprocess_block__facet_block(&$variables) {
//  $facets = [];
//  $total = 0;
//
//  // Identify the specific facet derivatives and their url alias (query param) keywords
//  // that are to be processed and exit if processing a different facet block.
//  $derivatives = [
//    'entity_type_list' => 'type',
//    'entity_type_grid' => 'type',
//    'research_area_list' => 'topic',
//    'research_area_grid' => 'topic',
//  ];
//
//  if (!in_array($variables['derivative_plugin_id'], array_keys($derivatives))) {
//    return;
//  }
//
//  // Collect into an assoc array the label & count and whether the facet is active.
//  // Active is determined by the facet's presence in the URL.
//  if ($facet_list = current($variables['content'][0]['#items'])) {
//    foreach($facet_list as $facet_record) {
//      $facets[] = [
//        'id' => !empty($facet_record['raw_value']) ? $facet_record['raw_value'] : NULL,
//        'label' => !empty($facet_record['values']['value']) ? $facet_record['values']['value'] : NULL,
//        'count' => !empty($facet_record['values']['count']) ? $facet_record['values']['count'] : 0,
//        'active' => !empty($facet_record['values']['active']) ? $facet_record['values']['active'] : NULL,
//      ];
//      // Combine to get total records, but only report if certain that the facet is
//      // a proper covering of the results, such as with "type" facet.
//      $total += $facet_record['values']['count'];
//    }
//  }
//
//  // Assign the facet list, url_alias and if appropriate, total # of results.
//  $variables['facets'] = $facets;
//  $variables['facet_url_alias'] = $derivatives[$variables['derivative_plugin_id']];
//  if ($variables['derivative_plugin_id'] == 'entity_type_list') {
//    $variables['facet_total'] = $total;
//  }

}
