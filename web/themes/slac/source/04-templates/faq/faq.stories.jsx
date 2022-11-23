import parse from 'html-react-parser';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

import twigTemplate from './faq.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './faq.yml';
import { NarrowAccordion } from '../../03-components/accordion/accordion.stories.jsx';
import {
  SectionWithPaddingWrapper,
  WysiwygWrapper,
} from '../../06-utility/storybookHelper.jsx';

const settings = {
  title: 'Templates/FAQ',
  parameters: {
    controls: {
      include: ['title', 'content'],
    },
  },
  decorators: [
    Story => (
      <SectionWithPaddingWrapper>
        {NarrowAccordion({
          ...NarrowAccordion.args,
          accordion_items: [ReactDOMServer.renderToStaticMarkup(Story())],
        })}
      </SectionWithPaddingWrapper>
    ),
  ],
};

const FAQ = args =>
  parse(
    twigTemplate({
      ...args,
      content: ReactDOMServer.renderToStaticMarkup(
        <WysiwygWrapper>{parse(args.content)}</WysiwygWrapper>
      ),
    })
  );
FAQ.args = { ...globalData, ...data };

export default settings;
export { FAQ };
