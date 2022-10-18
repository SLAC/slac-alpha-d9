<?php

/**
 * @file
 * Paragraph-related hook implementations.
 */

use Drupal\Component\Utility\Html;
use Drupal\Core\Cache\Cache;
use Drupal\slac_core\Services\MicrositeUtilities;

function gesso_preprocess_paragraph(&$vars) {
  /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
  $paragraph = $vars['paragraph'];
  $parent = $paragraph->getParentEntity();
  $vars['is_nested'] = $parent && $parent->getEntityTypeId() == 'paragraph';
  $vars['is_dark'] = !empty($vars['elements']['#is_dark']);
}

/**
 * Implements hook_preprocess_paragraph__HOOK().
 */
function gesso_preprocess_paragraph__section(&$vars) {
  $paragraph = $vars['paragraph'];
  $content = $vars['content'];
  if (!empty($vars['attributes']['class'])) {
    foreach ($vars['attributes']['class'] as $class) {
      if (str_contains($class, 'l-section--dark')) {
        // For sections with dark backgrounds, override the default field settings
        // and use the secondary style for buttons.
        if (!empty($content['field_button_links']) &&
          !empty($content['field_button_links'][0])
        ) {
          $linkIndexes = \Drupal\Core\Render\Element::children($content['field_button_links']);
          foreach ($linkIndexes as $i) {
            $link_classes = $content['field_button_links'][$i]['#options']['attributes']['class'];
            foreach ($link_classes as $key => $link_class) {
              if ($link_class == 'c-button--primary') {
                $link_classes[$key] = 'c-button--secondary';
              }
            }
            $content['field_button_links'][$i]['#options']['attributes']['class'] = $link_classes;
          }
        }
        // Set a variable noting this is a dark section, so we can make other theming
        // adjustments as needed.
        if (!empty($content['field_paragraphs']) &&
          !empty($content['field_paragraphs'][0])
        ) {
          $paragraphIndexes = \Drupal\Core\Render\Element::children($content['field_paragraphs']);
          foreach ($paragraphIndexes as $p) {
            $content['field_paragraphs'][$p]['#is_dark'] = TRUE;
          }
        }
      }
      if (str_contains($class, 'l-section--rss')) {
        $vars['is_rss'] = TRUE;
      }
    }
  }
  $vars['content'] = $content;
}

/**
 * Implements hook_preprocess_paragraph__HOOK().
 */
function gesso_preprocess_paragraph__image_embed(&$vars) {
  // If the view mode is two_column_hero, the paragraph is being used in the right column of the hero. In this
  // case, the caption+credit is displayed as a tooltip.
  if ($vars['view_mode'] == 'two_column_hero') {
    _gesso_set_hero_caption($vars);
  } else {
    // Retrieve the paragraph and the image entity from the paragraph. Note that image field is a required field.
    $paragraph = $vars['elements']['#paragraph'];
    if ($paragraph->get('field_image')->first()) {
      $image_field = $paragraph->get('field_image')->first()->getValue();
      /** @var \Drupal\media\Entity\Media $media */
      $image = Drupal\media\Entity\Media::load($image_field['target_id']);

      // If a caption override is selected and the override text field is populated,
      // write the override caption into a template variable.
      if ($paragraph->field_boolean->value) {
        // Assign the paragraph's caption field into the caption field.
        // If there's no override caption, empty out the media's caption field.
        $vars['caption'] = ($paragraph->field_long_text->value) ? $paragraph->field_long_text->view() : NULL;
      } else {
        // Paragraph is not overriding the caption, so assign the image's caption to the template variable
        $vars['caption'] = $image->field_caption->view();
      }

      // Always use the credit from the image, assign to a template variable.
      $vars['credit'] = $image->field_credit->view();
    }
  }
}

/**
 * Implements hook_preprocess_paragraph__HOOK().
 */
function gesso_preprocess_paragraph__image_carousel(&$vars) {
  $vars['pager_items'] = \Drupal\Core\Render\Element::children($vars['content']['field_paragraphs']);
}

/**
 * Implements hook_preprocess_paragraph__HOOK().
 */
