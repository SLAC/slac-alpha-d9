import parse from 'html-react-parser';
import React from 'react';

import twigTemplate from './figure.twig';
import data from './figure.yml';
import videoData from './figure--iframe.yml';
import globalData from '../../00-config/storybook.global-data.yml';
import mediaLightboxTemplate from '../media-lightbox/media-lightbox.twig';
import videoLightboxData from '../media-lightbox/video-lightbox.yml';
import imageLightboxData from '../media-lightbox/image-lightbox.yml';
import {
  decorators,
  sectionTypeArg,
  SectionWithPaddingWrapper,
} from '../../06-utility/storybookHelper';

const settings = {
  title: 'Paragraphs/Figure',
  parameters: {
    controls: {
      include: ['media', 'caption', 'section_type', 'num_cols'],
    },
  },
  argTypes: {
    section_type: sectionTypeArg,
  },
  decorators,
};

const Default = args => (
  <>
    {parse(
      twigTemplate({
        ...args,
      })
    )}
    {parse(
      mediaLightboxTemplate({
        ...globalData,
        ...imageLightboxData,
        // eslint-disable-next-line react/destructuring-assignment
        media_embed: args.media_embed || imageLightboxData.media_embed,
        // eslint-disable-next-line react/destructuring-assignment
        lightbox_id: args.lightbox_id || imageLightboxData.lightbox_id,
      })
    )}
  </>
);
Default.args = {
  ...data,
  caption: '',
  lightbox_id: 'image-lightbox',
  num_cols: 4,
};

const FigureCentered = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: 'u-align-center',
    })
  );
FigureCentered.args = { ...data };
FigureCentered.argTypes = {
  num_cols: {
    control: 'select',
    options: [1, 2, 3, 4],
  },
};

const FigureCenteredWide = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: 'u-align-center u-align-wide',
    })
  );
FigureCenteredWide.args = { ...data };
FigureCenteredWide.argTypes = {
  ...FigureCentered.argTypes,
};

const FigureRight = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: 'u-align-right',
    })
  );
FigureRight.args = {
  ...data,
  media:
    '<img src="https://picsum.photos/300?image=237" alt="dog photo" loading="lazy" width="300" height="300">',
};

const FigureLeft = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: 'u-align-left',
    })
  );
FigureLeft.args = {
  ...data,
  media:
    '<img src="https://picsum.photos/300?image=237" alt="dog photo" loading="lazy" width="300" height="300">',
};

const FigureWithVideo = args => (
  <>
    {parse(
      twigTemplate({
        ...args,
      })
    )}
    {parse(
      mediaLightboxTemplate({
        ...globalData,
        ...videoLightboxData,
        // eslint-disable-next-line react/destructuring-assignment
        lightbox_id: args.lightbox_id || videoLightboxData.lightbox_id,
      })
    )}
  </>
);
FigureWithVideo.args = {
  ...videoData,
  ...globalData,
  caption: '',
  num_cols: 4,
};

const FigureWithVideoCentered = args => (
  <>
    {parse(
      twigTemplate({
        ...args,
        modifier_classes: 'u-align-center',
      })
    )}
    {parse(mediaLightboxTemplate({ ...globalData, ...videoLightboxData }))}
  </>
);
FigureWithVideoCentered.args = { ...videoData, ...globalData };
FigureWithVideoCentered.argTypes = {
  num_cols: {
    control: 'select',
    options: [1, 2, 3, 4],
  },
};

export default settings;
export {
  Default,
  FigureCentered,
  FigureCenteredWide,
  FigureRight,
  FigureLeft,
  FigureWithVideo,
  FigureWithVideoCentered,
};
