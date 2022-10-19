/* eslint-disable camelcase */

import parse from 'html-react-parser';
import React from 'react';

import twigTemplate from './video-lightbox.twig';
import data from './video-lightbox.yml';
import './video-lightbox.scss';
import '../lightbox/lightbox.es6';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Video Lightbox',
};

const VideoLightbox = args => {
  const { lightbox_id } = args;
  return (
    <>
      <button
        type="button"
        aria-controls={lightbox_id}
        className="js-lightbox"
      >
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
VideoLightbox.args = { ...globalData, ...data };

export default settings;
export { VideoLightbox };
