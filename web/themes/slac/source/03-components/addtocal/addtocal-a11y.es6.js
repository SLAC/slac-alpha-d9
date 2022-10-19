// Using jQuery here because addtocal.js requires it.
import jQuery from 'jquery';

($ => {
  $(document).ready(() => {
    const $button = $('.addtocal');
    if ($button) {
      $button.attr('role', 'button');
      $button.attr('tabindex', '0');
      $button.on('keyup', event => {
        const { key } = event;
        if (key === ' ' || key === 'Enter') {
          $button.click();
        }
      });
      const $form = $button.closest('form');
      if ($form) {
        const $inputs = $form.find('input[name="type"]');
        let focusIndex = 0;
        $inputs.on('keydown', event => {
          const { key } = event;
          if (key === 'ArrowUp' || key === 'ArrowLeft') {
            event.preventDefault();
            focusIndex -= 1;
            if (focusIndex < 0) {
              focusIndex = $inputs.length - 1;
            }
            $inputs[focusIndex].focus();
          } else if (key === 'ArrowDown' || key === 'ArrowRight') {
            event.preventDefault();
            focusIndex += 1;
            if (focusIndex > $inputs.length - 1) {
              focusIndex = 0;
            }
            $inputs[focusIndex].focus();
          } else if (key === 'Enter') {
            $(this).trigger('click');
          }
        });
        $inputs.on('change', () => {
          $form.submit();
        });
      }
    }
  });
})(jQuery);
