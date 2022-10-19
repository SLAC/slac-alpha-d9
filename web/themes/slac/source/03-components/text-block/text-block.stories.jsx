import parse from 'html-react-parser';

import ReactDOMServer from 'react-dom/server';
import twigTemplate from './text-block.twig';
import data from './text-block.yml';
import { Default as Figure } from '../figure/figure.stories';

const settings = {
  title: 'Components/Text Block',
};

const TextBlock = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
TextBlock.args = { ...data };

const TextBlockWithImage = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
TextBlockWithImage.args = {
  ...data,
  text_block_media: ReactDOMServer.renderToStaticMarkup(
    Figure({ ...Figure.args, caption: '<em>(SLAC National Accelerator)</em>' })
  ),
};

export default settings;
export { TextBlock, TextBlockWithImage };
