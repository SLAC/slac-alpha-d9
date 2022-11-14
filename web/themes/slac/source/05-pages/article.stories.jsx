import React from 'react';
import ReactDOMServer from 'react-dom/server';

import globalData from '../00-config/storybook.global-data.yml';

import PageWrapper from './page-wrappers/default.jsx';
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
import {
  GridWrapper,
  SectionWithPaddingWrapper,
  SectionWrapper,
  WysiwygWrapper,
} from '../06-utility/storybookHelper';
import { NewsArticle } from '../04-templates/news-article-detail/news-article-detail.stories';
import { HeroWithoutOverlay } from '../03-components/article-hero/article-hero.stories';
import { Quote } from '../03-components/quote/quote.stories';
import { TagList } from '../03-components/tag-list/tag-list.stories';
import { SectionWithBlueGreenGradient } from '../02-layouts/section/section.stories';
import { News } from '../03-components/card/card.stories';

export default {
  title: 'Pages/News Article Detail',
  parameters: {
    controls: {
      include: ['show_admin_info', 'has_sidebar'],
    },
  },
};

const NewsArticleDetail = args => (
  <PageWrapper
    hero={HeroWithoutOverlay({
      ...HeroWithoutOverlay.args,
      showPageTitle: false,
    })}
  >
    {NewsArticle({
      ...args,
      title:
        'Gravitational lenses could hold the key to better estimates of the expansion of the universe',
      date: 'November 16, 2020',
      lede: 'SLAC cosmologists are using multiple images of the same quasars, produced by massive galaxies’ gravitational pull, to calibrate cosmic distances. Their work may help resolve long-standing debates about how quickly the universe is expanding.',
      author: '<a href="#0">Nathan Collins</a>',
      content: ReactDOMServer.renderToStaticMarkup(
        <>
          <SectionWrapper>
            {WYSIWYG({
              content: ReactDOMServer.renderToStaticMarkup(
                <>
                  <p>
                    The universe is expanding but astrophysicists aren’t sure
                    exactly how fast that expansion is happening – not because
                    there aren’t answers, but rather because the answers they
                    could give don’t agree.
                  </p>
                  <p>
                    Now, Simon Birrer, a postdoctoral fellow at Stanford
                    University and the Kavli Institute for Particle Physics and
                    Astrophysics at the Department of Energy’s SLAC National
                    Accelerator Laboratory, and an international team of
                    researchers have a new answer that may, once refined with
                    more data, help resolve the debate.{' '}
                  </p>
                </>
              ),
            })}
          </SectionWrapper>
          <SectionWithPaddingWrapper>
            {FigureWithVideoCentered(FigureWithVideoCentered.args)}
          </SectionWithPaddingWrapper>
          <SectionWrapper>
            <WysiwygWrapper>
              <p>
                That new answer is the result of revisiting a decades-old method
                called time-delay cosmography with new assumptions and
                additional data to derive a new estimate of the Hubble constant,
                a measure of the expansion of the Universe. Birrer and
                colleagues published their results November 20 in the journal{' '}
                <a href="https://www.aanda.org/">
                  <i>Astronomy and Astrophysics</i>
                </a>
                .
              </p>
              <p>
                “It’s a continuation of a large and successful decade-long
                effort by a large team, with a reset in certain key aspects of
                our analysis,” Birrer said, and a reminder that “we should
                always reconsider our assumptions. Our recent work is exactly in
                this spirit.”
              </p>
            </WysiwygWrapper>
          </SectionWrapper>
          <SectionWithPaddingWrapper>
            {FiftyFiftyLeftFadeIn({
              ...FiftyFiftyLeftFadeIn.args,
              col_2: ReactDOMServer.renderToStaticMarkup(
                WYSIWYG({
                  content: ReactDOMServer.renderToStaticMarkup(
                    <>
                      <h3>Distance, speed and sound</h3>
                      <p>
                        Cosmologists have known for nearly a century that the
                        cosmos is expanding, and in that time they have settled
                        on two main ways to measure that expansion. One method
                        is the cosmic distance ladder, a series of steps that
                        help estimate the distance to far-away supernovae. By
                        examining the spectrum of light from these supernovae,
                        scientists can calculate how quickly they’re receding
                        from us, then divide by distance to estimate the Hubble
                        constant. (The Hubble constant is usually measured in
                        kilometers per second per megaparsec, reflecting the
                        fact that space itself is growing, so that more distant
                        objects recede from us faster than nearer objects.)
                      </p>
                    </>
                  ),
                })
              ),
            })}
          </SectionWithPaddingWrapper>
          <SectionWrapper>
            <WysiwygWrapper>
              <p>
                Astrophysicists can also estimate the constant from ripples in
                the cosmic microwave background radiation, or CMB. Those ripples
                result from sound waves traveling through plasma in the early
                universe. By measuring the ripples’ size they can infer how long
                ago and how far away the CMB light we see today was created.
              </p>
              <p>
                Both approaches, however, have drawbacks. Sound-wave methods
                rely heavily on how sound travelled in the early universe, which
                depends in turn on the particular mix of types of matter at the
                time, on how long sound waves travelled before leaving their
                imprint on the CMB, and on assumptions about the expansion of
                the universe since that time. Meanwhile, cosmic distance ladder
                methods chain together a series of estimates, starting with
                radar estimates of the distance to the sun and parallax
                estimates of the distance to pulsating stars called cepheids.
                That introduces a chain of calibrations and measurements, each
                of which needs to be precise and accurate enough to ensure a
                reliable estimate of the Hubble constant.
              </p>
              <h3>A lens from the past</h3>
              <p>
                But there is a way to measure distances more directly, based on
                what are called strong gravitational lenses. Gravity bends
                spacetime itself and with it the path light takes through the
                cosmos. One special case is when a very massive object, such as
                a galaxy, bends the light of a distant object around such that
                light reaches us along multiple different paths, effectively
                creating multiple images of the same background object.
              </p>
            </WysiwygWrapper>
          </SectionWrapper>
          <SectionWithPaddingWrapper>
            {FiftyFiftyRightFadeIn({
              ...FiftyFiftyRightFadeIn.args,
              col_1: ReactDOMServer.renderToStaticMarkup(
                <WysiwygWrapper>
                  <p>
                    This phenomenon is more than just pretty. Back in the 1960s,
                    students of Einstein’s theory of gravity, general
                    relativity, showed they could use strong gravitational
                    lenses and the light they bend to more directly measure
                    cosmic distances – if they could measure the relative timing
                    along each path precisely enough and if they knew how matter
                    in the lensing galaxy was distributed.
                  </p>
                  <p>
                    Over the last decade, Birrer said, measurements became
                    precise enough to take this method, time-delay cosmography,
                    from idea to reality. Successive measurements and a
                    dedicated effort by the H0LiCOW, COSMOGRAIL, STRIDES, and
                    SHARP teams, now under the joint umbrella organization
                    TDCOSMO, culminated in a precise Hubble constant measurement
                    at around 73 kilometers per second per megaparsec with a
                    precision of 2%.
                  </p>
                </WysiwygWrapper>
              ),
            })}
          </SectionWithPaddingWrapper>
          <SectionWrapper>
            <WysiwygWrapper>
              <p>
                That's in agreement with estimates made with the local distance
                ladder method, but in tension with the cosmic microwave
                background measurements under the standard cosmological model
                assumptions.
              </p>
              <h3>Galaxy mass distribution assumptions</h3>
              <p>
                But something didn’t sit right with Birrer: The models of galaxy
                structure previous studies relied on might not have been
                accurate enough to conclude that the Hubble constant was
                different from estimates based on the cosmic microwave
                background. “I went to my colleagues and said, ‘I want to
                conduct a study that does not rely on those assumptions,’”
                Birrer said.
              </p>
            </WysiwygWrapper>
          </SectionWrapper>
          <SectionWithPaddingWrapper>
            {FigureCenteredWide(FigureCenteredWide.args)}
          </SectionWithPaddingWrapper>
          <SectionWrapper>
            <WysiwygWrapper>
              {FigureRight({
                ...FigureRight.args,
                caption:
                  '<i>(Firstname Lastname/SLAC National Accelerator Laboratory)</i>',
              })}
              <p>
                In their place, Birrer proposed to investigate a range of
                additional gravitational lenses to make more observationally
                grounded estimate of the mass and structure of the lensing
                galaxies to replace previous assumptions. The new avenue Birrer
                and the team, TDCOSMO, were undertaking was deliberately held
                blind – meaning the entire analysis was performed without
                knowing the resulting outcome on the Hubble constant – to avoid
                experimenter bias, a procedure established already in the
                previous analyses of the team and an integral part in moving
                forward, Birrer said.
              </p>
              <p>
                Based on this new analysis with significantly fewer assumptions
                applied to the seven lensing galaxies with time delays the team
                has analyzed in previous studies, the team arrived at a higher
                value of the Hubble constant, around 74 kilometers per second
                per megaparsec, but with greater uncertainty – enough so that
                their value was consistent with both high and low estimates of
                the Hubble constant.
              </p>
              <p>
                However, when Birrer and TDCOSMO added 33 additional lenses with
                similar properties – but without a variable source to work for
                time-delay cosmography directly – used to estimate galactic
                structure, the Hubble constant estimate went down to about 67
                kilometers per second per megaparsec, with a 5% uncertainty, in
                good agreement with sound-wave estimates such as that from the
                CMB, but also statistically consistent with the previous
                determinations, given the uncertainties.
              </p>
            </WysiwygWrapper>
          </SectionWrapper>
          <SectionWrapper>
            {Quote({
              ...globalData,
              has_constrain: true,
              quote_content:
                'While our new analysis does not statistically invalidate the mass profile assumptions of our previous work, it demonstrates the importance of understanding the mass distribution within galaxies',
              quote_author: 'Simon Birrer',
              quote_author_desc:
                'Postdoctoral fellow at Stanford University and the Kavli Institute for Particle Physics and Astrophysics at the Department of Energy’s SLAC National Accelerator Laboratory',
            })}
          </SectionWrapper>
          <SectionWrapper>
            <WysiwygWrapper>
              <p>
                “We are collecting now the data that will allow us to gain back
                most of the precision we previously had achieved based on
                stronger assumptions. Looking further ahead we’ll also have
                images from a lot more lensing galaxies from the Rubin
                Observatory Legacy Survey of Space and Time to draw on to
                improve our estimates. Our current analysis is only the first
                step and paves the way to utilizing these upcoming data sets to
                provide a definite conclusion on the remaining problem.”
              </p>
              <p>
                <a href="#0" className="c-button c-button--chevron">
                  Optional Button
                </a>
                <a href="#0" className="c-button c-button--chevron">
                  Button
                </a>
              </p>
              <hr />
              <p className="c-small-paragraph">
                The research was supported by grants from the National Science
                Foundation, the National Aeronautics and Space Administration,
                the Packard Foundation, the Kavli Foundation, the Danish Council
                for Independent Research, the Villum Foundation, the Royal
                Astronomical Society, the European Research Council, the Hintze
                Family Charitable Foundation, the Max Planck Society, the World
                Premier International Research Center Initiative and the Japan
                Society for the Promotion of Science.
              </p>
              <p className="c-small-paragraph">
                Citation: Simon Birrer et al., 20 November 2020, Astronomy &
                Astrophysics (DOI: 10.1051/0004-6361/202038861).
              </p>
              <p className="c-small-paragraph">
                For questions or comments, contact the SLAC Office of
                Communications at communications@slac.stanford.edu.
              </p>
            </WysiwygWrapper>
          </SectionWrapper>
          <SectionWrapper>
            <WysiwygWrapper>
              <hr />
              <p className="c-small-paragraph">
                SLAC is a vibrant multiprogram laboratory that explores how the
                universe works at the biggest, smallest and fastest scales and
                invents powerful tools used by scientists around the globe. With
                research spanning particle physics, astrophysics and cosmology,
                materials, chemistry, bio- and energy sciences and scientific
                computing, we help solve real-world problems and advance the
                interests of the nation.
              </p>
              <p className="c-small-paragraph">
                SLAC is operated by Stanford University for the U.S. Department
                of Energy’s Office of Science. The Office of Science is the
                single largest supporter of basic research in the physical
                sciences in the United States and is working to address some of
                the most pressing challenges of our time.
              </p>
            </WysiwygWrapper>
          </SectionWrapper>
          <SectionWrapper>{TagList(TagList.args)}</SectionWrapper>
          {SectionWithBlueGreenGradient({
            ...SectionWithBlueGreenGradient.args,
            section_kicker: 'Dig Deeper',
            section_title: 'Related Stories',
            section_intro: false,
            section_buttons: false,
            section_content: ReactDOMServer.renderToStaticMarkup(
              <GridWrapper numCols={3}>
                {News(News.args)}
                {News(News.args)}
                {News(News.args)}
              </GridWrapper>
            ),
          })}
        </>
      ),
    })}
  </PageWrapper>
);
NewsArticleDetail.args = {
  ...globalData,
  ...NewsArticle.args,
};
export { NewsArticleDetail };
