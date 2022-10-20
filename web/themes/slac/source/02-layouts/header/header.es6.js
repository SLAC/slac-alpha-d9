import Drupal from 'drupal';
import { throttle } from 'lodash';

Drupal.behaviors.header = {
  attach(context) {
    const header = context.querySelector('.l-header');
    if (header) {
      const changeOnScroll = throttle(() => {
        const ginToolbarSecondaryHeight = getComputedStyle(
          document.documentElement
        ).getPropertyValue('--ginToolbarSecondaryHeight');
        const stickyTop = ginToolbarSecondaryHeight
          ? parseFloat(ginToolbarSecondaryHeight)
          : 0;
        if (window.scrollY <= stickyTop) {
          header.classList.remove('is-sticky');
        } else if (!header.classList.contains('is-sticky')) {
          header.classList.add('is-sticky');
        }
      }, 16);
      const updateScrollProgress = throttle(() => {
        const scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrolledAmt = Math.round((scrollTop / height) * 100);
        header.style.setProperty('--slac-scroll-progress', `${scrolledAmt}%`);
      }, 16);
      window.addEventListener('scroll', changeOnScroll);
      window.addEventListener('scroll', updateScrollProgress);
    }
  },
};
