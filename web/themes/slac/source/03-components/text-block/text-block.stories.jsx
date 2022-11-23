import parse from 'html-react-parser';

import ReactDOMServer from 'react-dom/server';
import twigTemplate from './text-block.twig';
import data from './text-block.yml';
import { Default as Figure } from '../figure/figure.stories';
import { decorators, sectionTypeArg } from '../../06-utility/storybookHelper';

const settings = {
  title: 'Paragraphs/Tout',
  argTypes: {
    section_type: sectionTypeArg,
  },
  decorators,
};

const TextBlock = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
TextBlock.args = { ...data, num_cols: 2 };
TextBlock.argTypes = {
  num_cols: {
    control: 'select',
    options: [1, 2, 3],
  },
};

const TextBlockWithImage = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
TextBlockWithImage.args = {
  ...TextBlock.args,
  text_block_media: ReactDOMServer.renderToStaticMarkup(
    Figure({ ...Figure.args, caption: '<em>(SLAC National Accelerator)</em>' })
  ),
};
TextBlockWithImage.argTypes = {
  num_cols: {
    control: 'select',
    options: [1, 2],
  },
};

export default settings;
export { TextBlock, TextBlockWithImage };
