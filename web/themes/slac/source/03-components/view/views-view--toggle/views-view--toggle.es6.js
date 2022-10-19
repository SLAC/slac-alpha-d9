import Drupal from 'drupal';

Drupal.behaviors.viewToggle = {
  attach(context) {
    const views = context.querySelectorAll('.c-views-view--toggle');
    views.forEach(view => {
      const gridButton = view.querySelector('.js-grid');
      const listButton = view.querySelector('.js-list');
      if (!gridButton || !listButton) {
        return;
      }
      const gridDisplay = document.getElementById(
        gridButton.getAttribute('aria-controls')
      );
      const listDisplay = document.getElementById(
        listButton.getAttribute('aria-controls')
      );
      gridButton.addEventListener('click', () => {
        const isHidden = gridDisplay.hidden;
        if (isHidden) {
          gridDisplay.hidden = false;
          listDisplay.hidden = true;
          gridButton.setAttribute('aria-expanded', 'true');
          listButton.setAttribute('aria-expanded', 'false');
        }
      });
      listButton.addEventListener('click', () => {
        const isHidden = listDisplay.hidden;
        if (isHidden) {
          listDisplay.hidden = false;
          gridDisplay.hidden = true;
          listButton.setAttribute('aria-expanded', 'true');
          gridButton.setAttribute('aria-expanded', 'false');
        }
      });
    });
  },
};
