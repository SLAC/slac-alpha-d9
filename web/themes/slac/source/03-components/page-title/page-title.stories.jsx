import parse from 'html-react-parser';

import twigTemplate from './page-title.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './page-title.yml';

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
      include: ['page_title', 'kicker', 'lede', 'byline'],
    },
  },
};

const PageTitle = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
PageTitle.args = { ...globalData, ...data };

export default settings;
export { PageTitle };
