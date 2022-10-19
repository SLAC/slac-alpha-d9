import React from 'react';

import parse from 'html-react-parser';
import ReactDOMServer from 'react-dom/server';
import PageWrapper from './page-wrappers/default.jsx';
import { MediaDetail as PageTemplate } from '../04-templates/media-detail/media-detail.stories';
import sectionTemplate from '../02-layouts/section/section.twig';
import {
  Default as Card,
  TeaserCard,
} from '../03-components/card/card.stories';
import { SectionWithBlueGreenGradient } from '../02-layouts/section/section.stories';
import expandableContentTemplate from '../03-components/expandable-grid/expandable-grid.twig';
import globalData from '../00-config/storybook.global-data.yml';

export default {
  title: 'Pages/Image Detail Page',
  parameters: {
    controls: {
      include: ['show_admin_info'],
    },
  },
};

const ImageDetailPage = () => (
  <PageWrapper>
    {PageTemplate(PageTemplate.args)}
    {parse(
      sectionTemplate({
        has_constrain: true,
        section_kicker: 'Featured In',
        section_title: 'Related News',
        section_content: ReactDOMServer.renderToStaticMarkup(
          TeaserCard(TeaserCard.args)
        ),
        modifier_classes: 'l-section--gray-gradient',
      })
    )}
    {SectionWithBlueGreenGradient({
      ...SectionWithBlueGreenGradient.args,
      section_kicker: 'Dig Deeper',
      section_title: 'Related Images & Videos',
      section_intro: false,
      section_title_url: false,
      section_content: expandableContentTemplate({
        ...globalData,
        grid_items: [
          ReactDOMServer.renderToStaticMarkup(<>{Card(Card.args)}</>),
          ReactDOMServer.renderToStaticMarkup(<>{Card(Card.args)}</>),
          ReactDOMServer.renderToStaticMarkup(<>{Card(Card.args)}</>),
          ReactDOMServer.renderToStaticMarkup(<>{Card(Card.args)}</>),
          ReactDOMServer.renderToStaticMarkup(<>{Card(Card.args)}</>),
          ReactDOMServer.renderToStaticMarkup(<>{Card(Card.args)}</>),
        ],
      }),
      section_buttons: false,
    })}
  </PageWrapper>
);
export { ImageDetailPage };
