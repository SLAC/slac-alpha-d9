import parse from 'html-react-parser';

import twigTemplate from './cookie-banner.twig';
import data from './cookie-banner.yml';
import './cookie-banner.es6';

const settings = {
  title: 'Components/Cookie Banner'
};

const CookieBanner = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
CookieBanner.args = { ...data };

export default settings;
export { CookieBanner };
