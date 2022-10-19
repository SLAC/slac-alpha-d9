import parse from 'html-react-parser';

import twigTemplate from './external-link.twig';
import data from './external-link.yml';
import './external-link.es6';

const settings = {
  title: 'Components/External Link',
};

const ExternalLink = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
ExternalLink.args = { ...data };

export default settings;
export { ExternalLink };
