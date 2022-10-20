import parse from 'html-react-parser';

import ReactDOMServer from 'react-dom/server';
import React from 'react';
import twigTemplate from './footer.twig';
import data from './footer.yml';
import globalData from '../../00-config/storybook.global-data.yml';
import { Tagline } from '../../03-components/tagline/tagline.stories';
import { FooterMenu } from '../../03-components/menu/menu--footer/menu--footer.stories';
import { FooterUtilityMenu } from '../../03-components/menu/menu--footer-utility/menu--footer-utility.stories';

const settings = {
  title: 'Layouts/Footer',
  argTypes: {
    is_demo: {
      table: {
        disable: true,
      },
    },
  },
};

const Footer = args =>
  parse(
    twigTemplate({
      ...args,
      tagline: ReactDOMServer.renderToStaticMarkup(
        <>{Tagline(Tagline.args)}</>
      ),
      menu: ReactDOMServer.renderToStaticMarkup(
        <>{FooterMenu(FooterMenu.args)}</>
      ),
      global_menu: ReactDOMServer.renderToStaticMarkup(
        <>{FooterUtilityMenu(FooterUtilityMenu.args)}</>
      ),
      utility_menu: ReactDOMServer.renderToStaticMarkup(
        <>
          {FooterUtilityMenu({
            menu_name: 'footer-utility',
            items: [
              {
                title: 'A-Z Index',
                url: '#0',
              },
              {
                title: 'Website Feedback',
                url: '#0',
              },
            ],
          })}
        </>
      ),
    })
  );
Footer.args = { ...globalData, ...data };

export default settings;
export { Footer };
