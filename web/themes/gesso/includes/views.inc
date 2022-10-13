<?php

/**
 * @file
 * Views-related hook implementations.
 */

use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Entity\Node;

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_views_view(array &$variables) {
  $variables['path'] = $variables['view']->getRequest()->getPathInfo();
  $variables['is_dark'] = !empty($variables['view_array']['#is_dark'])
    ? is_array($variables['view_array']['#is_dark'])
      ? $variables['view_array']['#is_dark']['content']
      : $variables['view_array']['#is_dark']
    : $variables['id'] == 'related_content_for_detail_pages' && $variables['display_id'] == 'news_article_related_stories';
  if (!empty($variables['rows']) && !empty($variables['rows'][0])) {
    $variables['rows'][0]['#rows']['#is_dark'] = $variables['is_dark'];
  }
}

/**
 * Implements hook_preprocess_views_view__HOOK().
 */
function gesso_preprocess_views_view__topics_landing_page_mosaic(array &$variables) {
  gesso_generate_research_area_list($variables);
}

/**
 * Implements hook_preprocess_views_view__HOOK().
 */
function gesso_preprocess_views_view__images_video_landing_page_mosaic(array &$variables) {
  gesso_generate_research_area_list($variables);
}

function gesso_generate_research_area_list(array &$variables) {
  $research_area_terms = \Drupal::service('entity_type.manager')->getStorage('taxonomy_term')->loadTree('research_area', 0, 1, TRUE);
  $variables['research_areas'] = [];
  $renderer = \Drupal::service('renderer');
  foreach ($research_area_terms as $term) {
    $variables['research_areas'][] = [
      'id' => $term->id(),
      'label' => $term->name->value
    ];
    $renderer->addCacheableDependency($variables, $term);
  }
}

/**
 * Implements hook_preprocess_views_view_unformatted().
 */
function gesso_preprocess_views_view_unformatted(array &$variables) {
  if (!empty($variables['rows']['#is_dark'])) {
    $variables['is_dark'] = is_array($variables['rows']['#is_dark'])
      ? $variables['rows']['#is_dark']['content']
      : $variables['rows']['#is_dark'];
    unset($variables['rows']['#is_dark']);
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_views_view_alter(array &$suggestions, array $variables) {
  $view = $variables['view'];
  $suggestions[] = 'views_view__' . $view->id();
  $suggestions[] = 'views_view__' . $view->current_display;
  $suggestions[] = 'views_view__' . $view->id() . '__' . $view->current_display;
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_views_view_unformatted_alter(array &$suggestions, array $variables) {
  $view = $variables['view'];
  $suggestions[] = 'views_view_unformatted__' . $view->id();
  $suggestions[] = 'views_view_unformatted__' . $view->current_display;
  $suggestions[] = 'views_view_unformatted__' . $view->id() . '__' . $view->current_display;
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function gesso_form_views_exposed_form_alter(&$form, FormStateInterface $form_state, $form_id) {
  // Borrowed from: https://www.codimth.com/blog/web/drupal/how-filter-content-year-views-drupal-8
  if (isset($form['#id']) && in_array($form['#id'], [
    'views-exposed-form-landing-pages-events-archive',
    'views-exposed-form-landing-pages-news-archive',
  ]
  )) {

    $node_type = '';
    switch ($form['#id']) {
      case 'views-exposed-form-landing-pages-events-archive':
        $node_type = 'event';
        break;
      case 'views-exposed-form-landing-pages-news-archive':
        $node_type = 'news_article';
        break;
    }

    $options = [];
    if (empty($options) && $node_type !== '') {
      $cid = "node:{$node_type}:year";
      $data = \Drupal::cache()->get($cid);
      if (!$data) {
        $options = [];
        $options[''] = t('Show All');
        $query = \Drupal::entityQuery('node');
        $query->condition('type', $node_type)
          ->condition('status', 1)
          ->sort('created', 'ASC');
        $result = $query->execute();
        if ($result) {
          $nodes = Node::loadMultiple($result);
          foreach ($nodes as $node) {
            if ($node_type == 'event') {
              $date = $node->field_datetime_range->value;
              $date = date('Y-m-d H:i:s', strtotime($date));
            }
            else {
              $date = $node->getCreatedTime();
              $date = date('Y-m-d H:i:s', $date);
            }

            if ($date) {
              $date = new DrupalDateTime($date, new DateTimeZone('UTC'));
              $year = $date->format('Y');
              if (!isset($options[$year])) {
                $options[$year] = $year;
              }
            }
          }
        }

        $cache_tags = ["node:{$node_type}:year", "node_list:{$node_type}"];
        \Drupal::cache()->set($cid, $options, CacheBackendInterface::CACHE_PERMANENT, $cache_tags);
      }
      else {
        $options = $data->data;
      }
    }

    if ($node_type == 'event') {
      $form['event_archive_year'] = [
        '#type' => 'select',
        '#options' => $options,
      ];
    }
    else {
      $form['created'] = [
        '#type' => 'select',
        '#options' => $options,
      ];
    }

  }
}
