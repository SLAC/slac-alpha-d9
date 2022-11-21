import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './event-details.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './event-details.yml';
import './event-details.scss';

const settings = {
  title: 'Components/Event Details',
  parameters: {
    controls: {
      include: [
        'event_type',
        'start_date',
        'end_date',
        'image_url',
        'map_link_text',
        'zoom_url',
        'is_past_event',
        'calendar_link_text',
      ],
    },
  },
  decorators: [
    Story => (
      <div className="l-constrain l-constrain--small l-constrain--no-padding">
        {Story()}
      </div>
    ),
  ],
};

const EventDetails = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
EventDetails.args = { ...globalData, ...data };

const EventDetailsMultiday = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
EventDetailsMultiday.args = {
  ...globalData,
  ...data,
  start_date: {
    month: 'Apr',
    day: '19',
  },
  end_date: {
    month: 'Apr',
    day: '22',
  },
  calendar_link_text:
    'Thursday, April 19, 2022 &ndash; Saturday, April 22, 2022',
};

const EventDetailsMultimonth = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
EventDetailsMultimonth.args = {
  ...globalData,
  ...data,
  start_date: {
    month: 'Sep',
    day: '26',
  },
  end_date: {
    month: 'Oct',
    day: '9',
  },
  calendar_link_text: 'Monday, September 28 &ndash; Friday, October 9, 2020',
};

export default settings;
export { EventDetails, EventDetailsMultiday, EventDetailsMultimonth };
