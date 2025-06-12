import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE
} from '../reducers/todosReducer';

// Synchronous action creators
export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: text
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id
});

// Asynchronous action creator with thunk
export const fetchTodos = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TODOS_REQUEST });
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      
      dispatch({
        type: FETCH_TODOS_SUCCESS,
        payload: data.map(item => ({
          id: item.id,
          text: item.title,
          completed: item.completed
        }))
      });
    } catch (error) {
      dispatch({
        type: FETCH_TODOS_FAILURE,
        payload: error.message
      });
    }
  };
};
