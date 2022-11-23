import parse from 'html-react-parser';

import twigTemplate from './event-list.twig';
import data from './event-list.yml';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Event List'
};

const EventList = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
EventList.args = { ...globalData, ...data };

export default settings;
export { EventList };
