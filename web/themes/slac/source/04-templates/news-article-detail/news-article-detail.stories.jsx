import parse from 'html-react-parser';

import ReactDOMServer from 'react-dom/server';
import React from 'react';
import twigTemplate from './news-article-detail.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './news-article-detail.yml';
import { WYSIWYG } from '../../03-components/wysiwyg/wysiwyg.stories';
import { GridWrapper, SectionWrapper } from '../../06-utility/storybookHelper';
import { TagList } from '../../03-components/tag-list/tag-list.stories';
import { SectionWithBlueGreenGradient } from '../../02-layouts/section/section.stories';
import { News } from '../../03-components/card/card.stories';

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
  tags: ReactDOMServer.renderToStaticMarkup(TagList(TagList.args)),
  related_content: ReactDOMServer.renderToStaticMarkup(
    SectionWithBlueGreenGradient({
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
    })
  ),
};

export default settings;
export { NewsArticle };
