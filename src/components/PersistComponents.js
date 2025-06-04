import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { getReduxPersistTopic } from '../store/reducers/tableTopicsReducer';
import { HomeButton, BackButton } from './NavigationButtons';

// Import dependencies for react-live scope
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // For localStorage
import { PersistGate } from 'redux-persist/integration/react';

export const ReduxPersistComponent = () => {
  const persistTopic = useSelector(getReduxPersistTopic);

  const exampleCode = `
// store.js
// (Simplified for this live example)
// In a real app, you'd import your actual reducers and createStore.

// Mock Reducers for the example
const initialUserState = { profile: null, preferences: {} };
const userPreferencesReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'SET_PREFERENCE':
      return { ...state, preferences: { ...state.preferences, ...action.payload } };
    default:
      return state;
  }
};

const rootReducer = (state = {}, action) => {
  // In a real app, use combineReducers
  return {
    userPreferences: userPreferencesReducer(state.userPreferences, action)
  };
};

// 1. Import necessary functions
// These are provided by the 'scope' prop of LiveProvider in the actual component
// import { createStore } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// 2. Configuration for redux-persist
const persistConfig = {
  key: 'live-example', // Unique key for this example
  storage,
  whitelist: ['userPreferences'] // Persist only the userPreferences reducer
};

// 3. Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Create the store with the persisted reducer
let store = createStore(persistedReducer);

// 5. Create the persistor
let persistor = persistStore(store);

// --- React Component to demonstrate ---
// These are provided by the 'scope' prop of LiveProvider
// import { Provider, useSelector, useDispatch } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

function MyComponent() {
  const preferences = useSelector(state => state.userPreferences.preferences);
  const dispatch = useDispatch();

  const setTheme = (theme) => {
    dispatch({ type: 'SET_PREFERENCE', payload: { theme } });
  };

  return (
    <div>
      <h4>Live Persist Example</h4>
      <p>Current Theme: {preferences.theme || 'default'}</p>
      <button onClick={() => setTheme('dark')}>Set Dark Theme</button>
      <button onClick={() => setTheme('light')}>Set Light Theme</button>
      <p><small>Refresh the page after setting a theme. The theme should persist.</small></p>
      <p><small>(Note: This live editor uses its own localStorage instance, separate from the main app's.)</small></p>
    </div>
  );
}

// Render the component
// (PersistGate and Provider are handled by react-live's scope for this example)
render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading persisted state...</div>} persistor={persistor}>
      <MyComponent />
    </PersistGate>
  </Provider>
);
`;

  // Scope for react-live
  const scope = {
    React, // React itself
    // Redux
    createStore,
    // React-Redux
    Provider,
    useSelector,
    useDispatch,
    // Redux-Persist
    persistStore,
    persistReducer,
    storage, // from redux-persist/lib/storage
    // Redux-Persist React Integration
    PersistGate, // from redux-persist/integration/react
  };
  
  return (
    <div className="section">
      <HomeButton />
      <h2>{persistTopic?.title || 'Redux Persist'}</h2>
      <p>{persistTopic?.description || 'Persistently store Redux state across application sessions'}</p>
      
      <div className="subsection"> {/* Using subsection for better structure */}
        <h3>What is Redux Persist?</h3>
        <p>
          Redux Persist is a library that saves (persists) your Redux store's state to a persistent storage engine, 
          such as <code>localStorage</code> in web browsers or <code>AsyncStorage</code> in React Native. 
          When the application restarts, Redux Persist retrieves this saved state and rehydrates (restores) the Redux store, 
          allowing user sessions and application data to be maintained across browser refreshes or app closures.
        </p>
      </div>
      
      <div className="subsection">
        <h3>Why Use Redux Persist?</h3>
        <ul>
          <li><strong>Improved User Experience:</strong> Users don't lose their application state (e.g., cart items, form data, UI preferences) if they refresh the page or close the app.</li>
          <li><strong>Offline Support:</strong> Can be a foundational part of enabling basic offline capabilities by preserving data locally.</li>
          <li><strong>Reduced API Calls:</strong> By persisting frequently accessed data, you might reduce the need to re-fetch it on every app load.</li>
        </ul>
      </div>

      <div className="subsection">
        <h3>Key Features & Configuration</h3>
        <ul>
          <li>
            <strong>Storage Engines:</strong> Supports various storage engines. <code>localStorage</code> is common for web.
            <pre>{`import storage from 'redux-persist/lib/storage'; // for localStorage`}</pre>
          </li>
          <li>
            <strong>Whitelisting/Blacklisting:</strong> Control which parts of your state are persisted.
            <pre>{`const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'settings'], // ONLY 'auth' and 'settings' reducers will be persisted
  // blacklist: ['navigationState'] // 'navigationState' reducer will NOT be persisted
};`}</pre>
          </li>
          <li>
            <strong>Transforms:</strong> Modify state before saving or after rehydrating. Useful for compressing data, encrypting sensitive information, or filtering out transient properties.
            <pre>{`import { createTransform } from 'redux-persist';

constmyTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // e.g., convert a Set to an Array
    if (key === 'mySetReducer' && inboundState.mySet instanceof Set) {
      return { ...inboundState, mySet: [...inboundState.mySet] };
    }
    return inboundState;
  },
  // transform state being rehydrated
  (outboundState, key) => {
    // e.g., convert an Array back to a Set
    if (key === 'mySetReducer' && Array.isArray(outboundState.mySet)) {
      return { ...outboundState, mySet: new Set(outboundState.mySet) };
    }
    return outboundState;
  },
  // define which reducers this transform gets called for.
  { whitelist: ['mySetReducer'] }
);

const persistConfig = {
  key: 'root',
  storage,
  transforms: [myTransform]
};`}</pre>
          </li>
          <li><strong>Nested Persists:</strong> Apply different persistence configurations to different parts of your state.</li>
          <li><strong>Migrations:</strong> Handle changes in state structure over time with versioning and migration functions.</li>
        </ul>
      </div>
      
      <div className="subsection">
        <h3>Basic Implementation Steps</h3>
        <p>Below is an interactive example demonstrating the basic setup. You can modify the code and see the changes live. The state will be persisted to your browser's localStorage for this specific example.</p>
        <ol>
          <li>Install: <code>pnpm add redux-persist</code> (already done for the main app)</li>
          <li>
            Configure <code>persistReducer</code> and <code>PersistGate</code>:
          </li>
        </ol>
        <LiveProvider code={exampleCode} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor className="live-editor" />
          </div>
          <LiveError className="live-error" />
          <LivePreview className="live-preview" />
        </LiveProvider>
      </div>

      <div className="subsection">
        <h3>Common Pitfalls & Best Practices</h3>
        <ul>
          <li><strong>Sensitive Data:</strong> Avoid persisting sensitive information (like tokens) directly in <code>localStorage</code> without encryption. Consider using transforms for encryption or storing tokens in more secure ways (e.g., HTTP-only cookies).</li>
          <li><strong>Large State:</strong> Persisting very large state objects can slow down app initialization and exceed storage limits. Be selective with <code>whitelist</code>.</li>
          <li><strong>State Versioning & Migrations:</strong> If your state shape changes, old persisted state might break your app. Implement state migrations using <code>createMigrate</code>.</li>
          <li><strong>Debugging:</strong> Use browser developer tools to inspect <code>localStorage</code> and see what's being persisted. Redux DevTools will show the rehydrated state.</li>
          <li><strong>Non-Serializable Data:</strong> Redux state should generally contain plain serializable objects. Redux Persist might have issues with non-serializable data (like functions, Promises, Symbols, Sets, Maps directly in state without transformation).</li>
          <li><strong>Initial Render:</strong> Be mindful that components might render once with initial state before rehydration completes. The <code>PersistGate</code>'s <code>loading</code> prop can be used to show a loading indicator.</li>
        </ul>
      </div>

      <div className="subsection">
        <h3>Debugging Persisted State</h3>
        <p>
          You can inspect the persisted state directly in your browser's developer tools:
        </p>
        <ol>
          <li>Open Developer Tools (usually F12).</li>
          <li>Navigate to the "Application" tab (in Chrome) or "Storage" tab (in Firefox).</li>
          <li>Under "Local Storage", find the entry corresponding to your <code>persistConfig.key</code> (e.g., <code>persist:primary</code>).</li>
          <li>The value will be a JSON string of your persisted state.</li>
        </ol>
        <p>
          Additionally, Redux DevTools will show a <code>persist/REHYDRATE</code> action when the state is restored, allowing you to inspect the rehydrated state.
        </p>
      </div>
      <BackButton />
    </div>
  );
};
