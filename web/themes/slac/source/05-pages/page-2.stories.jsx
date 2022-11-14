import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import { Page as PageTemplate } from '../04-templates/page/page.stories';
import { SideMenu } from '../03-components/menu/menu--side/menu--side.stories';
import PageWrapper from './page-wrappers/default';
import { BasicPage1 } from './page.stories';
import { HeroWithChevron } from '../03-components/hero-bg-image/hero-bg-image.stories';
import { SectionWithGrayWhiteGradient } from '../02-layouts/section/section.stories';
import { Default as Card } from '../03-components/card/card.stories';
import {
  GridWrapper,
  SectionWithPaddingWrapper,
  SectionWrapper,
  WysiwygWrapper,
} from '../06-utility/storybookHelper';
import { FigureWithVideoCentered } from '../03-components/figure/figure.stories';
import { FiftyFifty } from '../03-components/fifty-fifty/fifty-fifty.stories';
import { Quote } from '../03-components/quote/quote.stories';
import { OverlapImage } from '../03-components/overlap-image/overlap-image.stories';

export default {
  title: 'Pages/Basic Page/Basic Page 2',
  parameters: {
    controls: {
      include: ['show_admin_info', 'has_sidebar'],
    },
  },
};

const BasicPage2 = args => (
  <PageWrapper hero={HeroWithChevron(HeroWithChevron.args)}>
    {PageTemplate({
      ...args,
      title: 'Basic Page Example',
      lede: 'Description teaser is informative, intriguing, and compelling to your target audiences. Keep it friendly and approachable with a brief well-written overview of your business and services. Tell just enough of your story, make it enticing that the reader begs for more.',
      content: ReactDOMServer.renderToStaticMarkup(
        <>
          {SectionWithGrayWhiteGradient({
            ...SectionWithGrayWhiteGradient.args,
            section_title: 'Title that grabs attention',
            section_buttons: false,
          })}
          {SectionWithGrayWhiteGradient({
            ...SectionWithGrayWhiteGradient.args,
            section_content: ReactDOMServer.renderToStaticMarkup(
              Card(Card.args)
            ),
            section_buttons: false,
          })}
          {SectionWithGrayWhiteGradient({
            ...SectionWithGrayWhiteGradient.args,
            section_buttons: false,
            section_content: ReactDOMServer.renderToStaticMarkup(
              <GridWrapper numCols={2}>
                <SectionWrapper>{Card(Card.args)}</SectionWrapper>
                <SectionWrapper>{Card(Card.args)}</SectionWrapper>
                <SectionWrapper>{Card(Card.args)}</SectionWrapper>
                <SectionWrapper>{Card(Card.args)}</SectionWrapper>
              </GridWrapper>
            ),
          })}
          <SectionWithPaddingWrapper>
            <WysiwygWrapper>
              <>
                <hr />
                <h3>How to Bend a Stream of Dark Matter and Make it Shine</h3>
                <p>
                  The nature of dark matter is one of the most captivating and
                  fundamental open problems facing physicists today. Over many
                  decades, we have collected overwhelming evidence for the
                  existence of dark matter in the universe.
                </p>
              </>
            </WysiwygWrapper>
            {FigureWithVideoCentered(FigureWithVideoCentered.args)}
          </SectionWithPaddingWrapper>
          {SectionWithGrayWhiteGradient({
            ...SectionWithGrayWhiteGradient.args,
            section_buttons: false,
            section_title: false,
            section_intro: false,
            section_kicker: false,
            section_content: ReactDOMServer.renderToStaticMarkup(
              <>
                {FiftyFifty({
                  col_1: ReactDOMServer.renderToStaticMarkup(
                    FigureWithVideoCentered(FigureWithVideoCentered.args)
                  ),
                  col_2: ReactDOMServer.renderToStaticMarkup(Quote(Quote.args)),
                })}
                {Quote(Quote.args)}
              </>
            ),
          })}
          <SectionWithPaddingWrapper>
            {OverlapImage(OverlapImage.args)}
          </SectionWithPaddingWrapper>
          <SectionWithPaddingWrapper>
            {OverlapImage(OverlapImage.args)}
          </SectionWithPaddingWrapper>
        </>
      ),
    })}
  </PageWrapper>
);

BasicPage2.args = {
  ...PageTemplate.args,
  has_sidebar: false,
  sidebar: ReactDOMServer.renderToStaticMarkup(SideMenu(SideMenu.args)),
};
export { BasicPage2 };
