import parse from 'html-react-parser';

import twigTemplate from './small-captioned-image.twig';
import data from './small-captioned-image.yml';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Small Captioned Image',
};

const SmallCaptionedImage = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
SmallCaptionedImage.args = { ...globalData, ...data };

export default settings;
export { SmallCaptionedImage };
