import parse from 'html-react-parser';

import ReactDOMServer from 'react-dom/server';
import React from 'react';
import twigTemplate from './header.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './header.yml';
import './header.es6';
import { Search } from '../../03-components/search/search.stories';
import { DropdownMenu } from '../../03-components/dropdown-menu/dropdown-menu.stories';

const settings = {
  title: 'Layouts/Header',
  argTypes: {
    is_demo: {
      table: {
        disable: true,
      },
    },
  },
};

const Header = args =>
  parse(
    twigTemplate({
      ...args,
      header_content: ReactDOMServer.renderToStaticMarkup(
        <>
          {DropdownMenu(DropdownMenu.args)}
          {Search(Search.args)}
        </>
      ),
    })
  );
Header.args = { ...globalData, ...data };

export default settings;
export { Header };
