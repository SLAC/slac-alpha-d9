import React from 'react';

import ReactDOMServer from 'react-dom/server';
import PageWrapper from './page-wrappers/default.jsx';
import { PeopleProfile as PeopleProfileTemplate } from '../04-templates/people-profile/people-profile.stories.jsx';
import { ToggleableView } from '../03-components/view/views-view--toggle/views-view--toggle.stories.jsx';
import { SectionWithGrayWhiteGradient } from '../02-layouts/section/section.stories.jsx';
import { Teaser } from '../03-components/card/card.stories.jsx';
import { Header } from '../02-layouts/header/header.stories.jsx';

export default {
  title: 'Pages/People Profile',
  parameters: {
    controls: {
      include: [
        'show_admin_info',
        'hideInternalHeader',
        'site_name',
        'has_logo',
        'header_freeform',
      ],
    },
  },
};

// eslint-disable-next-line camelcase
const PeopleProfile = ({ show_admin_info, ...args }) => (
  <PageWrapper {...args}>
    {PeopleProfileTemplate({
      ...PeopleProfileTemplate.args,
      related_content: ReactDOMServer.renderToStaticMarkup(
        <>
          {ToggleableView({
            ...ToggleableView.args,
            header: `<div class="c-kicker">Related News</div><h2 class="h3">Stories featuring Mark Hogan</h2>`,
          })}
        </>
      ),
    })}
    {SectionWithGrayWhiteGradient({
      ...SectionWithGrayWhiteGradient.args,
      section_title: 'Title that grabs attention',
      section_intro:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et a commodo mauris ornare id dolor. Enim quis feugiat parturient orci pellentesque.',
      section_content: ReactDOMServer.renderToStaticMarkup(
        <>
          {Teaser(Teaser.args)}
          {Teaser(Teaser.args)}
          {Teaser(Teaser.args)}
        </>
      ),
      section_buttons: false,
    })}
  </PageWrapper>
);

PeopleProfile.args = {
  ...Header.args,
  hideInternalHeader: false,
};
export { PeopleProfile };
