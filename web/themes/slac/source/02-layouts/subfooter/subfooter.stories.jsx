import parse from 'html-react-parser';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import twigTemplate from './subfooter.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './subfooter.yml';
import { SubfooterMenu } from '../../03-components/menu/menu--subfooter/menu--subfooter.stories';

const settings = {
  title: 'Layouts/Subfooter',
};

const Subfooter = args =>
  parse(
    twigTemplate({
      ...args,
      subfooter_menu: ReactDOMServer.renderToStaticMarkup(
        <>{SubfooterMenu(SubfooterMenu.args)}</>
      ),
    })
  );
Subfooter.args = { ...globalData, ...data };

export default settings;
export { Subfooter };
