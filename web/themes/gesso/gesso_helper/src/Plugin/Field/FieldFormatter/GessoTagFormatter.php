<?php

namespace Drupal\gesso_helper\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\Plugin\Field\FieldFormatter\EntityReferenceLabelFormatter;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'gesso_tag' formatter.
 *
 * @FieldFormatter(
 *   id = "gesso_tag",
 *   label = @Translation("Gesso Tag"),
 *   field_types = {
 *     "entity_reference"
 *   }
 * )
 */
class GessoTagFormatter extends EntityReferenceLabelFormatter {
  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = parent::viewElements($items, $langcode);
    $settings = $this->getSettings();
    foreach ($items as $delta => $item) {
      if (!empty($element[$delta])) {
        if (empty($element[$delta]['#plain_text'])) {
          $element[$delta]['#options']['attributes']['class'][] = 'c-tag';
          $element[$delta]['#options']['attributes']['rel'] = 'tag';
        }
        else {
          $element[$delta] = [
            '#type' => 'html_tag',
            '#tag' => 'span',
            '#attributes' => [
              'class' => [
                'c-tag',
              ],
            ],
            '#value' => $element[$delta]['#plain_text'],
          ];
        }
      }
    }
    return $element;
  }
}
