import Drupal from 'drupal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BREAKPOINTS } from '../../00-config/_GESSO.es6';

gsap.registerPlugin(ScrollTrigger);

Drupal.behaviors.socialShare = {
  attach(context) {
    const socialLinks = context.querySelectorAll('.c-social-share');
    const openInPopup = link => {
      window.open(
        link.getAttribute('href'),
        '',
        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
      );
    };
    const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINTS.desktop})`);
    socialLinks.forEach(socialLink => {
      let trigger;
      const links = socialLink.querySelectorAll('a:not[href^=mailto]');
      links.forEach(link => {
        link.addEventListener('click', event => {
          event.preventDefault();
          openInPopup(link);
        });
      });
      const handleMediaQueryChange = event => {
        if (event.matches) {
          trigger = ScrollTrigger.create({
            trigger: socialLink,
            start: () => {
              const headerHeight =
                parseInt(
                  getComputedStyle(document.documentElement).getPropertyValue(
                    '--gesso-header-current-height'
                  ),
                  10
                ) +
                parseInt(
                  getComputedStyle(document.documentElement).getPropertyValue(
                    '--ginToolbarHeight'
                  ),
                  10
                );
              return `top ${headerHeight + 60}px`;
            },
            pin: true,
            end: () => `top 450px`,
            endTrigger: '.l-footer',
            anticipatePin: 1,
          });
        } else if (trigger) {
          trigger.kill();
        }
      };
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      setTimeout(() => handleMediaQueryChange(mediaQuery), 100);
    });
  },
};
