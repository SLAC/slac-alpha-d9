import Drupal from 'drupal';

Drupal.behaviors.lightbox = {
  attach(context) {
    const triggers = context.querySelectorAll('.js-lightbox');
    let triggerUsed;
    triggers.forEach(trigger => {
      const lightbox = document.getElementById(
        trigger.getAttribute('aria-controls')
      );
      const closeButton = lightbox.querySelector('.js-lightbox__close');

      if (!lightbox) return;

      function handleKeydown(event) {
        const { key, shiftKey } = event;
        if (key === 'Escape') {
          // eslint-disable-next-line no-use-before-define
          closeLightbox(event);
        }
        // Keep the user from tabbing out of the modal.
        const focusable = Array.from(
          lightbox.querySelectorAll(
            'button, [href], input, select, textarea, iframe'
          )
        ).filter(item => item.tabIndex !== -1);
        const numberFocusElements = focusable.length;
        const firstFocusableElement = focusable[0];
        const lastFocusableElement = focusable[numberFocusElements - 1];
        if (key === 'Tab') {
          if (shiftKey && document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          } else if (
            document.activeElement === lastFocusableElement &&
            !shiftKey
          ) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }

      function closeLightbox(event) {
        event.preventDefault();
        const videoIFrame = lightbox.querySelector('iframe');
        if (videoIFrame && videoIFrame.hasAttribute('src')) {
          videoIFrame.setAttribute('data-src', videoIFrame.getAttribute('src'));
          videoIFrame.removeAttribute('src');
        }
        lightbox.classList.add('u-hidden');
        if (triggerUsed) {
          triggerUsed.focus();
          triggerUsed = null;
        }
        lightbox.dispatchEvent(new Event('lightbox-close', { bubbles: true }));
        window.removeEventListener('keydown', handleKeydown);
      }

      function openLightbox(event) {
        const videoIFrame = lightbox.querySelector('iframe');
        if (videoIFrame && videoIFrame.hasAttribute('data-src')) {
          videoIFrame.setAttribute('src', videoIFrame.getAttribute('data-src'));
        }
        lightbox.classList.remove('u-hidden');
        closeButton.focus();
        triggerUsed = event.target;
        window.addEventListener('keydown', handleKeydown);
        lightbox.dispatchEvent(new Event('lightbox-open', { bubbles: true }));
      }

      closeButton.addEventListener('click', closeLightbox);
      trigger.addEventListener('click', openLightbox);
    });
  },
};
