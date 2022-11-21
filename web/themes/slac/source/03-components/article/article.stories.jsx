import parse from 'html-react-parser';
import ReactDOMServer from 'react-dom/server';

import twigTemplate from './article.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './article.yml';
import { PageTitle } from '../page-title/page-title.stories';
import { WYSIWYG } from '../wysiwyg/wysiwyg.stories';

const settings = {
  title: 'Components/Article',
  parameters: {
    controls: {
      include: [
        'title',
        'show_admin_info',
        'author_name',
        'content',
        'kicker',
        'lede',
      ],
    },
  },
};

const Article = args =>
  parse(
    twigTemplate({
      ...args,
      content: ReactDOMServer.renderToStaticMarkup(
        WYSIWYG({
          content: args.content,
        })
      ),
    })
  );
Article.args = { ...globalData, ...PageTitle.args, ...data };

export default settings;
export { Article };
