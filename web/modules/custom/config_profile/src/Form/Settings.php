<?php

namespace Drupal\config_profile\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Provides a setting UI for Config Profile.
 * Inspired by the config_ignore module.
 *
 * @package Drupal\config_profile\Form
 */
class Settings extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'config_profile.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'config_profile_settings';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, Request $request = NULL) {

    $config_profile_settings = $this->config('config_profile.settings');

    $form['profile'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Installation profile'),
      '#description' => $this->t('The installation profile in which you want to export your active configuration.'),
      '#default_value' => $config_profile_settings->get('profile'),
      '#size' => 60,
    ];

    $form['blacklist'] = [
      '#type' => 'textarea',
      '#rows' => 25,
      '#title' => $this->t('Blacklist of config names that should not be exported to the profile.'),
      '#description' => $this->t('Include one configuration name per line. You can use wildcards (ex. webform.webform.*, block.block.*, etc.).'),
      '#default_value' => implode(PHP_EOL, $config_profile_settings->get('blacklist')),
      '#size' => 60,
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();
    $config_profile_settings = $this->config('config_profile.settings');
    $blacklist = preg_split("[\n|\r]", $values['blacklist']);
    $blacklist = array_filter($blacklist);

    $config_profile_settings->set('blacklist', array_values($blacklist));
    $config_profile_settings->set('profile', $values['profile']);
    $config_profile_settings->save();
    parent::submitForm($form, $form_state);

    // Clear the config_filter plugin cache.
    \Drupal::service('plugin.manager.config_filter')->clearCachedDefinitions();
  }

}
