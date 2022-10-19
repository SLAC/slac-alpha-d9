import parse from 'html-react-parser';

import twigTemplate from './wide-card.twig';
import data from './wide-card.yml';

const settings = {
  title: 'Components/Wide Card'
};

const WideCard = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
WideCard.args = { ...data };

export default settings;
export { WideCard };
