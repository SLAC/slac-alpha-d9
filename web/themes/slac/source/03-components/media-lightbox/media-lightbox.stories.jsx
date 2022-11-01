/* eslint-disable camelcase */

import parse from 'html-react-parser';
import React from 'react';

import twigTemplate from './media-lightbox.twig';
import videoData from './video-lightbox.yml';
import imageData from './image-lightbox.yml';
import './media-lightbox.scss';
import '../lightbox/lightbox.es6';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Media Lightbox',
  parameters: {
    controls: {
      include: [
        'media_title',
        'media_date',
        'media_embed',
        'media_description',
        'media_credit',
        'media_details_url',
        'media_download_url',
      ],
    },
  },
};

const VideoLightbox = args => {
  const { lightbox_id } = args;
  return (
    <>
      <button type="button" aria-controls={lightbox_id} className="js-lightbox">
        Trigger Lightbox
      </button>
      {parse(
        twigTemplate({
          ...args,
        })
      )}
    </>
  );
};
VideoLightbox.args = { ...globalData, ...videoData };

const ImageLightbox = args => {
  const { lightbox_id } = args;
  return (
    <>
      <button type="button" aria-controls={lightbox_id} className="js-lightbox">
        Trigger Lightbox
      </button>
      {parse(
        twigTemplate({
          ...args,
        })
      )}
    </>
  );
};
ImageLightbox.args = { ...globalData, ...imageData };

export default settings;
export { VideoLightbox, ImageLightbox };
