import React from 'react';

import PageWrapper from './page-wrappers/default.jsx';
import { EventDetail as PageTemplate } from '../04-templates/event-detail/event-detail.stories';

export default {
  title: 'Pages/Event Detail Page',
  parameters: {
    controls: {
      include: ['show_admin_info'],
    },
  },
};

const EventDetailPage = args => (
  <PageWrapper>{PageTemplate(PageTemplate.args)}</PageWrapper>
);
export { EventDetailPage };
