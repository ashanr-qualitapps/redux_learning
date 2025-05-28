import * as types from './actionTypes';

// Counter actions
export const increment = (amount = 1) => ({
  type: types.INCREMENT,
  payload: { amount }
});

export const decrement = (amount = 1) => ({
  type: types.DECREMENT,
  payload: { amount }
});

export const reset = () => ({
  type: types.RESET
});

export const setValue = (value) => ({
  type: types.SET_VALUE,
  payload: { value }
});

// Todo actions
export const addTodo = (text) => ({
  type: types.ADD_TODO,
  payload: {
    id: Date.now(),
    text,
    completed: false
  }
});

export const toggleTodo = (id) => ({
  type: types.TOGGLE_TODO,
  payload: { id }
});

export const removeTodo = (id) => ({
  type: types.REMOVE_TODO,
  payload: { id }
});

// Async action example using thunk
export const incrementAsync = (amount = 1) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment(amount));
    }, 1000);
  };
};
