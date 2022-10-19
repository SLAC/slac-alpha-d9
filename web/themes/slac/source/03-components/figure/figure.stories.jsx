import parse from 'html-react-parser';
import React from 'react';

import twigTemplate from './figure.twig';
import data from './figure.yml';
import videoData from './figure--iframe.yml';
import globalData from '../../00-config/storybook.global-data.yml';
import videoLightboxTemplate from '../video-lightbox/video-lightbox.twig';
import videoLightboxData from '../video-lightbox/video-lightbox.yml';

const settings = {
  title: 'Components/Figure',
};

const Default = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Default.args = { ...data };

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

const FigureLeftAligned = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: 'u-align-left',
    })
  );
FigureLeftAligned.args = { ...data };

const FigureRightAligned = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: 'u-align-right',
    })
  );
FigureRightAligned.args = { ...data };

const FigureWithVideo = args => (
  <>
    {parse(
      twigTemplate({
        ...args,
      })
    )}
    {parse(videoLightboxTemplate({ ...globalData, ...videoLightboxData }))}
  </>
);
FigureWithVideo.args = { ...videoData, ...globalData };

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

const FigureWithVideoLeftAligned = args => (
  <>
    {parse(
      twigTemplate({
        ...args,
        modifier_classes: 'u-align-left',
      })
    )}
    {parse(videoLightboxTemplate({ ...globalData, ...videoLightboxData }))}
  </>
);
FigureWithVideoLeftAligned.args = { ...videoData, ...globalData };

const FigureWithVideoRightAligned = args => (
  <>
    {parse(
      twigTemplate({
        ...args,
        modifier_classes: 'u-align-right',
      })
    )}
    {parse(videoLightboxTemplate({ ...globalData, ...videoLightboxData }))}
  </>
);
FigureWithVideoRightAligned.args = { ...videoData, ...globalData };

export default settings;
export {
  Default,
  FigureCentered,
  FigureCenteredWide,
  FigureLeftAligned,
  FigureRightAligned,
  FigureWithVideo,
  FigureWithVideoCentered,
  FigureWithVideoLeftAligned,
  FigureWithVideoRightAligned,
};
