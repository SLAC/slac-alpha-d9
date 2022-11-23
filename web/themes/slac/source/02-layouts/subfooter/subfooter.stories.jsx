import parse from 'html-react-parser';

import twigTemplate from './subfooter.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './subfooter.yml';
import { SubfooterMenu } from '../../03-components/menu/menu--subfooter/menu--subfooter.stories.jsx';

const settings = {
  title: 'Layouts/Subfooter',
};

const Subfooter = args =>
  parse(
    twigTemplate({
      ...args,
      subfooter_menu_items: SubfooterMenu.args.items,
    })
  );
Subfooter.args = { ...globalData, ...data };

export default settings;
export { Subfooter };
