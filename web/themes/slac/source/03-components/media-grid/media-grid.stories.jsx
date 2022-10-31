import parse from 'html-react-parser';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

import twigTemplate from './media-grid.twig';
import data from './media-grid.yml';
import {
  Default as Image,
  FigureWithVideo as Video,
} from '../figure/figure.stories';
import { SectionWrapper } from '../../06-utility/storybookHelper.jsx';

const settings = {
  title: 'Components/Media Grid',
};

let lightboxCounter = 1;

const getArgs = isImage => {
  const imageId = Math.floor(Math.random() * 29);
  const args = {
    caption: false,
    media: `<img src="https://picsum.photos/600/450?image=${imageId}" alt="Placeholder image" loading="lazy" width="600" height="450">`,
    lightbox_id: `gallery-lightbox-${lightboxCounter}`,
  };
  if (isImage) {
    args.media_embed = `<img src="https://picsum.photos/1600/900?image=${imageId}" loading="lazy" width="1600" height="900" alt="Large placeholder image" />`;
  }
  lightboxCounter += 1;
  return args;
};

const MediaGrid = args => (
  <SectionWrapper>
    {parse(
      twigTemplate({
        ...args,
        media_content: ReactDOMServer.renderToStaticMarkup(
          <>
            {Image(getArgs(true))}
            {Image(getArgs(true))}
            {Video({ ...Video.args, ...getArgs() })}
            {Image(getArgs(true))}
            {Image(getArgs(true))}
            {Image(getArgs(true))}
            {Image(getArgs(true))}
            {Video({ ...Video.args, ...getArgs() })}
            {Video({ ...Video.args, ...getArgs() })}
            {Image(getArgs(true))}
            {Image(getArgs(true))}
            {Image(getArgs(true))}
            {Image(getArgs(true))}
            {Image(getArgs(true))}
            {Video({ ...Video.args, ...getArgs() })}
            {Image(getArgs(true))}
            {Image(getArgs(true))}
            {Image(getArgs(true))}
            {Image(getArgs(true))}
            {Video({ ...Video.args, ...getArgs() })}
            {Video({ ...Video.args, ...getArgs() })}
            {Image(getArgs(true))}
            {Image(getArgs(true))}
            {Image(getArgs(true))}
            {Image(getArgs(true))}
            {Image(getArgs(true))}
            {Image(getArgs(true))}
            {Image(getArgs(true))}
          </>
        ),
      })
    )}
  </SectionWrapper>
);
MediaGrid.args = { ...data };

export default settings;
export { MediaGrid };
