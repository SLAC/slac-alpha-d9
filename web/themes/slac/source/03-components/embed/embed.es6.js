import Drupal from 'drupal';

Drupal.behaviors.gessoEmbed = {
  attach(context) {
    const iframes = Array.from(context.querySelectorAll('.c-embed iframe'));

    iframes.forEach(iframe => {
      const parent = iframe.parentNode;
      let iframeWidth = iframe.width > 0 ? iframe.width : iframe.offsetWidth;
      let iframeHeight =
        iframe.height > 0 ? iframe.height : iframe.offsetHeight;
      const adjustIframeSize = () => {
        const ratio = iframeWidth / iframeHeight;

        const wrapper = document.createElement('div');
        wrapper.classList.add('c-embed__wrapper');
        wrapper.style.aspectRatio = ratio;
        wrapper.appendChild(iframe);

        iframe.style.aspectRatio = ratio;
        iframe.removeAttribute('height');
        iframe.removeAttribute('width');
        iframe.style.removeProperty('height');
        iframe.style.width = '100%';

        parent.appendChild(wrapper);
      };
      if (iframeWidth === 0 || iframeHeight === 0) {
        const resizeObserver = new ResizeObserver((entries, observer) => {
          Object.values(entries).forEach(entry => {
            if (entry.contentBoxSize) {
              const contentBoxSize = Array.isArray(entry.contentBoxSize)
                ? entry.contentBoxSize[0]
                : entry.contentBoxSize;
              iframeWidth = contentBoxSize.inlineSize;
              iframeHeight = contentBoxSize.blockSize;
            } else {
              iframeWidth = entry.contentRect.width;
              iframeHeight = entry.contentRect.height;
            }
            if (iframeWidth > 100 && iframeHeight > 100) {
              observer.unobserve(iframe);
              adjustIframeSize();
            }
          });
        });
        resizeObserver.observe(iframe);
      } else {
        adjustIframeSize();
      }
    });
  },
};
