<?php

/**
 * @file
 * Field-related hook implementations.
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_field_alter(array &$suggestions, array $variables) {
  $suggestions[] = 'field__' . $variables['element']['#entity_type'] . '__' . $variables['element']['#field_name'] . '__' . $variables['element']['#bundle'] . '__' . $variables['element']['#view_mode'];
}

function gesso_preprocess_field(&$vars) {
  if ($vars['field_name'] == 'field_links' &&
    $vars['element']['#entity_type'] == 'paragraph' &&
    $vars['element']['#bundle'] == 'card'
  ) {
    foreach ($vars['items'] as $index => $item) {
      $vars['items'][$index]['content']['#attributes']['class'][] = 'c-arrow-link';
    }
  } else if ($vars['field_name'] == 'field_title' &&
    $vars['element']['#entity_type'] == 'site_setting_entity' &&
    $vars['element']['#bundle'] == 'event_visitor_details'
  ) {
    /** @var \Drupal\site_settings\SiteSettingEntityInterface $entity */
    $entity = $vars['element']['#object'];
    if ($entity->hasField('field_link')) {
      $uri = $entity->field_link->uri;
      if ($uri) {
        $vars['link_url'] = \Drupal\Core\Url::fromUri($uri)->toString();
      }
    }
  }
}
