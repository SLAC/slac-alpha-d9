import React from 'react';

import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';
import globalData from '../00-config/storybook.global-data.yml';
import sectionTwigTemplate from '../02-layouts/section/section.twig';
import gridTwigTemplate from '../02-layouts/grid/grid.twig';
import PageWrapper from './page-wrappers/default.jsx';
import { VideoHero } from '../03-components/video-hero/video-hero.stories';
import { FiftyFifty } from '../03-components/fifty-fifty/fifty-fifty.stories';
import { ColorfulTagline } from '../03-components/tagline/tagline.stories';
import { WYSIWYG } from '../03-components/wysiwyg/wysiwyg.stories';
import { IconCard } from '../03-components/icon-card/icon-card.stories';
import { Carousel } from '../03-components/carousel/carousel.stories';
import {
  Default as Card,
  EventCard,
  ExtraLargeCardWithRightText,
} from '../03-components/card/card.stories';
import { SmallCard } from '../03-components/card/card--small/card--small.stories';
import { VerticalLinkCard } from '../03-components/card/card--link/card--link.stories';
import { Quote } from '../03-components/quote/quote.stories';
import { FigureWithVideo } from '../03-components/figure/figure.stories';

export default {
  title: 'Pages/Homepage',
  parameters: {
    controls: {
      include: ['show_admin_info'],
    },
  },
};

