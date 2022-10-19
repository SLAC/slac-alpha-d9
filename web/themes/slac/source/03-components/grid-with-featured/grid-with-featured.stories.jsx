import parse from 'html-react-parser';
import ReactDOMServer from 'react-dom/server';
import twigTemplate from './grid-with-featured.twig';
import data from './grid-with-featured.yml';
import { PageTitle } from '../page-title/page-title.stories';
import { EventCard, LargeEventCard } from '../card/card.stories';
import './grid-with-featured.scss';
import './grid-with-featured.es6';

const settings = {
  title: 'Components/Grid With Featured',
};

const GridWithFeatured = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
GridWithFeatured.args = {
  ...data,
  header: ReactDOMServer.renderToStaticMarkup(PageTitle(PageTitle.args)),
  first_row: ReactDOMServer.renderToStaticMarkup(EventCard(EventCard.args)),
  featured: ReactDOMServer.renderToStaticMarkup(
    LargeEventCard(LargeEventCard.args)
  ),
};

export default settings;
export { GridWithFeatured };
