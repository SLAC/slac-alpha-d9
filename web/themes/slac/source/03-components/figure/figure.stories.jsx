import parse from 'html-react-parser';
import React from 'react';

import twigTemplate from './figure.twig';
import data from './figure.yml';
import videoData from './figure--iframe.yml';
import globalData from '../../00-config/storybook.global-data.yml';
import videoLightboxTemplate from '../media-lightbox/media-lightbox.twig';
import videoLightboxData from '../media-lightbox/video-lightbox.yml';

const settings = {
  title: 'Components/Figure',
  parameters: {
    controls: {
      include: ['media', 'caption'],
    },
  },
};

const Default = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Default.args = { ...data, caption: false };

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
      videoLightboxTemplate({
        ...globalData,
        ...videoLightboxData,
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
    {parse(videoLightboxTemplate({ ...globalData, ...videoLightboxData }))}
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
