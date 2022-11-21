import parse from 'html-react-parser';

import twigTemplate from './quote.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './quote.yml';
import { decorators, sectionTypeArg } from '../../06-utility/storybookHelper';

const settings = {
  title: 'Paragraphs/Quote',
  parameters: {
    controls: {
      include: [
        'quote_content',
        'quote_author',
        'quote_author_desc',
        'quote_image',
        'quote_link',
        'section_type',
        'num_cols',
      ],
    },
  },
  argTypes: {
    section_type: sectionTypeArg,
    num_cols: {
      control: 'select',
      options: [1, 2],
    },
  },
  decorators,
};

const Quote = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Quote.args = { ...globalData, ...data, num_cols: 1 };

export default settings;
export { Quote };
