import parse from 'html-react-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import twigTemplate from './two-column-hero.twig';
import data from './two-column-hero.yml';
import './two-column-hero.scss';
import { PageTitle } from '../page-title/page-title.stories';
import { LargeCard } from '../card/card.stories';
import { HeroWithoutOverlay } from '../article-hero/article-hero.stories';

const settings = {
  title: 'Components/Hero/Two-Column Hero',
};

const WithFeaturedContent = args =>
  parse(
    twigTemplate({
      ...args,
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
    })
  );
WithFeaturedContent.args = { ...data };

const WithoutFeaturedContent = args =>
  parse(
    twigTemplate({
      ...args,
      page_title: ReactDOMServer.renderToStaticMarkup(
        PageTitle({
          ...PageTitle.args,
          byline: false,
          kicker: false,
          has_constrain: false,
        })
      ),
    })
  );
WithoutFeaturedContent.args = { ...data };

const WithImage = args => (
  <>
    {HeroWithoutOverlay({ ...HeroWithoutOverlay.args, showPageTitle: false })}
    {parse(
      twigTemplate({
        ...args,
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
      })
    )}
  </>
);
WithImage.args = { ...data };

export default settings;
export { WithFeaturedContent, WithoutFeaturedContent, WithImage };
