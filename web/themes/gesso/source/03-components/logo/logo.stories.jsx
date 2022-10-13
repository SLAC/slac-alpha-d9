import parse from 'html-react-parser';

import twigTemplate from './logo.twig';
import data from './logo.yml';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Site Logo',
  parameters: {
    controls: {
      include: ['url', 'logo', 'title', 'modifier_classes'],
    },
  },
};

const Logo = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Logo.args = { ...globalData, ...data };

export default settings;
export { Logo };
