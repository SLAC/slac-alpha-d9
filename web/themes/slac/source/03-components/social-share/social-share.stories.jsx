import parse from 'html-react-parser';

import twigTemplate from './social-share.twig';
import data from './social-share.yml';
import globalData from '../../00-config/storybook.global-data.yml';

import './social-share.scss';
import './social-share.es6';

const settings = {
  title: 'Components/Social Share',
};

const SocialShare = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
SocialShare.args = { ...globalData, ...data };

export default settings;
export { SocialShare };
