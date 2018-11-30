// user reducer
const modelReducerDefaultState = {
  maxes: {},
};

export default (state = modelReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_DATA': {
      const newState = {
        ...state,
      };
      newState[action.model] = action.data;
      return newState;
    }

    default:
      return state;
  }
};
