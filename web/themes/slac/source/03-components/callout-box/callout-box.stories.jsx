import parse from 'html-react-parser';

import twigTemplate from './callout-box.twig';
import data from './callout-box.yml';

const settings = {
  title: 'Components/Callout Box'
};

const CalloutBox = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
CalloutBox.args = { ...data };

export default settings;
export { CalloutBox };
