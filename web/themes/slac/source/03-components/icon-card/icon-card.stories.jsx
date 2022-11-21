import parse from 'html-react-parser';

import twigTemplate from './icon-card.twig';
import data from './icon-card.yml';
import './icon-card.es6';
import './icon-card.scss';

const settings = {
  title: 'Components/Icon Card',
};

const IconCard = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
IconCard.args = { ...data };

export default settings;
// export { IconCard };
