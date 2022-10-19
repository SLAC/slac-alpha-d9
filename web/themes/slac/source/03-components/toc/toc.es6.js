import Drupal from 'drupal';
import { BREAKPOINTS } from '../../00-config/_GESSO.es6';

Drupal.behaviors.toc = {
  attach(context, settings) {
    const tocs = context.querySelectorAll('.c-toc');
    const imagePath = settings.gesso.gessoImagePath;
    tocs.forEach(toc => {
      const mediaQuery = window.matchMedia(
        `(max-width: ${parseInt(BREAKPOINTS.desktop, 10) - 1}px)`
      );
      const handleMediaQueryChange = event => {
        const tocLinks = toc.querySelector('.c-toc__links');
        const tocButton = toc.querySelector('.c-toc__title');
        const handleClick = clickEvent => {
          clickEvent.preventDefault();
          tocLinks.hidden = !tocLinks.hidden;
          tocButton.setAttribute(
            'aria-expanded',
            tocLinks.hidden ? 'false' : 'true'
          );
        };
        if (event.matches) {
          tocButton.setAttribute('role', 'button');
          tocButton.insertAdjacentHTML(
            'beforeend',
            `<svg class="c-icon c-toc__icon" aria-hidden="true"><use xlink:href="${imagePath}/sprite.artifact.svg#angle-down"></use></svg>`
          );
          tocLinks.hidden = true;
          tocLinks.setAttribute('aria-expanded', 'false');
          tocButton.addEventListener('click', handleClick);
        } else {
          const icon = tocButton.querySelector('.c-toc__icon');
          if (icon) {
            tocButton.removeChild(icon);
          }
          tocButton.removeAttribute('role');
          tocButton.removeAttribute('aria-expanded');
          tocLinks.hidden = false;
          tocButton.removeEventListener('click', handleClick);
        }
      };
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      handleMediaQueryChange(mediaQuery);
    });
  },
};
