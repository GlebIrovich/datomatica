// user reducer
const overlayReduserDefaultState = {
  signUpForm: false,
  loginForm: false,
};

export default (state = overlayReduserDefaultState, action) => {
  switch (action.type) {
    case 'HIDE_OVERLAY':
      return { ...overlayReduserDefaultState };

    case 'SHOW_OVERLAY':
      return { ...action.overlay };

    default:
      return state;
  }
};
