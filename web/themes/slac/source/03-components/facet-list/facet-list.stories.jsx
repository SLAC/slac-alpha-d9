import parse from 'html-react-parser';
import React from 'react';

import twigTemplate from './facet-list.twig';
import data from './facet-list.yml';
import ReactDOMServer from 'react-dom/server';
import { Facet } from '../facet/facet.stories';

const settings = {
  title: 'Components/Facet List',
};

const facets = ReactDOMServer.renderToStaticMarkup(
  <>
    {Facet(Facet.args)}
    {Facet(Facet.args)}
  </>
);

const FacetList = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
FacetList.args = { ...data, facets };

export default settings;
export { FacetList };
