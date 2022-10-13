import parse from 'html-react-parser';

import twigTemplate from './social-links.twig';
import data from './social-links.yml';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Social Links',
};

const SocialLinks = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
SocialLinks.args = { ...globalData, ...data };

export default settings;
export { SocialLinks };
