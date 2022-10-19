import parse from 'html-react-parser';

import twigTemplate from './overlay-link.twig';
import data from './overlay-link.yml';
import globalData from '../../00-config/storybook.global-data.yml';
import '../arrow-link/arrow-link.es6';

const settings = {
  title: 'Components/Overlay Link',
  parameters: {
    controls: {
      include: [
        'modifier_classes',
        'image',
        'label',
        'kicker',
        'title',
      ],
    },
  },
};

const OverlayLink = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
OverlayLink.args = { ...data, ...globalData };

const Poster = args =>
  parse(
    twigTemplate({
      ...args,
      image: '<img src="https://picsum.photos/390/600?image=237" width="390" height="600" loading="lazy">',
      label: '',
      kicker: 'Poster Details',
      title: 'Arianna Gleason lecture',
    })
  );
Poster.args = { ...data, ...globalData };

const Topic = args =>
  parse(
    twigTemplate({
      ...args,
      image: '<img src="https://picsum.photos/400/400?image=237" width="400" height="400" loading="lazy">',
      label: 'Dark Energy',
      kicker: 'Tagged in',
      title: 'Dark Energy',
    })
  );
Topic.args = { ...data, ...globalData };

export default settings;
export { OverlayLink, Poster, Topic };
