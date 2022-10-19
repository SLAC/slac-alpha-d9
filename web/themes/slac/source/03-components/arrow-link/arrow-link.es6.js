import Drupal from 'drupal';

Drupal.behaviors.arrowLink = {
  attach(context) {
    const arrowLinks = context.querySelectorAll(
      '.c-arrow-link, .c-arrow-link--white, .c-card--small-bio a'
    );
    arrowLinks.forEach(link => {
      const text = link.textContent.trim().split(' ');
      const lastWord = text.pop();
      if (lastWord) {
        const lastWordMarkup = `<span class="c-arrow-link__word">${lastWord}</span>`;
        const lastIndex = link.innerHTML.lastIndexOf(lastWord);
        link.innerHTML =
          link.innerHTML.substring(0, lastIndex) +
          lastWordMarkup +
          link.innerHTML.substring(lastIndex + lastWord.length);
      }
    });
  },
};
