import Drupal from 'drupal';

Drupal.behaviors.drawer = {
  attach(context) {
    const drawers = context.querySelectorAll('.c-drawer');
    drawers.forEach(drawer => {
      const content = drawer.querySelector('.c-drawer__content');
      const contentExpanded = drawer.querySelector(
        '.c-drawer__content-expanded'
      );
      const contentCollapsed = drawer.querySelector(
        '.c-drawer__content-collapsed'
      );
      const trigger = drawer.querySelector('.c-drawer__trigger');

      const contentTransitionCallback = e => {
        const currentContent = e.currentTarget;
        currentContent.removeEventListener(
          'transitionend',
          contentTransitionCallback
        );
        currentContent.style.height = null;
        currentContent.scrollIntoView();
      };

      let state = drawer.classList.contains('drawer--expanded')
        ? 'expanded'
        : 'collapsed';

      trigger.addEventListener('click', () => {
        if (state === 'collapsed') {
          const collapsedHeight = contentCollapsed.scrollHeight;
          content.style.height = `${collapsedHeight}px`;
          drawer.classList.remove('c-drawer--collapsed');

          drawer.classList.add('c-drawer--expanded');
          const expandedHeight = contentExpanded.scrollHeight;
          content.style.height = `${expandedHeight}px`;

          content.addEventListener('transitionend', contentTransitionCallback);

          state = 'expanded';
        } else if (state === 'expanded') {
          const expandedHeight = contentExpanded.scrollHeight;
          content.style.height = `${expandedHeight}px`;
          drawer.classList.remove('c-drawer--expanded');

          drawer.classList.add('c-drawer--collapsed');
          const collapsedHeight = contentCollapsed.scrollHeight;
          content.style.height = `${collapsedHeight}px`;

          content.addEventListener('transitionend', contentTransitionCallback);

          state = 'collapsed';
        }
      });
    });
  },
};
