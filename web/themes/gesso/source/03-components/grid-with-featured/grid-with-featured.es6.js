import Drupal from 'drupal';

Drupal.behaviors.jumpMenu = {
  attach(context) {
    const jumpMenus = context.querySelectorAll('.js-jump-menu');
    jumpMenus.forEach(jumpMenu => {
      jumpMenu.addEventListener('change', () => {
        window.location.href = jumpMenu.value;
      });
    });
  },
};
