import parse from 'html-react-parser';
import twigTemplate from './constrain.twig';

const settings = {
  title: 'Layouts/Constrain',
  argTypes: {
    is_demo: {
      table: {
        disable: true,
      },
    },
  },
};

const Default = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Default.args = { is_demo: true };

const Small = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Small.args = { is_demo: true, modifier_classes: 'l-constrain--small' };

const Large = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Large.args = { is_demo: true, modifier_classes: 'l-constrain--large' };

export default settings;
export { Default, Small, Large };
