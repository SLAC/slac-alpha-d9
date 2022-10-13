<?php

namespace Drupal\slac_core\Plugin\views\area;

use Drupal\Core\Form\FormStateInterface;
use Drupal\slac_core\Services\SlacSearch;
use Drupal\views\Plugin\views\area\AreaPluginBase;
use Drupal\Core\Form\FormBuilderInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Component\Utility\Xss;


/**
 * Views area display_link handler.
 *
 * @ingroup views_area_handlers
 * @ViewsArea("area_facet_list")
 *
 */
class AreaFacetList extends AreaPluginBase {

  /**
   * The form builder.
   *
   * @var FormBuilderInterface
   */
  protected $formBuilder;

  /**
   * The SlacSearch service.
   *
   * @var \Drupal\slac_core\SlacSearch
   */
  protected $slacSearchService;

  /**
   * Constructs a new ListingEmpty.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin ID for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin definition.
   * @param FormBuilderInterface $form_builder
   *   The form builder.
   * @param SlacSearch $slac_search_service
   *   Search services.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    FormBuilderInterface $form_builder,
    SlacSearch $slac_search_service
  ) {

    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->formBuilder = $form_builder;
    $this->slacSearchService = $slac_search_service;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('form_builder'),
      $container->get('slac_core.slac_search'),
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function defineOptions() {
    $options = parent::defineOptions();

    $options['reset_link'] = ['default' => TRUE];

    return $options;
  }

  /**
   * Gets the facet terms from the URL
   */
  protected function getFacetTerms() {
    if ($query = \Drupal::request()->query->all()) {
      if (isset($query['f'])) {
        return $query['f'];
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    parent::buildOptionsForm($form, $form_state);

    $form['reset_link'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Display a reset link'),
      '#default_value' => $this->options['reset_link'],
    ];

  }


  /**
   * {@inheritdoc}
   */
  public function render($empty = FALSE) {
    $build = [];

    $this->options['facets'] = $this->getFacetTerms();
    $build['facet_form'] = $this->formBuilder->getForm('Drupal\slac_core\Form\FacetSummaryChecklist', $this->options);

    return $build;
  }

}
