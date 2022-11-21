import parse from 'html-react-parser';

import twigTemplate from './wide-card.twig';
import data from './wide-card.yml';
import { sectionTypeArg, decorators } from '../../06-utility/storybookHelper';

const settings = {
  title: 'Paragraphs/Wide Card',
  argTypes: {
    section_type: sectionTypeArg,
  },
  decorators,
};

const WideCard = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
WideCard.args = { ...data };

export default settings;
export { WideCard };