function gesso_preprocess_paragraph__table_of_contents(&$vars) {
  $paragraph = $vars['paragraph'];

  // Create a slug as a cleanCSSIdentifier based on the field_short_text value.
  $vars['slug'] = Html::cleanCssIdentifier($paragraph->field_short_text->value);
}

/**
 * Implements hook_preprocess_paragraph__HOOK().
 */
function gesso_preprocess_paragraph__video_hero(&$vars) {
  $media_ids = \Drupal\Core\Render\Element::children($vars['content']['field_video_hero_videos']);
  $hero_videos = [];
  foreach($media_ids as $id) {
    /** @var \Drupal\media\Entity\Media $media */
    $media = $vars['content']['field_video_hero_videos'][$id]['#media'];
    $hero_videos[] = [
      'embed' => $media->field_media_oembed_video->view('video_hero'),
      'caption' => $media->field_caption->view('video_hero'),
      'credit' => $media->field_credit->view('video_hero'),
      'url' => $media->field_boolean->value ? $media->toUrl()->toString() : NULL,
      'fallback_image' => $media->field_thumbnail->view('video_hero')
    ];
  }
  $vars['hero_videos'] = $hero_videos;
}

/**
 * Set the hero caption and/or credit.
 */
function _gesso_set_hero_caption(&$vars) {
  /** @var \Drupal\media\Entity\Media $media */
  $image = $vars['content']['field_image'][0]['#media'];

  /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
  $paragraph = $vars['paragraph'];

  // Assign either the paragraph's body field or the image's caption field
  // into the template as the caption of the hero.
  switch ($paragraph->bundle()) {
    case 'article_hero':
      $paragraph_caption = !empty($paragraph->field_body[0]) ? $paragraph->field_body->view('tooltip') : NULL;
      $vars['hero_caption'] = $paragraph_caption ?: (!empty($image->field_caption[0]) ? $image->field_caption->view('tooltip') : NULL);
      break;
    // See template field--paragraph--field-long-text--image-embed.html.twig for caption processing.
    case 'image_embed':
      $paragraph_caption = !empty($paragraph->field_long_text[0]) && $paragraph->field_boolean->value ? $paragraph->field_long_text->view('two_column_hero') : NULL;
      $vars['hero_caption'] = $paragraph_caption ?: (!empty($image->field_caption[0]) ? $image->field_caption->view($vars['view_mode'] == 'two_column_hero' ? 'tooltip' : 'default') : NULL);
      break;
    // See template field--paragraph--field-long-text--overlap-image.html.twig for caption processing.
    case 'overlap_image':
      $paragraph_caption = !empty($paragraph->field_long_text[0]) ? $paragraph->field_long_text->view('tooltip') : NULL;
      $vars['hero_caption'] = $paragraph_caption ?: (!empty($image->field_caption[0]) ? $image->field_caption->view('tooltip') : NULL);
      break;
    default:
      $vars['hero_caption'] = !empty($image->field_caption[0]) ? $image->field_caption->view(in_array($paragraph->bundle(), ['image_hero', 'microsite_hero', 'extra_large_card']) ? 'tooltip' : 'default') : NULL;
  }

  // Assign the credit, always using the image entity's field.
  if (!empty($image->field_credit[0])) {
    $credit_view_mode = 'default';
    if (in_array($paragraph->bundle(), ['image_hero', 'overlap_image', 'microsite_hero', 'article_hero', 'extra_large_card'])) {
      $credit_view_mode = 'tooltip';
    }
    if ($paragraph->bundle() == 'image_embed' && $vars['view_mode'] == 'two_column_hero') {
      $credit_view_mode = 'tooltip';
    }
    $vars['hero_credit'] = !empty($image->field_credit[0]) ? $image->get('field_credit')->view($credit_view_mode) : NULL;
  }

  // Assign the link to the image detail page, if present.
  $vars['hero_url'] = $image->field_boolean->value ? $image->toUrl()->toString() : NULL;
}

/**
 * Implements hook_preprocess_paragraph__HOOK().
 */
