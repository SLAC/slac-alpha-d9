<?php

namespace Drupal\slac_core\Plugin\views\area;

use Drupal\Core\Form\FormStateInterface;
use Drupal\views\Plugin\views\area\Result;

/**
 * Views area area_filter_modal handler.
 *
 * @ingroup views_area_handlers
 * @ViewsArea("area_filter_modal")
 *
 */
class AreaFilterModal extends Result {
  /*
  * {@inheritdoc}
  */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    parent::buildOptionsForm($form, $form_state);
    $item_list = [
      '#theme' => 'item_list',
      '#items' => [
        '@start -- the initial record number in the set',
        '@end -- the last record number in the set',
        '@total -- the total records in the set',
        '@label -- the human-readable name of the view',
        '@per_page -- the number of items per page',
        '@current_page -- the current page number',
        '@current_record_count -- the current page record count',
        '@page_count -- the total page count',
        '@results -- the singular or plural of "Result" as appropriate'
      ],
    ];
    $list = \Drupal::service('renderer')->render($item_list);
    $form['content']['#description'] = $this->t('You may use HTML code in this field. The following tokens are supported:') . $list;
  }

  /**
   * {@inheritdoc}
   */
  public function render($empty = FALSE) {
    $render = parent::render($empty);
    if (empty($render['#markup'])) {
      return $render;
    }
    $num_results = $this->view->total_rows ?? count($this->view->result);
    return [
      '#theme' => 'filter_modal',
      '#results_text' => str_replace(
        '@results',
        $num_results == 1 ? $this->t('Result') : $this->t('Results'),
        $render
      ),
      '#modal_content' => NULL,
      '#num_results' => $num_results,
    ];
  }
}
