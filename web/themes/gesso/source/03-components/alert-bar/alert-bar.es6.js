document.documentElement.addEventListener('sitewide-alert-rendered', () => {
  const alertBar = document.querySelector('.c-alert-bar');
  if (alertBar) {
    alertBar.style.height = 'auto';
    setTimeout(() => {
      document.documentElement.style.setProperty(
        '--gesso-alert-bar-height',
        `${alertBar.offsetHeight}px`
      );
      alertBar.style.height = null;
    }, 0);
  }
});

document.documentElement.addEventListener('sitewide-alert-removed', () => {
  document.documentElement.style.setProperty('--gesso-alert-bar-height', '0px');
});