function gesso_preprocess_paragraph__article_hero(&$vars) {
  _gesso_set_hero_caption($vars);
}

/**
 * Implements hook_preprocess_paragraph__HOOK().
 */
function gesso_preprocess_paragraph__image_hero(&$vars) {
  _gesso_set_hero_caption($vars);
  /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
  $paragraph = $vars['paragraph'];
  if ($paragraph->hasField('field_text_color')) {
    $text_color = $paragraph->field_text_color->value;
    if ($text_color == 'white') {
      $vars['#attached']['library'][] = 'gesso/inverse_nav';
    }
  }
}

/**
 * Implements hook_preprocess_paragraph__HOOK().
 */
function gesso_preprocess_paragraph__microsite_navigation_marker(&$vars) {
  $paragraph = $vars['paragraph'];

  // Create a slug as a cleanCSSIdentifier based on the field_short_text value.
  $vars['slug'] = Html::cleanCssIdentifier($paragraph->field_short_text->value);
}

/**
 * Implements hook_preprocess_paragraph__HOOK().
 */
function gesso_preprocess_paragraph__microsite_hero(&$vars) {
  // Retrieve that paragraph and its parent entity, check that the parent is a node,
  // and set the node title.
  $paragraph = $vars['paragraph'];
  $parent = $paragraph->getParentEntity();

  if ($parent && $parent->getEntityType()->id() == 'node') {
    $vars['node_title'] = $parent->title->value;
  }

  /** @var MicrositeUtilities $microsite_utilities */
  $microsite_utilities = \Drupal::service('slac_core.microsite_utilities');
  $vars['microsite_markerlist'] = $microsite_utilities->FindMicrositeMarkers(
    'field_paragraphs',
    'microsite_navigation_marker',
    'field_short_text'
  );

  // Set the caption and credit fields from field_image.
  _gesso_set_hero_caption($vars);
}

/**
 * Implements hook_preprocess_paragraph__HOOK().
 */
function gesso_preprocess_paragraph__embed_view(array &$vars) {
  $vars['content']['field_viewsreference'][0]['contents']['#is_dark'] = $vars['is_dark'];
}

/**
 * Implements hook_preprocess_paragraph__HOOK().
 */
function gesso_preprocess_paragraph__fifty_fifty(array &$vars) {
  if (!empty($vars['attributes']) && !empty($vars['attributes']['class'])) {
    foreach ($vars['attributes']['class'] as $class) {
      if ($class == 'c-fifty-fifty--left') {
        $vars['fade'] = 'left';
        break;
      } else if ($class == 'c-fifty-fifty--right') {
        $vars['fade'] = 'right';
        break;
      }
    }
  } else {
    $vars['fade'] = 'none';
  }
}

/**
 * Implements hook_preprocess_paragraph__HOOK().
 */
function gesso_preprocess_paragraph__overlap_image(array &$vars) {
  // Pull the image's credit forward into the paragraph template, and the image's caption if
  // the caption field on the paragraph is not populated.
  _gesso_set_hero_caption($vars);

  $paragraph = $vars['paragraph'];
  // Get the media item.
  $media_id = $paragraph->field_image->target_id;

  if ($media_id) {
    $media = \Drupal\media\Entity\Media::load($media_id);
    // Get the image.
    /** @var \Drupal\image\Plugin\Field\FieldType\ImageItem $image */
    $image_field = $media->field_media_image->first();
    // Extract the URL and the alt text. We do this rather than rendering
    // the image normally because it needs to be a background image when
    // the parallax effect is used.
    $vars['image_alt'] = $image_field->alt;
    $image = \Drupal\file\Entity\File::load($image_field->target_id);
    if ($image) {
      $image_style = \Drupal\image\Entity\ImageStyle::load('scale_extra_large');
      $vars['image_url'] = $image_style->buildUrl($image->getFileUri());
    }
  }
  $vars['position'] = 'top-left';
  if (!empty($vars['attributes']['class'])) {
    foreach($vars['attributes']['class'] as $class) {
      if (in_array($class, ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center-left', 'center-right'])) {
        $vars['position'] = $class;
        break;
      }
    }
  }
}
