<?php

namespace Drupal\slac_core\Plugin\search_api\processor;

use Drupal\search_api\IndexInterface;
use Drupal\search_api\Processor\ProcessorPluginBase;
use Drupal\media\MediaInterface;

/**
 * Exclude image and video media entities with field_boolean boolean turned off.
 *
 * @SearchApiProcessor(
 *   id = "exclude_hidden_media",
 *   label = @Translation("Exclude hidden media"),
 *   description = @Translation("Exclude image and remote video media entities that have the 'Enable detail page for this media' boolean turned off from being indexed."),
 *   stages = {
 *     "alter_items" = 0,
 *   },
 * )
 */
class ExcludeHiddenMedia extends ProcessorPluginBase {

  /**
   * {@inheritdoc}
   */
  public static function supportsIndex(IndexInterface $index) {
    foreach ($index->getDatasources() as $datasource) {
      if ($datasource->getEntityTypeId() === 'media') {
        return TRUE;
      }
    }

    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function alterIndexedItems(array &$items) {
    /** @var \Drupal\search_api\Item\ItemInterface $item */
    foreach ($items as $item_id => $item) {
      $object = $item->getOriginalObject()->getValue();
      $include = TRUE;
      if ($object instanceof MediaInterface && in_array($object->bundle(), [
        'image',
        'remote_video',
      ])
      ) {
        $include = $object->field_boolean->value;
      }

      if (!$include) {
        unset($items[$item_id]);
      }
    }
  }

}
