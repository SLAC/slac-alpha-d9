import parse from 'html-react-parser';

import ReactDOMServer from 'react-dom/server';
import React from 'react';
import twigTemplate from './news-article-detail.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './news-article-detail.yml';
import { WYSIWYG } from '../../03-components/wysiwyg/wysiwyg.stories';
import { SectionWrapper } from '../../06-utility/storybookHelper';

const settings = {
  title: 'Templates/News Article',
  parameters: {
    controls: {
      include: ['title', 'author_name', 'date', 'show_admin_info'],
    },
  },
};

const NewsArticle = args => parse(twigTemplate(args));
NewsArticle.args = {
  ...globalData,
  ...data,
  content: ReactDOMServer.renderToStaticMarkup(
    <>
      <SectionWrapper>{WYSIWYG(WYSIWYG.args)}</SectionWrapper>
    </>
  ),
};

export default settings;
export { NewsArticle };
