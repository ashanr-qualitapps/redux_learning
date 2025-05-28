import { combineReducers } from 'redux';
import * as types from './actionTypes';

// Counter reducer
const initialCounterState = {
  value: 0
};

const counterReducer = (state = initialCounterState, action) => {
  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        value: state.value + action.payload.amount
      };
    case types.DECREMENT:
      return {
        ...state,
        value: state.value - action.payload.amount
      };
    case types.RESET:
      return {
        ...state,
        value: 0
      };
    case types.SET_VALUE:
      return {
        ...state,
        value: action.payload.value
      };
    default:
      return state;
  }
};

// Todo reducer
const initialTodoState = {
  todos: []
};

const todoReducer = (state = initialTodoState, action) => {
  switch (action.type) {
    case types.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case types.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case types.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todoReducer
});

export default rootReducer;
