import parse from 'html-react-parser';

import twigTemplate from './animated-icon.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './animated-icon.yml';
import './animated-icon.es6';
import './animated-icon.scss';

const settings = {
  title: 'Components/Animated Icon',
  parameters: {
    controls: {
      include: [],
    },
  },
};

const Template = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );

const Accelerator1 = Template.bind({});
Accelerator1.args = { ...globalData, ...data };

const Accelerator2 = Template.bind({});
Accelerator2.args = { ...globalData, ...data, animation: 'accelerator2' };

const Cryo1 = Template.bind({});
Cryo1.args = { ...globalData, ...data, animation: 'cryo1' };

const Cryo2 = Template.bind({});
Cryo2.args = { ...globalData, ...data, animation: 'cryo2' };

const Laser1 = Template.bind({});
Laser1.args = { ...globalData, ...data, animation: 'laser1' };

const Laser2 = Template.bind({});
Laser2.args = { ...globalData, ...data, animation: 'laser2' };

const Space1 = Template.bind({});
Space1.args = { ...globalData, ...data, animation: 'space1' };

const Space2 = Template.bind({});
Space2.args = { ...globalData, ...data, animation: 'space2' };

const Xray = Template.bind({});
Xray.args = { ...globalData, ...data, animation: 'xray' };

export default settings;
export {
  Accelerator1,
  Accelerator2,
  Cryo1,
  Laser1,
  Laser2,
  Space1,
  Space2,
  Xray,
};
