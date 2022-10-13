import React from 'react';

import PageWrapper from './page-wrappers/default.jsx';
import { ImageHero } from '../03-components/hero-bg-image/hero-bg-image.stories';
import sectionTwigTemplate from '../02-layouts/section/section.twig';
import ReactDOMServer from 'react-dom/server';
import { WYSIWYG } from '../03-components/wysiwyg/wysiwyg.stories';
import parse from 'html-react-parser';
import { TaglineLong } from '../03-components/tagline/tagline--long/tagline--long.stories';
import { OverlapImage } from '../03-components/overlap-image/overlap-image.stories';
import { PromoBox } from '../03-components/promo-box/promo-box.stories';

export default {
  title: 'Pages/Our Story',
  parameters: {
    controls: {
      include: ['show_admin_info'],
    },
  },
};

const OurStory = args => (
  <PageWrapper {...args}>
    {parse(
      sectionTwigTemplate({
        section_content: ReactDOMServer.renderToStaticMarkup(
          WYSIWYG({
            content: `<p class="c-lede">SLAC began in 1962 with construction of a 2-mile-long electron accelerator that would take particle physics to new heights. Today we are known for conducting a broad range of research, leading large-scale science projects, and welcoming scientists around the world to come use our X-rays, lasers and electron beams for groundbreaking experiments. Learn more about our incredible scientific legacy, who we are and what we stand for, and take a virtual tour to see it for yourself.</p>`,
          })
        ),
      })
    )}
    {TaglineLong(TaglineLong.args)}
    {parse(
      sectionTwigTemplate({
        section_content: ReactDOMServer.renderToStaticMarkup(
          OverlapImage({
            ...OverlapImage.args,
            overlap_image_content: `<div class="c-kicker">An Illustrious Past</div>
<h2><a href="#0" class="c-arrow-link">SLAC History and legacy</a></h2>
<p>Hatched in 1956, the bold plan to build our accelerator was known as project “M” for monster, the biggest government-funded science project built to date.  While our research has expanded in many directions since then, the SLAC linac is still the lab’s backbone, generating incredibly brilliant pulses for our pioneering X-ray free-electron laser. Our path to becoming a multipurpose lab includes four Nobel prizes, the first website in North America and a stretch of highway to nowhere.</p>`,
            position: 'bottom-right',
            icon: false,
          })
        ),
        has_constrain: true,
      })
    )}
    {PromoBox({
      ...PromoBox.args,
      promo_box_kicker: 'Our Purpose',
      promo_box_title: 'Our Mission Vision & Values',
      promo_box_button:
        '<a href="#0" class="c-button c-button--outline c-button--download">Download Brochure</a>',
      promo_box_content: false,
    })}
    {parse(
      sectionTwigTemplate({
        section_content: ReactDOMServer.renderToStaticMarkup(
          OverlapImage({
            ...OverlapImage.args,
            overlap_image_content: `<div class="c-kicker">Public Tours</div>
<h2><a href="#0" class="c-arrow-link--white">Visit our lab</a></h2>
<p>Sign up for an in-person tour at SLAC led by a guide who can answer your questions, sign-up for a guided virtual tour or explore the lab on your own with our virtual tour any time.</p>
<p><a href="#0" class="c-button c-button--secondary c-button--chevron">In-person tours</a><a href="#0" class="c-button c-button--secondary c-button--chevron">Virtual tour</a></p>`,
            position: 'bottom-left',
            box_color: 'purple',
          })
        ),
        has_constrain: true,
      })
    )}
  </PageWrapper>
);
OurStory.args = {
  hero: ImageHero({
    ...ImageHero.args,
    hero_kicker: 'Then and Now',
    hero_title: 'Our Story',
  }),
  bodyClasses: 'has-transparent-nav has-inverse-nav',
};
export { OurStory };
