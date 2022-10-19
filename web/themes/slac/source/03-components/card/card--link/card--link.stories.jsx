import parse from 'html-react-parser';

import twigTemplate from './card--link.twig';
import data from './card--link.yml';

const settings = {
  title: 'Components/Card/Vertical Link Card',
};

const VerticalLinkCard = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
VerticalLinkCard.args = { ...data };

export default settings;
export { VerticalLinkCard };
