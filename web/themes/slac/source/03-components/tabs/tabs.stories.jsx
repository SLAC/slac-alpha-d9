import parse from 'html-react-parser';
import React from 'react';

import twigTemplate from './tabs.twig';
import data from './tabs.yml';
import './tabs.scss';
import './tabs.es6';
import {
  decorators,
  sectionTypeArg,
  SectionWrapper,
  WysiwygWrapper,
} from '../../06-utility/storybookHelper';

const settings = {
  title: 'Paragraphs/Tabs',
  decorators: [
    Story => (
      <>
        <SectionWrapper>
          <WysiwygWrapper>
            <p>Some content above the tabs.</p>
          </WysiwygWrapper>
        </SectionWrapper>
        {Story()}
        <SectionWrapper>
          <WysiwygWrapper>
            <p>Some content below the tabs.</p>
            <p>
              The most significant things we can think about, when we think
              about Apollo, is that it has opened for us, for us being the
              World, a challenge of the future. The door is now cracked, but the
              promise of that future lies in the young people, not just in
              America, but the young people all over the world. Learning to live
              and learning to work together. In order to remind all the peoples
              of the World, in so many countries throughout the world, that this
              is what we all are striving for in the future, Jack has picked up
              a very significant rock, typical of what we have here in the
              valley of Taurus Littrow. It's a rock composed of many fragments,
              of many sizes, and many shapes, probably from all parts of the
              Moon, perhaps billions of years old. But a rock of all sizes and
              shapes, fragments of all sizes and shapes, and even colors that
              have grown together to become a cohesive rock outlasting the
              nature of Space, sort of living together in a very coherent, very
              peaceful manner. When we return this rock or some of the others
              like it to Houston, we'd like to share a piece of this rock with
              so many of the countries throughout the world. We hope that this
              will be a symbol of what our feelings are, what the feelings of
              the Apollo Program are, and a symbol of mankind that we can live
              in peace and harmony in the future.
            </p>
          </WysiwygWrapper>
        </SectionWrapper>
      </>
    ),
    ...decorators,
  ],
  argTypes: {
    section_type: sectionTypeArg,
  },
};

const Tabs = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Tabs.args = { ...data };

export default settings;
export { Tabs };
