import parse from 'html-react-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import twigTemplate from './filter-modal.twig';
import { Checkbox } from '../form-item/form-item--checkbox/form-item--checkbox.stories';
import { Radio } from '../form-item/form-item--radio/form-item--radio.stories';

import '../lightbox/lightbox.es6';
import './filter-modal.es6';
import './filter-modal.scss';

import data from './filter-modal.yml';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Filter Modal',
};

const filterByType = ReactDOMServer.renderToStaticMarkup(
  <>
    {Checkbox({
      ...Checkbox.args,
      title: 'News (327)',
      id: 'type-1',
      name: 'type',
    })}
    {Checkbox({
      ...Checkbox.args,
      title: 'Events (112)',
      id: 'type-2',
      name: 'type',
    })}
    {Checkbox({
      ...Checkbox.args,
      title: 'Images (45)',
      id: 'type-3',
      name: 'type',
    })}
    {Checkbox({
      ...Checkbox.args,
      title: 'Video (34)',
      id: 'type-4',
      name: 'type',
    })}
  </>
);

const filterByArea = ReactDOMServer.renderToStaticMarkup(
  <>
    {Checkbox({
      ...Checkbox.args,
      title: 'X-Ray & Ultrafast Science (80)',
      id: 'checkbox-1',
    })}
    {Checkbox({
      ...Checkbox.args,
      title: 'Physics of the Universe (125)',
      id: 'checkbox-2',
    })}
    {Checkbox({
      ...Checkbox.args,
      title: 'Advanced Accelerators (122)',
      id: 'checkbox-3',
    })}
    {Checkbox({
      ...Checkbox.args,
      title: 'Science of Life (61)',
      id: 'checkbox-4',
    })}
    {Checkbox({
      ...Checkbox.args,
      title: 'New Technologies (11)',
      id: 'checkbox-5',
    })}
    {Checkbox({
      ...Checkbox.args,
      title: 'Energy Sciences (2)',
      id: 'checkbox-6',
    })}
  </>
);

const sortBy = ReactDOMServer.renderToStaticMarkup(
  <>
    {Radio({
      ...Radio.args,
      title: 'Relevancy',
      id: 'sort-1',
      name: 'sort',
      is_checked: true,
    })}
    {Radio({
      ...Radio.args,
      title: 'Newest',
      id: 'sort-2',
      name: 'sort',
    })}
    {Radio({
      ...Radio.args,
      title: 'Oldest',
      id: 'sort-3',
      name: 'sort',
    })}
  </>
);

const FilterModal = args =>
  parse(
    twigTemplate({
      ...args,
      filter_by_area: filterByArea,
      filter_by_type: filterByType,
      sort_by: sortBy,
    })
  );

FilterModal.args = { ...globalData, ...data };

export default settings;
export { FilterModal };
