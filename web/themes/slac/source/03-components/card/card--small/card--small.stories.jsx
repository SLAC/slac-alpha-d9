import parse from 'html-react-parser';

import twigTemplate from './card--small.twig';
import data from './card--small.yml';

const settings = {
  title: 'Components/Card/Small Card',
};

const SmallCard = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
SmallCard.args = { ...data };

const SmallCardWithIcon = args =>
parse(
  twigTemplate({
    ...args,
  })
);
SmallCardWithIcon.args = {
  ...data,
  media: false,
  icon: '<img src="https://picsum.photos/id/1015/120/120">'
};


export default settings;
export { SmallCard, SmallCardWithIcon };
