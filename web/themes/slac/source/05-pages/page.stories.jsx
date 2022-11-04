import React from 'react';
import ReactDOMServer from 'react-dom/server';

import PageWrapper from './page-wrappers/default.jsx';
import { Page as PageTemplate } from '../04-templates/page/page.stories';
import { SideMenu } from '../03-components/menu/menu--side/menu--side.stories';
import { WYSIWYG } from '../03-components/wysiwyg/wysiwyg.stories';
import {
  FigureCenteredWide,
  FigureRight,
  FigureWithVideoCentered,
} from '../03-components/figure/figure.stories';
import {
  FiftyFiftyLeftFadeIn,
  FiftyFiftyRightFadeIn,
} from '../03-components/fifty-fifty/fifty-fifty.stories';
import { PromoBox } from '../03-components/promo-box/promo-box.stories';
import { SectionWrapper } from '../06-utility/storybookHelper';

export default {
  title: 'Pages/Page',
  parameters: {
    controls: {
      include: ['show_admin_info', 'has_sidebar'],
    },
  },
};

const Page = args => (
  <PageWrapper>
    {PageTemplate({
      ...args,
      title: 'About',
      content: ReactDOMServer.renderToStaticMarkup(
        <>
          <SectionWrapper>
            {WYSIWYG({
              content: ReactDOMServer.renderToStaticMarkup(
                <>
                  <p className="c-lede">
                    Description teaser is informative, intriguing, and
                    compelling to your target audiences. Keep it friendly and
                    approachable with a brief well-written overview of your
                    business and services. Tell just enough of your story, make
                    it enticing that the reader begs for more.{' '}
                  </p>
                  <p>
                    The universe is expanding but astrophysicists aren’t sure
                    exactly how fast that expansion is happening. In a paper
                    published on the cover of{' '}
                    <a href="#">Physical Review Letters in May</a>, researchers
                    from the Department of Energy’s SLAC National Accelerator
                    Laboratory.
                  </p>
                </>
              ),
            })}
          </SectionWrapper>
          {FigureWithVideoCentered(FigureWithVideoCentered.args)}
          <SectionWrapper>
            {WYSIWYG({
              content: ReactDOMServer.renderToStaticMarkup(
                <>
                  <p>
                    Over the course of six years, DES surveyed 5,000 square
                    degrees – almost one-eighth of the entire sky – in 758
                    nights of observation, cataloguing hundreds of millions of
                    objects. The results announced today draw on data from the
                    first three years – 226 million galaxies observed over 345
                    nights.
                  </p>
                  <h3>New limits and intriguing hints</h3>
                  <p>
                    To test cosmologists’ current model of the universe, DES
                    scientists compared their results with measurements from the
                    European Space Agency’s orbiting Planck observatory. Planck
                    used light signals known as the cosmic microwave background
                    to peer back to the early universe, just 400,000 years after
                    the Big Bang.
                  </p>
                </>
              ),
            })}
          </SectionWrapper>
          {FiftyFiftyLeftFadeIn({
            ...FiftyFiftyLeftFadeIn.args,
            col_2: ReactDOMServer.renderToStaticMarkup(
              WYSIWYG({
                content: ReactDOMServer.renderToStaticMarkup(
                  <>
                    <h3>Distance, speed and sound</h3>
                    <p>
                      Cosmologists have known for nearly a century that the
                      cosmos is expanding, and in that time they have settled on
                      two main ways to measure that expansion. One method is the
                      cosmic distance ladder, a series of steps that help
                      estimate the distance to far-away supernovae. By examining
                      the spectrum of light from these supernovae, scientists
                      can calculate how quickly they’re receding from us, then
                      divide by distance to estimate the Hubble constant. (The
                      Hubble constant is usually measured in kilometers per
                      second per megaparsec, reflecting the fact that space
                      itself is growing, so that more distant
                    </p>
                  </>
                ),
              })
            ),
          })}
          <SectionWrapper>
            {WYSIWYG({
              content: ReactDOMServer.renderToStaticMarkup(
                <>
                  <p>
                    objects recede from us faster than nearer objects.)
                    Astrophysicists can also estimate the constant from ripples
                    in the cosmic microwave background radiation, or CMB. Those
                    ripples result from sound waves traveling through plasma in
                    the early universe. By measuring the ripples’ size they can
                    infer how long ago and how far away the CMB light we see
                    today was created.
                  </p>
                  <h3>A lens from the past</h3>
                  <p>
                    But there is a way to measure distances more directly, based
                    on what are called strong gravitational lenses. Gravity
                    bends spacetime itself and with it the path light takes
                    through the cosmos. One special case is when a very massive
                    object, such as a galaxy, bends the light of a distant
                    object around such that light reaches us along multiple
                    different paths, effectively creating multiple images of the
                    same background object.
                  </p>
                </>
              ),
            })}
          </SectionWrapper>
          {FiftyFiftyRightFadeIn({
            ...FiftyFiftyRightFadeIn.args,
            col_1: ReactDOMServer.renderToStaticMarkup(
              WYSIWYG({
                content: ReactDOMServer.renderToStaticMarkup(
                  <>
                    <h3>The deep field</h3>
                    <p>
                      Ten regions of the sky were chosen as “deep fields” that
                      the Dark Energy Camera imaged repeatedly throughout the
                      survey. Stacking those images together allowed the
                      scientists to glimpse more distant galaxies. The team then
                      used the redshift information from the deep fields to
                      calibrate measurements of redshift in the rest of the
                      survey region. This and other advancements in measurements
                      and modeling, coupled with a threefold increase in data
                      compared to the first year, enabled the team to pin down
                      the density and clumpiness of the universe with
                      unprecedented precision. Along with the analysis of the
                      weak-measurement at
                    </p>
                  </>
                ),
              })
            ),
          })}
          <SectionWrapper>
            {WYSIWYG({
              content: ReactDOMServer.renderToStaticMarkup(
                <>
                  <p>
                    around 73 kilometers per second per megaparsec with a
                    precision of 2%. That's in agreement with estimates made
                    with the local distance ladder method, but in tension with
                    the cosmic microwave background measurements under the
                    standard cosmological model assumptions.
                  </p>
                  <h3>Galaxy mass distribution assumptions</h3>
                  <p>
                    But something didn’t sit right with Birrer: The models of
                    galaxy structure previous studies relied on might not have
                    been accurate enough to conclude that the Hubble constant
                    was different from estimates based on the cosmic microwave
                    background. “I went to my colleagues and said, ‘I want to
                    conduct a study that does not rely on those assumptions,’”
                    Birrer said.
                  </p>
                </>
              ),
            })}
          </SectionWrapper>
          {FigureCenteredWide(FigureCenteredWide.args)}
          <SectionWrapper>
            {WYSIWYG({
              content: ReactDOMServer.renderToStaticMarkup(
                <>
                  {FigureRight({
                    ...FigureRight.args,
                    caption:
                      '<i>(Firstname Lastname/SLAC National Accelerator Laboratory)</i>',
                  })}
                  <p>
                    In their place, Birrer proposed to investigate a range of
                    additional gravitational lenses to make more observationally
                    grounded estimate of the mass and structure of the lensing
                    galaxies to replace previous assumptions. The new avenue
                    Birrer and the team, TDCOSMO, were undertaking was
                    deliberately held blind – meaning the entire analysis was
                    performed without knowing the resulting outcome on the
                    Hubble constant – to avoid experimenter bias, a procedure
                    established already in the previous analyses of the team and
                    an integral part in moving forward, Birrer said.
                  </p>
                  <p>
                    Based on this new analysis with significantly fewer
                    assumptions applied to the seven lensing galaxies with time
                    delays the team has analyzed in previous studies, the team
                    arrived at a higher value of the Hubble constant, around 74
                    kilometers per second per megaparsec, but with greater
                    uncertainty – enough so that their value was consistent with
                    both high and low estimates of the Hubble constant.
                  </p>
                  <p>
                    <a href="#0" className="c-button c-button--chevron">
                      Optional Button
                    </a>
                    <a href="#0" className="c-button c-button--chevron">
                      Button
                    </a>
                  </p>
                </>
              ),
            })}
          </SectionWrapper>
          {/* {PromoBox(PromoBox.args)} */}
        </>
      ),
    })}
  </PageWrapper>
);
Page.args = {
  ...PageTemplate.args,
  has_sidebar: true,
  sidebar: ReactDOMServer.renderToStaticMarkup(SideMenu(SideMenu.args)),
};
export { Page };
