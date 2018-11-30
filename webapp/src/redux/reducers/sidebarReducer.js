// user reducer
const sidebarReduserDefaultState = {
  isOpen: false,
  className: 'closed',
};

export default (state = sidebarReduserDefaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        isOpen: !state.isOpen,
        className: state.isOpen ? 'closed' : '',
      };

    default:
      return state;
  }
};
