import parse from 'html-react-parser';

import twigTemplate from './arrow-link.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './arrow-link.yml';
import './arrow-link.es6';

const settings = {
  title: 'Components/Arrow Link',
  parameters: {
    controls: {
      include: ['link_url', 'link_text'],
    },
  },
};

const ArrowLink = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
ArrowLink.args = { ...globalData, ...data };

export default settings;
export { ArrowLink };
