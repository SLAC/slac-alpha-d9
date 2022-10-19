import twigTemplate from './topic-grid.twig';
import data from './topic-grid.yml';

import './topic-grid.es6';
import './topic-grid.scss';

const settings = {
  title: 'Components/Topic Grid',
};

// Workaround for a bug in the html parser related to <option value="">
const TopicGrid = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);

TopicGrid.args = { ...data };

export default settings;
export { TopicGrid };
