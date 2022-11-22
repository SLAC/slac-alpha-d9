import parse from 'html-react-parser';
import React from 'react';

import twigTemplate from './search.twig';
import inPageTwigTemplate from './search--in-page.twig';
import data from './search.yml';
import globalData from '../../00-config/storybook.global-data.yml';

import './search.es6';

const settings = {
  title: 'Components/Search',
  parameters: {
    controls: {
      include: ['search_placeholder', 'current_search'],
    },
  },
};

const Search = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Search.args = { ...globalData, ...data };
Search.decorators = [
  Story => (
    <div style={{ position: 'relative', marginTop: '40px' }}>{Story()}</div>
  ),
];

const SearchInPage = args =>
  parse(
    inPageTwigTemplate({
      ...args,
    })
  );
SearchInPage.args = {
  ...globalData,
  search_placeholder: 'Search FAQs by keyword',
  current_search: '',
};

export default settings;
export { Search, SearchInPage };
