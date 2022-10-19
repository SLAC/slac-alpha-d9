import parse from 'html-react-parser';

import twigTemplate from './lightbox.twig';
import data from './lightbox.yml';

const settings = {
  title: 'Components/Lightbox'
};

const Lightbox = args => {
  const { lightbox_id } = args;
  return (
    <>
      <button
        type="button"
        aria-controls={lightbox_id}
        className="js-lightbox"
      >
        Trigger Lightbox
      </button>
      {parse(
        twigTemplate({
          ...args,
        })
      )}
    </>
  );
}
Lightbox.args = { ...data };

export default settings;
export { Lightbox };
