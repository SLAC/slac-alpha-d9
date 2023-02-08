<?php

namespace Drupal\slac_core\Plugin\Block;

use Drupal\Component\Utility\Html;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Url;
use Drupal\site_settings\SiteSettingsLoader;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a 'ShareThisPageBlock' block.
 *
 * @Block(
 *  id = "share_this_page_block",
 *  admin_label = @Translation("Share this page block"),
 *  category = @Translation("SLAC")
 * )
 */
class ShareThisPageBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * The site settings loader.
   *
   * @var Drupal\site_settings\SiteSettingsLoader
   */
  protected $siteSettingsLoader;

  /**
   * Constructs a share this page block.
   *
   * @param array $configuration
   *   The ocnfiguration.
   * @param string $plugin_id
   *   The plugin id.
   * @param mixed $plugin_definition
   *   The plugin definition.
   * @param \Drupal\site_settings\SiteSettingsLoader $site_settings_loader
   *   The site settings loader.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, SiteSettingsLoader $site_settings_loader) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->siteSettingsLoader = $site_settings_loader;
  }

  /**
   * {@inheritDoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('site_settings.loader')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'block_title' => $this->t('Share this page'),
      'use_wrapper' => TRUE,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {

    $form['block_title'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Sharing title'),
      '#description' => $this->t("For example, 'Share this Page'"),
      '#default_value' => $this->configuration['block_title'],
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    $this->configuration['block_title'] = $form_state->getValue('block_title');
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
//    $share_this_page_settings = $this->siteSettingsLoader->loadByFieldset('social_sharing_links');
//    $share_this_page_settings = is_array($share_this_page_settings['share_this_page']) ? $share_this_page_settings['share_this_page'] : NULL;
//
//    $links = [];
//
//    if ($share_this_page_settings) {
//      foreach ($share_this_page_settings as $setting) {
//        if (is_array($setting) && isset($setting['field_link']) && isset($setting['field_text_list'])) {
//          $page_url = Url::fromRoute('<current>', [], [
//            'absolute' => 'true',
//          ])->toString();
//
//          $share_url = Url::fromUri(
//            $setting['field_link']['uri'] .
//            $page_url
//          )->toString();
//
//          $share_method_name = $setting['field_link']['title'];
//
//          $links['#' . strtolower($share_method_name)] = [
//            'url' => $share_url,
//            'title' => $share_method_name,
//            'icon_name' => $setting['field_text_list'],
//          ];
//        }
//      }
//    }

    // Hard-code the share URLs so that, if necessary, they can updated with
    // a single module update.
    $page_url = Url::fromRoute('<current>', [], [
      'absolute' => 'true',
    ])->toString();
    $links['#facebook'] = [
      'url' => Url::fromUri('https://www.facebook.com/sharer/sharer.php')->setOption('query', [
        'u' => $page_url,
        ])->toString(),
      'title' => 'Facebook',
      'icon_name' => 'facebook',
    ];
    $links['#twitter'] = [
      'url' => Url::fromUri('https://www.twitter.com/share')->setOption('query', [
        'url' => $page_url,
      ])->toString(),
      'title' => 'Twitter',
      'icon_name' => 'twitter',
    ];
    $links['#linkedin'] = [
      'url' => Url::fromUri('https://www.linkedin.com/sharing/share-offsite/')->setOption('query', [
        'url' => $page_url,
      ])->toString(),
      'title' => 'LinkedIn',
      'icon_name' => 'linkedin',
    ];

    // Always include the email link. We assume the 'mailto:' protocol won't
    // be changing or need any configuration.
    // Get the page title
    $request = \Drupal::request();
    if ($route = $request->attributes->get(\Symfony\Cmf\Component\Routing\RouteObjectInterface::ROUTE_OBJECT)) {
      $title = \Drupal::service('title_resolver')->getTitle($request, $route);

      if (is_array($title) && !empty($title['#markup'])) {
        $title = $title['#markup'];
      }

      $links['#email'] = [
        'url' => 'mailto:' . '?subject=' . $title . '&body=' . Url::fromRoute('<current>', [], ['absolute' => 'true'])->toString(),
        'title' => $this->t('Email'),
        'icon_name' => 'email',
      ];

      $build = [
        'links' => $links,
      ];

      if (isset($this->configuration['hero_type'])) {
        $build['hero_type'] = Html::cleanCssIdentifier($this->configuration['hero_type']);
      }

      return $build;
    }
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheContexts() {
    return Cache::mergeContexts(parent::getCacheContexts(), ['url.path']);
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheMaxAge() {
    // The social links are specific to the path of the entity
    // hence the block has a globally cacheable render array.
    return Cache::PERMANENT;
  }

}
