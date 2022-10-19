import { tns } from 'tiny-slider';
import Drupal from 'drupal';
import { debounce } from 'lodash';
import { SITE_MARGINS } from '../../00-config/_GESSO.es6';

Drupal.behaviors.carousel = {
  attach(context) {
    const carousels = context.querySelectorAll('.c-carousel__slides');
    carousels.forEach(carousel => {
      const slider = tns({
        arrowKeys: true,
        autoWidth: true,
        center: false,
        container: carousel,
        controls: true,
        controlsPosition: 'bottom',
        items: 1.2,
        gutter: parseInt(SITE_MARGINS.mobile, 10),
        loop: true,
        navAsThumbnails: true,
        navContainer: carousel.parentNode.querySelector('.c-carousel__pager'),
        navPosition: 'bottom',
        nextButton: carousel.parentNode.querySelector('.c-carousel__next'),
        // Adjust the tabindex of the TinySlider next/prev buttons
        onInit(info) {
          if (info.controlsContainer) {
            info.controlsContainer.setAttribute('tabindex', '-1');
          }
          info.nextButton.setAttribute('tabindex', '0');
          info.prevButton.setAttribute('tabindex', '0');
          Array.from(info.slideItems).forEach((slide, index) => {
            const links = slide.querySelectorAll('a');
            links.forEach(link => {
              link.setAttribute('tabindex', index === info.index ? '0' : '-1');
            });
          });
        },
        prevButton: carousel.parentNode.querySelector('.c-carousel__prev'),
        responsive: {
          1200: {
            autoWidth: false,
            fixedWidth: 920,
            gutter: parseInt(SITE_MARGINS.desktop, 10),
          },
        },
        slideBy: 1,
      });
      slider.events.on('newBreakpointEnd', () => {
        slider.refresh();
      });
      slider.events.on('indexChanged', () => {
        const info = slider.getInfo();
        Array.from(info.slideItems).forEach((slide, index) => {
          const links = slide.querySelectorAll('a');
          links.forEach(link => {
            link.setAttribute('tabindex', index === info.index ? '0' : '-1');
          });
        });
      });
      const handleResize = debounce(() => {
        if (slider && slider.refresh) {
          slider.refresh();
        }
      }, 16);
      window.addEventListener('resize', handleResize);
    });
  },
};
