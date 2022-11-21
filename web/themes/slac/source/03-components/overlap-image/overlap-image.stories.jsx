import parse from 'html-react-parser';

import twigTemplate from './overlap-image.twig';
import data from './overlap-image.yml';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Paragraphs/Overlap Image',
  argTypes: {
    position: {
      options: ['bottom-left', 'bottom-right'],
      control: {
        type: 'select',
      },
    },
  },
};

const OverlapImage = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
OverlapImage.args = { ...globalData, ...data };

export default settings;
export { OverlapImage };
