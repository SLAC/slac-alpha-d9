import parse from 'html-react-parser';

import twigTemplate from './card.twig';

import data from './card.yml';

import eventCardData from './card-event.yml';
import multidayEventCardData from './card-multiday-event.yml';
import virtualEventCardData from './card-virtual-event.yml';
import newsCardData from './card-news.yml';
// import eventFallbackCardData from './card-event-fallback.yml';
// import largeEventCardData from './card-event-large.yml';
import bioCardData from './card-bio.yml';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Card',
};

const Default = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Default.args = { ...globalData, ...data };

const CardWithIcon = args =>
  parse(
    twigTemplate({
      ...args,
      media: false,
      icon: '<img src="https://picsum.photos/id/1015/100/100" alt="">',
      link_type: 'cta',
      link_text: 'Big CTA Link',
    })
  );
CardWithIcon.args = { ...globalData, ...data };

const CardNoImage = args =>
  parse(
    twigTemplate({
      ...args,
      media: false,
      icon: false,
    })
  );
CardNoImage.args = { ...globalData, ...data };

const News = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
News.args = { ...globalData, ...newsCardData };

// const MenuCard = args =>
//   parse(
//     twigTemplate({
//       ...args,
//       footer: false,
//       modifier_classes: 'c-card--menu',
//     })
//   );
// MenuCard.args = { ...globalData, ...data };

// const TeaserCard = args =>
//   parse(
//     twigTemplate({
//       ...args,
//       modifier_classes: 'c-card--teaser',
//     })
//   );
// TeaserCard.args = { ...globalData, ...data };


// const VideoCard = args =>
//   parse(
//     twigTemplate({
//       ...args,
//       is_video: true,
//       type: 'Video',
//       footer: 'Jun 2, 2020 · 1:08:48 runtime',
//     })
//   );
// VideoCard.args = { ...globalData, ...data };

const Event = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Event.args = { ...globalData, ...eventCardData };

const EventMultiday = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
EventMultiday.args = { ...globalData, ...multidayEventCardData };

const EventVirtual = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
EventVirtual.args = { ...globalData, ...virtualEventCardData };

const EventTeaserCard = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: 'c-card--teaser',
      event_date: 'Thursday, April 20, 2022 · 1:00 - 3:00 p.m. PT',
    })
  );
EventTeaserCard.args = { ...globalData, ...virtualEventCardData };

// const EventFallbackCard = args =>
//   parse(
//     twigTemplate({
//       ...args,
//     })
//   );
// EventFallbackCard.args = { ...globalData, ...eventFallbackCardData };

// const LargeEventCard = args =>
//   parse(
//     twigTemplate({
//       ...args,
//     })
//   );
// LargeEventCard.args = { ...globalData, ...largeEventCardData };

// const ExtraLargeCardWithRightText = args =>
//   parse(
//     twigTemplate({
//       ...args,
//     })
//   );
// ExtraLargeCardWithRightText.args = {
//   ...globalData,
//   ...data,
//   alignment: 'right',
//   modifier_classes: 'c-card--xlarge',
//   media: '<img src="https://picsum.photos/id/944/1340/600" alt="">',
//   kicker: false,
// };

// const ExtraLargeCardWithLeftText = args =>
//   parse(
//     twigTemplate({
//       ...args,
//     })
//   );
// ExtraLargeCardWithLeftText.args = {
//   ...ExtraLargeCardWithRightText.args,
//   alignment: 'left',
// };

const BioCard = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
BioCard.args = { ...globalData, ...bioCardData };

const BioCardWithFallback = args =>
parse(
  twigTemplate({
    ...args,
  })
);
BioCardWithFallback.args = {
  ...globalData,
  ...bioCardData,
  media: false,
};

// const LargeBioCard = args =>
//   parse(
//     twigTemplate({
//       ...args,
//     })
//   );
// LargeBioCard.args = {
//   ...globalData,
//   ...bioCardData,
//   modifier_classes: 'c-card--bio c-card--bio-large',
// };

export default settings;
export {
  Default,
  CardWithIcon,
  CardNoImage,
  News,
  Event,
  EventMultiday,
  EventVirtual,
  // LargeCard,
  // MenuCard,
  // VideoCard,
  // EventCard,
  // EventMultidayCard,
  // EventFallbackCard,
  // LargeEventCard,
  // TeaserCard,
  EventTeaserCard,
  // ExtraLargeCardWithRightText,
  // ExtraLargeCardWithLeftText,
  BioCard,
  BioCardWithFallback,
  // LargeBioCard,
};
