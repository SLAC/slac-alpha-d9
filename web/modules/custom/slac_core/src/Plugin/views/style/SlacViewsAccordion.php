<?php

namespace Drupal\slac_core\Plugin\views\style;

use Drupal\Core\Form\FormStateInterface;
use Drupal\views\Annotation\ViewsStyle;
use Drupal\views\Plugin\views\style\StylePluginBase;

/**
 * Style plugin to render each item in an accordion.
 * Based on Views Accordion.
 * @see https://www.drupal.org/project/views_accordion
 *
 * @ingroup views_style_plugins
 *
 * @ViewsStyle(
 *   id = "slac_views_accordion",
 *   title = @Translation("SLAC Accordion"),
 *   help = @Translation("Display the results in an accordion."),
 *   theme = "views_slac_accordion_view",
 *   display_types = {"normal"}
 * )
 */
class SlacViewsAccordion extends StylePluginBase {
  /**
   * {@inheritdoc}
   */
  protected $usesRowPlugin = TRUE;

  /**
   * {@inheritdoc}
   */
  protected $usesRowClass = TRUE;

  /**
   * Set default options.
   */
  protected function defineOptions() {
    $options = parent::defineOptions();
    $options['collapsible'] = ['default' => 0];
    $options['row-start-open'] = ['default' => 0];
    return $options;
  }

  /**
   * {@inheritdoc}
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state)
  {
    parent::buildOptionsForm($form, $form_state);

    // Find out how many items the display is currently configured to show
    // (row-start-open).
    $maxItems = $this->displayHandler->getOption('items_per_page');
    // If items_per_page is set to unlimited (0), 10 rows will be what the user
    // gets to choose from.
    $maxItems = ($maxItems == 0) ? 10 : $maxItems;

    // Setup our array of options for choosing which row should start opened
    // (row-start-open).
    $rsopen_options = [];
    for ($i = 1; $i <= $maxItems; $i++) {
      $rsopen_options[] = $this->t('Row @number', ['@number' => $i]);
    }
    $rsopen_options['none'] = $this->t('None');

    $form['row-start-open'] = [
      '#type' => 'select',
      '#title' => $this->t('Row to display opened on start'),
      '#default_value' => $this->options['row-start-open'],
      '#description' => $this->t('Choose which row should start opened when the accordion first loads. If you want all to start closed, choose "None", and make sure to have "Allow for all rows to be closed" on below.'),
      '#options' => $rsopen_options,
    ];

    $form['collapsible'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Collapsible'),
      '#default_value' => $this->options['collapsible'],
      '#description' => $this->t('Whether all the sections can be closed at once. Allows collapsing the active section.'),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function render() {
    $rows = parent::render();
    return [
      '#theme' => $this->themeFunctions(),
      '#view' => $this->view,
      '#options' => $this->options,
      '#rows' => $rows,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function validate() {
    $errors = parent::validate();
    if (!$this->usesFields()) {
      $errors[] = $this->t('Views accordion requires Fields as row style');
    }

    if ($this->options['collapsible'] !== 1 && $this->options['row-start-open'] === 'none') {
      $errors[] = $this->t('Setting "Row to display opened on start" to "None" requires "Collapsible" to be enabled.');
    }
    return $errors;
  }
}
