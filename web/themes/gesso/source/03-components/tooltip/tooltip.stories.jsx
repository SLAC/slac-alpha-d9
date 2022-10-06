import parse from 'html-react-parser';

import twigTemplate from './tooltip.twig';
import data from './tooltip.yml';
import globalData from '../../00-config/storybook.global-data.yml';
import './tooltip.scss';
import './tooltip.es6';

const settings = {
  title: 'Components/Tooltip',
};

const Tooltip = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Tooltip.args = { ...globalData, ...data };

export default settings;
export { Tooltip };
