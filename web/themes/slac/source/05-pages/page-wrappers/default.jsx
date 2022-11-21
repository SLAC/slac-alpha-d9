import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import SkiplinksTwig from '../../03-components/skiplinks/skiplinks.twig';
import ContentTwig from '../../02-layouts/content/content.twig';
import { AlertBar, alertBarPlayFn } from '../../03-components/alert-bar/alert-bar.stories';
import { Breadcrumb } from '../../03-components/breadcrumb/breadcrumb.stories.jsx';
import { Footer } from '../../02-layouts/footer/footer.stories.jsx';
import { Subfooter } from '../../02-layouts/subfooter/subfooter.stories.jsx';
import { Header } from '../../02-layouts/header/header.stories.jsx';
import { SocialShare } from '../../03-components/social-share/social-share.stories.jsx';
import { GlobalHeader } from '../../02-layouts/global-header/global-header.stories.jsx';
import { InternalHeader } from '../../02-layouts/internal-header/internal-header.stories.jsx';

const PageWrapper = props => {
  const {
    hideSocialLinks,
    hideBreadcrumbs,
    hideInternalHeader,
    hero,
    bodyClasses,
    children,
    ...args
  } = props;
  return (
    <div className={bodyClasses}>
      {parse(SkiplinksTwig())}
      {AlertBar(AlertBar.args)}
      {GlobalHeader(GlobalHeader.args)}
      {!hideInternalHeader && InternalHeader(InternalHeader.args)}
      {Header({ ...Header.args, ...args })}
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
