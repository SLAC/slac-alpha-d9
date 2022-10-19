import parse from 'html-react-parser';

import twigTemplate from './people-profile.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './people-profile.yml';

const settings = {
  title: 'Templates/Page',
  parameters: {
    controls: {
      include: [
        'title',
        'show_admin_info',
        'show_footer',
        'author_name',
        'date_format',
        'year',
        'month',
        'day',
        'hour',
        'minute',
      ],
    },
  },
};

const PeopleProfile = args => parse(twigTemplate(args));
PeopleProfile.args = {
  ...globalData,
  ...data,
};

export default settings;
export { PeopleProfile };
