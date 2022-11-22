import parse from 'html-react-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import twigTemplate from './two-column-hero.twig';
import data from './two-column-hero.yml';
import { PageTitle } from '../page-title/page-title.stories.jsx';
import { LargeCard, LargeEventCard } from '../card/card.stories.jsx';
import { HeroWithoutOverlay } from '../article-hero/article-hero.stories.jsx';

const settings = {
  title: 'Components/Hero/Two-Column Hero',
};

const WithFeaturedContent = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
WithFeaturedContent.args = {
  ...data,
  page_title: ReactDOMServer.renderToStaticMarkup(
    PageTitle({
      ...PageTitle.args,
      byline: false,
      kicker: false,
      has_constrain: false,
    })
  ),
  featured_content: ReactDOMServer.renderToStaticMarkup(
    LargeEventCard(LargeEventCard.args)
  ),
};

const WithoutFeaturedContent = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
WithoutFeaturedContent.args = {
  ...data,
  page_title: ReactDOMServer.renderToStaticMarkup(
    PageTitle({
      ...PageTitle.args,
      byline: false,
      kicker: false,
      has_constrain: false,
    })
  ),
};

const WithImage = args => (
  <>
    {HeroWithoutOverlay({ ...HeroWithoutOverlay.args, showPageTitle: false })}
    {parse(
      twigTemplate({
        ...args,
      })
    )}
  </>
);
WithImage.args = {
  ...data,
  page_title: ReactDOMServer.renderToStaticMarkup(
    PageTitle({
      ...PageTitle.args,
      byline: false,
      kicker: false,
      has_constrain: false,
    })
  ),
  featured_content: ReactDOMServer.renderToStaticMarkup(
    LargeCard(LargeCard.args)
  ),
};

export default settings;
export { WithFeaturedContent, WithoutFeaturedContent, WithImage };
