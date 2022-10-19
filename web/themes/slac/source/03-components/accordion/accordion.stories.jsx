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

const Accordion = args =>
  parse(
    accordionTemplate({
      accordion_items: accordions,
      ...args,
    })
  );
Accordion.args = { ...globalData, ...data };

const LargeAccordion = args =>
  parse(
    accordionTemplate({
      accordion_items: accordions,
      ...args,
    })
  );
LargeAccordion.args = {
  ...globalData,
  ...data,
  modifier_classes: 'c-accordion--large',
};

export default settings;
export { Accordion, LargeAccordion };
