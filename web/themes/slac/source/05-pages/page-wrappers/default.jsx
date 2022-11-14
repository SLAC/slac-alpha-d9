import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import SkiplinksTwig from '../../03-components/skiplinks/skiplinks.twig';
import ContentTwig from '../../02-layouts/content/content.twig';
import { Breadcrumb } from '../../03-components/breadcrumb/breadcrumb.stories.jsx';
import { Footer } from '../../02-layouts/footer/footer.stories.jsx';
import { Subfooter } from '../../02-layouts/subfooter/subfooter.stories';
import { Header } from '../../02-layouts/header/header.stories';
import { SocialShare } from '../../03-components/social-share/social-share.stories';
import { GlobalHeader } from '../../02-layouts/global-header/global-header.stories';
import { InternalHeader } from '../../02-layouts/internal-header/internal-header.stories';

const PageWrapper = props => {
  // eslint-disable-next-line react/prop-types
  const { hideSocialLinks, hideBreadcrumbs, hero, bodyClasses, children } =
    props;
  return (
    <div className={bodyClasses}>
      {parse(SkiplinksTwig())}
      {GlobalHeader(GlobalHeader.args)}
      {InternalHeader(InternalHeader.args)}
      {Header(Header.args)}
      <div className="l-site-container">
        {hero}
        <main id="main" className="c-main" role="main" tabIndex="-1">
          {(!hideBreadcrumbs || !hideSocialLinks) && (
            <div className="c-main__meta">
              {!hideBreadcrumbs && Breadcrumb(Breadcrumb.args)}
              {!hideSocialLinks && SocialShare(SocialShare.args)}
            </div>
          )}
          {parse(
            ContentTwig({
              has_constrain: false,
              content_content: ReactDOMServer.renderToStaticMarkup(
                <>{children}</>
              ),
            })
          )}
        </main>
        {Footer(Footer.args)}
        {Subfooter(Subfooter.args)}
      </div>
    </div>
  );
};

export default PageWrapper;
