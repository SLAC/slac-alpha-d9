import Drupal from 'drupal';
import drupalSettings from 'drupalSettings';

Drupal.behaviors.externalLinks = {
  attach(context) {
    const allowedDomains = [];
    const lockedDomains = [
      'intranet.slac.stanford.edu',
      'userportal.slac.stanford.edu',
      'www-internal.slac.stanford.edu',
      'internal.slac.stanford.edu',
      'sallie.stanford.edu',
    ];
    function linkIsExternal(linkElement) {
      let isExternal = true;
      if (
        linkElement.host === 'www6.slac.stanford.edu' ||
        linkElement.host.endsWith('.slac.stanford.edu') ||
        linkElement.host === 'sallie.stanford.edu' ||
        linkElement.host === window.location.host
      ) {
        isExternal = false;
      }

      if (allowedDomains.length) {
        allowedDomains.forEach(domain => {
          if (
            linkElement.host === domain ||
            linkElement.host.endsWith(`.${domain}`)
          ) {
            isExternal = false;
          }
        });
      }

      return isExternal;
    }

    function linkIsLocked(linkElement) {
      let isLocked = false;
      if (lockedDomains.length) {
        lockedDomains.forEach(domain => {
          if (
            linkElement.host === domain ||
            linkElement.host.endsWith(`.${domain}`)
          ) {
            isLocked = true;
          }
        });
      }
      return isLocked;
    }

    const externalLinks = context.querySelectorAll(
      "a:not([href=''], [href^='#'], [href^='?'], [href^='/'], [href^='.'], [href^='javascript:'], [href^='mailto:'], [href^='tel:'], .c-logo, .c-social-links__link, .rss-link)"
    );

    externalLinks.forEach(el => {
      if (el.hasAttribute('href') && !el.querySelector('img')) {
        if (linkIsLocked(el)) {
          el.insertAdjacentHTML(
            'beforeend',
            `<svg class="c-icon" role="img"><title>(requires login)</title><use xlink:href="${drupalSettings.gesso.gessoImagePath}/sprite.artifact.svg#lock-solid"></use></svg>`
          );
          el.classList.add('external-link', 'external-link--locked');
        } else if (linkIsExternal(el)) {
          el.insertAdjacentHTML(
            'beforeend',
            `<svg class="c-icon" role="img"><title>(external link)</title><use xlink:href="${drupalSettings.gesso.gessoImagePath}/sprite.artifact.svg#diagonal-arrow"></use></svg>`
          );
          el.classList.add('external-link');
        }
      }
    });
  },
};
