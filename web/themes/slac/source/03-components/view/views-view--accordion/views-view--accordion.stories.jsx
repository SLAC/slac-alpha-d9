import parse from 'html-react-parser';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

import twigTemplate from './views-view--accordion.twig';
import data from './views-view--accordion.yml';

import { FAQ } from '../../../04-templates/faq/faq.stories.jsx';
import { Default as Pager } from '../../pager/pager.stories.jsx';
import { FilterModal } from '../../filter-modal/filter-modal.stories.jsx';
import { SearchInPage } from '../../search/search.stories';

const settings = {
  title: 'Components/Views/Accordion View',
  parameters: {
    controls: {
      exclude: ['rows', 'pager', 'exposed'],
    },
  },
};

const AccordionView = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
AccordionView.args = {
  ...data,
  rows: [
    ReactDOMServer.renderToStaticMarkup(
      <>
        {FAQ(FAQ.args)}
        {FAQ({
          ...FAQ.args,
          title:
            'Where can I find the current requirements for masking on site?',
        })}
        {FAQ({
          ...FAQ.args,
          title: 'Can I travel for personal reasons?',
        })}
        {FAQ({
          ...FAQ.args,
          title:
            'Does SLAC Occupational Health or Security provide testing for visitors and conference attendees?',
        })}
        {FAQ({
          ...FAQ.args,
          title:
            'How will visitors and users be affected by the curtailment of on-site activity on SLAC?',
        })}
        {FAQ(FAQ.args)}
        {FAQ({
          ...FAQ.args,
          title:
            'Where can I find the current requirements for masking on site?',
        })}
        {FAQ({
          ...FAQ.args,
          title: 'Can I travel for personal reasons?',
        })}
        {FAQ({
          ...FAQ.args,
          title:
            'Does SLAC Occupational Health or Security provide testing for visitors and conference attendees?',
        })}
        {FAQ({
          ...FAQ.args,
          title:
            'How will visitors and users be affected by the curtailment of on-site activity on SLAC?',
        })}
        {FAQ(FAQ.args)}
        {FAQ({
          ...FAQ.args,
          title:
            'Where can I find the current requirements for masking on site?',
        })}
        {FAQ({
          ...FAQ.args,
          title: 'Can I travel for personal reasons?',
        })}
        {FAQ({
          ...FAQ.args,
          title:
            'Does SLAC Occupational Health or Security provide testing for visitors and conference attendees?',
        })}
        {FAQ({
          ...FAQ.args,
          title:
            'How will visitors and users be affected by the curtailment of on-site activity on SLAC?',
        })}
      </>
    ),
  ],
  pager: ReactDOMServer.renderToStaticMarkup(Pager(Pager.args)),
  exposed: ReactDOMServer.renderToStaticMarkup(
    <>
      {SearchInPage(SearchInPage.args)}
      {FilterModal(FilterModal.args)}
    </>
  ),
};

export default settings;
export { AccordionView };
