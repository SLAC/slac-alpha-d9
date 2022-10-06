import parse from 'html-react-parser';

import twigTemplate from './arrow-link.twig';
import data from './arrow-link.yml';
import './arrow-link.es6';

const settings = {
  title: 'Components/Arrow Link',
};

const ArrowLink = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
ArrowLink.args = { ...data };

export default settings;
export { ArrowLink };
