import parse from 'html-react-parser';

import twigTemplate from './expandable-list.twig';
import data from './expandable-list.yml';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Expandable List',
};

const ExpandableList = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
ExpandableList.args = { ...globalData, ...data };

export default settings;
export { ExpandableList };
