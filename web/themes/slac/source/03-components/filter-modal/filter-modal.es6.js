import Drupal from 'drupal';

Drupal.behaviors.filterModal = {
  attach(context) {
    const modalOuter = context.querySelector('.c-filter-modal');
    const modalInner = context.querySelector('.c-filter-modal__inner');
    const modalClose = context.querySelector('.c-filter-modal__close');
    const modalClear = context.querySelector('.c-filter-modal__clear');
    const modalApply = context.querySelector('.c-filter-modal__apply');

    if (!modalOuter || !modalInner || !modalClose) {
      return;
    }

    const fields = modalInner.querySelectorAll('input[type=checkbox]');

    if (modalClear && fields) {
      modalClear.addEventListener('click', () => {
        fields.forEach(field => {
          field.checked = false;
        });
      });
    }

    modalOuter.addEventListener('click', e => {
      if (!modalInner.contains(e.target)) {
        modalClose.click();
      }
    });

    // Integration: update to apply the filters.
    if (modalApply) {
      modalApply.addEventListener('click', () => {
        const currentUrl = new URL(window.location.href);
        const urlParams = new URLSearchParams(currentUrl.search);
        // Clear out the existing facet and sort by parameters
        const filteredParams = Array.from(urlParams.entries()).filter(
          param => param[0].indexOf('f[') !== 0 && param[0] !== 'sort_by'
        );
        // Add params for currently selected facets.
        const checked = modalInner.querySelectorAll(
          'input[type="checkbox"]:checked'
        );
        const f = [];
        checked.forEach(checkbox => {
          f.push(
            `${checkbox.dataset.drupalFacetAlias}:${checkbox.dataset.drupalFacetItemValue}`
          );
        });
        const sortBy = modalInner.querySelector(
          'input[name="sort_by"]:checked'
        );
        const newParams = new URLSearchParams([
          ...filteredParams,
          ...f.map((v, i) => [`f[${i}]`, v]),
          sortBy ? ['sort_by', sortBy.value] : null,
        ]).toString();
        const redirectUrl = new URL(
          `${currentUrl.origin}${currentUrl.pathname}?${newParams}${currentUrl.hash}`
        );
        modalClose.click();
        window.location.href = redirectUrl.href;
      });
    }
  },
};
