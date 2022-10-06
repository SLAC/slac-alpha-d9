import parse from 'html-react-parser';

import twigTemplate from './bio-page.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './bio-page.yml';
import './bio-page.scss';

const settings = {
  title: 'Components/Bio Page',
};

const BioPage = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
BioPage.args = { ...globalData, ...data };

const BioPageWithoutImage = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
BioPageWithoutImage.args = { ...globalData, ...data, bio_image: false };

const BioPageWithLongBio = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
BioPageWithLongBio.args = {
  ...globalData,
  ...data,
  bio_page_content: `
<p>Norbert Holtkamp is deputy director of SLAC and project director for the construction of LCLS-II. He is a SLAC professor of photon science and of particle physics and astrophysics. He works on strategic initiatives, including approximately $2 billion in construction now underway on the SLAC site. From 2010 to 2014 he served as associate laboratory director for the SLAC Accelerator Directorate.</p>
<p>Holtkamp has served on Department of Energy and National Science Foundation review committees involving technical and planning issues for linear colliders, neutrino factories and neutrino beams, synchrotron light sources, X-ray free-electron lasers and high-energy colliders.</p>  
<p>Before coming to SLAC, he was principal deputy director general of the ITER organization, a partnership between the European Union, China, India, Japan, South Korea, Russia and the United States. He was responsible for the technical management of one of the largest science projects in the world – construction of an experimental tokamak fusion reactor – which is still underway in the south of France.</p>
<p>Prior to ITER, Holtkamp was director of the Accelerator Systems Division for the Spallation Neutron Source (SNS) at Oak Ridge National Laboratory, where he led the design and construction of the SNS accelerator by five participating DOE laboratories. He received the Gersh Budker prize of the European Physical Society for the success of this project.</p>
<p>He has been a senior staff member at DESY in Hamburg, Germany, responsible for operation of the injector linear accelerators and a R&D program that included construction of a 400 MeV electron test linac. At Fermi National Accelerator Laboratory, Holtkamp led a multi-laboratory study on the technical feasibility of an intense neutrino source based on a muon storage ring.</p>
<p>Holtkamp holds the equivalent of a master’s degree in physics from the University of Berlin and a PhD in physics from the Technical University in Darmstadt, Germany.</p>`,
  bio_page_content_collapsed: `Norbert Holtkamp is deputy director of SLAC and project director for the construction of LCLS-II. He is a SLAC professor of photon science and of particle physics and astrophysics. He works on strategic initiatives, including approximately $2 billion in construction now underway on the SLAC site. From 2010 to 2014 he served as associate laboratory director for...`,
};

export default settings;
export { BioPage, BioPageWithoutImage, BioPageWithLongBio };
