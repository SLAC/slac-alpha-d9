<?php

/**
 * @file
 * HTML-related hook implementations.
 */

/**
 * Implements hook_preprocess().
 */
function slac_preprocess(array &$variables) {
  if (!empty($variables['directory'])) {
    $variables['gesso_image_path'] = '/' . $variables['directory'] . '/dist/images';
    $variables['#attached']['drupalSettings']['gesso']['slacImagePath'] = '/' . $variables['directory'] . '/dist/images';
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function slac_preprocess_html(array &$variables) {
  $variables['include_back_to_top']
    = theme_get_setting('include_back_to_top', 'slac') ?? TRUE;
  /** @var \Drupal\Core\Render\Renderer $renderer */
  $renderer = \Drupal::service('renderer');
  $themeConfig = \Drupal::config('slac.settings');
  $renderer->addCacheableDependency($variables, $themeConfig);
}

/**
 * Implements hook_page_attachments_alter().
 */
function slac_page_attachments_alter(array &$attachments) {
  $include_back_to_top = theme_get_setting('include_back_to_top') ?? TRUE;
  if ($include_back_to_top) {
    $attachments['#attached']['drupalSettings']['gesso']['backToTopThreshold']
      = theme_get_setting('threshold', 'slac');
    $attachments['#attached']['drupalSettings']['gesso']['backToTopSmoothScroll']
      = theme_get_setting('smooth_scroll', 'slac');
    /** @var \Drupal\Core\Render\Renderer $renderer */
    $renderer = \Drupal::service('renderer');
    $themeConfig = \Drupal::config('slac.settings');
    $renderer->addCacheableDependency($attachments, $themeConfig);

  }
}
