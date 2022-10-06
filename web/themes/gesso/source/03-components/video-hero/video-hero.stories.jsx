import parse from 'html-react-parser';

import twigTemplate from './video-hero.twig';
import data from './video-hero.yml';
import globalData from '../../00-config/storybook.global-data.yml';
import './video-hero.scss';
import './video-hero.es6';

const settings = {
  title: 'Components/Hero/Video Hero',
};

const VideoHero = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
VideoHero.args = { ...globalData, ...data };

export default settings;
export { VideoHero };
