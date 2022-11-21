import React from 'react';
import ReactDOMServer from 'react-dom/server';

import globalData from '../00-config/storybook.global-data.yml';
import PageWrapper from './page-wrappers/default.jsx';
import { WithFeaturedContent } from '../03-components/two-column-hero/two-column-hero.stories.jsx';
import { PageTitle } from '../03-components/page-title/page-title.stories.jsx';
import { LargeCard } from '../03-components/card/card.stories.jsx';
import { SectionWrapper } from '../06-utility/storybookHelper.jsx';
import { ToggleableView } from '../03-components/view/views-view--toggle/views-view--toggle.stories.jsx';
import { FilterModal } from '../03-components/filter-modal/filter-modal.stories.jsx';
import { PromoBox } from '../03-components/promo-box/promo-box.stories';

export default {
  title: 'Pages/News Landing Page',
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
const NewsLandingPage = ({ show_admin_info, ...args }) => (
  <PageWrapper {...args}>
    <SectionWrapper modifierClasses="l-section--white-gray">
      {WithFeaturedContent({
        ...WithFeaturedContent.args,
        page_title: ReactDOMServer.renderToStaticMarkup(
          PageTitle({
            ...globalData,
            has_constrain: false,
            page_title: 'News',
            rss_url: '/rss',
            lede: '<p>See what’s new, explore resources, and stay up to date on the latest scientific advancements and happenings at the laboratory so you can learn more about the people, stories, and topics that matter to you.</p><p><a href="#" class="c-button c-button--chevron">Exclusive Newsletter</a><a href="#" class="c-button c-button--chevron c-button--outline">Lorem Ipsum</a></p>',
          })
        ),
        featured_content: ReactDOMServer.renderToStaticMarkup(
          LargeCard({
            ...LargeCard.args,
            type: 'News',
            kicker: 'News Feature',
            title:
              'Dark Energy Survey releases most precise look at the universe’s evolution',
            card_content:
              '<p>An analysis of the first three years of Dark Energy Survey data is consistent with predictions from the current best model of the universe. Nevertheless, hints remain from DES and other experiments that matter in the current universe is a few percent less clumpy than predicted.</p>',
          })
        ),
      })}
      {ToggleableView({
        ...ToggleableView.args,
        exposed: ReactDOMServer.renderToStaticMarkup(
          FilterModal({
            ...FilterModal.args,
            modifier_classes: 'views-exposed-form',
          })
        ),
      })}
    </SectionWrapper>
    {PromoBox(PromoBox.args)}
  </PageWrapper>
);

export { NewsLandingPage };
