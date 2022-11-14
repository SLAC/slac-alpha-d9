import parse from 'html-react-parser';
import React from 'react';

import twigTemplate from './callout-box.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './callout-box.yml';
import {
  decorators,
  sectionTypeArg,
} from '../../06-utility/storybookHelper.jsx';
import { WYSIWYG } from '../wysiwyg/wysiwyg.stories';

const settings = {
  title: 'Paragraphs/Callout Box',
  parameters: {
    controls: {
      include: [
        'callout_media',
        'callout_title',
        'callout_content',
        'section_type',
      ],
    },
  },
  argTypes: {
    section_type: sectionTypeArg,
  },
  decorators: [
    Story => (
      <>
        {Story()}
        {WYSIWYG(WYSIWYG.args)}
      </>
    ),
    ...decorators,
  ],
};

const CalloutBox = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
CalloutBox.args = { ...globalData, ...data };

export default settings;
export { CalloutBox };
