import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import globalData from '../00-config/storybook.global-data.yml';
import PageWrapper from './page-wrappers/default.jsx';
import twigTemplate from '../04-templates/page/page.twig';
import sectionTwigTemplate from '../02-layouts/section/section.twig';
import expandableContentTemplate from '../03-components/expandable-grid/expandable-grid.twig';
import { ArticleHero } from '../03-components/article-hero/article-hero.stories';
import { Quote } from '../03-components/quote/quote.stories';
import {
  FiftyFiftyLeftFadeIn,
  FiftyFiftyRightFadeIn,
} from '../03-components/fifty-fifty/fifty-fifty.stories';
import { WYSIWYG } from '../03-components/wysiwyg/wysiwyg.stories';
import { SectionWithBlueGreenGradient } from '../02-layouts/section/section.stories';
import { PromoBox } from '../03-components/promo-box/promo-box.stories';
import { Default as Card } from '../03-components/card/card.stories';
import {
  FigureCenteredWide,
  FigureWithVideo,
  FigureWithVideoCentered,
} from '../03-components/figure/figure.stories';
import { Carousel } from '../03-components/carousel/carousel.stories';
import { CalloutBox } from '../03-components/callout-box/callout-box.stories';
import { TagList } from '../03-components/tag-list/tag-list.stories';

export default {
  title: 'Pages/Article',
  parameters: {
    controls: {
      include: ['show_admin_info'],
    },
  },
};

