function animateIcon(parentElem) {
  const lottiePlayer = parentElem.querySelector('lottie-player');
  if (lottiePlayer) {
    lottiePlayer.seek(0);
    lottiePlayer.play();
  }
}

function resetIcon(parentElem) {
  const lottiePlayer = parentElem.querySelector('lottie-player');
  if (lottiePlayer) {
    lottiePlayer.seek(0);
  }
}

export { animateIcon, resetIcon };
