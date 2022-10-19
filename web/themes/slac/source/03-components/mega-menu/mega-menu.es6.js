import Drupal from 'drupal';
import MegaMenu from './modules/MegaMenu.es6';
import MobileMenu from '../mobile-menu/modules/_MobileMenu.es6';

Drupal.behaviors.megaMenu = {
  attach(context, settings) {
    const menus = context.querySelectorAll('.l-header');
    if (menus.length) {
      menus.forEach(menu => {
        const megaMenu = new MegaMenu(menu);
        megaMenu.init();
        const menuElem = menu.querySelector('.c-mega-menu');
        const mobileMenu = new MobileMenu(menuElem, context, {
          classPrefix: 'c-mega-menu',
          utilityNavClass: false,
          searchBlockClass: '.c-search__form',
          imagePath: settings.gesso.gessoImagePath,
        });
        mobileMenu.init();
      });
    }
  },
};
