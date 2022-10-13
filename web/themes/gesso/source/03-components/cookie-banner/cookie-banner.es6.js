import Drupal from 'drupal';

Drupal.behaviors.cookieBanner = {
  attach(context) {
    const cookieBanners = context.querySelectorAll('.c-cookie-banner');
    cookieBanners.forEach(cookieBanner => {
      const cookieBannerButton = cookieBanner.querySelector('.c-cookie-banner__button');
      if (cookieBannerButton) {
        cookieBannerButton.addEventListener('click', event => {
          event.preventDefault();
          cookieBanner.hidden = true;
          // Add cookie-setting logic here
        });
      }
    });
  },
};
