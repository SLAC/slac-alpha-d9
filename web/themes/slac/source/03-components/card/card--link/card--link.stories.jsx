import parse from 'html-react-parser';

import twigTemplate from './card--link.twig';
import data from './card--link.yml';
import {
  decorators,
  sectionTypeArg,
} from '../../../06-utility/storybookHelper';

const settings = {
  title: 'Paragraphs/Card/Vertical Link Card',
  argTypes: {
    section_type: sectionTypeArg,
  },
  decorators,
};

const VerticalLinkCard = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
VerticalLinkCard.args = { ...data, num_cols: 3 };
VerticalLinkCard.argTypes = {
  num_cols: {
    control: 'select',
    options: [1, 2, 3, 4],
  },
};

export default settings;
export { VerticalLinkCard };
