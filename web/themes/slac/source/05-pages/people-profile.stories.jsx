import React from 'react';

import ReactDOMServer from 'react-dom/server';
import PageWrapper from './page-wrappers/default.jsx';
import { PeopleProfile as PeopleProfileTemplate } from '../04-templates/people-profile/people-profile.stories';
import { ToggleableView } from '../03-components/view/views-view--toggle/views-view--toggle.stories';

export default {
  title: 'Pages/People Profile',
  parameters: {
    controls: {
      include: ['show_admin_info'],
    },
  },
};

const PeopleProfile = () => (
  <PageWrapper>
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
  </PageWrapper>
);
export { PeopleProfile };
