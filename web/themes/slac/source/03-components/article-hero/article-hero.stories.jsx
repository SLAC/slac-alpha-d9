import parse from 'html-react-parser';
import React from 'react';

import twigTemplate from './article-hero.twig';
import data from './article-hero.yml';
import globalData from '../../00-config/storybook.global-data.yml';
import './article-hero.scss';
import { PageTitle } from '../page-title/page-title.stories';

const settings = {
  title: 'Components/Hero/Hero Without Overlay',
  parameters: {
    controls: {
      include: ['hero_image', 'hero_caption'],
    },
  },
};

const HeroWithoutOverlay = args => (
  <>
    {parse(
      twigTemplate({
        ...args,
      })
    )}
    {/* eslint-disable-next-line react/destructuring-assignment */}
    {args.showPageTitle && PageTitle(PageTitle.args)}
  </>
);
HeroWithoutOverlay.args = { ...globalData, ...data, showPageTitle: true };

export default settings;
export { HeroWithoutOverlay };
