import { create } from '@storybook/theming';

const storybookTheme = create({
  appBg: '#F8F8F8',
  appContentBg: '#fff',
  barBg: '#fff',
  barSelectedColor: '#8c1515',
  barTextColor: '#2e2d29',
  base: 'light',
  brandTitle: 'SLAC',
  brandUrl: 'https://www6.slac.stanford.edu/',
  brandImage:
    './images/logo.svg',
  colorPrimary: '#8c1515',
  colorSecondary: '#8c1515',
  fontBase: '"Lato", Arial, sans-serif',
  textColor: '#2e2d29',
});

export default storybookTheme;
