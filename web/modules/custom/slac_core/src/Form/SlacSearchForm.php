<?php

namespace Drupal\slac_core\Form;

use Drupal\Component\Utility\Html;
use Drupal\Core\Access\CsrfTokenGenerator;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Defines a form to be used for search term input with redirection to a search page.
 */
class SlacSearchForm extends FormBase {

  /**
   * The csrf token generator.
   *
   * @var \Drupal\Core\Access\CsrfTokenGenerator
   */
  protected $csrfToken;

  /**
   * Constructs a new Slac Search Form object.
   *
   * @param \Drupal\Core\Access\CsrfTokenGenerator $csrf_token_generator
   *   The CSRF token generator.
   */
  public function __construct(CsrfTokenGenerator $csrf_token_generator) {
    $this->csrfToken = $csrf_token_generator;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('csrf_token')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'slac_search_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $configuration=[]) {
    // Retrieve the configuration settings passed in from the block creator.
    $form_state->set('configuration', $configuration);

    // The action of the form is to redirect to a search page.
    $form['#action'] = $configuration['search_page'];

    // Create a unique identify for this form and form element to avoid collisions when two forms are on a page,
    // such as the primary search form and another search form (such as a separate geo search form).
    $search_view_id = strtolower(Html::cleanCssIdentifier($configuration['search_view']));
    $form['#id'] = 'slac-search-form-' . $search_view_id;

    // Pull form classes from the configuration and add to form container level.
    $form_classes = [];
    if (!empty($configuration['form_class'])) {
      $form_classes += explode(" ", $configuration['form_class']);
    }
    $form_classes = array_merge($form_classes, [ 'slac-search-form', 'c-search__inner' ]);
    $form['#attributes'] = ['class' => $form_classes];

    // Setting the method to get requires handling of URL additions, see below submit and submitForm
    $form['#method'] = 'get';

    $form['keywords'] = [
      '#type' => 'search',
      '#title' => $configuration['title'] ?: '',
      '#title_display' => 'invisible',
      '#default_value' => \Drupal::request()->query->get('keywords') ?? NULL,
      '#size' => false,
      '#maxlength' => 128,
      '#attributes' => [
        'class' => [ 'slac-search-block__text-field', 'c-search__input' ],
        'id' => 'edit-keywords-' . $search_view_id,
        'aria-label' => 'Search',
      ]
    ];

    // Placeholder configuration may come in as a null value, in which case we don't use.
    $placeholder = $configuration['placeholder'];
    if ($placeholder != NULL) {
      $form['keywords']['#placeholder'] = $placeholder;
    }

    $form['actions'] = ['#type' => 'actions'];
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t($configuration['submit_label']) ?: $this->t('Search'),
      '#name' => 'search-submit',
      '#attributes' => [ 'class' => [ 'slac-search-block__submit-button', 'c-search__submit' ]]
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // This form submits to the search page, so processing happens there.
    // But clean the values to remove "&op=" from the URL.
    $form_state->cleanValues();
  }

}
