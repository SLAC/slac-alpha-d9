import ReactDOMServer from 'react-dom/server';
import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './event-detail.twig';
import data from './event-detail.yml';
import tagData from '../../03-components/tag-list/tag-list.yml';
import mapData from '../../03-components/map/map.yml';
import { EventDetails } from '../../03-components/event-details/event-details.stories';
import { FiftyFifty } from '../../03-components/fifty-fifty/fifty-fifty.stories';
import { Default as Figure } from '../../03-components/figure/figure.stories';
import { Primary } from '../../03-components/button/button.stories';
import sectionTwigTemplate from '../../02-layouts/section/section.twig';
import { TagList } from '../../03-components/tag-list/tag-list.stories';

const visitingText = `
  <p class="c-kicker">Attending a public event</p>
  <h2>Coming to SLAC</h2>
  <p><b>Free Admission</b></p>
  All lectures are free, registration is no longer required.</p><br>
  <p><b>Identification Required</b></p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rhoncus consequat sagittis. </p><br>
  <p><b>Limited Seating</b></p>
  Sed vulputate ligula quis tortor lobortis accumsan. Pellentesque viverra viverra ex nec vestibulum.</p><br>
  <p>Nunc interdum lacinia felis ultricies sodales. Curabitur tortor tortor, commodo a porta et, dignissim a nunc. Integer efficitur eleifend posuere.</p>
  <p>Cras dui lectus, aliquam posuere sagittis a, sollicitudin ac nunc. Etiam finibus urna et arcu venenatis, sit amet molestie sapien laoreet. Nam maximus lectus non augue faucibus, eget iaculis ligula ultricies. Nam sed libero augue. Aenean sed tempor dui. Etiam dignissim erat ac nibh tempus, non aliquet ipsum semper. Nulla venenatis bibendum purus id varius. Proin ligula orci, lobortis et tristique aliquet, sodales quis odio.</p>`;

const visitingButton1 = ReactDOMServer.renderToStaticMarkup(
  <>
    {Primary({
      is_demo: false,
      text: 'Site Entry Information',
      url: '#',
      modifier_classes: 'c-button--chevron',
    })}
  </>
);

const visitingButton2 = ReactDOMServer.renderToStaticMarkup(
  <>
    {Primary({
      is_demo: false,
      text: 'Maps & Directions',
      url: '#',
      modifier_classes: 'c-button--chevron',
    })}
  </>
);

const FiftyFiftyargs = {
  col_1: ReactDOMServer.renderToStaticMarkup(
    <>
      {Figure({
        ...Figure.args,
        media:
          '<img src="https://picsum.photos/703/825?image=237" alt="dog photo">',
        caption: false,
      })}
    </>
  ),
  col_2: visitingText + visitingButton1 + visitingButton2,
  modifier_classes: 'c-fifty-fifty--alt',
};

const settings = {
  title: 'Templates/Event Detail',
};

const EventDetail = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );

EventDetail.args = {
  ...data,
  map_iframe: mapData.map_iframe,
  related_topics: tagData.items,
  details: ReactDOMServer.renderToStaticMarkup(
    <>{EventDetails(EventDetails.args)}</>
  ),
  visiting: sectionTwigTemplate({
    has_constrain: false,
    section_content: ReactDOMServer.renderToStaticMarkup(
      FiftyFifty(FiftyFiftyargs)
    ),
  }),
  tags: ReactDOMServer.renderToStaticMarkup(TagList(TagList.args)),
};

export default settings;
export { EventDetail };
