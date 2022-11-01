import Drupal from 'drupal';

Drupal.behaviors.mediaGrid = {
  attach(context) {
    /**
     * Change which lightbox is displayed.
     * @param {HTMLElement} lightboxToClose
     * @param {HTMLElement} lightboxToOpen
     */
    function navigateLightbox(lightboxToClose, lightboxToOpen) {
      lightboxToClose.dispatchEvent(new Event('close-lightbox'));
      lightboxToOpen.dispatchEvent(new Event('open-lightbox'));
    }

    /**
     * Set up the current and total item count display.
     * @param {HTMLElement} lightbox
     * @param {number} index
     * @param {number} totalLightboxes
     */
    function setupItemCount(lightbox, index, totalLightboxes) {
      const countElem = lightbox.querySelector('.c-media-lightbox__count');
      if (countElem) {
        countElem.insertAdjacentHTML(
          'beforeend',
          `${index + 1} of ${totalLightboxes}`
        );
        countElem.setAttribute('aria-hidden', 'false');
      }
    }

    /**
     * Set up a navigation button
     * @param {HTMLButtonElement} button
     * @param {Function} clickHandler
     */
    function setupNavButton(button, clickHandler) {
      button.setAttribute('tabindex', 0);
      button.addEventListener('click', evt => {
        evt.preventDefault();
        clickHandler();
      });
    }

    /**
     * Set up the lightbox navigation.
     *
     * Users can move forward or backwards by button, arrow key, or swipe.
     *
     * @param {HTMLElement} lightbox
     * @param {number} index
     * @param {NodeList} allLightboxes
     * @param {number} totalLightboxes
     */
    function setupLightboxNav(lightbox, index, allLightboxes, totalLightboxes) {
      const navElem = lightbox.querySelector('.c-media-lightbox__nav');
      if (navElem) {
        const prevButton = navElem.querySelector('.c-media-lightbox__prev');
        const nextButton = navElem.querySelector('.c-media-lightbox__next');
        const openPreviousLightbox = () => {
          navigateLightbox(lightbox, allLightboxes[index - 1]);
        };
        const openNextLightbox = () => {
          navigateLightbox(lightbox, allLightboxes[index + 1]);
        };
        setupNavButton(prevButton, openPreviousLightbox);
        setupNavButton(nextButton, openNextLightbox);
        if (index === 0) {
          prevButton.disabled = true;
        }
        if (index === totalLightboxes - 1) {
          nextButton.disabled = true;
        }
        navElem.setAttribute('aria-hidden', 'false');
        /**
         * Move left or right if arrow key pressed.
         */
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
        /**
         * Move left or right if user swipes horizontally.
         */
        let touchStartingPos = null;
        lightbox.addEventListener('touchstart', evt => {
          touchStartingPos = evt.changedTouches[0].screenX;
        });
        lightbox.addEventListener('touchend', evt => {
          const touchEndingPos = evt.changedTouches[0].screenX;
          const swipeDistance = touchEndingPos - touchStartingPos;
          const swipeDirection = Math.sign(swipeDistance);
          // Only consider the touch a relevant swipe if it covers at least
          // 20% of the lightbox width.
          const threshold = +(
            (swipeDirection * swipeDistance) /
            lightbox.offsetWidth
          );
          if (threshold >= 0.2) {
            if (swipeDirection === 1 && index > 0) {
              openPreviousLightbox();
            } else if (swipeDirection === -1 && index < totalLightboxes - 1) {
              openNextLightbox();
            }
          }
          touchStartingPos = null;
        });
      }
    }

    /**
     * Set up a lightbox to be part of a gallery.
     * @param {HTMLElement} lightbox
     * @param {number} index
     * @param {NodeList} allLightboxes
     */
    function setupLightbox(lightbox, index, allLightboxes) {
      const totalLightboxes = allLightboxes.length;
      setupItemCount(lightbox, index, totalLightboxes);
      setupLightboxNav(lightbox, index, allLightboxes, totalLightboxes);
    }

    const mediaGrids = context.querySelectorAll('.c-media-grid');
    mediaGrids.forEach(mediaGrid => {
      const lightboxes = mediaGrid.querySelectorAll('.c-media-lightbox');
      if (lightboxes.length >= 2) {
        lightboxes.forEach((lightbox, index) => {
          setupLightbox(lightbox, index, lightboxes);
        });
      }
    });
  },
};
