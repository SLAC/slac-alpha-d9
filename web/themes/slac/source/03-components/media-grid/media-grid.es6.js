import Drupal from 'drupal';

Drupal.behaviors.mediaGrid = {
  attach(context) {
    const mediaGrids = context.querySelectorAll('.c-media-grid');
    mediaGrids.forEach(mediaGrid => {
      const lightboxes = mediaGrid.querySelectorAll('.c-media-lightbox');
      if (lightboxes.length >= 2) {
        const totalLightboxes = lightboxes.length;
        lightboxes.forEach((lightbox, index) => {
          const countElem = lightbox.querySelector('.c-media-lightbox__count');
          const navElem = lightbox.querySelector('.c-media-lightbox__nav');
          if (countElem) {
            countElem.insertAdjacentHTML(
              'beforeend',
              `${index + 1} of ${totalLightboxes}`
            );
            countElem.setAttribute('aria-hidden', 'false');
          }
          if (navElem) {
            const prevButton = navElem.querySelector('.c-media-lightbox__prev');
            const nextButton = navElem.querySelector('.c-media-lightbox__next');
            const openPreviousLightbox = () => {
              lightbox.dispatchEvent(new Event('close-lightbox'));
              lightboxes[index - 1].dispatchEvent(new Event('open-lightbox'));
            };
            const openNextLightbox = () => {
              lightbox.dispatchEvent(new Event('close-lightbox'));
              lightboxes[index + 1].dispatchEvent(new Event('open-lightbox'));
            };
            prevButton.setAttribute('tabindex', '0');
            if (index === 0) {
              prevButton.disabled = true;
            }
            prevButton.addEventListener('click', evt => {
              evt.preventDefault();
              openPreviousLightbox();
            });
            nextButton.setAttribute('tabindex', '0');
            if (index === totalLightboxes - 1) {
              nextButton.disabled = true;
            }
            nextButton.addEventListener('click', evt => {
              evt.preventDefault();
              openNextLightbox();
            });
            navElem.setAttribute('aria-hidden', 'false');
            lightbox.addEventListener('keydown', evt => {
              const { key } = evt;
              if (key === 'ArrowLeft') {
                evt.stopPropagation();
                if (index > 0) {
                  openPreviousLightbox();
                }
              } else if (key === 'ArrowRight') {
                evt.stopPropagation();
                if (index < totalLightboxes - 1) {
                  openNextLightbox();
                }
              }
            });
            let x0 = null;
            lightbox.addEventListener('touchstart', evt => {
              x0 = evt.changedTouches[0].screenX;
            });
            lightbox.addEventListener('touchend', evt => {
              const x1 = evt.changedTouches[0].screenX;
              const xDistance = x1 - x0;
              const sign = Math.sign(xDistance);
              const threshold = +((sign * xDistance) / lightbox.offsetWidth);
              if (threshold >= 0.2) {
                if (sign === 1 && index > 0) {
                  openPreviousLightbox();
                } else if (sign === -1 && index < totalLightboxes - 1) {
                  openNextLightbox();
                }
              }
              x0 = null;
            });
          }
        });
      }
    });
  },
};
