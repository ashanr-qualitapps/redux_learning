// Initial state
const initialState = {
  count: 0
};

// Action types
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

// Reducer
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + (action.payload || 1)
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - (action.payload || 1)
      };
    case RESET:
      return {
        ...state,
        count: 0
      };
    default:
      return state;
  }
};

export default counterReducer;
