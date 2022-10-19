import parse from 'html-react-parser';

import globalData from '../../00-config/storybook.global-data.yml';
import accordionTemplate from './accordion.twig';
import accordionItemTemplate from './accordion-item.twig';
import data from './accordion.yml';
import './accordion.scss';
import './accordion.es6';

const accordionData = data.accordions;
const accordions = accordionData
  .map(item => accordionItemTemplate({ ...globalData, ...item }))
  .join('');

const settings = {
  title: 'Components/Accordion',
};

const NarrowAccordion = args =>
  parse(
    accordionTemplate({
      accordion_items: accordions,
      ...args,
    })
  );
NarrowAccordion.args = { ...globalData, ...data };

const WideAccordion = args =>
  parse(
    accordionTemplate({
      accordion_items: accordions,
      ...args,
    })
  );
WideAccordion.args = {
  ...globalData,
  ...data,
  modifier_classes: 'c-accordion--large',
};

export default settings;
export { NarrowAccordion, WideAccordion };