// For an example of reusing the same content as the Article component,
// see Page page.
const articleDemoContent = `
  ${ReactDOMServer.renderToStaticMarkup(
    WYSIWYG({
      content: `<p>Scientists have taken a major step forward in harnessing machine learning to accelerate the design for better batteries: Instead of using it just to speed up scientific analysis by looking for patterns in data, as researchers generally do, they combined it with knowledge gained from experiments and equations guided by physics to discover and explain a process that shortens the lifetimes of fast-charging lithium-ion batteries.</p>
  <p>It was the first time this approach, known as “scientific machine learning,” has been applied to battery cycling, said Will Chueh, an associate professor at Stanford University and investigator with the Department of Energy’s SLAC National Accelerator Laboratory who led the study. </p>`,
    })
  )}
  ${ReactDOMServer.renderToStaticMarkup(
    FigureWithVideoCentered(FigureWithVideoCentered.args)
  )}
  ${ReactDOMServer.renderToStaticMarkup(
    WYSIWYG({
      content: `<p>The research, reported today in Nature Materials, is the latest result from a collaboration between Stanford, SLAC, the Massachusetts Institute of Technology and Toyota Research Institute (TRI). The goal is to bring together foundational research and industry know-how to develop a long-lived electric vehicle battery that can be charged in 10 minutes.</p>`,
    })
  )}
  ${ReactDOMServer.renderToStaticMarkup(Quote(Quote.args))}
  ${ReactDOMServer.renderToStaticMarkup(
    WYSIWYG({
      content: `<p>“Battery technology is important for any type of electric powertrain," said Patrick Herring, senior research scientist for Toyota Research Institute. “By understanding the fundamental reactions that occur within the battery we can extend its life, enable faster charging and ultimately design better battery materials. We look forward to building on this work through future experiments to achieve lower-cost, better-performing batteries.”</p>`,
    })
  )}
  ${ReactDOMServer.renderToStaticMarkup(
    FigureCenteredWide(FigureCenteredWide.args)
  )}
  ${ReactDOMServer.renderToStaticMarkup(
    WYSIWYG({
      content: `<h2>A trio of advances</h2>
<p>The new study builds on two previous advances where the group used more conventional forms of machine learning to dramatically accelerate both battery testing and the process of winnowing down many possible charging methods to find the ones that work best.</p>
  ${ReactDOMServer.renderToStaticMarkup(CalloutBox(CalloutBox.args))}
    <p>While these studies allowed researchers to make much faster progress – reducing the time needed to determine battery lifetimes by 98%, for instance – they didn’t reveal the underlying physics or chemistry that made some batteries last longer than others, as the latest study did.</p>
  <h3>Combining all three approaches</h3>
  <p>Combining all three approaches could potentially slash the time needed to bring a new battery technology from the lab bench to the consumer by as much as two-thirds, Chueh said.</p>
  <p>“In this case, we are teaching the machine how to learn the physics of a new type of failure mechanism that could help us design better and safer fast-charging batteries,” Chueh said. “Fast charging is incredibly stressful and damaging to batteries, and solving this problem is key to expanding the nation’s fleet of electric vehicles as part of the overall strategy for fighting climate change.”</p>
  <p>The new combined approach can also be applied to developing the grid-scale battery systems needed for a greater deployment of wind and solar electricity, which will become even more urgent as the nation pursues recently announced Biden Administration goals of eliminating fossil fuels from electric power generation by 2035 and achieving net-zero carbon emissions by 2050.</p>`,
    })
  )}
    ${sectionTwigTemplate({
      section_content: ReactDOMServer.renderToStaticMarkup(
        FiftyFiftyLeftFadeIn({
          ...FiftyFiftyLeftFadeIn.args,
          has_constrain: true,
        })
      ),
    })}
    ${ReactDOMServer.renderToStaticMarkup(
      WYSIWYG({
        content: `<p>quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra vitae congue eu, consequat ac felis donec et odio pellentesque diam volutpat commodo sed. To look at this process in more detail, the team observed the behavior of cathode particles made of nickel, manganese and cobalt, a combination known as NMC that’s one of the most widely used materials in electric vehicle batteries. These particles absorb lithium ions when the battery discharges and release them when it charges.</p>`,
      })
    )}
    ${sectionTwigTemplate({
      section_content: ReactDOMServer.renderToStaticMarkup(
        FiftyFiftyRightFadeIn({
          ...FiftyFiftyRightFadeIn.args,
          has_constrain: true,
        })
      ),
    })}
    ${ReactDOMServer.renderToStaticMarkup(
      WYSIWYG({
        content: `<p>quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra vitae congue eu, consequat ac felis donec et odio pellentesque diam volutpat commodo sed. To look at this process in more detail, the team observed the behavior of cathode particles made of nickel, manganese and cobalt, a combination known as NMC that’s one of the most widely used materials in electric vehicle batteries. These particles absorb lithium ions when the battery discharges and release them when it charges.</p>`,
      })
    )}
    ${sectionTwigTemplate({
      section_content: ReactDOMServer.renderToStaticMarkup(
        FiftyFiftyLeftFadeIn({
          ...FiftyFiftyLeftFadeIn.args,
          has_constrain: true,
          col_1: ReactDOMServer.renderToStaticMarkup(Quote(Quote.args)),
          col_2: ReactDOMServer.renderToStaticMarkup(
            FigureWithVideo(FigureWithVideo.args)
          ),
        })
      ),
    })}
    ${ReactDOMServer.renderToStaticMarkup(
      WYSIWYG({
        content: `<h2>The rich-get-richer effect</h2>
<p>Until now, scientists had assumed that the differences between particles were insignificant and that their ability to store and release ions was limited by how fast lithium could move inside the particles, Kang said. In this way of seeing things, lithium ions flow in and out of all the particles at the same time and at roughly the same speed.</p>
<p>But the new approach revealed that the particles themselves control how fast lithium ions move out of cathode particles when a battery charges, he said. Some particles immediately release a lot of their ions while others release very few or none at all. And the quick-to-release particles go on releasing ions at a faster rate than their neighbors ­– a positive feedback, or “rich get richer,” effect that had not been identified before.</p>`,
      })
    )}
