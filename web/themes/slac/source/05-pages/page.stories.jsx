import React from 'react';
import ReactDOMServer from 'react-dom/server';

import PageWrapper from './page-wrappers/default.jsx';
import { Page as PageTemplate } from '../04-templates/page/page.stories';
import { SideMenu } from '../03-components/menu/menu--side/menu--side.stories';

export default {
  title: 'Pages/Page',
  parameters: {
    controls: {
      include: ['show_admin_info'],
    },
  },
};

const Page = args => (
  <PageWrapper>
    {PageTemplate({
      ...PageTemplate.args,
      sidebar: ReactDOMServer.renderToStaticMarkup(SideMenu(SideMenu.args)),
      ...args,
    })}
  </PageWrapper>
);
export { Page };
