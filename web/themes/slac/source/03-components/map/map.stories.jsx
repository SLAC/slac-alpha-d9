import parse from 'html-react-parser';

import twigTemplate from './map.twig';
import data from './map.yml';

const settings = {
  title: 'Components/Map'
};

const Map = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Map.args = { ...data };

export default settings;
export { Map };
