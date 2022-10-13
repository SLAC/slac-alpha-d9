<?php

namespace Drupal\slac_core\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Url;
use Drupal\media\Plugin\Field\FieldFormatter\OEmbedFormatter;

/**
 * Return just the URL of the oEmbed iframe.
 *
 * @FieldFormatter(
 *   id = "iframe_url",
 *   label = @Translation("oEmbed URL"),
 *   field_types = {
 *     "link",
 *     "string",
 *     "string_long",
 *   },
 * )
 */
class IframeUrlFormatter extends OEmbedFormatter {
  /**
   * {@inheritDoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode)
  {
    $parentElem = parent::viewElements($items, $langcode);
    $max_width = $this->getSetting('max_width');
    $max_height = $this->getSetting('max_height');
    $element = [];
    foreach ($parentElem as $delta => $item) {
      if (!empty($item['#tag']) && $item['#tag'] == 'iframe') {
        $url = $item['#attributes']['src'];
        // For Vimeo, regenerate the URL so we can add extra attributes.
        // This assumes for now that the only place this field formatter is used
        // is on the Video Hero and that the videos for the homepage will
        // continue to be on Vimeo.
        if (str_contains($url, 'vimeo') && !empty($items[$delta])) {
          $main_property = $items[$delta]->getFieldDefinition()->getFieldStorageDefinition()->getMainPropertyName();
          $value = $items[$delta]->{$main_property};
          if (!empty($value)) {
            $vimeoUrl = Url::fromUri($value, [
              'query' => [
                'quality' => 'auto',
                'autoplay' => 1,
                'muted' => 1,
                'loop' => 1,
              ],
            ])->toString();
            $url = Url::fromRoute('media.oembed_iframe', [], [
              'query' => [
                'url' => $vimeoUrl,
                'max_width' => $max_width,
                'max_height' => $max_height,
                'hash' => $this->iFrameUrlHelper->getHash($vimeoUrl, $max_width, $max_height),
              ],
            ])->toString();
          }
        }
      } else if (!empty($item['#url'])) {
        $url = $item['#url'];
      } else {
        $url = $item['#uri'];
      }
      if ($url) {
        $element[$delta] = [
          '#plain_text' => $url
        ];
      }
    }
    return $element;
  }
}
