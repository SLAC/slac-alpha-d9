import parse from 'html-react-parser';

import twigTemplate from './card--small-bio.twig';
import globalData from '../../../00-config/storybook.global-data.yml';
import data from './card--small-bio.yml';
import '../../arrow-link/arrow-link.es6';

const settings = {
  title: 'Components/Card/Small Bio Card',
  argTypes: {
    color: {
      options: ['cardinal', 'stormy', 'sky', 'palo-alto'],
      control: {
        type: 'select',
      },
    },
  },
};

const SmallBioCard = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
SmallBioCard.args = { ...globalData, ...data };

export default settings;
export { SmallBioCard };
