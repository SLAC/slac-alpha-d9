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
      include: ['alert_type', 'kicker', 'alert_content'],
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
AlertBar.argTypes = {
  alert_type: {
    options: ['announcement', 'emergency', 'information', 'success', 'warning'],
    control: { type: 'select' },
  }
};

/* eslint-disable */
AlertBar.play = async ({ canvasElement }) => {
  const readyEvent = new Event('sitewide-alert-rendered');
  const closeEvent = new Event('sitewide-alert-removed');

  canvasElement.dispatchEvent(readyEvent);
}

export default settings;
export { AlertBar };
