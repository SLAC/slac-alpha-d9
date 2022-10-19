import Drupal from 'drupal';
import { BREAKPOINTS } from '../../00-config/_GESSO.es6';

Drupal.behaviors.videoHero = {
  attach(context) {
    const videoHero = context.querySelector('.c-video-hero');
    if (videoHero) {
      const mediaQuery = window.matchMedia(
        `(min-width: ${BREAKPOINTS.desktop})`
      );
      const caption = videoHero.querySelector('.c-video-hero__caption');
      const videos = videoHero.querySelectorAll('.c-video-hero__video');
      const selectedVideoIndex = Math.floor(Math.random() * videos.length);
      const selectedVideo = videos[selectedVideoIndex];
      selectedVideo.insertAdjacentHTML(
        'beforebegin',
        `<img src="${selectedVideo.dataset.imageSrc}" alt="${selectedVideo.dataset.imageAlt}" />`
      );
      const handleMediaQueryChange = event => {
        if (event.matches) {
          selectedVideo.insertAdjacentHTML(
            'beforebegin',
            `<iframe allowfullscreen src="${selectedVideo.dataset.src}" title="Ambient video"></iframe>`
          );
          selectedVideo.parentElement.classList.add('has-video');
          const captionText = selectedVideo.innerHTML.trim();
          if (captionText) {
            caption.querySelector('.c-tooltip__tooltip').innerHTML =
              captionText;
            caption.classList.remove('u-hidden');
          }
        } else {
          const video = videoHero.querySelector('iframe');
          if (video) {
            video.parentElement.classList.remove('has-video');
            video.parentNode.removeChild(video);
          }
          caption.classList.add('u-hidden');
        }
      };
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      handleMediaQueryChange(mediaQuery);
    }
  },
};
