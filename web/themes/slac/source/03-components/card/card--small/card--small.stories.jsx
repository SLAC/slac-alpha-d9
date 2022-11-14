import parse from 'html-react-parser';

import twigTemplate from './card--small.twig';
import data from './card--small.yml';
import {
  decorators,
  sectionTypeArg,
} from '../../../06-utility/storybookHelper';

const settings = {
  title: 'Paragraphs/Card/Small Card',
  argTypes: {
    section_type: sectionTypeArg,
  },
  decorators,
};

const SmallCard = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
SmallCard.args = { ...data, num_cols: 4 };

const SmallCardWithIcon = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
SmallCardWithIcon.args = {
  ...SmallCard.args,
  media: false,
  icon: '<img src="https://picsum.photos/id/1015/120/120">',
};

export default settings;
export { SmallCard, SmallCardWithIcon };
