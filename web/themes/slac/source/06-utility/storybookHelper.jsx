import parse from 'html-react-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import sectionTwigTemplate from '../02-layouts/section/section.twig';
import gridTwigTemplate from '../02-layouts/grid/grid.twig';
import wysiwygTwigTemplate from '../03-components/wysiwyg/wysiwyg.twig';

const SectionWrapper = ({ children }) =>
  parse(
    sectionTwigTemplate({
      section_content: ReactDOMServer.renderToStaticMarkup(children),
      modifier_classes: 'l-section--no-padding',
      has_constrain: true,
    })
  );

const SectionWithPaddingWrapper = ({ children, modifierClasses = '' }) =>
  parse(
    sectionTwigTemplate({
      section_content: ReactDOMServer.renderToStaticMarkup(children),
      modifier_classes: modifierClasses,
      has_constrain: true,
    })
  );

const GridWrapper = ({ children, numCols = 3 }) =>
  parse(
    gridTwigTemplate({
      grid_content: ReactDOMServer.renderToStaticMarkup(children),
      num_of_cols: numCols,
    })
  );

const WysiwygWrapper = ({ children }) =>
  parse(
    wysiwygTwigTemplate({
      content: ReactDOMServer.renderToStaticMarkup(children),
    })
  );

const decorators = [
  (Story, context) =>
    context.args.num_cols && context.args.num_cols > 1 ? (
      <GridWrapper numCols={context.args.num_cols}>{Story()}</GridWrapper>
    ) : (
      <>{Story()}</>
    ),
  (Story, context) => (
    <SectionWithPaddingWrapper modifierClasses={context.args.section_type}>
      {Story()}
    </SectionWithPaddingWrapper>
  ),
];

const sectionTypeArg = {
  options: [
    'l-section--white',
    'l-section--purple-black l-section--dark',
    'l-section--blue-green l-section--dark',
    'l-section--yellow',
    'l-section--purple l-section--dark',
    'l-section--blue l-section--dark',
    'l-section--gray-white',
  ],
  control: {
    type: 'select',
    labels: {
      'l-section--white': 'Default',
      'l-section--purple-black l-section--dark': 'Purple-Black',
      'l-section--blue-green l-section--dark': 'Blue-Green',
      'l-section--yellow': 'Yellow',
      'l-section--purple l-section--dark': 'Purple',
      'l-section--blue l-section--dark': 'Blue',
      'l-section--gray-white': 'Gray-White',
    },
  },
};

export {
  SectionWrapper,
  GridWrapper,
  SectionWithPaddingWrapper,
  WysiwygWrapper,
  decorators,
  sectionTypeArg,
};
