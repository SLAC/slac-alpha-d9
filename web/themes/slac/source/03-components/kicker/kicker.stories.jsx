import parse from 'html-react-parser';

import twigTemplate from './kicker.twig';
import data from './kicker.yml';

const settings = {
  title: 'Components/Kicker',
};

const Kicker = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Kicker.args = { ...data };

const BigKicker = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
BigKicker.args = { ...data, modifier_classes: 'c-kicker--big' };

export default settings;
export { Kicker, BigKicker };
