import parse from 'html-react-parser';

import twigTemplate from './search.twig';
import data from './search.yml';
import globalData from '../../00-config/storybook.global-data.yml';

import './search.es6';

const settings = {
  title: 'Components/Search',
};

const Search = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Search.args = { ...globalData, ...data };

export default settings;
export { Search };
