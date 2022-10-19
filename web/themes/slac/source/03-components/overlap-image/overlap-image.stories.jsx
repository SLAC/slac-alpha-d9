import parse from 'html-react-parser';

import twigTemplate from './overlap-image.twig';
import data from './overlap-image.yml';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Overlap Image',
  argTypes: {
    box_color: {
      options: ['white', 'red', 'purple', 'teal'],
      control: {
        type: 'select',
      },
    },
    position: {
      options: [
        'top-left',
        'top-right',
        'center-left',
        'center-right',
        'bottom-left',
        'bottom-right',
      ],
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
const WithTwoTextBoxes = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
WithTwoTextBoxes.args = {
  ...globalData,
  ...data,
  overlap_image_content_2: `<h2>Our research and industry partnerships</h2>
  <p>Originally founded for breakthrough research in particle physics, SLAC has evolved into a multipurpose lab whose mission is to explore the world at all scales, from the tiniest fundamental particles to the largest structures in the universe.</p>`,
};

export default settings;
export { OverlapImage, WithTwoTextBoxes };
