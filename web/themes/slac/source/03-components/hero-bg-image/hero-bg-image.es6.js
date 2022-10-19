import Drupal from 'drupal';
import { animateIcon } from '../animated-icon/animated-icon.es6';

Drupal.behaviors.heroBgImage = {
  attach(context) {
    const heroBgImages = context.querySelectorAll('.c-hero-bg-image');
    heroBgImages.forEach(heroBgImage => {
      setTimeout(() => {
        animateIcon(heroBgImage);
      }, 1500);
    });
  },
};
