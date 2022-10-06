import Drupal from 'drupal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MobileMenu from '../mobile-menu/modules/_MobileMenu.es6';

gsap.registerPlugin(ScrollTrigger);

Drupal.behaviors.micrositeHero = {
  attach(context) {
    const menuNodes = context.querySelectorAll('.c-microsite-hero__menu');
    const menuSections = context.querySelectorAll('.js-microsite-section');
    menuNodes.forEach(menuNode => {
      const mobileMenu = new MobileMenu(menuNode, context, {
        classPrefix: 'c-microsite-hero__menu',
        otherBlockClass: '.c-microsite-hero__title--mobile',
      });
      mobileMenu.init();
      menuSections.forEach(section => {
        const sectionId = section.id;
        const handleEnter = () => {
          const menuItem = menuNode.querySelector(`[href="#${sectionId}"]`);
          if (menuItem) {
            const currentActive = menuNode.querySelector('.is-active-trail');
            if (currentActive) {
              currentActive.classList.remove('is-active-trail');
            }
            menuItem.classList.add('is-active-trail');
          }
        };
        ScrollTrigger.create({
          trigger: section,
          start: 'top 75%',
          onEnter: handleEnter,
          onEnterBack: handleEnter,
        });
      });
    });
  },
};
