<?php

/**
 * @file
 * Form-related hook implementations.
 */

use Drupal\Core\Render\Element;
use Drupal\Core\Render\Markup;

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_input(array &$variables) {
  $variables['is_required'] = isset($variables['element']['#required']) ? $variables['element']['#required'] : NULL;
  $variables['type'] = isset($variables['element']['#attributes']['type']) ? $variables['element']['#attributes']['type'] : NULL;
  $variables['dropbutton'] = isset($variables['element']['#dropbutton']) ? $variables['element']['#dropbutton'] : NULL;

  // Replace button classes with c-button.
  if (isset($variables['attributes']['class'])) {
    $variables['attributes']['class'] = preg_replace('/^button/', 'c-button', $variables['attributes']['class']);
  }

  if (!empty($variables['element']['#description']) && !empty($variables['element']['#id'])) {
    $description_id = $variables['element']['#id'] . '-description';
    $variables['described_by'] = $description_id;
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_fieldset(array &$variables) {
  $variables['type'] = isset($variables['element']['#type']) ? $variables['element']['#type'] : 'fieldset';
  $variables['is_disabled'] = isset($variables['element']['#disabled']) ? $variables['element']['#disabled'] : NULL;
  // We specifically want the "Sort By" radios on the search page.
  if (!empty($variables['element']['#name']) && $variables['element']['#name'] == 'sort_by') {
    $variables['legend']['attributes']->addClass(['c-form-item__legend', 'c-kicker', 'c-kicker--big']);
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_form_element(array &$variables) {
  $variables['is_required'] = isset($variables['element']['#required']) ? $variables['element']['#required'] : NULL;
  if (!empty($variables['description']['content']) && !empty($variables['element']['#id'])) {
    $variables['description']['attributes']['id'] = $variables['element']['#id'] . '-description';
  }
  if (!empty($variables['name']) && $variables['name'] == 'current_facets') {
    $variables['label']['#theme'] = 'facet_label';
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_select(array &$variables) {
  if (!empty($variables['element']['#description']) && !empty($variables['element']['#id'])) {
    $description_id = $variables['element']['#id'] . '-description';
    $variables['described_by'] = $description_id;
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_textarea(array &$variables) {
  if (!empty($variables['element']['#description']) && !empty($variables['element']['#id'])) {
    $description_id = $variables['element']['#id'] . '-description';
    $variables['described_by'] = $description_id;
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_container_alter(array &$suggestions, array $variables) {
  $array_parents = isset($variables['element']['#array_parents']) ? $variables['element']['#array_parents'] : NULL;

  // Add parents as template suggestions.
  if (isset($array_parents)) {
    $ancestors = [];

    foreach ($array_parents as $value) {
      if (is_string($value)) {
        $ancestors[] = $value;
        $suggestions[] = 'container__' . implode('__', $ancestors);
      }
    }
  }

  // Add Views-related template suggestions.
  if (isset($variables['element']['#type']) && $variables['element']['#type'] !== 'container') {
    $suggestions[] = 'container__' . $variables['element']['#type'];

    if (isset($variables['element']['#name'])) {
      $suggestions[] = 'container__' . $variables['element']['#type'] . '__' . $variables['element']['#name'];
    }
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_form_alter(array &$suggestions, array $variables) {
  if (isset($variables['element']['#form_id'])) {
    $suggestions[] = 'form__' . $variables['element']['#form_id'];

    if ($variables['element']['#form_id'] == 'views_exposed_form' && !empty($variables['element']['#view_id'])) {
      $suggestions[] = 'form__' . $variables['element']['#form_id'] . '__' . $variables['element']['#view_id'];
    }
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_form_element_alter(array &$suggestions, array $variables) {
  $id = $variables['element']['#id'] ?? NULL;
  $name = $variables['element']['#name'] ?? NULL;
  $type = $variables['element']['#type'] ?? NULL;

  if (isset($type)) {
    $suggestions[] = 'form_element__' . $type;
  }

  if (isset($name)) {
    $suggestions[] = 'form_element__' . $name;
  }

  if (isset($id)) {
    $suggestions[] = 'form_element__' . $id;
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_input_alter(array &$suggestions, array $variables) {
  $suggestions[] = $variables['theme_hook_original'] . '__' . $variables['element']['#name'];
}

/**
 * Implements hook_preprocess_form().
 */
function gesso_preprocess_form(array &$variables) {
  if ($variables['element']['#form_id'] == 'views_exposed_form' &&
    isset($variables['element']['#view_id']) &&
    $variables['element']['#view_id'] == 'search'
  ) {
    // Remove the keywords input
    unset($variables['element']['keywords']);
    // Remove the buttons
    unset($variables['element']['actions']);
    // Add classes to the sortby radios
    $variables['element']['sort_by']['#attributes']['class'][] = 'c-filter-modal__col';
    // Update the children variable since we just changed the markup.
    $children_keys = Element::children($variables['element']);
    $output = '';
    foreach ($children_keys as $key) {
      if (!empty($variables['element'][$key])) {
        $output .= \Drupal::service('renderer')
          ->render($variables['element'][$key]);
      }
    }
    $variables['element']['#children'] = Markup::create($output);
    $variables['children'] = $variables['element']['#children'];
  }
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function gesso_form_addtocal_event_field_datetime_range_19_alter(array &$form, \Drupal\Core\Form\FormState $formState) {
  if (!empty($form['addtocal_container']) && !empty($form['addtocal_container']['type'])) {
    unset($form['addtocal_container']['type']['#attributes']['onclick']);
  }
}
