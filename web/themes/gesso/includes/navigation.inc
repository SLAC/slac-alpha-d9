<?php

/**
 * @file
 * Navigation-related hook implementations.
 */

/**
 * Implements hook_preprocess_breadcrumb().
 */
function gesso_preprocess_breadcrumb(array &$variables) {
  if ($variables['breadcrumb']) {
    /** @var \Drupal\Core\Render\Renderer $renderer */
    $renderer = \Drupal::service('renderer');
    $variables['include_current_page']
      = theme_get_setting('include_current_page_in_breadcrumb', 'gesso') ?? TRUE;
    $themeConfig = \Drupal::config('gesso.settings');
    $renderer->addCacheableDependency($variables, $themeConfig);

    if ($variables['include_current_page']) {
      $request = \Drupal::request();
      $route_match = \Drupal::routeMatch();
      $variables['#cache']['contexts'][] = 'route';
      $page_title = \Drupal::service('title_resolver')->getTitle($request, $route_match->getRouteObject());

      if (!empty($page_title)) {
        $variables['page_title'] = $page_title;
        $variables['breadcrumb'][] = [
          'text' => $page_title,
        ];
      }
    }
  }
}

/**
 * Implements hook_preprocess_menu__HOOK().
 */
function gesso_preprocess_menu__extras__main(&$vars) {
  $mega_menu_setting = \Drupal::service('site_settings.loader')->loadByFieldset('mega_menu_cards');
  if (!empty($mega_menu_setting['mega_menu_cards'])) {
    $mega_menu_cards = [];
    foreach($mega_menu_setting['mega_menu_cards'] as $card) {
      $mega_menu_cards[$card['field_menu_link']] = $card['field_cards'];
    }
    foreach($vars['items'] as $key => $item) {
      $menu_id = $item['entity']->id();
      if (!empty($mega_menu_cards[$menu_id]) && !empty($mega_menu_cards[$menu_id]['target_id'])) {
        $card_paragraph = \Drupal\paragraphs\Entity\Paragraph::load($mega_menu_cards[$menu_id]['target_id']);
        $view_builder = \Drupal::entityTypeManager()->getViewBuilder($card_paragraph->getEntityTypeId());
        $vars['items'][$key]['featured'] = $view_builder->view($card_paragraph, 'menu');
      }
    }
  }
}

/**
 * hook_preprocess_pager().
 */
function gesso_preprocess_pager(array &$vars) {
  $element = $vars['pager']['#element'];
  $pager_manager = \Drupal::service('pager.manager');
  /** @var \Drupal\Core\Pager\Pager $pager */
  $pager = $pager_manager
    ->getPager($element);
  if ($pager) {
    $pager_max = $pager->getTotalPages();
    if (!empty($vars['items']['first'])) {
      $vars['items']['first']['text'] = '1';
    }
    if (!empty($vars['items']['last'])) {
      $vars['items']['last']['text'] = "${pager_max}";
    }
  }
}
