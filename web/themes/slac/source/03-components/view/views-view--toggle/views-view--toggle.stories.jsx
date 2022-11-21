import parse from 'html-react-parser';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

import twigTemplate from './views-view--toggle.twig';
import data from './views-view--toggle.yml';
import pagerTemplate from '../../pager/pager.twig';
import pagerData from '../../pager/pager.yml';
import unformattedViewsTemplate from '../views-view-unformatted/views-view-unformatted.twig';
import gridViewsTemplate from '../views-view-grid/views-view-grid.twig';
import globalData from '../../../00-config/storybook.global-data.yml';
import './views-view--toggle.scss';
import './views-view--toggle.es6';
import { Default as Card, Teaser } from '../../card/card.stories';

const settings = {
  title: 'Components/Views/Toggleable View',
};

const ToggleableView = args =>
  parse(
    twigTemplate({
      ...args,
      attachment_before: unformattedViewsTemplate({
        ...globalData,
        title: false,
        has_default_class: true,
        rows: [
          {
            content: ReactDOMServer.renderToStaticMarkup(
              <>{Teaser(Teaser.args)}</>
            ),
          },
          {
            content: ReactDOMServer.renderToStaticMarkup(
              <>{Teaser(Teaser.args)}</>
            ),
          },
          {
            content: ReactDOMServer.renderToStaticMarkup(
              <>{Teaser(Teaser.args)}</>
            ),
          },
          {
            content: ReactDOMServer.renderToStaticMarkup(
              <>{Teaser(Teaser.args)}</>
            ),
          },
          {
            content: ReactDOMServer.renderToStaticMarkup(
              <>{Teaser(Teaser.args)}</>
            ),
          },
          {
            content: ReactDOMServer.renderToStaticMarkup(
              <>{Teaser(Teaser.args)}</>
            ),
          },
        ],
      }),
      rows: gridViewsTemplate({
        rows: [
          {
            content: ReactDOMServer.renderToStaticMarkup(
              <>{Card(Card.args)}</>
            ),
          },
          {
            content: ReactDOMServer.renderToStaticMarkup(
              <>{Card(Card.args)}</>
            ),
          },
          {
            content: ReactDOMServer.renderToStaticMarkup(
              <>{Card(Card.args)}</>
            ),
          },
          {
            content: ReactDOMServer.renderToStaticMarkup(
              <>{Card(Card.args)}</>
            ),
          },
          {
            content: ReactDOMServer.renderToStaticMarkup(
              <>{Card(Card.args)}</>
            ),
          },
          {
            content: ReactDOMServer.renderToStaticMarkup(
              <>{Card(Card.args)}</>
            ),
          },
        ],
      }),
      pager: pagerTemplate({
        ...globalData,
        ...pagerData,
      }),
    })
  );
ToggleableView.args = { ...globalData, ...data };

export default settings;
export { ToggleableView };
