export const hideOverlay = () => ({
  type: 'HIDE_OVERLAY',
  overlay: {
    signUpForm: false,
    loginForm: false,
  },
});

export const showOverlay = (overlay) => {
  const newState = hideOverlay();
  newState.type = 'SHOW_OVERLAY';
  newState.overlay[overlay] = true;
  return newState;
};
