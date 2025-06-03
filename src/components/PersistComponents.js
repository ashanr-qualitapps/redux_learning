import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllTopics, getReduxPersistTopic } from '../store/reducers/tableTopicsReducer';

// Back button component for reuse (similar to other topic components)
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button 
      onClick={() => navigate(-1)} 
      style={{ marginBottom: '1rem' }}
    >
      ← Back
    </button>
  );
};

export const ReduxPersistComponent = () => {
  // Get the redux-persist topic from the store
  const persistTopic = useSelector(getReduxPersistTopic);
  
  return (
    <div className="section">
      <BackButton />
      <h2><span className="topic-date">2025-06-02</span> Redux Persist</h2>
      <p>
        Redux Persist is a library that saves the Redux state object to persistent storage, 
        like localStorage or AsyncStorage. When the app starts, it retrieves this persisted state 
        and rehydrates the store.
      </p>
      
      <div className="example-box">
        <h3>Key Features</h3>
        <ul>
          <li><strong>Configurable Storage:</strong> Use with localStorage, AsyncStorage, or custom storage engines</li>
          <li><strong>Selective Persistence:</strong> Choose which parts of your state to persist with whitelist/blacklist</li>
          <li><strong>Transform Data:</strong> Apply transformations before saving state</li>
          <li><strong>Rehydration:</strong> Restore state when the app initializes</li>
        </ul>
      </div>
      
      <div className="example-box">
        <h3>Basic Implementation</h3>
        <pre>
          {`import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'settings'] // only persist these reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);`}
        </pre>
      </div>
      
      <div className="example-box">
        <h3>Using with React</h3>
        <pre>
          {`import { PersistGate } from 'redux-persist/integration/react';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RootComponent />
    </PersistGate>
  </Provider>
);`}
        </pre>
      </div>
      
      <div className="example-box">
        <h3>Current Implementation in This App</h3>
        <pre>
          {`// From store/index.js
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['todos', 'tableTopics'] // only persist these reducers
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with thunk middleware for async actions and persist it
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);`}
        </pre>
        
        <p>Try adding some todos in the TodoList component, then refresh the page - 
        they should persist because the todo state is in the whitelist!</p>
      </div>
    </div>
  );
};
