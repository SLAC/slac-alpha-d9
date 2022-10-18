import React from 'react';
import ReactDOMServer from 'react-dom/server';

import PageWrapper from './page-wrappers/default.jsx';
import { Page as PageTemplate } from '../04-templates/page/page.stories';
import sectionTwigTemplate from '../02-layouts/section/section.twig';
import { WYSIWYG } from '../03-components/wysiwyg/wysiwyg.stories';

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
      content: sectionTwigTemplate({
        section_content: ReactDOMServer.renderToStaticMarkup(
          WYSIWYG(WYSIWYG.args)
        ),
        has_constrain: true,
        modifier_classes: 'l-section--no-padding',
      }),
    })}
  </PageWrapper>
);
export { Page };
