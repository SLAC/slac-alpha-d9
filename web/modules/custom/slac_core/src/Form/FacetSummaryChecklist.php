<?php

namespace Drupal\slac_core\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\slac_core\Services\SlacSearch;
use Symfony\Component\DependencyInjection\ContainerInterface;


/**
 * Defines a form to be used for search term input with redirection to a search page.
 */
class FacetSummaryChecklist extends FormBase {

  /**
   * The Slac Search service.
   *
   * @var \Drupal\slac_core\SlacSearch
   */
  protected $slacSearchService;

  /**
   * Constructs a new slac search service.
   *
   * @param SlacSearch $slac_search_service
   *   Search services.
   */
  public function __construct(SlacSearch $slac_search_service) {
    $this->slacSearchService = $slac_search_service;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('slac_core.slac_search'),
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'facet_summary_checklist';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, array $configuration = NULL) {
    // Retrieve the configuration settings passed in from the block creator.
    $form_state->set('configuration', $configuration);

    $form['facet_list'] = [
      '#type' => 'container',
      '#attributes' => [ 'class' => [ 'c-facet-list' ] ],
    ];

    // Process the facet_label (in form "facet:id") to find content ids/labels and convert them to their underlying
    // content labels.
    if (!empty($configuration['facets'])) {
      foreach ($configuration['facets'] as $ix => $facet_str) {
        $facet_components = explode(':', $facet_str);

        switch ($facet_components[0]) {
          // Entity type.
          case 'type':
            $facet_label = $this->slacSearchService->convertEntityTypeFacetLabel($facet_components[1]);
            break;
          // Research area (or other taxonomy, facet is vocabulary neutral).
          case 'topic':
          case 'research_area':
            // If a number, then we know this is a taxonomy ID.
            if (is_numeric($facet_components[1])) {
              $facet_label = $this->slacSearchService->convertTermFacetLabel($facet_components[1]);
            } else {
              $facet_label = $facet_components[1];
            }
            break;
          // Unknown, just output the raw string.
          default:
            $facet_label = $facet_components[1];
        }

        if ($facet_label) {
          // Create an inline checkbox unless we looked up a facet label through either type or taxonomy
          // and no associated type or term was found.
          $form['facet_list'][$facet_components[1]] = [
            '#type' => 'checkbox',
            '#title' => $facet_label,
            '#name' => 'current_facets',
            '#default_value' => TRUE,
            '#attributes' => [
              'class' => ['c-facet__input'],
              'facet-query-key' => 'f',
              'facet-key' => $facet_components[0],
              'facet-value' => $facet_components[1],
            ],
          ];
        } else {
          // Strip out the invalid facet from the list. This will prevent presentation of the reset link when
          // there are only invalid facets remaining.
          unset($configuration['facets'][$ix]);
        }
      }
    }

    // Add a reset link if more than 1 facet was included in the list.
    if (!empty($configuration['facets']) && count($configuration['facets']) >= 1 && $configuration['reset_link']) {
      $form['facet_list']['reset'] = [
        '#type'  => 'markup',
        '#markup' => '<a href="JavaScript:void(0)" class="c-facet-list__clear-all" id="facet-list-reset-link">' . $this->t('Clear all') . '</a>',
      ];
    }

    // Attach the JS to make this work.
    $form['#attached']['library'][] = 'slac_core/slac_search';
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

  }

}
