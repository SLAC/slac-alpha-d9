import parse from 'html-react-parser';

import twigTemplate from './carousel.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './carousel.yml';
import './carousel.scss';
import './carousel.es6';

const settings = {
  title: 'Components/Carousel',
};

const Carousel = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Carousel.args = { ...globalData, ...data };
const OnDark = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
OnDark.args = {
  ...globalData,
  ...data,
  modifier_classes: 'c-carousel--dark',
};

export default settings;
export { Carousel, OnDark };
