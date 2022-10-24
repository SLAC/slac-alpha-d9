import parse from 'html-react-parser';
import twigTemplate from './global-header.twig';
import data from './global-header.yml';

const settings = {
  title: 'Layouts/Global Header',
  argTypes: {
    is_demo: {
      table: {
        disable: true,
      },
    },
  },
};

const GlobalHeader = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
GlobalHeader.args = { ...data };

const GlobalHeaderHomepage = args => (
  <div className="homepage" style={{ backgroundColor: '#016895' }}>
    {parse(
      twigTemplate({
        ...args,
      })
    )}
  </div>
);
GlobalHeaderHomepage.args = { ...data };

export default settings;
export { GlobalHeader, GlobalHeaderHomepage };