const Homepage = args => (
  <PageWrapper {...args}>
    {VideoHero(VideoHero.args)}
    {parse(
      sectionTwigTemplate({
        has_constrain: true,
        section_content: ReactDOMServer.renderToStaticMarkup(
          FiftyFifty({
            col_1: ReactDOMServer.renderToStaticMarkup(
              ColorfulTagline({
                ...ColorfulTagline.args,
                tagline_content: false,
              })
            ),
            col_2: ReactDOMServer.renderToStaticMarkup(
              WYSIWYG({
                content: `<p class="c-lede">We explore how the universe works at the biggest, smallest and fastest scales and invent powerful tools used by scientists around the globe. Our research helps solve real-world problems and advances the interests of the nation.</p>
<p class="c-lede"><a href="#0" class="c-arrow-link">Our Story</a><a href="#0" class="c-arrow-link">Our People</a></p>`,
              })
            ),
          })
        ),
      })
    )}
    {parse(
      sectionTwigTemplate({
        has_constrain: true,
        modifier_classes: 'l-section--dark l-section--bg-image',
        section_kicker: 'Visionary Science',
        section_title: 'Explore Our Frontier Research',
        section_content: gridTwigTemplate({
          grid_content: ReactDOMServer.renderToStaticMarkup(
            <>
              {IconCard(IconCard.args)}
              {IconCard({
                icon: 'space2',
                url: '#0',
                card_title: 'Physics of the Universe',
                card_description:
                  'Studying the particles & forces that knit the cosmos together',
              })}
              {IconCard({
                icon: 'accelerator1',
                url: '#0',
                card_title: 'Advanced Accelerators',
                card_description:
                  'Building smaller, faster, more powerful accelerators for all',
              })}
              {IconCard({
                icon: 'cryo2',
                url: '#0',
                card_title: 'Science of Life',
                card_description:
                  'Understanding the machinery of life at its most basic level',
              })}
              {IconCard({
                icon: 'accelerator2',
                url: '#0',
                card_title: 'New Technologies',
                card_description: 'Inventing new tools for science and society',
              })}
              {IconCard({
                icon: 'space1',
                url: '#0',
                card_title: 'Energy Sciences',
                card_description:
                  "Finding clean, sustainable solutions for the world's energy challenges",
              })}
            </>
          ),
          num_of_cols: 3,
        }),
      })
    )}
    {parse(
      sectionTwigTemplate({
        has_constrain: true,
        section_kicker: 'Where Research Happens',
        section_title: 'Facilities & Centers',
        section_title_url: '#0',
        section_intro: `<p>At our large-scale facilities and specialized centers, scientists take advantage of powerful tools and unique expertise and collaborate with each other across a wide range of disciplines. Working together is what makes science tick.</p>
<p><a href="#0" class="c-button c-button--chevron">Scientific Facilities</a><a href="#0" class="c-button c-button--chevron">Joint Institutes & Centers</a></p>`,
        section_content: ReactDOMServer.renderToStaticMarkup(
          <>{Carousel(Carousel.args)}</>
        ),
      })
    )}
    {parse(
      sectionTwigTemplate({
        has_constrain: true,
        section_kicker: 'Meet Our Teams',
        section_title: 'SLAC People',
        section_title_url: '#0',
        section_intro: `<p>To achieve our ambitious goals and keep SLAC a great place to work, the lab needs a creative, diverse and united workforce – people with a wide variety of experiences and ideas, skills and backgrounds.</p>`,
        section_content: ReactDOMServer.renderToStaticMarkup(
          <>
            {Carousel({
              ...Carousel.args,
            })}
          </>
        ),
        modifier_classes: 'l-section--dark l-section--purple-black',
      })
    )}
    {parse(
      sectionTwigTemplate({
        has_constrain: true,
        section_kicker: 'Latest Updates',
        section_title: 'SLAC News Center',
        section_title_url: '#0',
        section_content: ReactDOMServer.renderToStaticMarkup(
          <>
            {ExtraLargeCardWithRightText(ExtraLargeCardWithRightText.args)}
            {parse(
              gridTwigTemplate({
                grid_content: ReactDOMServer.renderToStaticMarkup(
                  <>
                    {Card(Card.args)}
                    {Card(Card.args)}
                    {Card(Card.args)}
                  </>
                ),
                num_of_cols: 3,
              })
            )}
          </>
        ),
        section_buttons: `
<a href="0" class="c-button c-button--chevron">News Archive</a>
<a href="0" class="c-button c-button--chevron">Media Mentions</a>
<a href="0" class="c-button c-button--chevron">Media Resources</a>
`,
      })
    )}
    {parse(
      sectionTwigTemplate({
        has_constrain: true,
        section_kicker: 'SLAC Events',
        section_title: "What's Happening",
        section_title_url: '#0',
        section_content: gridTwigTemplate({
          grid_content: ReactDOMServer.renderToStaticMarkup(
            <>
              {EventCard(EventCard.args)}
              {EventCard(EventCard.args)}
            </>
          ),
          num_of_cols: 2,
        }),
        modifier_classes:
          'l-section--dark l-section--cutout l-section--horizontal',
      })
    )}
    {parse(
      sectionTwigTemplate({
        has_constrain: true,
        section_kicker: false,
        section_title: false,
        section_content: ReactDOMServer.renderToStaticMarkup(
          <>
            {FiftyFifty({
              col_1: ReactDOMServer.renderToStaticMarkup(
                <>{Quote(Quote.args)}</>
              ),
              col_2: ReactDOMServer.renderToStaticMarkup(
                <>
                  {FigureWithVideo({ ...globalData, ...FigureWithVideo.args })}
                </>
              ),
            })}
          </>
        ),
        modifier_classes: 'l-section--pattern',
      })
    )}
    {parse(
      sectionTwigTemplate({
        has_constrain: true,
        section_kicker: 'Dig Deeper',
        section_title: 'Explore SLAC',
        section_title_url: '#0',
        section_content: gridTwigTemplate({
          grid_content: ReactDOMServer.renderToStaticMarkup(
            <>
              {SmallCard({
                ...SmallCard.args,
                kicker: 'Public Tours',
                title: 'Take an Interactive or Virtual Tour',
              })}
              {SmallCard({
                ...SmallCard.args,
                kicker: 'The Basics',
                title: 'SLAC Science Explained',
              })}
              {SmallCard({
                ...SmallCard.args,
                kicker: 'Media Resources',
                title: 'Images, Videos, and More',
              })}
              {SmallCard({
                ...SmallCard.args,
                kicker: 'Lab Overview',
                title: 'Brochures & Fact Sheets',
              })}
            </>
          ),
          num_of_cols: 4,
        }),
        modifier_classes: 'l-section--yellow',
      })
    )}
    {parse(
      sectionTwigTemplate({
        has_constrain: true,
        section_kicker: 'Quick Links',
        section_title: 'Resources',
        section_title_url: '#0',
        section_content: gridTwigTemplate({
          grid_content: ReactDOMServer.renderToStaticMarkup(
            <>
              {VerticalLinkCard({
                ...VerticalLinkCard.args,
                title: 'For Facility Users',
                card_links: [
                  '<a href="https://userportal.slac.stanford.edu/" class="c-arrow-link">Facility User Portal</a>',
                  '<a href="#0" class="c-arrow-link">SLAC User Organization (SLUO)</a>',
                  '<a href="#0" class="c-arrow-link">FACET-II Users</a>',
                  '<a href="#0" class="c-arrow-link">LCLS Users</a>',
                  '<a href="#0" class="c-arrow-link">SSRL Users</a>',
                  '<a href="#0" class="c-arrow-link">Coming to SLAC</a>',
                ],
              })}
              {VerticalLinkCard({
                ...VerticalLinkCard.args,
                title: 'For Industry Partners',
                card_links: [
                  '<a href="#0" class="c-arrow-link">SLAC Strategic Partnership</a>',
                  '<a href="#0" class="c-arrow-link">Laboratory Directed Research & Partnerships (LDRD)</a>',
                  '<a href="#0" class="c-arrow-link">Technology Innovation Directorate</a>',
                  '<a href="#0" class="c-arrow-link">Suppliers & Vendors</a>',
                ],
              })}
              {VerticalLinkCard(VerticalLinkCard.args)}
              {VerticalLinkCard({
                ...VerticalLinkCard.args,
                title: 'For Facility Users',
                card_links: [
                  '<a href="https://userportal.slac.stanford.edu/" class="c-arrow-link">Facility User Portal</a>',
                  '<a href="#0" class="c-arrow-link">SLAC User Organization (SLUO)</a>',
                  '<a href="#0" class="c-arrow-link">FACET-II Users</a>',
                  '<a href="#0" class="c-arrow-link">LCLS Users</a>',
                  '<a href="#0" class="c-arrow-link">SSRL Users</a>',
                  '<a href="#0" class="c-arrow-link">Coming to SLAC</a>',
                ],
              })}
              {VerticalLinkCard({
                ...VerticalLinkCard.args,
                title: 'For Industry Partners',
                card_links: [
                  '<a href="#0" class="c-arrow-link">SLAC Strategic Partnership</a>',
                  '<a href="#0" class="c-arrow-link">Laboratory Directed Research & Partnerships (LDRD)</a>',
                  '<a href="#0" class="c-arrow-link">Technology Innovation Directorate</a>',
                  '<a href="#0" class="c-arrow-link">Suppliers & Vendors</a>',
                ],
              })}
              {VerticalLinkCard(VerticalLinkCard.args)}
            </>
          ),
          num_of_cols: 3,
        }),
        modifier_classes: 'l-section--gray-gradient',
      })
    )}
  </PageWrapper>
);
Homepage.args = {
  ...globalData,
  bodyClasses: 'has-transparent-nav',
  hideBreadcrumbs: true,
  hideSocialLinks: true,
};

export { Homepage };
