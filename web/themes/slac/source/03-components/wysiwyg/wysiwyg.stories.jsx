import parse from 'html-react-parser';

import twigTemplate from './wysiwyg.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './wysiwyg.yml';

const settings = {
  title: 'Components/WYSIWYG',
  parameters: {
    controls: {
      include: ['has_background', 'content'],
    },
  },
};

const WYSIWYG = args => parse(twigTemplate(args));
WYSIWYG.args = { ...globalData, ...data };

export default settings;
export { WYSIWYG };
