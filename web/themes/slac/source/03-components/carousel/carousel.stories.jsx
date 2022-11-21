import parse from 'html-react-parser';

import twigTemplate from './carousel.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './carousel.yml';
import './carousel.scss';
import './carousel.es6';
import { decorators, sectionTypeArg } from '../../06-utility/storybookHelper';

const settings = {
  title: 'Paragraphs/Carousel',
  parameters: {
    controls: {
      include: ['carousel_items', 'section_type'],
    },
  },
  argTypes: {
    section_type: sectionTypeArg,
  },
  decorators,
};

const Carousel = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Carousel.args = { ...globalData, ...data };

export default settings;
export { Carousel };
