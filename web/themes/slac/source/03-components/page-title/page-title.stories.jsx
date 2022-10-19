import parse from 'html-react-parser';

import twigTemplate from './page-title.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import pageTitleSidebarData from './page-title-sidebar.yml';
import pageTitleSidebarImage from './page-title-image.yml';
import ReactDOMServer from 'react-dom/server';
import { SmallCaptionedImage } from '../small-captioned-image/small-captioned-image.stories';

const settings = {
  title: 'Components/Page Title',
  argTypes: {
    page_title: {
      type: 'string',
      description: 'The page title or headline',
      table: {
        defaultValue: {
          summary: 'Page Title',
        },
      },
    },
  },
  parameters: {
    controls: {
      include: ['page_title', 'modifier_classes'],
    },
  },
};

const PageTitle = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
PageTitle.args = { ...globalData };

const PageTitleWithText = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
PageTitleWithText.args = { ...globalData, ...pageTitleSidebarData };

const PageTitleWithImage = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
PageTitleWithImage.args = {
  ...globalData,
  ...pageTitleSidebarImage,
  sidebar_content: ReactDOMServer.renderToStaticMarkup(
    SmallCaptionedImage(SmallCaptionedImage.args)
  ),
};

export default settings;
export { PageTitle, PageTitleWithText, PageTitleWithImage };
