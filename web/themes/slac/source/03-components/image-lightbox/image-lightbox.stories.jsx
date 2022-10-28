import parse from 'html-react-parser';

import twigTemplate from './image-lightbox.twig';
import data from './image-lightbox.yml';
import './image-lightbox.scss';

const settings = {
  title: 'Components/Image Lightbox'
};

const ImageLightbox = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
ImageLightbox.args = { ...data };

export default settings;
export { ImageLightbox };
