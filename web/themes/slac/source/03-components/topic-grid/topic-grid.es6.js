/* eslint-disable no-unused-vars */
// We need to import Packery for layout, but it's not directly referenced.
import Isotope from 'isotope-layout';
import Packery from 'isotope-packery';
import imagesLoaded from 'imagesloaded';
import Drupal from 'drupal';

Drupal.behaviors.topicGrid = {
  attach(context) {
    const grid = context.querySelector('.c-topic-grid');
    if (grid) {
      const iso = new Isotope(grid, {
        layoutMode: 'packery',
        itemSelector: '.c-topic-grid__item',
        percentPosition: true,
        packery: {
          columnWidth: '.c-topic-grid__sizer',
          gutter: '.c-topic-grid__gutter',
        },
      });

      const filterSelect = context.querySelector('.c-topic-grid__select');
      if (filterSelect) {
        filterSelect.addEventListener('change', function filterGrid() {
          iso.arrange({ filter: this.value });
        });
      }

      imagesLoaded(grid).on('progress', () => {
        iso.layout();
      });
    }
  },
};
