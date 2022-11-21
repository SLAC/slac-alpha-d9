import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import { Page as PageTemplate } from '../04-templates/page/page.stories';
import { SideMenu } from '../03-components/menu/menu--side/menu--side.stories';
import { WYSIWYG } from '../03-components/wysiwyg/wysiwyg.stories';
import {
  FigureCentered,
  FigureWithVideoCentered,
} from '../03-components/figure/figure.stories';
import {
  GridWrapper,
  SectionWithPaddingWrapper,
  SectionWrapper,
  WysiwygWrapper,
} from '../06-utility/storybookHelper';
import { Section } from '../02-layouts/section/section.stories';
import tabsTwigTemplate from '../03-components/tabs/tabs.twig';
import { Default as Card } from '../03-components/card/card.stories';

import PageWrapper from './page-wrappers/default.jsx';
import {
  NarrowAccordion,
  WideAccordion,
} from '../03-components/accordion/accordion.stories';
import { Default as Table } from '../01-global/html-elements/24-table/table.stories';
import { Header } from '../02-layouts/header/header.stories';

export default {
  title: 'Pages/Basic Page/Basic Page 1',
  parameters: {
    controls: {
      include: [
        'show_admin_info',
        'has_sidebar',
        'hideInternalHeader',
        'site_name',
        'has_logo',
        'header_freeform',
      ],
    },
  },
};

