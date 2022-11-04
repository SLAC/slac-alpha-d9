import parse from 'html-react-parser';
import React from 'react';

import twigTemplate from './figure.twig';
import data from './figure.yml';
import videoData from './figure--iframe.yml';
import globalData from '../../00-config/storybook.global-data.yml';
import mediaLightboxTemplate from '../media-lightbox/media-lightbox.twig';
import videoLightboxData from '../media-lightbox/video-lightbox.yml';
import imageLightboxData from '../media-lightbox/image-lightbox.yml';
import { SectionWithPaddingWrapper } from '../../06-utility/storybookHelper';

const settings = {
  title: 'Components/Figure',
  parameters: {
    controls: {
      include: ['media', 'caption'],
    },
  },
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
Default.args = { ...data, caption: false, lightbox_id: 'image-lightbox' };

const FigureCentered = args => (
  <SectionWithPaddingWrapper>
    {parse(
      twigTemplate({
        ...args,
        modifier_classes: 'u-align-center',
      })
    )}
  </SectionWithPaddingWrapper>
);
FigureCentered.args = { ...data };

const FigureCenteredWide = args => (
  <SectionWithPaddingWrapper>
    {parse(
      twigTemplate({
        ...args,
        modifier_classes: 'u-align-center u-align-wide',
      })
    )}
  </SectionWithPaddingWrapper>
);
FigureCenteredWide.args = { ...data };

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
FigureWithVideo.args = { ...videoData, ...globalData, caption: false };

const FigureWithVideoCentered = args => (
  <SectionWithPaddingWrapper>
    {parse(
      twigTemplate({
        ...args,
        modifier_classes: 'u-align-center',
      })
    )}
    {parse(mediaLightboxTemplate({ ...globalData, ...videoLightboxData }))}
  </SectionWithPaddingWrapper>
);
FigureWithVideoCentered.args = { ...videoData, ...globalData };

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
