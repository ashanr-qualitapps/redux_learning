import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import counterReducer from './reducers/counterReducer';
import todosReducer from './reducers/todosReducer';
import tableTopicsReducer from './reducers/tableTopicsReducer'; 

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['todos', 'tableTopics'], // only persist these reducers
  // blacklist: ['counter'] // don't persist counter reducer
};

// Combine multiple reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
  tableTopics: tableTopicsReducer
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with thunk middleware for async actions and persist it
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);
export default store;
