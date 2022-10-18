import parse from 'html-react-parser';

import twigTemplate from './hero-bg-image.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './hero-bg-image.yml';
import './hero-bg-image.scss';
import './hero-bg-image.es6';

const settings = {
  title: 'Components/Hero/Image Hero',
};

const ImageHero = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
ImageHero.args = { ...globalData, ...data };

export default settings;
export { ImageHero };
