import parse from 'html-react-parser';

import twigTemplate from './menu--footer-utility.twig';
import data from './menu--footer-utility.yml';

const settings = {
  title: 'Components/Menu/Footer Utility Menu',
};

const FooterUtilityMenu = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
FooterUtilityMenu.args = { ...data };

export default settings;
export { FooterUtilityMenu };
