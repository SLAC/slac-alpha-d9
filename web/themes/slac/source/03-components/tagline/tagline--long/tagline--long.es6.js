import Drupal from 'drupal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BREAKPOINTS } from '../../../00-config/_GESSO.es6';

gsap.registerPlugin(ScrollTrigger);

Drupal.behaviors.taglineLong = {
  attach(context) {
    const tagline = context.querySelector('.c-tagline--long');
    const mediaQuery = window.matchMedia(
      `(min-width: ${BREAKPOINTS['desktop-lg']})`
    );
    if (tagline) {
      const triggers = [];
      const handleMediaQueryChange = event => {
        // Kill any previous ScrollTriggers so we can set up new ones.
        if (triggers.length) {
          triggers.forEach(trigger => {
            trigger.kill();
          });
        }
        const sections = gsap.utils.toArray('.c-tagline__section', tagline);
        if (event.matches) {
          const timelineTrigger = ScrollTrigger.create({
            trigger: sections[0],
            start: 'top 75%',
            scrub: true,
          });
          gsap.set(sections, {
            autoAlpha: 0,
          });
          const tl = gsap.timeline({
            scrollTrigger: timelineTrigger,
          });
          sections.forEach(section => {
            tl.to(
              section,
              {
                autoAlpha: 1,
              },
              '>1'
            );
          });
        } else {
          sections.forEach(section => {
            gsap.set(section, {
              autoAlpha: 0,
            });
            const sectionTrigger = ScrollTrigger.create({
              trigger: section,
              start: 'top bottom-=200px',
            });
            gsap.to(section, {
              scrollTrigger: sectionTrigger,
              autoAlpha: 1,
            });
            triggers.push(sectionTrigger);
          });
        }
      };
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      handleMediaQueryChange(mediaQuery);
    }
  },
};
