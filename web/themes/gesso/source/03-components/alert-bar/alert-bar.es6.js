import Drupal from 'drupal';

Drupal.behaviors.alertBar = {
  attach(context) {
    const alertBars = context.querySelectorAll('.c-alert-bar');
    alertBars.forEach(alertBar => {
      const alertBarButton = alertBar.querySelector('.c-alert-bar__button');
      if (alertBarButton) {
        alertBarButton.addEventListener('click', event => {
          event.preventDefault();
          alertBar.hidden = true;
        });
      }
    });
  },
};
