import parse from 'html-react-parser';

import twigTemplate from './event-hat.twig';
import data from './event-hat.yml';

const settings = {
  title: 'Components/Event Hat'
};

const EventHat = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
EventHat.args = { ...data };

const EventHatTealPalo = args =>
  parse(
    twigTemplate({
      ...args,
      event_type: 'Block Party',
    })
  );
EventHatTealPalo.args = { ...data };

const EventHatPurpleLavender = args =>
  parse(
    twigTemplate({
      ...args,
      event_type: 'Art Meets Science',
    })
  );
EventHatPurpleLavender.args = { ...data };

const EventHatCardinalDigital = args =>
  parse(
    twigTemplate({
      ...args,
      event_type: 'Conference',
    })
  );
EventHatCardinalDigital.args = { ...data };

export default settings;
export { EventHat, EventHatTealPalo, EventHatPurpleLavender, EventHatCardinalDigital };
