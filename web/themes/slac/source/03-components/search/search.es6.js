import Drupal from 'drupal';
import SearchFlyout from './modules/SearchFlyout.es6';

Drupal.behaviors.search = {
  attach(context) {
    const search = context.querySelectorAll('.c-search--dropdown');
    search.forEach(searchElem => {
      const searchFlyout = new SearchFlyout(searchElem);
      searchFlyout.init();
    });
    const searchForms = context.querySelectorAll('.c-search__form');
    searchForms.forEach(searchForm => {
      const searchInput = searchForm.querySelector('.c-search__input');
      const searchRadios = searchForm.querySelectorAll(
        'input[name="search_type"]'
      );
      function handleRadioChange() {
        const selectedSearch = this.value;
        let searchUrl = '/search';
        let searchInputName = 'keywords';
        if (selectedSearch === 'slac_web') {
          searchUrl =
            'https://www-psearch.slac.stanford.edu/SLACSearch/app/slac/index?style=mainSite';
          searchInputName = 'qt';
        } else if (selectedSearch === 'people') {
          searchUrl =
            'https://www-public.slac.stanford.edu/phonebook/dirsearch.aspx?lf=1&url=&gone=active';
          searchInputName = 'NAME';
        }
        searchInput.setAttribute('name', searchInputName);
        searchForm.setAttribute('action', searchUrl);
      }
      if (searchRadios.length) {
        searchRadios.forEach(radio => {
          radio.addEventListener('change', handleRadioChange);
        });
        searchRadios[0].dispatchEvent(new InputEvent('change'));
        searchRadios[0].checked = true;
      }
    });
  },
};
