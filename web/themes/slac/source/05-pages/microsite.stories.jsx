import React from 'react';
import parse from 'html-react-parser';
import ReactDOMServer from 'react-dom/server';

import PageWrapper from './page-wrappers/microsite.jsx';
import { WYSIWYG } from '../03-components/wysiwyg/wysiwyg.stories';
import { MicrositeHero } from '../03-components/microsite-hero/microsite-hero.stories';
import { FigureCenteredWide } from '../03-components/figure/figure.stories';
import sectionTemplate from '../02-layouts/section/section.twig';
import { Accordion } from '../03-components/accordion/accordion.stories';
import accordionStoryData from '../03-components/accordion/accordion.yml';
import accordionItemTemplate from '../03-components/accordion/accordion-item.twig';
import globalData from '../00-config/storybook.global-data.yml';
import { FiftyFifty } from '../03-components/fifty-fifty/fifty-fifty.stories';
import { Map } from '../03-components/map/map.stories';
import { WideCard } from '../03-components/wide-card/wide-card.stories';
import { OverlapImage } from '../03-components/overlap-image/overlap-image.stories';
import { PromoBox } from '../03-components/promo-box/promo-box.stories';
import accordionTemplate from '../03-components/accordion/accordion.twig';

export default {
  title: 'Pages/Microsite',
  parameters: {
    controls: {
      include: ['show_admin_info'],
    },
  },
};

const TourTypes = args =>
  accordionItemTemplate({
    ...globalData,
    accordion_title: 'Virtual Tour with live guides',
    accordion_content: ReactDOMServer.renderToStaticMarkup(
      FiftyFifty({
        col_1: ReactDOMServer.renderToStaticMarkup(
          WYSIWYG({
            content: `<p>Join an hour-long virtual tour via Zoom to explore some of our facilities and learn about our exciting research, hosted by SLAC guides.</p>`,
          })
        ),
        col_2: ReactDOMServer.renderToStaticMarkup(
          WYSIWYG({
            content: `
<h3>Things to know before registering</h3>
<ul class="c-small-paragraph">
  <li>Virtual public tours are being offered via Zoom by registration only.</li>
  <li>The tour is designed for those 12 years of age and above. People 17 years old and younger are welcome, but a parent or a legal guardian must  join the minor for the entire duration of the tour and register for both parties.</li>
  <li>A Zoom webinar link will be sent to all registered participants one day prior to the virtual public tour. You may watch with those you registered for on your personal device but please do not share the link with other family and friends.</li>
  <li>In some cases, SLAC may need to cancel your tour. You will be notified of the cancellation as soon as possible, using the email address you provided during registration.</li>
</ul>`,
          })
        ),
      })
    ),
    ...args,
  });

const accordionData = accordionStoryData.accordions;

