import { INCREMENT, DECREMENT, RESET } from '../reducers/counterReducer';

// Action creators
export const increment = (value = 1) => ({
  type: INCREMENT,
  payload: value
});

export const decrement = (value = 1) => ({
  type: DECREMENT,
  payload: value
});

export const reset = () => ({
  type: RESET
});
