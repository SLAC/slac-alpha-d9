import Drupal from 'drupal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateIcon } from '../03-components/animated-icon/animated-icon.es6';
import { BREAKPOINTS } from '../00-config/_GESSO.es6';

gsap.registerPlugin(ScrollTrigger);

Drupal.behaviors.gessoTransitions = {
  attach(context) {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Fade In from Left or Right
      const fadeIns = gsap.utils.toArray(
        '.u-fade-left, .u-fade-right',
        context
      );
      fadeIns.forEach(item => {
        gsap.set(item, {
          autoAlpha: 0,
          x: item.classList.contains('u-fade-left') ? -100 : 100,
        });

        ScrollTrigger.create({
          trigger: item,
          start: 'top 50%',
          once: true,
          onEnter: () => {
            gsap.to(item, {
              autoAlpha: 1,
              x: 0,
              clearProps: 'transform',
            });
          },
        });
      });

      // Fade In from Left or Right on Desktop Only
      const fadeInDesktops = gsap.utils.toArray(
        '.u-fade-left-desktop, .u-fade-right-desktop',
        context
      );
      if (window.matchMedia(`(min-width: ${BREAKPOINTS.desktop})`).matches) {
        fadeInDesktops.forEach(item => {
          gsap.set(item, {
            autoAlpha: 0,
            x: item.classList.contains('u-fade-left-desktop') ? -100 : 100,
          });

          ScrollTrigger.create({
            trigger: item,
            start: 'top 50%',
            once: true,
            onEnter: () => {
              gsap.to(item, {
                autoAlpha: 1,
                x: 0,
              });
            },
          });
        });
      }

      // Slide In from Left
      const slideIns = gsap.utils.toArray('.u-slide-left', context);
      slideIns.forEach(item => {
        gsap.set(item, {
          x: '-100%',
        });
        ScrollTrigger.create({
          trigger: item,
          start: 'bottom bottom',
          once: true,
          onEnter: () => {
            gsap.to(item, {
              x: 0,
              ease: 'power3.out',
            });
          },
        });
      });

      // Animate Icon on Page Load
      const icons = gsap.utils.toArray('.u-animate-icon', context);
      icons.forEach(item => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 50%',
          once: true,
          onEnter: () => {
            animateIcon(item);
          },
        });
      });
    }
  },
};
