<?php

namespace Drupal\slac_core\Services;

use Drupal\Component\Utility\Html;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\node\NodeInterface;
use Drupal\entity_reference_revisions\EntityReferenceRevisionsFieldItemList;
use Drupal\paragraphs\Entity\Paragraph;

/**
 * A service class containing methods for working with Microsite pages.
 */
class MicrositeUtilities {

  /**
   * The current route match.
   *
   * @var \Drupal\Core\Routing\CurrentRouteMatch
   */
  protected $currentRouteMatch;

    /**
     * Constructs a new CurrentRouteMatch object.
     *
     * @param \Drupal\Core\Routing\CurrentRouteMatch $current_route_match
     *   The current route match service.
     */
    public function __construct(CurrentRouteMatch $current_route_match) {
        $this->currentRouteMatch = $current_route_match;
    }

    /**
     * Determine whether the current node is a microsite page.
     *
     * @param {array} target_bundles - An array of node bundles (e.g., ['page']) that can host a microsite.
     * @param {string} target_field - The field to search for the signal paragraph.
     * @param {string} target_paragraph - The paragraph bundle that signals this is a microsite page.
     *
     * @return bool
     *   Whether the current route match is a node with the signifier paragraph type in the specified field.
     */
    public function IsMicrositePage($target_bundles, $target_field, $target_paragraph) {
      $found = FALSE;

      // Retrieve the current route match if the node was not passed in.
      $node = $this->currentRouteMatch->getParameter('node');

      // The node object must support NodeInterface, be the correct bundle, and have the correct field.
      if ($node instanceof NodeInterface && in_array($node->bundle(), $target_bundles) && $node->hasField($target_field)) {
        // Retrieve the paragraphs from the field and search for the target_paragraph bundle.
        /** @var EntityReferenceRevisionsFieldItemList $paragraphs */
        $paragraphs = $node->get($target_field);

        /** @var Paragraph $paragraph */
        foreach ($paragraphs->referencedEntities() as $paragraph) {
          if ($paragraph->bundle() == $target_paragraph) {
            $found = TRUE;
            break;
          }
        }
      }

      return $found;
    }

  /**
   * Find microsite marker paragraphs in the specified field and return a list of
   * labels and anchor links.
   *
   * @param {string} target_field - The field to search for the signal paragraph.
   * @param {string} target_paragraph - The paragraph bundle that signals this is a microsite page.
   * @param {string} title_field - The machine ID of the field that contains the title text.
   *
   * @return array
   *   An array of microsite section markers.
   */
  public function FindMicrositeMarkers($target_field, $target_paragraph, $title_field) {
    // Collector for list items to be created; this will be an ordered list.
    $list_items = [];

    // Retrieve the current route match if the node was not passed in.
    $node = $this->currentRouteMatch->getParameter('node');

    // The node object must support NodeInterface, be the correct bundle, and have the correct field.
    if ($node instanceof NodeInterface && $node->hasField($target_field)) {
      // Extract the set of paragraphs from the content field of the node.
      $paragraphs = $node->get($target_field)->getValue();

      // If we found paragraphs in the specified container field, loop
      // through and accumulate the microsite section markers.
      if (count($paragraphs)) {
        foreach ($paragraphs as $item) {
          $paragraph = Paragraph::load($item['target_id']);

          // Paragraph type must match the target paragraph and use the title_field argument value.
          if ($paragraph->getType() == $target_paragraph) {
            if ($text = $paragraph->{$title_field}->value) {
              $list_items[] = [
                'text' => $text,
                'url' => "internal:#" . Html::cleanCssIdentifier($text),
              ];
            }
          }
        }
      }

      return $list_items;
    }
  }

}
