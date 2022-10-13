import parse from 'html-react-parser';

import twigTemplate from './quote.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './quote.yml';
import { SectionWithPurpleBackground } from '../../02-layouts/section/section.stories';

const settings = {
  title: 'Components/Quote',
};

const Quote = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Quote.args = { ...globalData, ...data };

const QuoteOnDark = args =>
  SectionWithPurpleBackground({
    ...SectionWithPurpleBackground.args,
    section_content: twigTemplate({ ...args }),
  });
QuoteOnDark.args = { ...globalData, ...data };

export default settings;
export { Quote, QuoteOnDark };
