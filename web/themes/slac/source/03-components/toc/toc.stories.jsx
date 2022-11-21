import parse from 'html-react-parser';

import twigTemplate from './toc.twig';
import data from './toc.yml';
import './toc.scss';
import './toc.es6';

const settings = {
  title: 'Components/Table of Contents',
};

const TableOfContents = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
TableOfContents.args = { ...data };

export default settings;
// export { TableOfContents };
