import parse from 'html-react-parser';

import twigTemplate from './wysiwyg.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './wysiwyg.yml';
import { sectionTypeArg, decorators } from '../../06-utility/storybookHelper';

const settings = {
  title: 'Paragraphs/WYSIWYG',
  parameters: {
    controls: {
      include: ['content', 'section_type', 'num_cols'],
    },
  },
  argTypes: {
    section_type: sectionTypeArg,
    num_cols: {
      control: 'select',
      options: [1, 2, 3, 4],
    },
  },
  decorators,
};

const WYSIWYG = args => parse(twigTemplate(args));
WYSIWYG.args = { ...globalData, ...data, num_cols: 1 };

export default settings;
export { WYSIWYG };
