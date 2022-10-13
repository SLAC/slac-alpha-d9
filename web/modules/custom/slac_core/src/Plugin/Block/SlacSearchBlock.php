<?php

namespace Drupal\slac_core\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Form\FormBuilderInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a configurable search block.
 *
 * Block parameters include:
 *  search_view = the id of the view linked to the search form. Required, default is "search"
 *  search_page = the URI of the page to redirect to when the form is submitted. Default is "/search"
 *  placeholder = the placeholder text, default is "Enter search terms"
 *
 *
 * @Block(
 *   id = "slac_search_block",
 *   admin_label = @Translation("SLAC Search Block"),
 *   category = @Translation("SLAC"),
 * )
 */
class SlacSearchBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * The form builder.
   *
   * @var FormBuilderInterface
   */
  protected FormBuilderInterface $formBuilder;

  /**
   * Constructor.
   *
   * @param $configuration
   * @param $plugin_id
   * @param $plugin_definition
   * @param FormBuilderInterface $form_builder
   *   The form builder.
   */
  public function __construct($configuration, $plugin_id, $plugin_definition, FormBuilderInterface $form_builder) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->formBuilder = $form_builder;
    $this->setConfiguration($configuration);
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('form_builder')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      // Options that are exposed to the administrator in the configuration form.
      'search_view' => 'search',
      'search_page' => '/search',
      'placeholder' => 'Enter search terms',
      'title' => 'Search',
      'submit_label' => 'Search',
      'block_class' => '',
      'form_class' => '',
      // Currently not exposed to config form.
      'filter_id' => 'keywords',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    // Default configuration.
    $defaults = $this->defaultConfiguration();

    $form['search_view'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Search view (id)'),
      '#maxlength' => 255,
      '#default_value' => $this->configuration['search_view'] ?: $defaults['search_view'],
      '#description' => $this->t('The ID of the search view, such as "search_site".'),
    ];

    $form['search_page'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Search page (relative path)'),
      '#maxlength' => 255,
      '#default_value' => $this->configuration['search_page'] ?: $defaults['search_page'],
      '#description' => $this->t('The path of the search page to redirect to, such as "/search-site".'),
    ];

    $form['placeholder'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Placeholder text'),
      '#maxlength' => 255,
      '#default_value' => isset($this->configuration['placeholder']) ? $this->configuration['placeholder'] : $defaults['placeholder'],
      '#description' => $this->t('The placeholder text.'),
    ];

    $form['title'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Search form label'),
      '#maxlength' => 255,
      '#default_value' => isset($this->configuration['title']) ? $this->configuration['title'] : $defaults['title'],
      '#description' => $this->t('The displayed label of the search form (optional).'),
    ];

    $form['block_class'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Block class modifiers'),
      '#maxlength' => 255,
      '#default_value' => isset($this->configuration['block_class']) ? $this->configuration['block_class'] : $defaults['block_class'],
      '#description' => $this->t('A list of class modifiers to add to the block display, space separated.'),
    ];

    $form['form_class'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Form class modifiers'),
      '#maxlength' => 255,
      '#default_value' => isset($this->configuration['form_class']) ? $this->configuration['form_class'] : $defaults['form_class'],
      '#description' => $this->t('A list of class modifiers to add to the form display, space separated.'),
    ];

    $form['submit_label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Submit button label'),
      '#maxlength' => 255,
      '#default_value' => isset($this->configuration['submit_label']) ? $this->configuration['submit_label'] : $defaults['submit_label'],
      '#description' => $this->t('The label of the submit button.'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    $this->configuration['placeholder'] = $form_state->getValue('placeholder');
    $this->configuration['search_page'] = $form_state->getValue('search_page');
    $this->configuration['search_view'] = $form_state->getValue('search_view');
    $this->configuration['title'] = $form_state->getValue('title');
    $this->configuration['submit_label'] = $form_state->getValue('submit_label');
    $this->configuration['block_class'] = $form_state->getValue('block_class');
    $this->configuration['form_class'] = $form_state->getValue('form_class');
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];

    // Pull block classes from the configuration and add to block container level.
    // We'll do the same thing with form classes.
    $block_classes = [];
    if (!empty($this->configuration['block_class'])) {
      $block_classes += explode(" ", $this->configuration['block_class']);
    }
    $block_classes = array_merge($block_classes, [ 'slac-search-block', 'c-search__form' ]);

    $build['container'] = [
      '#type' => 'container',
      '#attributes' => [
        'class' => $block_classes,
    ]];

    // Build the form and assign into the render container.
    $build['container']['search_form'] = $this->formBuilder->getForm('Drupal\slac_core\Form\SlacSearchForm', $this->configuration);

    // Add the outer block classes.
    $build['#attributes']['class'][] = 'c-search';
    $build['#attributes']['class'][] = 'c-search--in-page';
    return $build;
  }

  public function getCacheMaxAge() {
    return 0;
  }
}
