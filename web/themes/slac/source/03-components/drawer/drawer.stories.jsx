import parse from 'html-react-parser';

import twigTemplate from './drawer.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './drawer.yml';
import './drawer.scss';
import './drawer.es6';

const settings = {
  title: 'Components/Drawer',
};

const Drawer = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Drawer.args = { ...globalData, ...data };

export default settings;
export { Drawer };
