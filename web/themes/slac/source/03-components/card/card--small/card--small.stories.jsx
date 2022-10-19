import parse from 'html-react-parser';

import twigTemplate from './card--small.twig';
import data from './card--small.yml';

const settings = {
  title: 'Components/Card/Small Card',
};

const SmallCard = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
SmallCard.args = { ...data };

export default settings;
export { SmallCard };
