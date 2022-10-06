import parse from 'html-react-parser';

import twigTemplate from './alert-bar.twig';
import data from './alert-bar.yml';
import globalData from '../../00-config/storybook.global-data.yml';
import './alert-bar.es6';
import './alert-bar.scss';

const settings = {
  title: 'Components/Alert Bar',
  parameters: {
    controls: {
      include: ['alert_content'],
    },
  },
};

const AlertBar = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
AlertBar.args = { ...globalData, ...data };

export default settings;
export { AlertBar };
