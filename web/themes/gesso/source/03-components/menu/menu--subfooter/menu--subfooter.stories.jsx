import parse from 'html-react-parser';

import twigTemplate from './menu--subfooter.twig';
import data from './menu--subfooter.yml';

const settings = {
  title: 'Components/Menu/Subfooter Menu',
};

const SubfooterMenu = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
SubfooterMenu.args = { ...data };

export default settings;
export { SubfooterMenu };
