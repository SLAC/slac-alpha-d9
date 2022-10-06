import parse from 'html-react-parser';

import twigTemplate from './views-view-grid.twig';
import data from './views-view-grid.yml';

const settings = {
  title: 'Components/Views/Grid',
};

const Grid = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Grid.args = { ...data };

export default settings;
export { Grid };
