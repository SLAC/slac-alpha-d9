import parse from 'html-react-parser';

import twigTemplate from './large-link.twig';
import data from './large-link.yml';

const settings = {
  title: 'Components/Large Link'
};

const LargeLink = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
LargeLink.args = { ...data };

export default settings;
export { LargeLink };