`;

// For an example of customizing the content block on a demo page,
// see Page.
const articleContent = args =>
  twigTemplate({
    ...args,
    title:
      'In a leap for battery research, machine learning gets scientific smarts',
    date_format: 'medium-date',
    year: {
      long: '2021',
    },
    month: {
      long: 'March',
    },
    day: {
      short: '8',
    },
    author_name: 'Glennda Chui',
    content: articleDemoContent,
    lede: '<p>The latest advance from a research collaboration with industry could dramatically accelerate the development of sturdier batteries for fast-charging electric vehicles.</p>',
    toc_links: [
      {
        url: '#0',
        title: 'A trio of advances',
      },
      {
        url: '#1',
        title: 'Zooming in for closeups',
      },
      {
        url: '#2',
        title: 'The-rich-get-richer effect',
      },
      {
        url: '#3',
        title: 'Image Gallery',
      },
    ],
  });

const Article = args => (
  <PageWrapper hero={ArticleHero(ArticleHero.args)}>
    {parse(articleContent(args))}
    {PromoBox(PromoBox.args)}
    {parse(
      sectionTwigTemplate({
        section_content: ReactDOMServer.renderToStaticMarkup(
          WYSIWYG({
            content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio. </p>
  <p>Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra vitae congue eu, consequat ac felis donec et odio pellentesque diam volutpat commodo sed</p>
  <p>Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra vitae congue eu, consequat ac felis donec et odio pellentesque diam volutpat commodo sed</p>`,
          })
        ),
        modifier_classes: 'l-section--white',
      })
    )}
    {parse(
      sectionTwigTemplate({
        has_constrain: true,
        section_content: ReactDOMServer.renderToStaticMarkup(
          Carousel(Carousel.args)
        ),
        modifier_classes: 'l-section--white',
        section_kicker: 'Image Gallery',
        section_title: 'Arrillaga Science Center Batter Research',
        section_buttons:
          '<a href="https://flickr.com" class="c-button c-button--outline">See Flickr Album</a>',
      })
    )}
    {parse(
      sectionTwigTemplate({
        has_constrain: true,
        modifier_classes: 'l-section--white',
        constrain_modifier_classes: 'l-constrain--small',
        section_content: ReactDOMServer.renderToStaticMarkup(
          <>
            {WYSIWYG({
              content: `<hr /><p class="c-small-paragraph">Editor's note: This story is based on a <a href="#0">press release</a> from Fermilab.</p>
<p class="c-small-paragraph">This research was funded by Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien eleifend vitae mattis viverra ut scelerisque proin. Risus proin dignissim amet ac. Diam nisi, pretium non sem sed vel nam. Ut eu egestas mauris in aenean. Sit ornare pretium, donec elit.</p>
<h5>Citation</h5>
<p class="c-small-paragraph">Jungjin Park et al., Nature Materials, 8 March 2021 [10.1038/s41563-021-00936-1]</p>
<h5>Contact</h5>
<p class="c-small-paragraph">For questions or comments, contact the SLAC Lorem ipsum dolor sit amet at <a href="mailto:name@slac.stanford.edu">name@slac.stanford.edu</a>.</p>
<hr />
<p class="c-small-paragraph"><i>SLAC is a vibrant multiprogram laboratory that explores how the universe works at the biggest, smallest and fastest scales and invents powerful tools used by scientists around the globe. With research spanning particle physics, astrophysics and cosmology, materials, chemistry, bio- and energy sciences and scientific computing, we help solve real-world problems and advance the interests of the nation.</i></p> 
<p class="c-small-paragraph"><i>SLAC is operated by Stanford University for the U.S. Department of Energy’s Office of Science. The Office of Science is the single largest supporter of basic research in the physical sciences in the United States and is working to address some of the most pressing challenges of our time.</i></p>`,
            })}
            {TagList(TagList.args)}
          </>
        ),
      })
    )}
    {SectionWithBlueGreenGradient({
      ...SectionWithBlueGreenGradient.args,
      section_content: expandableContentTemplate({
        ...globalData,
        grid_items: [
          ReactDOMServer.renderToStaticMarkup(<>{Card(Card.args)}</>),
          ReactDOMServer.renderToStaticMarkup(<>{Card(Card.args)}</>),
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
Article.args = {
  ...globalData,
};

export { Article };
