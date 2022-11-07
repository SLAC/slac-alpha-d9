import parse from 'html-react-parser';

import twigTemplate from './tag-list.twig';
import data from './tag-list.yml';

const settings = {
  title: 'Components/Tag List',
};

const TagList = args => (
  <div className="l-constrain l-constrain--small">
    {parse(
      twigTemplate({
        ...args,
      })
    )}
  </div>
);
TagList.args = { ...data };

export default settings;
export { TagList };
