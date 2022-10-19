import parse from 'html-react-parser';

import twigTemplate from './microsite-hero.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './microsite-hero.yml';
import './microsite-hero.scss';
import './microsite-hero.es6';

const settings = {
  title: 'Components/Hero/Microsite Hero',
};

const MicrositeHero = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
MicrositeHero.args = { ...globalData, ...data };

export default settings;
export { MicrositeHero };