const Microsite = args => (
  <PageWrapper {...args}>
    <a id="intro" className="js-microsite-section" />
    {WYSIWYG({
      content:
        '<p class="c-lede">Sign up for a virtual tour with live guides, launch our interactive, self-paced tour or register for an in-person tour at SLAC. The tour destinations are designed to give you the most exciting and informative views of the lab. We are continuously adding on new stops and information about our sciences.</p>',
    })}
    {FigureCenteredWide({ ...FigureCenteredWide.args, caption: false })}
    <a id="tour-types" className="js-microsite-section" />
    {parse(
      sectionTemplate({
        section_kicker: 'Tour Types',
        section_title: 'Pick your tour experience',
        has_constrain: true,
        section_content: ReactDOMServer.renderToStaticMarkup(
          Accordion({
            modifier_classes: 'c-accordion--large',
            accordion_items: [
              TourTypes({
                accordion_is_open: false,
              }),
              TourTypes({
                accordion_title: 'Educational tour',
              }),
              TourTypes({
                accordion_title: 'In-person educational tour',
              }),
              TourTypes({
                accordion_title: 'Self-guided tour',
              }),
              TourTypes({
                accordion_title: 'Recorded tour',
              }),
              TourTypes({
                accordion_title: 'On-site tour',
              }),
            ].join(''),
          })
        ),
      })
    )}
    {Map(Map.args)}
    <a id="facility-stops" className="js-microsite-section" />
    {parse(
      sectionTemplate({
        section_kicker: 'Our Facilities',
        section_title: 'Tour stops',
        section_intro: `<p>Tour stops, both virtual and in-person, have been selected for viewing and practical   considerations, as some areas of our lab are restricted to the public. We are continuously adding on new stops and information about our sciences.</p>`,
        has_constrain: true,
        section_content: ReactDOMServer.renderToStaticMarkup(
          <>
            {WideCard(WideCard.args)}
            {WideCard(WideCard.args)}
            {WideCard(WideCard.args)}
            {WideCard(WideCard.args)}
            {WideCard(WideCard.args)}
            {WideCard(WideCard.args)}
            {WideCard(WideCard.args)}
            {WideCard(WideCard.args)}
            {WideCard(WideCard.args)}
          </>
        ),
      })
    )}
    {FigureCenteredWide({ ...FigureCenteredWide.args, caption: false })}
    <a id="visitor-info" className="js-microsite-section" />
    {parse(
      sectionTemplate({
        section_kicker: 'What to Expect',
        section_title: 'Visitor Information',
        has_constrain: true,
        section_content: ReactDOMServer.renderToStaticMarkup(
          FiftyFifty({
            col_1: ReactDOMServer.renderToStaticMarkup(
              parse(
                accordionTemplate({
                  accordion_items: accordionData
                    .map(item =>
                      accordionItemTemplate({
                        ...globalData,
                        ...item,
                        accordion_title_element: 'h4',
                        accordion_is_open: false,
                      })
                    )
                    .join(''),
                  accordion_title: 'Virtual Tour FAQs',
                  title_tag: 'h3',
                })
              )
            ),
            col_2: ReactDOMServer.renderToStaticMarkup(
              parse(
                accordionTemplate({
                  accordion_items: accordionData
                    .map(item =>
                      accordionItemTemplate({
                        ...globalData,
                        ...item,
                        accordion_title_element: 'h4',
                        accordion_is_open: false,
                      })
                    )
                    .join(''),
                  accordion_title: 'In-person Tour FAQs',
                  title_tag: 'h3',
                })
              )
            ),
          })
        ),
      })
    )}
    {OverlapImage({
      ...OverlapImage.args,
      icon: false,
      position: 'top-left',
      overlap_image_content: `
<div class="c-kicker">In Person Tour Guidelines</div>
<h2>Public Tour Guidelines</h2>
<ul class="c-small-paragraph">
  <li>SLAC National Accelerator Laboratory offers free public tours</li>
  <li>Tours last approximately 90 minutes and usually involve a visit to the lab's 2-mile-long linear accelerator, now driving the world's brightest X-ray source</li>
  <li>Tours are offered twice a month, by registration only</li>
  <li>All public tours meet in the SLAC Orientation Theater (Room 1010), Building 53, 15 minutes prior to tour time. Closed-toed shoes are required.</li>
  <li>Tours are open to all visitors 12 years of age and above. Children 12-17 years of age must be accompanied by an adult; tickets are required for both the minor and the escorting adult.</li>
</ul>      
`,
    })}
    {parse(
      sectionTemplate({
        section_content: ReactDOMServer.renderToStaticMarkup(
          PromoBox({
            ...PromoBox.args,
            promo_box_content: false,
            promo_box_button: false,
            promo_box_kicker: 'Coming Onsite',
            promo_box_title: 'Our visitor center',
          })
        ),
      })
    )}
  </PageWrapper>
);
Microsite.args = {
  hero: MicrositeHero({
    ...MicrositeHero.args,
    microsite_hero_title: 'Public Tours',
  }),
};
export { Microsite };
