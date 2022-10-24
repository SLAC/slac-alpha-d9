import Drupal from 'drupal';
import MobileMenu from '../mobile-menu/modules/_MobileMenu.es6';
import MenuBar from './modules/_MenuBar.es6';

Drupal.behaviors.dropdownMenu = {
  attach(context, settings) {
    const menuNodes = context.querySelectorAll('.c-dropdown-menu');
    if (menuNodes.length) {
      menuNodes.forEach(menuNode => {
        const dropdownMenu = new MenuBar(menuNode);
        dropdownMenu.init();
        const mobileMenu = new MobileMenu(menuNode, context, {
          classPrefix: 'c-dropdown-menu',
          utilityNavClass: '.l-internal-header',
          searchBlockClass: '.c-search__form',
          otherBlockClass: '.l-header__freeform',
          imagePath: settings.gesso.gessoImagePath,
          logoClass: '.l-global-header__logo',
        });
        mobileMenu.init();
      });
    }
  },
};
