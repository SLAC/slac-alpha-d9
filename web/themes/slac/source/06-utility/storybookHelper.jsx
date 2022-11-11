import parse from 'html-react-parser';
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

export {
  SectionWrapper,
  GridWrapper,
  SectionWithPaddingWrapper,
  WysiwygWrapper,
};
