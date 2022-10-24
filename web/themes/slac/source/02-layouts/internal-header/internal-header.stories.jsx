import parse from 'html-react-parser';
import twigTemplate from './internal-header.twig';
import data from './internal-header.yml';

const settings = {
  title: 'Layouts/Internal Site Header',
  argTypes: {
    is_demo: {
      table: {
        disable: true,
      },
    },
  },
};

const InternalHeader = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
InternalHeader.args = { ...data };

export default settings;
export { InternalHeader };
