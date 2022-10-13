import parse from 'html-react-parser';

import './embed.es6';
import twigTemplate from './embed.twig';
import data from './embed.yml';

const settings = {
  title: 'Components/Embed',
  argTypes: {
    width: {
      options: [
        'content',
        'wide',
        'full',
      ],
      control: {
        type: 'select',
      },
    },
  }
};

const Embed = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Embed.args = { ...data };

export default settings;
export { Embed };
