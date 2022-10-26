import Drupal from 'drupal';
import { debounce, throttle } from 'lodash';
import { BREAKPOINTS } from '../../00-config/_GESSO.es6';

Drupal.behaviors.header = {
  attach(context) {
    const header = context.querySelector('.l-header');
    const globalHeader = document.querySelector('.l-global-header');
    const internalHeader = document.querySelector('.l-internal-header');
    if (header) {
      const headerInner = header.querySelector('.l-header__inner');
      const updateHeaderCurrentHeight = () => {
        let headerHeight = headerInner.getBoundingClientRect().height;
        if (globalHeader && !header.classList.contains('is-sticky')) {
          headerHeight += globalHeader.getBoundingClientRect().height;
        }
        if (
          internalHeader &&
          !window.matchMedia(`(max-width: ${BREAKPOINTS['mobile-menu']})`)
            .matches &&
          !header.classList.contains('is-sticky')
        ) {
          headerHeight += internalHeader.getBoundingClientRect().height;
        }
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty(
            '--gesso-header-current-height',
            `${headerHeight}px`
          );
        });
      };
      const setInitialHeights = () => {
        if (globalHeader) {
          const newHeight = globalHeader.offsetHeight;
          const currentHeight = parseFloat(
            document.documentElement.style.getPropertyValue(
              '--gesso-global-header-height'
            )
          );
          if (Math.round(newHeight) !== Math.round(currentHeight)) {
            document.documentElement.style.setProperty(
              '--gesso-global-header-height',
              `${newHeight}px`
            );
          }
        }
        if (internalHeader) {
          const newHeight = internalHeader.offsetHeight;
          const currentHeight = parseFloat(
            document.documentElement.style.getPropertyValue(
              '--gesso-internal-header-height'
            )
          );
          if (Math.round(newHeight) !== Math.round(currentHeight)) {
            document.documentElement.style.setProperty(
              '--gesso-internal-header-height',
              `${newHeight}px`
            );
          }
        }
        const headerClone = header.cloneNode(true);
        headerClone.classList.remove('is-sticky');
        Object.assign(headerClone.style, {
          overflow: 'visible',
          height: 'auto',
          maxHeight: 'none',
          opacity: '0',
          visibility: 'hidden',
          display: 'block',
          position: 'absolute',
          top: '0',
        });
        header.after(headerClone);
        requestAnimationFrame(() => {
          const newHeight = headerClone.offsetHeight;
          const currentHeight = parseFloat(
            document.documentElement.style.getPropertyValue(
              '--gesso-header-initial-height'
            )
          );
          if (Math.round(newHeight) !== Math.round(currentHeight)) {
            document.documentElement.style.setProperty(
              '--gesso-header-initial-height',
              `${headerClone.offsetHeight}px`
            );
          }
          headerClone.remove();
          updateHeaderCurrentHeight();
        });
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
      setInitialHeights();
      observer.observe(header);
      header.addEventListener('transitionend', updateHeaderCurrentHeight);
      window.addEventListener('scroll', updateScrollProgress);
      window.addEventListener('resize', debounce(setInitialHeights, 200));
      header.addEventListener('toggle-mobile-menu', () => {
        window.requestAnimationFrame(() => {
          setInitialHeights();
        });
      });
    }
  },
};
