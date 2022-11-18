import React from 'react';
import ReactDOMServer from 'react-dom/server';

import PageWrapper from './page-wrappers/default.jsx';
import { PublicationDetail as PageTemplate } from '../04-templates/publication-detail/publication-detail.stories.jsx';
import { Header } from '../02-layouts/header/header.stories.jsx';
import {
  SectionWithPaddingWrapper,
  WysiwygWrapper,
} from '../06-utility/storybookHelper.jsx';
import { FigureCentered } from '../03-components/figure/figure.stories.jsx';
import { TagList } from '../03-components/tag-list/tag-list.stories.jsx';

export default {
  title: 'Pages/Publication Detail Page',
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
const PublicationDetailPage = ({ show_admin_info, ...args }) => (
  <PageWrapper {...args}>
    {PageTemplate({
      ...PageTemplate.args,
      content: ReactDOMServer.renderToStaticMarkup(
        <>
          <WysiwygWrapper>
            <h2>Abstract</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Adipiscing elit ut aliquam purus. Sed viverra tellus in hac
              habitasse platea. Morbi non arcu risus quis varius. Nec feugiat
              nisl pretium fusce id velit ut tortor pretium. Fames ac turpis
              egestas maecenas. Id neque aliquam vestibulum morbi blandit cursus
              risus at. Vitae sapien pellentesque habitant morbi tristique
              senectus et netus et. Amet consectetur adipiscing elit duis
              tristique sollicitudin nibh. Netus et malesuada fames ac turpis
              egestas. Eget nunc scelerisque viverra mauris in aliquam sem
              fringilla. Et ligula ullamcorper malesuada proin libero nunc
              consequat interdum. Euismod quis viverra nibh cras pulvinar mattis
              nunc sed blandit. Quis ipsum suspendisse ultrices gravida dictum
              fusce ut. Sollicitudin tempor id eu nisl nunc.
            </p>
          </WysiwygWrapper>
          <SectionWithPaddingWrapper>
            {FigureCentered(FigureCentered.args)}
          </SectionWithPaddingWrapper>
          <WysiwygWrapper>
            <p>
              Eget mauris pharetra et ultrices neque. Bibendum arcu vitae
              elementum curabitur. Duis convallis convallis tellus id interdum
              velit. Justo eget magna fermentum iaculis eu. Orci eu lobortis
              elementum nibh tellus molestie nunc non blandit. Tincidunt eget
              nullam non nisi est sit amet facilisis. Ac tortor dignissim
              convallis aenean. Diam maecenas ultricies mi eget mauris pharetra.
              Sed risus pretium quam vulputate dignissim suspendisse in est.
              Pharetra magna ac placerat vestibulum lectus. Dolor sed viverra
              ipsum nunc aliquet bibendum enim facilisis. A erat nam at lectus
              urna duis convallis convallis. Ut etiam sit amet nisl purus in.
              Scelerisque eu ultrices vitae auctor eu augue ut. Elit ullamcorper
              dignissim cras tincidunt lobortis feugiat. Tellus mauris a diam
              maecenas sed enim ut sem viverra.
            </p>
            <p>
              Tortor posuere ac ut consequat semper. Etiam dignissim diam quis
              enim lobortis scelerisque fermentum dui. Maecenas accumsan lacus
              vel facilisis volutpat. Pharetra sit amet aliquam id diam maecenas
              ultricies mi. In nisl nisi scelerisque eu ultrices vitae auctor eu
              augue. Vestibulum lorem sed risus ultricies tristique nulla
              aliquet enim tortor. Laoreet id donec ultrices tincidunt arcu non
              sodales. Arcu non odio euismod lacinia at quis risus sed
              vulputate. Aenean sed adipiscing diam donec adipiscing. Maecenas
              ultricies mi eget mauris pharetra et. Sed elementum tempus egestas
              sed sed risus pretium. Neque ornare aenean euismod elementum. At
              tellus at urna condimentum.
            </p>
          </WysiwygWrapper>
        </>
      ),
      tags: ReactDOMServer.renderToStaticMarkup(
        TagList({ ...TagList.args, has_constrain: false })
      ),
    })}
  </PageWrapper>
);
PublicationDetailPage.args = {
  ...Header.args,
  hideInternalHeader: false,
};
export { PublicationDetailPage };
