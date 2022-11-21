import React from 'react';

import globalData from '../00-config/storybook.global-data.yml';
import PageWrapper from './page-wrappers/default.jsx';
import { HeroWithChevron } from '../03-components/hero-bg-image/hero-bg-image.stories';
import { Header } from '../02-layouts/header/header.stories';

export default {
  title: 'Pages/Homepage',
  parameters: {
    controls: {
      include: [
        'show_admin_info',
        'hideInternalHeader',
        'site_name',
        'has_logo',
        'header_freeform',
      ],
    },
  },
};

const Homepage = args => (
  <PageWrapper {...args}>{HeroWithChevron(HeroWithChevron.args)}</PageWrapper>
);
Homepage.args = {
  ...globalData,
  ...Header.args,
  hideInternalHeader: false,
  bodyClasses: 'homepage',
  hideBreadcrumbs: true,
  hideSocialLinks: true,
};

export { Homepage };
