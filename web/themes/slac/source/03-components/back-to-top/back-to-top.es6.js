import Drupal from 'drupal';

Drupal.behaviors.backToTop = {
  attach(context, settings) {
    const threshold = settings?.gesso?.backToTopThreshold ?? 750;
    const smoothScroll = settings?.gesso?.backToTopSmoothScroll ?? true;
    const footer = context.querySelector('.l-footer');
    const subfooter = context.querySelector('.l-subfooter');
    const backToTop = context.querySelector('.c-back-to-top');
    if (backToTop) {
      if (!Number.isNaN(threshold) && threshold > 0) {
        backToTop.setAttribute('aria-hidden', 'true');
        backToTop.setAttribute('tabIndex', '-1');
        const scrollHandler = () => {
          if (
            window.scrollY >= threshold &&
            backToTop.getAttribute('aria-hidden') === 'true'
          ) {
            backToTop.setAttribute('aria-hidden', 'false');
            backToTop.removeAttribute('tabIndex');
          } else if (
            window.scrollY < threshold &&
            backToTop.getAttribute('aria-hidden', 'false')
          ) {
            backToTop.setAttribute('aria-hidden', 'true');
            backToTop.setAttribute('tabIndex', '-1');
          }
          if (footer) {
            const { top, bottom } = footer.getBoundingClientRect();
            if (top < window.innerHeight && bottom >= 0) {
              backToTop.classList.add('c-back-to-top--on-dark');
            } else if (backToTop.classList.contains('c-back-to-top--on-dark')) {
              backToTop.classList.remove('c-back-to-top--on-dark');
            }
          }
          if (subfooter) {
            const { top } = subfooter.getBoundingClientRect();
            if (top - 100 < window.innerHeight) {
              backToTop.classList.add('is-stopped');
            } else if (backToTop.classList.contains('is-stopped')) {
              backToTop.classList.remove('is-stopped');
            }
          }
        };
        let stillScrolling = false;
        window.addEventListener('scroll', () => {
          if (stillScrolling !== false) {
            clearTimeout(stillScrolling);
          }
          stillScrolling = setTimeout(scrollHandler, 20);
        });
      } else {
        backToTop.setAttribute('aria-hidden', 'false');
        backToTop.removeAttribute('tabIndex');
      }
      if (smoothScroll) {
        backToTop.addEventListener('click', event => {
          const targetId = backToTop.getAttribute('href');
          const target = document.querySelector(targetId);
          if (target) {
            event.preventDefault();
            const coords = target.getBoundingClientRect();
            target.setAttribute('tabIndex', '-1');
            window.scrollTo({
              top: coords.top,
              behavior: 'smooth',
            });
            target.focus();
          }
        });
      }
    }
  },
};
