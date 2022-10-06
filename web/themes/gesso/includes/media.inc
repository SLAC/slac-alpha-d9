<?php

/**
 * @file
 * Media-related hook implementations.
 */

use Drupal\Component\Utility\Html;
use Drupal\filter\Render\FilteredMarkup;

require_once 'shared.inc';

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_filter_caption(array &$variables) {
  $dom = Html::load($variables['node']);
  foreach ($dom->getElementsByTagName('drupal-media') as $dom_media_element) {
    /** @var \DOMElement $new_media_element */
    $new_media_element = $dom_media_element->cloneNode(TRUE);

    // Re-insert the caption attribute into the media tag so that it is
    // available when rendering the media itself. This allows us to make
    // decisions during media rendering based upon whether or not there's a
    // caption.
    $new_media_element->setAttribute('data-caption', $variables['caption']);
    $dom_media_element->parentNode->replaceChild($new_media_element, $dom_media_element);

    // Grab the view mode and alignment info from the embedded media tag and
    // make it available to the filter-caption template.
    foreach (['data-view-mode' => 'view_mode', 'data-align' => 'align'] as $attribute => $var) {
      $variables[$var] = $dom_media_element->getAttribute($attribute);
    }

    // Add media bundle to variables to handle custom theming by bundle.
    $uuid = $dom_media_element->getAttribute('data-entity-uuid');
    $entity_type = $dom_media_element->getAttribute('data-entity-type');
    $media = \Drupal::service('entity.repository')->loadEntityByUuid($entity_type, $uuid);
    $variables['media_bundle'] = $media->bundle();
  }

  // If caption is empty, add blank space to allow CKEditor to add captions.
  if ($variables['logged_in'] && empty($variables['caption'])) {
    $variables['caption'] = ' ';
  }

  $variables['node'] = FilteredMarkup::create(Html::serialize($dom));
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_image(array &$variables) {
  if (empty($variables['attributes']['alt'])) {
    $variables['attributes']['alt'] = '';
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_media(array &$variables) {
  // Media items do not pass the aliased URL to the item by default. Retrieve and assign to
  // a template variable consistent with usage in node and taxonomy_term preprocessing.
  $variables['url'] = $variables['media']
    ->toUrl('canonical')
    ->toString();
  $variables['has_caption'] = isset($variables['attributes']['data-caption']);
  $variables['bundle'] = $variables['media']->bundle();
  if ($variables['view_mode'] == 'video_lightbox') {
    if ($variables['bundle'] == 'remote_video') {
      /** @var \Drupal\media\Entity\Media $video_media */
      $video_media = $variables['media'];
      $video_id = $video_media->id();
      // Set the lightbox ID on both the video (used for the video lightbox)
      // and the stillframe image that will trigger the lightbox.
      $lightbox_id = Html::getUniqueId("lightbox-${video_id}");
      $variables['lightbox_id'] = $lightbox_id;
      if (isset($variables['content']['field_thumbnail'][0])) {
        $variables['content']['field_thumbnail'][0]['#media']->lightbox_id = $lightbox_id;
        $variables['content']['field_thumbnail'][0]['#media']->video_caption[] = $video_media->field_caption->view();
        $variables['content']['field_thumbnail'][0]['#media']->video_caption[] = $video_media->field_credit->view();
      } elseif (isset($variables['content']['thumbnail'][0])) {
        $variables['content']['thumbnail'][0]['#lightbox_id'] = $lightbox_id;
        $variables['content']['thumbnail'][0]['#video_caption'][] = $video_media->field_caption->view();
        $variables['content']['thumbnail'][0]['#video_caption'][] = $video_media->field_credit->view();
      }
      // Set the URL to the detail page only if the editor hasn't hidden
      // the detail page from the public.
      if ($video_media->hasField('field_boolean') &&
        !$video_media->field_boolean->value == '1'
      ) {
        $variables['detail_page_url'] = $video_media->toUrl()->toString();
      }
      $variables['created'] = $video_media->getCreatedTime();
    } elseif ($variables['bundle'] == 'image') {
      $variables['lightbox_id'] = $variables['elements']['#media']->lightbox_id;
      $variables['video_caption'] = $variables['elements']['#media']->video_caption;
    }
  }
  if ($variables['view_mode'] == 'full') {
    // Array of regions to add to node template.
    $allowed_regions = ['status'];
    _add_regions_to_template($allowed_regions, $variables);
    $media = $variables['media'];
    if ($media->hasField('field_tags')) {
      $tags = $media->get('field_tags')->getValue();
      $tids = implode(',', array_map(function($item) { return $item['target_id']; }, $tags));
      $related_content_view = \Drupal\views\Views::getView('related_content_for_media_pages');
      $related_content_view->setArguments([$tids, $media->id()]);
      $related_content_view->setDisplay('related_images_videos');
      $related_content_view->preExecute();
      $related_content_view->execute();
      $variables['related_content'] = $related_content_view->buildRenderable();
    }
  }
  if ($variables['view_mode'] == 'mosaic_card') {
    /** @var \Drupal\media\MediaInterface $media */
    $media = $variables['media'];
    if ($media->hasField('field_research_area')) {
      /** @var \Drupal\Core\Field\EntityReferenceFieldItemListInterface $research_area_list */
      $research_area_list = $media->field_research_area;
      $research_areas = $research_area_list->referencedEntities();
      foreach ($research_areas as $research_area) {
        gesso_add_mosaic_filter_classes($variables, $research_area);
      }
    }
  }
}
