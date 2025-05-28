import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import counterReducer from './reducers/counterReducer';
import todosReducer from './reducers/todosReducer';
import tableTopicsReducer from './reducers/tableTopicsReducer'; // Add this line

// Combine multiple reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
  tableTopics: tableTopicsReducer // Add this line
});

// Create store with thunk middleware for async actions
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