// eslint-disable-next-line camelcase
const BasicPage1 = ({ has_sidebar, sidebar, ...args }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <PageWrapper {...args}>
    {PageTemplate({
      has_sidebar,
      sidebar,
      title: 'Basic Page Example',
      lede: 'Description teaser is informative, intriguing, and compelling to your target audiences. Keep it friendly and approachable with a brief well-written overview of your business and services. Tell just enough of your story, make it enticing that the reader begs for more.',
      content: ReactDOMServer.renderToStaticMarkup(
        <>
          <SectionWrapper>
            <WysiwygWrapper>
              <p>
                <a href="#0" className="c-button c-button--chevron">
                  Optional Button
                </a>
                <a
                  href="#0"
                  className="c-button c-button--outline c-button--chevron"
                >
                  Optional
                </a>
              </p>
              <p>
                Description provides an informative glimpse of the topic and
                excites site visitors to learn more. Nice to be short and
                simple. This is a 35-word count paragraph example. Lorem ipsum
                dolor sit amet lectus magna.
              </p>
            </WysiwygWrapper>
          </SectionWrapper>
          <SectionWithPaddingWrapper>
            {FigureWithVideoCentered(FigureWithVideoCentered.args)}
          </SectionWithPaddingWrapper>
          <SectionWrapper>
            <WysiwygWrapper>
              <h2>Optional Heading</h2>
              <p>
                Description provides an informative glimpse of the topic and
                excites site visitors to learn more. Nice to be short and
                simple. This is a 35-word count paragraph example. Lorem ipsum
                dolor sit amet lectus magna.
              </p>
              <p>
                <a href="#1" className="c-cta-link">
                  Big CTA Link
                </a>
                <a href="#1" className="c-cta-link">
                  Big CTA Link
                </a>
              </p>
            </WysiwygWrapper>
          </SectionWrapper>
          <SectionWithPaddingWrapper>
            <GridWrapper numCols={2}>
              <SectionWrapper>
                <WysiwygWrapper>
                  <h2>Title that grabs attention and describes a topic</h2>
                  <p>
                    Description provides an informative glimpse of the topic and
                    excites site visitors to learn more. Nice to be short and
                    simple. This is a 35-word count paragraph example. Lorem
                    ipsum dolor sit amet lectus magna.
                  </p>
                  <h3>
                    Optional Heading to indicate what the next section is about
                    lorem ipsum
                  </h3>
                </WysiwygWrapper>
                <SectionWithPaddingWrapper>
                  {FigureCentered(FigureCentered.args)}
                </SectionWithPaddingWrapper>
                <WysiwygWrapper>
                  <p>
                    Description provides an informative glimpse of the topic and
                    excites site visitors to learn more. Nice to be short and
                    simple. This is a 35-word count paragraph example. Lorem
                    ipsum dolor sit amet lectus magna.
                  </p>
                  <p>
                    Description provides an informative glimpse of the topic and
                    excites site visitors to learn more. Nice to be short and
                    simple. This is a 26-word count.
                  </p>
                  <p>
                    <a href="#0" className="c-button c-button--chevron">
                      Optional Button
                    </a>
                    <a
                      href="#0"
                      className="c-button c-button--outline c-button--chevron"
                    >
                      Optional
                    </a>
                  </p>
                </WysiwygWrapper>
              </SectionWrapper>
              <SectionWrapper>
                <WysiwygWrapper>
                  <h2>Title that grabs attention and describes a topic</h2>
                  <p>
                    Description provides an informative glimpse of the topic and
                    excites site visitors to learn more. Nice to be short and
                    simple. This is a 35-word count paragraph example. Lorem
                    ipsum dolor sit amet lectus magna.
                  </p>
                  <h3>
                    Optional Heading to indicate what the next section is about
                    lorem ipsum
                  </h3>
                </WysiwygWrapper>
                <SectionWithPaddingWrapper>
                  {FigureWithVideoCentered(FigureWithVideoCentered.args)}
                </SectionWithPaddingWrapper>
                <WysiwygWrapper>
                  <p>
                    Description provides an informative glimpse of the topic and
                    excites site visitors to learn more. Nice to be short and
                    simple. This is a 35-word count paragraph example. Lorem
                    ipsum dolor sit amet lectus magna.
                  </p>
                  <p>
                    <a href="#0" className="c-cta-link">
                      Big CTA Link
                    </a>
                  </p>
                  <p>
                    <a href="#0" className="c-cta-link">
                      Big CTA Link
                    </a>
                  </p>
                  <p>
                    <a href="#0" className="c-cta-link">
                      Big CTA Link
                    </a>
                  </p>
                </WysiwygWrapper>
              </SectionWrapper>
            </GridWrapper>
          </SectionWithPaddingWrapper>
          <SectionWithPaddingWrapper>
            <GridWrapper numCols={3}>
              <SectionWrapper>
                {FigureCentered({
                  ...FigureCentered.args,
                  caption:
                    '<i>(Firstname Lastname/SLAC National Accelerator Laboratory)</i>',
                })}
                <WysiwygWrapper>
                  <h2>Title that grabs and describes a topic</h2>
                  <p>
                    Description provides an informative glimpse of the topic and
                    excites site visitors to learn more. Nice to be short and
                    simple. This is a 26-word count.
                  </p>
                  <p>
                    <a href="#0" className="c-button c-button--chevron">
                      Optional Button
                    </a>
                  </p>
                  <p>
                    <a
                      href="#0"
                      className="c-button c-button--outline c-button--chevron"
                    >
                      Optional
                    </a>
                  </p>
                </WysiwygWrapper>
              </SectionWrapper>
              <SectionWrapper>
                {FigureCentered({
                  ...FigureCentered.args,
                  caption:
                    '<i>(Firstname Lastname/SLAC National Accelerator Laboratory)</i>',
                })}
                <WysiwygWrapper>
                  <h2>Title that grabs and describes a topic</h2>
                  <p>
                    Description provides an informative glimpse of the topic and
                    excites site visitors to learn more. Nice to be short and
                    simple. This is a 26-word count.
                  </p>
                  <p>
                    <a href="#0" className="c-button c-button--chevron">
                      Optional Button
                    </a>
                  </p>
                  <p>
                    <a
                      href="#0"
                      className="c-button c-button--outline c-button--chevron"
                    >
                      Optional
                    </a>
                  </p>
                </WysiwygWrapper>
              </SectionWrapper>
              <SectionWrapper>
                {FigureWithVideoCentered({
                  ...FigureWithVideoCentered.args,
                  caption:
                    '<i>(Firstname Lastname/SLAC National Accelerator Laboratory)</i>',
                })}
                <WysiwygWrapper>
                  <h2>Title that grabs and describes a topic</h2>
                  <p>
                    Description provides an informative glimpse of the topic and
                    excites site visitors to learn more. Nice to be short and
                    simple. This is a 26-word count.
                  </p>
                  <p>
                    <a href="#0" className="c-cta-link">
                      Big CTA Link
                    </a>
                  </p>
                  <p>
                    <a href="#0" className="c-cta-link">
                      Big CTA Link
                    </a>
                  </p>
                  <p>
                    <a href="#0" className="c-cta-link">
                      Big CTA Link
                    </a>
                  </p>
                </WysiwygWrapper>
              </SectionWrapper>
            </GridWrapper>
          </SectionWithPaddingWrapper>
          {Section({
            ...Section.args,
            section_title: 'Tabs lorem ipsum dolor',
            section_buttons: false,
            section_content: ReactDOMServer.renderToStaticMarkup(
              parse(
                tabsTwigTemplate({
                  tabs: [
                    {
                      tab_id: 'tab-one',
                      tab_title: 'Tab One Lorem',
                      tab_content: ReactDOMServer.renderToStaticMarkup(
                        <SectionWrapper>{Table(Table.args)}</SectionWrapper>
                      ),
                    },
                    {
                      tab_id: 'tab-two',
                      tab_title: 'Tab Two Lorem',
                      tab_content: ReactDOMServer.renderToStaticMarkup(
                        <SectionWrapper>
                          <GridWrapper numCols={2}>
                            <SectionWrapper>
                              {WYSIWYG({
                                content: ReactDOMServer.renderToStaticMarkup(
                                  <>
                                    <h2>Tab title for unordered list</h2>
                                    <p>
                                      Description provides an informative
                                      glimpse of the topic and excites site
                                      visitors to learn more. Nice to be short
                                      and simple. This is a 35-word count
                                      paragraph example. Lorem ipsum dolor sit
                                      amet lectus magna.
                                    </p>
                                    <h3>
                                      Optional Heading to indicate what the next
                                      section is about lorem ipsum
                                    </h3>
                                    <ul>
                                      <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Tincidunt non sit
                                        facilisi ac ipsum.
                                      </li>
                                      <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Tincidunt non sit
                                        facilisi ac ipsum.
                                      </li>
                                      <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Tincidunt non sit
                                        facilisi ac ipsum.
                                      </li>
                                    </ul>
                                  </>
                                ),
                              })}
                            </SectionWrapper>
                            <SectionWrapper>
                              {WYSIWYG({
                                content: ReactDOMServer.renderToStaticMarkup(
                                  <>
                                    <h2>Tab title for unordered list</h2>
                                    <p>
                                      Description provides an informative
                                      glimpse of the topic and excites site
                                      visitors to learn more. Nice to be short
                                      and simple. This is a 35-word count
                                      paragraph example. Lorem ipsum dolor sit
                                      amet lectus magna.
                                    </p>
                                    <h3>
                                      Optional Heading to indicate what the next
                                      section is about lorem ipsum
                                    </h3>
                                    <ul>
                                      <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Tincidunt non sit
                                        facilisi ac ipsum.
                                      </li>
                                      <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Tincidunt non sit
                                        facilisi ac ipsum.
                                      </li>
                                      <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Tincidunt non sit
                                        facilisi ac ipsum.
                                      </li>
                                    </ul>
                                  </>
                                ),
                              })}
                            </SectionWrapper>
                          </GridWrapper>
                        </SectionWrapper>
                      ),
                    },
                    {
                      tab_id: 'tab-three',
                      tab_title: 'Tab Three Lorem',
                      tab_content: ReactDOMServer.renderToStaticMarkup(
                        <SectionWrapper>
                          <GridWrapper numCols={2}>
                            <SectionWrapper>
                              {WYSIWYG({
                                content: ReactDOMServer.renderToStaticMarkup(
                                  <>
                                    <h2>
                                      Title that grabs attention and accurately
                                      describes topic
                                    </h2>
                                    <p>
                                      Description provides an informative
                                      glimpse of the topic and excites site
                                      visitors to learn more. Nice to be short
                                      and simple. This is a 35-word count
                                      paragraph example. Lorem ipsum dolor sit
                                      amet lectus magna.
                                    </p>
                                    <h3>
                                      Optional Heading to indicate what the next
                                      section is about lorem ipsum
                                    </h3>
                                    <ol>
                                      <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Tincidunt non sit
                                        facilisi ac ipsum.
                                      </li>
                                      <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Tincidunt non sit
                                        facilisi ac ipsum.
                                      </li>
                                      <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Tincidunt non sit
                                        facilisi ac ipsum.
                                      </li>
                                    </ol>
                                  </>
                                ),
                              })}
                            </SectionWrapper>
                            <SectionWrapper>
                              {WYSIWYG({
                                content: ReactDOMServer.renderToStaticMarkup(
                                  <>
                                    <h2>
                                      Title that grabs attention and accurately
                                      describes topic
                                    </h2>
                                    <p>
                                      Description provides an informative
                                      glimpse of the topic and excites site
                                      visitors to learn more. Nice to be short
                                      and simple. This is a 35-word count
                                      paragraph example. Lorem ipsum dolor sit
                                      amet lectus magna.
                                    </p>
                                    <h3>
                                      Optional Heading to indicate what the next
                                      section is about lorem ipsum
                                    </h3>
                                    <ol>
                                      <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Tincidunt non sit
                                        facilisi ac ipsum.
                                      </li>
                                      <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Tincidunt non sit
                                        facilisi ac ipsum.
                                      </li>
                                      <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Tincidunt non sit
                                        facilisi ac ipsum.
                                      </li>
                                    </ol>
                                  </>
                                ),
                              })}
                            </SectionWrapper>
                          </GridWrapper>
                        </SectionWrapper>
                      ),
                    },
                    {
                      tab_id: 'tab-four',
                      tab_title: 'Tab Four Ipsum',
                      tab_content: ReactDOMServer.renderToStaticMarkup(
                        <SectionWrapper>
                          <GridWrapper numCols={3}>
                            {Card(Card.args)}
                            {Card(Card.args)}
                            {Card(Card.args)}
                          </GridWrapper>
                        </SectionWrapper>
                      ),
                    },
                  ],
                })
              )
            ),
          })}
          {Section({
            ...Section.args,
            section_title: 'Accordion',
            section_buttons: false,
            section_content: ReactDOMServer.renderToStaticMarkup(
              WideAccordion(WideAccordion.args)
            ),
          })}
          {Section({
            ...Section.args,
            section_title: 'Accordion',
            section_buttons: false,
            section_content: ReactDOMServer.renderToStaticMarkup(
              <>
                <GridWrapper numCols={2}>
                  {NarrowAccordion({
                    ...NarrowAccordion.args,
                    accordion_title: 'Lorem ipsum dolor sit ame',
                    title_tag: 'h3',
                  })}
                  {WYSIWYG({
                    content: ReactDOMServer.renderToStaticMarkup(
                      <>
                        <h3>Lorem ipsum dolor sit ame</h3>
                        <p>
                          Optional paragraph text to help describe lorem ipsum
                          dolor sit amet, consectetur adipiscing elit. Porttitor
                          egestas est rhoncus placerat est urna, vitae egestas.
                          Elementum adipiscing amet turpis faucibus lorem sit et
                          faucibus.
                        </p>
                        <h4>
                          Optional Header to help describe lorem psum dolor sit{' '}
                        </h4>
                        <p>
                          Optional paragraph text to help describe lorem ipsum
                          sit et faucibus. Sit eget augue magna ultrices non
                          dictumst.
                        </p>
                      </>
                    ),
                  })}
                </GridWrapper>
                <SectionWrapper>
                  <GridWrapper numCols={2}>
                    <SectionWrapper>
                      {FigureCentered(FigureCentered.args)}
                    </SectionWrapper>
                    <SectionWrapper>
                      {NarrowAccordion({
                        ...NarrowAccordion.args,
                        accordion_title: 'Lorem ipsum dolor sit ame',
                        title_tag: 'h3',
                      })}
                    </SectionWrapper>
                  </GridWrapper>
                </SectionWrapper>
              </>
            ),
          })}
          <SectionWithPaddingWrapper>
            {WYSIWYG({
              content: ReactDOMServer.renderToStaticMarkup(
                <>
                  <h3>Accordion 1 text block</h3>
                  <p>
                    Optional paragraph text to help describe lorem ipsum dolor
                    sit amet, consectetur adipiscing elit. Porttitor egestas est
                    rhoncus placerat est urna, vitae egestas. Elementum
                    adipiscing amet turpis faucibus lorem sit et faucibus.
                  </p>
                  <h4>
                    Optional Header to help describe lorem psum dolor sit{' '}
                  </h4>
                  <p>
                    Optional paragraph text to help describe lorem ipsum sit et
                    faucibus. Sit eget augue magna ultrices non dictumst.
                  </p>
                </>
              ),
            })}
            {NarrowAccordion(NarrowAccordion.args)}
          </SectionWithPaddingWrapper>
        </>
      ),
    })}
  </PageWrapper>
);
BasicPage1.args = {
  ...PageTemplate.args,
  ...Header.args,
  hideInternalHeader: false,
  has_sidebar: true,
  sidebar: ReactDOMServer.renderToStaticMarkup(SideMenu(SideMenu.args)),
};
export { BasicPage1 };
