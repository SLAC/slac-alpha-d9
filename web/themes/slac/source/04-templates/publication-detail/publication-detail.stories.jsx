import parse from 'html-react-parser';

import twigTemplate from './publication-detail.twig';
import data from './publication-detail.yml';

const settings = {
  title: 'Templates/Publication Detail',
};

const PublicationDetail = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
PublicationDetail.args = { ...data };

export default settings;
export { PublicationDetail };
