import parse from 'html-react-parser';

import twigTemplate from './hero-bg-image.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './hero-bg-image.yml';
import './hero-bg-image.scss';

const settings = {
  title: 'Components/Hero/Hero With Overlay',
  argTypes: {
    position: {
      options: ['left', 'right'],
      control: { type: 'radio' },
    },
  },
  parameters: {
    controls: {
      include: ['hero_title', 'hero_summary', 'hero_kicker', 'position'],
    },
  },
};

const HeroWithChevron = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: `c-hero-bg-image--${args.position}`,
    })
  );
HeroWithChevron.args = { ...globalData, ...data };

const HeroWithButton = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: `c-hero-bg-image--${args.position}`,
    })
  );
HeroWithButton.args = {
  ...globalData,
  ...data,
  hero_button:
    '<p class="c-hero-bg-image__button"><a href="#0" class="c-button c-button--chevron">Optional button</a></p>',
};

export default settings;
export { HeroWithChevron, HeroWithButton };
