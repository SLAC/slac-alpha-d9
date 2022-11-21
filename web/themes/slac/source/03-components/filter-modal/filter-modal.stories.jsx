import parse from 'html-react-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import twigTemplate from './filter-modal.twig';

import '../lightbox/lightbox.es6';
import './filter-modal.scss';

import data from './filter-modal.yml';
import globalData from '../../00-config/storybook.global-data.yml';
import { WithinFilter } from '../form-item/form-item--select/form-item--select.stories.jsx';

const settings = {
  title: 'Components/Filter Modal',
};

const FilterModal = args =>
  parse(
    twigTemplate({
      ...args,
      filters: ReactDOMServer.renderToStaticMarkup(
        <>
          {WithinFilter({
            ...WithinFilter.args,
            options: [
              {
                type: 'option',
                label: 'All News Categories (51)',
              },
              {
                type: 'option',
                label: 'News Story (12)',
              },
              {
                type: 'option',
                label: 'Featured News (23)',
              },
              {
                type: 'option',
                label: 'Announcement (16)',
              },
            ],
            description: null,
            title: 'News Category',
          })}
          {WithinFilter({
            ...WithinFilter.args,
            options: [
              {
                type: 'option',
                label: 'All Years (22)',
              },
              {
                type: 'option',
                label: '2022 (6)',
              },
              {
                type: 'option',
                label: '2021 (16)',
              },
            ],
            description: null,
            title: 'Year',
          })}
        </>
      ),
    })
  );

FilterModal.args = { ...globalData, ...data };

export default settings;
export { FilterModal };
