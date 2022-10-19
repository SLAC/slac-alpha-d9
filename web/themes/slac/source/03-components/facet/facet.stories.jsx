import parse from 'html-react-parser';

import globalData from '../../00-config/storybook.global-data.yml';
import twigTemplate from './facet.twig';
import data from './facet.yml';

const settings = {
  title: 'Components/Facet',
};

const Facet = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Facet.args = { ...globalData, ...data };

export default settings;
export { Facet };
