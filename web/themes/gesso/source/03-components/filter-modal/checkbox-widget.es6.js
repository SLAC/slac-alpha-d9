import Drupal from 'drupal';
import once from 'once';

/**
 * @file
 * Transforms links into checkboxes.
 */

Drupal.facets = Drupal.facets || {};
Drupal.behaviors.facetsCheckboxWidget = {
  attach(context) {
    Drupal.facets.makeCheckboxes(context);
  },
};

/**
 * Turns all facet links into checkboxes.
 */
Drupal.facets.makeCheckboxes = context => {
  // Find all checkbox facet links and give them a checkbox.
  const checkboxWidgets = once(
    'facets-checkbox-transform',
    '.js-facets-checkbox-links',
    context
  );

  if (checkboxWidgets.length > 0) {
    checkboxWidgets.forEach(widget => {
      const widgetLinks = widget.querySelectorAll('.facet-item > a');

      // Add correct CSS selector for the widget. The Facets JS API will
      // register handlers on that element.
      widget.classList.add('js-facets-widget', 'c-filter-modal__list');

      // Transform links to checkboxes.
      widgetLinks.forEach(link =>
        Drupal.facets.makeCheckbox(link, widget.dataset.drupalFacetAlias)
      );

      // We have to trigger attaching of behaviours, so that Facets JS API can
      // register handlers on checkbox widgets.
      Drupal.attachBehaviors(widget.parentNode, Drupal.settings);
    });
  }

  // Set indeterminate value on parents having an active trail.
  const parents = context.querySelectorAll(
    '.facet-item--expanded.facet-item--active-trail > input'
  );
  parents.forEach(parent => {
    parent.indeterminate = true;
  });
};

/**
 * Replace a link with a checked checkbox.
 */
Drupal.facets.makeCheckbox = (link, facetAlias) => {
  const active = link.classList.contains('is-active');
  const description = link.innerHTML;
  const href = link.getAttribute('href');
  const id = link.dataset.drupalFacetItemId;

  const checkbox = document.createElement('input');
  checkbox.classList.add('c-form-item__checkbox');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.id = id;
  Object.entries(link.dataset).forEach(arr => {
    const [key, value] = arr;
    checkbox.dataset[key] = value;
  });
  checkbox.dataset.facetsredir = href;
  checkbox.dataset.drupalFacetAlias = facetAlias;

  const label = document.createElement('label');
  label.classList.add('c-form-item__label');
  label.setAttribute('for', id);
  label.innerHTML = description;

  const wrapper = document.createElement('div');
  wrapper.classList.add(
    'c-form-item',
    'c-form-item--checkbox',
    'has-visible-label-after'
  );
  wrapper.appendChild(checkbox);
  wrapper.appendChild(label);

  if (active) {
    checkbox.checked = true;
    const deactivateElem = label.querySelector('.js-facet-deactivate');
    if (deactivateElem) {
      deactivateElem.parentNode.removeChild(deactivateElem);
    }
  }

  link.insertAdjacentElement('beforebegin', wrapper);
  link.classList.add('u-hidden');
};

/**
 * Disable all facet checkboxes in the facet and apply a 'disabled' class.
 *
 * @param {HTMLElement} facet
 *   The facet.
 */
Drupal.facets.disableFacet = facet => {
  facet.classList.add('facets-disabled');
  const checkboxes = facet.querySelectorAll('input.facets-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', Drupal.facets.preventDefault);
    checkbox.disabled = true;
  });
};

/**
 * Event listener for easy prevention of event propagation.
 *
 * @param {object} e
 *   Event.
 */
Drupal.facets.preventDefault = e => {
  e.preventDefault();
};
