import parse from 'html-react-parser';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import twigTemplate from './fifty-fifty.twig';
import wysiwygTemplate from '../wysiwyg/wysiwyg.twig';
import data from './fifty-fifty.yml';
import { Default as Figure } from '../figure/figure.stories';

import '../../06-utility/transitions.es6';

const settings = {
  title: 'Components/Fifty Fifty',
};

const text = `
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rhoncus consequat sagittis. Sed vulputate ligula quis tortor lobortis accumsan. Pellentesque viverra viverra ex nec vestibulum. Nunc interdum lacinia felis ultricies sodales. Curabitur tortor tortor, commodo a porta et, dignissim a nunc. Integer efficitur eleifend posuere.</p>
  <p>Cras dui lectus, aliquam posuere sagittis a, sollicitudin ac nunc. Etiam finibus urna et arcu venenatis, sit amet molestie sapien laoreet. Nam maximus lectus non augue faucibus, eget iaculis ligula ultricies. Nam sed libero augue. Aenean sed tempor dui. Etiam dignissim erat ac nibh tempus, non aliquet ipsum semper. Nulla venenatis bibendum purus id varius. Proin ligula orci, lobortis et tristique aliquet, sodales quis odio.</p>`;

const wysiwygColumn = wysiwygTemplate({
  content: text,
});

const FiftyFifty = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
FiftyFifty.args = {
  ...data,
  col_1: wysiwygColumn,
  col_2: ReactDOMServer.renderToStaticMarkup(<>{Figure(Figure.args)}</>),
};

const FiftyFiftyLeftFadeIn = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
FiftyFiftyLeftFadeIn.args = {
  ...data,
  col_2: wysiwygColumn,
  col_1: ReactDOMServer.renderToStaticMarkup(<>{Figure(Figure.args)}</>),
  fade: 'left',
};

const FiftyFiftyRightFadeIn = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
FiftyFiftyRightFadeIn.args = {
  ...data,
  col_1: wysiwygColumn,
  col_2: ReactDOMServer.renderToStaticMarkup(<>{Figure(Figure.args)}</>),
  fade: 'right',
};

export default settings;
export { FiftyFifty, FiftyFiftyLeftFadeIn, FiftyFiftyRightFadeIn };
