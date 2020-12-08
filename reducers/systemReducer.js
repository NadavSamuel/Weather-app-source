
const initialState = {
  isLoading: false,
  wasInitialLoad:false
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case 'LOADING_START':
      return { ...state, isLoading: true };
    case 'LOADING_DONE':
      return { ...state, isLoading: false };
      case 'TOGGLE_INITIAL_LOAD':
      return { ...state, wasInitialLoad: !state.wasInitialLoad };

    default: return state;
  }
}
