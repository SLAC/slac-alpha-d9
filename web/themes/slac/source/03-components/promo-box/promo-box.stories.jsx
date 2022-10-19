import parse from 'html-react-parser';

import twigTemplate from './promo-box.twig';
import data from './promo-box.yml';

const settings = {
  title: 'Components/Promo Box'
};

const PromoBox = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
PromoBox.args = { ...data };

export default settings;
export { PromoBox };
