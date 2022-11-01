import parse from 'html-react-parser';
import React from 'react';

import twigTemplate from './figure.twig';
import data from './figure.yml';
import videoData from './figure--iframe.yml';
import globalData from '../../00-config/storybook.global-data.yml';
import mediaLightboxTemplate from '../media-lightbox/media-lightbox.twig';
import videoLightboxData from '../media-lightbox/video-lightbox.yml';
import imageLightboxData from '../media-lightbox/image-lightbox.yml';

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

const FigureCentered = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: 'u-align-center',
    })
  );
FigureCentered.args = { ...data };

const FigureCenteredWide = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: 'u-align-center u-align-wide',
    })
  );
FigureCenteredWide.args = { ...data };

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

export default settings;
export {
  Default,
  FigureCentered,
  FigureCenteredWide,
  FigureWithVideo,
  FigureWithVideoCentered,
};
