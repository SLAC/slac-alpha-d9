import ReactDOMServer from 'react-dom/server';

import parse from 'html-react-parser';
import globalData from '../../00-config/storybook.global-data.yml';
import twigTemplate from './media-detail.twig';
import data from './media-detail.yml';
import './media-detail.scss';
import { TagList } from '../../03-components/tag-list/tag-list.stories';

const settings = {
  title: 'Templates/Media Detail',
};

const MediaDetail = args => parse(twigTemplate(args));
MediaDetail.args = {
  ...globalData,
  ...data,
  tags: ReactDOMServer.renderToStaticMarkup(TagList(TagList.args)),
};

export default settings;
export { MediaDetail };
