import parse from 'html-react-parser';

import twigTemplate from './lede.twig';
import data from './lede.yml';

const settings = {
  title: 'Components/Lede'
};

const Lede = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Lede.args = { ...data };

export default settings;
export { Lede };
