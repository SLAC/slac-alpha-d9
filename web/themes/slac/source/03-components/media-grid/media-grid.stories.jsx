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

const getArgs = () => {
  const imageId = Math.floor(Math.random() * 29);
  return {
    caption: false,
    media: `<img src="https://picsum.photos/600/450?image=${imageId}" alt="Placeholder image" loading="lazy" width="600" height="450">`,
  };
};

const MediaGrid = args => (
  <SectionWrapper>
    {parse(
      twigTemplate({
        ...args,
        media_content: ReactDOMServer.renderToStaticMarkup(
          <>
            {Image(getArgs())}
            {Image(getArgs())}
            {Video({ ...Video.args, ...getArgs() })}
            {Image(getArgs())}
            {Image(getArgs())}
            {Image(getArgs())}
            {Image(getArgs())}
            {Video({ ...Video.args, ...getArgs() })}
            {Video({ ...Video.args, ...getArgs() })}
            {Image(getArgs())}
            {Image(getArgs())}
            {Image(getArgs())}
            {Image(getArgs())}
            {Image(getArgs())}
            {Video({ ...Video.args, ...getArgs() })}
            {Image(getArgs())}
            {Image(getArgs())}
            {Image(getArgs())}
            {Image(getArgs())}
            {Video({ ...Video.args, ...getArgs() })}
            {Video({ ...Video.args, ...getArgs() })}
            {Image(getArgs())}
            {Image(getArgs())}
            {Image(getArgs())}
            {Image(getArgs())}
            {Image(getArgs())}
            {Image(getArgs())}
            {Image(getArgs())}
          </>
        ),
      })
    )}
  </SectionWrapper>
);
MediaGrid.args = { ...data };

export default settings;
export { MediaGrid };
