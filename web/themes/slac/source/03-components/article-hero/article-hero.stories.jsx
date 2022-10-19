import parse from 'html-react-parser';

import twigTemplate from './article-hero.twig';
import data from './article-hero.yml';
import globalData from '../../00-config/storybook.global-data.yml';
import './article-hero.scss';

const settings = {
  title: 'Components/Hero/Article Hero',
};

const ArticleHero = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
ArticleHero.args = { ...globalData, ...data };

export default settings;
export { ArticleHero };
