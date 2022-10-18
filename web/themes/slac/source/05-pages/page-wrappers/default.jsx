import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import SkiplinksTwig from '../../03-components/skiplinks/skiplinks.twig';
import BreadcrumbTwig from '../../02-layouts/breadcrumb/breadcrumb.twig';
import ContentTwig from '../../02-layouts/content/content.twig';
import { AlertBar } from '../../03-components/alert-bar/alert-bar.stories.jsx';
import { Breadcrumb } from '../../03-components/breadcrumb/breadcrumb.stories.jsx';
import { BackToTop } from '../../03-components/back-to-top/back-to-top.stories.jsx';
import { Footer } from '../../02-layouts/footer/footer.stories.jsx';
import { Subfooter } from '../../02-layouts/subfooter/subfooter.stories';
import { Header } from '../../02-layouts/header/header.stories';
import { SocialShare } from '../../03-components/social-share/social-share.stories';
import { CookieBanner } from '../../03-components/cookie-banner/cookie-banner.stories';

const PageWrapper = props => {
  // eslint-disable-next-line react/prop-types
  const { hideSocialLinks, hideBreadcrumbs, hero, bodyClasses, children } =
    props;
  return (
    <div className={bodyClasses}>
      {parse(SkiplinksTwig())}
      {AlertBar(AlertBar.args)}
      {Header(Header.args)}
      <div className="l-site-container">
        {hero}
        <main id="main" className="c-main" role="main" tabIndex="-1">
          <div className="c-main__meta">
            {!hideBreadcrumbs &&
              parse(
                BreadcrumbTwig({
                  has_constrain: false,
                  breadcrumb_content: ReactDOMServer.renderToStaticMarkup(
                    <>{Breadcrumb(Breadcrumb.args)}</>
                  ),
                })
              )}
            {!hideSocialLinks && SocialShare(SocialShare.args)}
          </div>
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
        {CookieBanner(CookieBanner.args)}
      </div>
    </div>
  );
};

export default PageWrapper;
