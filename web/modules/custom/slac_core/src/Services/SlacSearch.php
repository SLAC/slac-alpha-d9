<?php

namespace Drupal\slac_core\Services;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * A service class containing methods for handling functionality related to
 * full text search.
 */
class SlacSearch {
  use StringTranslationTrait;

  /**
   * The taxonomy term storage.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  protected $termStorage;

  /**
   * Constructs a new Events object.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager service.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager) {
    $this->termStorage = $entity_type_manager->getStorage('taxonomy_term');
  }

  /**
   * The type mapping.
   *
   * @param $label
   *
   * @return string|null
   */
  public function convertEntityTypeFacetLabel($label) {
    $display_strings = [
      'page' => $this->t('Page'),
      'event' => $this->t('Event'),
      'remote_video' => $this->t('Video'),
      'image' => $this->t('Image'),
      'podcast' => $this->t('Podcast'),
      'news_article' => $this->t('News'),
      'resource' => $this->t('Resource'),
      'landing_page' => $this->t('Landing page'),
    ];

    return isset($display_strings[$label]) ? $display_strings[$label] : $label;
  }

  /**
   * Convert Term facet label.
   *
   * @param string $tid
   *   The facet string, assumes the string is in the form "key:value"
   *
   * @return string
   *
   */
  public function convertTermFacetLabel($tid)
  {
    // Search for the term, load it, and return its label.
    if ($term = $this->termStorage->load($tid)) {
      return $term->label();
    }
    else {
      return '';
    }
  }

}
