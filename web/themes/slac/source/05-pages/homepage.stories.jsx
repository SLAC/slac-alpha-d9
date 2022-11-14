import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import globalData from '../00-config/storybook.global-data.yml';
import PageWrapper from './page-wrappers/default.jsx';
import { HeroWithChevron } from '../03-components/hero-bg-image/hero-bg-image.stories';

export default {
  title: 'Pages/Homepage',
  parameters: {
    controls: {
      include: ['show_admin_info'],
    },
  },
};

const Homepage = args => (
  <PageWrapper {...args}>{HeroWithChevron(HeroWithChevron.args)}</PageWrapper>
);
Homepage.args = {
  ...globalData,
  bodyClasses: 'homepage',
  hideBreadcrumbs: true,
  hideSocialLinks: true,
};

export { Homepage };
