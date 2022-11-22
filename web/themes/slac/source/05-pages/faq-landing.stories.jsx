import React from 'react';
import ReactDOMServer from 'react-dom/server';

import PageWrapper from './page-wrappers/default.jsx';
import { Header } from '../02-layouts/header/header.stories.jsx';
import { PageTitle } from '../03-components/page-title/page-title.stories.jsx';
import { WysiwygWrapper } from '../06-utility/storybookHelper';
import { AccordionView } from '../03-components/view/views-view--accordion/views-view--accordion.stories';

export default {
  title: 'Pages/FAQ Landing Page',
  parameters: {
    controls: {
      include: [
        'show_admin_info',
        'hideInternalHeader',
        'site_name',
        'has_logo',
        'header_freeform',
        'current_search',
      ],
    },
  },
};

// eslint-disable-next-line camelcase
const FAQLandingPage = ({ show_admin_info, current_search, ...args }) => (
  <PageWrapper hideSocialLinks {...args}>
    {PageTitle({
      page_title: 'Frequently Asked Questions',
      has_constrain: true,
    })}
    <WysiwygWrapper>
      <p>
        If you want to make an FAQ section that resonates with your customers,
        don't just slap some ordinary questions and answers on a site page.
        Carefully think about what questions to include, consider who will
        answer (and how), and offer next-step solutions for when FAQs aren't
        enough.
      </p>
    </WysiwygWrapper>
    {AccordionView({ ...AccordionView.args, current_search })}
  </PageWrapper>
);

FAQLandingPage.args = {
  ...Header.args,
  hideInternalHeader: false,
  current_search: '',
};

export { FAQLandingPage };
