import Drupal from 'drupal';
import { throttle } from 'lodash';

Drupal.behaviors.header = {
  attach(context) {
    const header = context.querySelector('.l-header');
    if (header) {
      const headerInner = header.querySelector('.l-header__inner');
      const updateHeaderCurrentHeight = () => {
        let headerHeight = headerInner.getBoundingClientRect().height;
        const globalHeader = document.querySelector('.l-global-header');
        if (globalHeader && !header.classList.contains('is-sticky')) {
          headerHeight += globalHeader.getBoundingClientRect().height;
        }
        const internalHeader = document.querySelector('.l-internal-header');
        if (internalHeader && !header.classList.contains('is-sticky')) {
          headerHeight += internalHeader.getBoundingClientRect().height;
        }
        setTimeout(() => {
          document.documentElement.style.setProperty(
            '--gesso-header-current-height',
            `${headerHeight}px`
          );
        }, 0);
      };
      const updateScrollProgress = throttle(() => {
        const scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrolledAmt = Math.round((scrollTop / height) * 100);
        header.style.setProperty('--slac-scroll-progress', `${scrolledAmt}%`);
      }, 16);
      const observer = new IntersectionObserver(
        ([e]) => {
          e.target.classList.toggle('is-sticky', e.intersectionRatio < 1);
        },
        { threshold: [1], rootMargin: '-1px 0px 0px 0px' }
      );
      observer.observe(header);
      header.addEventListener('transitionend', updateHeaderCurrentHeight);
      window.addEventListener('scroll', updateScrollProgress);
      updateHeaderCurrentHeight();
    }
  },
};
