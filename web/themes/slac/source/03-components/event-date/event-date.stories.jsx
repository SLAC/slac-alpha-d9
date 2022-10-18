import parse from 'html-react-parser';

import twigTemplate from './event-date.twig';
import data from './event-date.yml';

const settings = {
  title: 'Components/Event Date',
  parameters: {
    controls: {
      include: ['start_date', 'end_date']
    }
  }
};

const EventDate = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
EventDate.args = { ...data };

export default settings;
export { EventDate };
