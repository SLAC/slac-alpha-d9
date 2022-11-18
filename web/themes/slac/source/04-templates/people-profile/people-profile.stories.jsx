import parse from 'html-react-parser';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

import twigTemplate from './people-profile.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './people-profile.yml';
import './people-profile.scss';
import { WysiwygWrapper } from '../../06-utility/storybookHelper.jsx';

const settings = {
  title: 'Templates/People Profile',
  parameters: {
    controls: {
      include: [
        'show_admin_info',
        'bio_name',
        'bio_job_title',
        'bio_organization',
        'bio_image',
        'bio_page_content',
        'bio_email',
        'bio_phone',
        'bio_mobile',
        'bio_fax',
        'bio_location_name',
        'bio_location_address',
        'bio_map',
        'bio_interestareas',
        'bio_education',
        'bio_awardshonors',
        'bio_affiliations',
        'bio_links',
      ],
    },
  },
};

const PeopleProfile = args => parse(twigTemplate(args));
PeopleProfile.args = {
  ...globalData,
  ...data,
  bio_page_content: ReactDOMServer.renderToStaticMarkup(
    <WysiwygWrapper>{parse(data.bio_page_content)}</WysiwygWrapper>
  ),
};

export default settings;
export { PeopleProfile };
