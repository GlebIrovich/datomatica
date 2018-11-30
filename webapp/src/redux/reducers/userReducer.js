// user reducer
const userReduserDefaultState = {
  isAuthorized: false,
  id: '',
  token: '',
  username: '',
  name: '',
  lastName: '',
  email: '',
  storeUrl: '',
};

export default (state = userReduserDefaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.user };

    case 'RESET_USER':
      return { ...userReduserDefaultState };

    case 'RESET_STORE_URL':
      return { ...state, storeUrl: '' };

    default:
      return state;
  }
};
