import parse from 'html-react-parser';

import './embed.es6';
import twigTemplate from './embed.twig';
import data from './embed.yml';
import { decorators, sectionTypeArg } from '../../06-utility/storybookHelper';

const settings = {
  title: 'Paragraphs/Embed',
  argTypes: {
    width: {
      options: ['content', 'wide', 'full'],
      control: {
        type: 'select',
      },
    },
    section_type: sectionTypeArg,
  },
  decorators,
};

const Embed = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Embed.args = { ...data };

const EmbedWide = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: 'c-embed--wide',
    })
  );
EmbedWide.args = { ...data };

const EmbedFull = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: 'c-embed--full',
    })
  );
EmbedFull.args = { ...data };

export default settings;
export { Embed, EmbedWide, EmbedFull };
