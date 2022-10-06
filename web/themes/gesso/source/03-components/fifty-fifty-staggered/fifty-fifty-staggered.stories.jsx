import parse from 'html-react-parser';

import ReactDOMServer from 'react-dom/server';
import cardTemplate from '../card/card.twig';
import twigTemplate from './fifty-fifty-staggered.twig';
import data from './fifty-fifty-staggered.yml';

const settings = {
  title: 'Components/Fifty Fifty Staggered',
};

const FiftyFiftyStaggered = args => (
  <div style={{ paddingTop: '96px' }}>
    {parse(
      twigTemplate({
        ...args,
        cols: [
          ReactDOMServer.renderToStaticMarkup(
            parse(
              cardTemplate({
                title: 'Stanford PULSE Institute',
                url: 'https://ultrafast.stanford.edu/',
                card_content:
                  '<p>PULSE is a Stanford independent laboratory and SLAC research center. It uses SLAC’s LCLS X-ray laser as a primary tool for advancing the frontiers of ultrafast science.</p>',
                media:
                  '<img src="https://picsum.photos/id/1015/800/500" alt="">',
              })
            )
          ),
          ReactDOMServer.renderToStaticMarkup(
            parse(
              cardTemplate({
                title: 'Stanford PULSE Institute',
                url: 'https://ultrafast.stanford.edu/',
                card_content:
                  '<p>PULSE is a Stanford independent laboratory and SLAC research center. It uses SLAC’s LCLS X-ray laser as a primary tool for advancing the frontiers of ultrafast science.</p>',
                media:
                  '<img src="https://picsum.photos/id/1015/800/500" alt="">',
              })
            )
          ),
          ReactDOMServer.renderToStaticMarkup(
            parse(
              cardTemplate({
                title: 'Stanford PULSE Institute',
                url: 'https://ultrafast.stanford.edu/',
                card_content:
                  '<p>PULSE is a Stanford independent laboratory and SLAC research center. It uses SLAC’s LCLS X-ray laser as a primary tool for advancing the frontiers of ultrafast science.</p>',
                media:
                  '<img src="https://picsum.photos/id/1015/800/500" alt="">',
              })
            )
          ),
          ReactDOMServer.renderToStaticMarkup(
            parse(
              cardTemplate({
                title: 'Stanford PULSE Institute',
                url: 'https://ultrafast.stanford.edu/',
                card_content:
                  '<p>PULSE is a Stanford independent laboratory and SLAC research center. It uses SLAC’s LCLS X-ray laser as a primary tool for advancing the frontiers of ultrafast science.</p>',
                media:
                  '<img src="https://picsum.photos/id/1015/800/500" alt="">',
              })
            )
          ),
          ReactDOMServer.renderToStaticMarkup(
            parse(
              cardTemplate({
                title: 'Stanford PULSE Institute',
                url: 'https://ultrafast.stanford.edu/',
                card_content:
                  '<p>PULSE is a Stanford independent laboratory and SLAC research center. It uses SLAC’s LCLS X-ray laser as a primary tool for advancing the frontiers of ultrafast science.</p>',
                media:
                  '<img src="https://picsum.photos/id/1015/800/500" alt="">',
              })
            )
          ),
        ],
      })
    )}
  </div>
);
FiftyFiftyStaggered.args = { ...data };

export default settings;
export { FiftyFiftyStaggered };
