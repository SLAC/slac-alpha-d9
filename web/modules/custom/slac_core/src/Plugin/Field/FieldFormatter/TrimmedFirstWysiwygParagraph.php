<?php

namespace Drupal\slac_core\Plugin\Field\FieldFormatter;

use Drupal\paragraphs\Entity\Paragraph;
use Drupal\smart_trim\Plugin\Field\FieldFormatter\SmartTrimFormatter;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\smart_trim\Truncate\TruncateHTML;
use Drupal\Core\Form\FormStateInterface;
use Drupal\paragraphs\ParagraphInterface;

/**
 * Plugin implementation of the 'trimmed_first_paragraph_wysiwyg' formatter. Finds the
 * first instance of the WYSIWYG "wysiwyg" paragraph in the field and returns a trimmed,
 * plain text version of the paragraph content. Can also be used with formatted text
 * fields and strings. Extends the contributed module drupal/smart_trim but reduces/changes
 * the options available and performs different string manipulations to arrive at a
 * "best guess" for the intended teaser content. For paragraph reference fields,
 * makes the key assumption that the content field in the WYSIWYG paragraph has a
 * machine name of "field_body."
 *
 * @FieldFormatter(
 *   id = "trimmed_first_wysiwyg_paragraph",
 *   label = @Translation("Trimmed first WYSIWYG paragraph"),
 *   field_types = {
 *     "entity_reference_revisions",
 *     "text",
 *     "string",
 *     "text_long",
 *     "string_long"
 *   },
 *   settings = {
 *     "trim_length" = "40",
 *     "trim_type" = "words",
 *     "trim_suffix" = "...",
 *     "trim_options" = ""
 *   }
 * )
 */
class TrimmedFirstWysiwygParagraph extends SmartTrimFormatter {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $element = parent::settingsForm($form, $form_state);

    // Adjust the settings provided by SmartTrimFormatter, only keeping the ones that
    // apply to this situation.
    $retained = ['trim_length', 'trim_type', 'trim_suffix', 'trim_options'];
    $element = array_intersect_key($element, array_flip($retained));

    // Change the trim options that are available, replacing the default options provided
    // by SmartTrimFormatter with the specific options for this formatter, see viewElements
    // for descriptions.
    $trim_options_value = $this->getSetting('trim_options');
    $element['trim_options'] = [
      '#title' => $this->t('Additional options'),
      '#type' => 'checkboxes',
      '#options' => [
        'heading_remove' => $this->t('Remove heading tags (h1-h6)'),
        'retain_formatting' => $this->t('Retain text formatting (bold, italics, super/subscript, strikethrough)')
      ],
      '#default_value' => empty($trim_options_value) ? [] : array_keys(array_filter($trim_options_value)),
    ];

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode = NULL) {
    $element = [];
    $text = '';

    // Will assume plain_text is being returned as the format. If we later
    // do not strip out tags, will set to the item's format.
    $format = '';

    // Iterate through the entity reference revision list items, which are
    // assumed to be paragraphs or strings. Only one text string will be
    // harvested from multivalued fields or multiple paragraphs.
    foreach ($items as $delta => $item) {
      $item_array = $item->toArray();

      // For direct (non referenced) textual fields, the value is directly available
      // in the item array, use the first item encountered.
      // For paragraph references, load the paragraph and search each referenced
      // paragraph
      if (isset($item_array['value']) && is_string($item_array['value'])) {
        $text = $item_array['value'];
        $format = $item_array['format'];
      } elseif ($item->entity instanceof ParagraphInterface) {
        /** @var Paragraph $paragraph_object */
        $paragraph_object = \Drupal::service('entity_type.manager')
          ->getStorage('paragraph')
          ->load($item_array['target_id']);

        // If the paragraph is a WYSIWYG paragraph and the field_body field has a value,
        // assign as our working text -- we have found what we're looking for.
        if ($paragraph_object->getType() == 'wysiwyg' && $paragraph_object->field_body->value) {
          $text = $paragraph_object->field_body->value;
          $format = $paragraph_object->field_body->format;
        }
      }
      // No text was found, return.
      if (empty($text)) {
        continue;
      }

      // Retrieve the setting trim options.
      $setting_trim_options = $this->getSetting('trim_options');

      // Either remove heading tags or add a space after each.
      if ($setting_trim_options['heading_remove']) {
        $text = preg_replace('/<h[1-6]>.*<\/h[1-6]>/', ' ', $text);
      } else {
        $text = preg_replace('/<h[1-6]>.*<\/h[1-6]>/', '$0 ', $text);
      }

      // Add a space in front of individual list items (li, dd, and dt).
      // Ensure spacing after paragraph tag boundaries.
      $patterns = [
        '/(?<!\s)<(li|dd|dt)/',
        '/(<\/p>)(?<!\s)/',
        '/(<br>|<br \/>)/',
      ];
      $replacements = [
        ' <\1',
        '\0 ',
        '\0 ',
      ];
      $text = preg_replace($patterns, $replacements, $text);

      // Strip and decode remaining text, retaining font format tags if requested.
      $retained_tags = $setting_trim_options['retain_formatting'] ? ['strong', 's', 'em', 'sub', 'sup'] : [];
      $text = html_entity_decode(strip_tags($text, $retained_tags));
      $format = $setting_trim_options['retain_formatting'] ? $format : 'plain_text';

      // Replace newlines with spaces.
      $text = trim(str_replace('\n', ' ', (str_replace('\r', ' ', $text))));

      // Convert non-breaking spaces.
      // Replace multiple spaces with a single space.
      $patterns = [
        '/\xc2\xa0/',
        '!\s+!',
      ];
      $replacements = [
        '$0 ',
        ' ',
      ];
      $text = preg_replace($patterns, $replacements, $text);

      // Use SmartTrimFormatter truncation facility to trim to a specific length of words or characters and
      // to place an ellipsis at the end of the string if indicated by settings.
      $truncate = new TruncateHTML();
      $length = $this->getSetting('trim_length');
      $ellipse = $this->getSetting('trim_suffix');

      $text = ($this->getSetting('trim_type') == 'words')
        ? $truncate->truncateWords($text, $length, $ellipse)
        : $truncate->truncateChars($text, $length, $ellipse);

      if ($text) {
        // Assign to render array.
        $element[$delta] = [
          '#type' => 'processed_text',
          '#format' => $format,
          '#text' => $text,
        ];

        // If we found and processed text, break.
        break;
      }
    }

    return $element;
  }

}
