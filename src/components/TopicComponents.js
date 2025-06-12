import React from 'react';
import Counter from './Counter';
import TodoList from './TodoList';
import { HomeButton, BackButton, NextButton } from './NavigationButtons';

export const ActionsComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>Actions and Action Creators</h2>
      <p>Actions are plain JavaScript objects that represent an intention to change state. 
         Action creators are functions that create and return action objects.</p>
      
      <h3>Understanding Redux Actions</h3>
      <p>
        An action is the only way to send data from your application to your Redux store. 
        Actions are payloads of information that send data to the store via 
        <code>store.dispatch()</code>.
      </p>
      
      <div className="example-box">
        <h4>Anatomy of an Action</h4>
        <p>Actions must have a <code>type</code> property that indicates the type of action being performed:</p>
        <pre>
          {`// Basic action
{
  type: 'ADD_TODO',
  payload: 'Buy milk'
}`}
        </pre>
        <p>The <code>type</code> is typically defined as string constants:</p>
        <pre>
          {`// Action type constants
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';`}
        </pre>
      </div>
      
      <h3>Action Creators</h3>
      <p>
        Action creators are functions that create actions. They encapsulate the process of creating 
        an action object and make your code more reusable and testable.
      </p>
      
      <div className="example-box">
        <h4>Simple Action Creators:</h4>
        <pre>
          {`// Action creator
const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: text
});

// Usage
dispatch(addTodo('Buy milk'));`}
        </pre>
        
        <h4>Action Creators with Multiple Parameters:</h4>
        <pre>
          {`const updateUser = (id, userData) => ({
  type: 'UPDATE_USER',
  payload: {
    id,
    ...userData
  }
});

// Usage
dispatch(updateUser(123, { name: 'John', email: 'john@example.com' }));`}
        </pre>
      </div>
      
      <h3>Flux Standard Action (FSA)</h3>
      <p>
        FSA is a recommended format for creating actions that makes them more consistent and easier to work with.
      </p>
      
      <div className="example-box">
        <h4>FSA Structure:</h4>
        <pre>
          {`{
  type: 'ACTION_TYPE',    // Required: The action type
  payload: {},           // Optional: The action data
  error: false,          // Optional: Indicates if this action represents an error
  meta: {}               // Optional: Extra information not part of the payload
}`}
        </pre>
        
        <h4>FSA Examples:</h4>
        <pre>
          {`// Success action
const fetchUserSuccess = (user) => ({
  type: 'FETCH_USER_SUCCESS',
  payload: user
});

// Error action
const fetchUserFailure = (error) => ({
  type: 'FETCH_USER_FAILURE',
  payload: error,
  error: true
});

// Action with meta information
const deleteComment = (id) => ({
  type: 'DELETE_COMMENT',
  payload: id,
  meta: {
    timestamp: Date.now(),
    analytics: {
      event: 'delete_comment',
      value: id
    }
  }
});`}
        </pre>
      </div>
      
      <h3>Best Practices</h3>
      <ul>
        <li><strong>Use Action Type Constants</strong>: Define action types as constants to avoid typos</li>
        <li><strong>Keep Actions Serializable</strong>: Avoid including non-serializable values like functions or complex objects</li>
        <li><strong>Make Actions Descriptive</strong>: Action types should clearly describe what happened</li>
        <li><strong>Use Namespacing</strong>: Prefix action types to avoid conflicts (e.g., 'users/add', 'posts/fetch')</li>
        <li><strong>Keep Actions Small</strong>: Include only what's necessary for the reducer to update state</li>
      </ul>
      
      <div className="example-box">
        <h4>Action Type Organization:</h4>
        <pre>
          {`// actionTypes.js - Centralizing action types
export const USERS = {
  FETCH_REQUEST: 'users/fetchRequest',
  FETCH_SUCCESS: 'users/fetchSuccess',
  FETCH_FAILURE: 'users/fetchFailure',
  ADD: 'users/add',
  UPDATE: 'users/update',
  REMOVE: 'users/remove'
};

export const POSTS = {
  FETCH_REQUEST: 'posts/fetchRequest',
  FETCH_SUCCESS: 'posts/fetchSuccess',
  FETCH_FAILURE: 'posts/fetchFailure',
  ADD: 'posts/add',
  UPDATE: 'posts/update',
  REMOVE: 'posts/remove'
};`}
        </pre>
      </div>
      
      <p>Below is a live example of dispatching actions with our Counter component:</p>
      <Counter />
      <BackButton />
      <NextButton to="/concepts/reducers" label="Next: Reducers" />
    </div>
  );
};

export const ReducersComponent = () => {
  return (
    <div className="section">
      <h2>Reducers in Redux</h2>
      <p>
        Reducers are pure functions that determine how your application's state changes in response to actions sent to the store.
        They specify how the application's state should change in response to different actions.
      </p>

      <div className="example-box">
        <h3>Anatomy of a Reducer</h3>
        <pre>{`// Basic structure of a reducer
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'RESET':
      return { ...state, count: 0 };
    default:
      return state;
  }
}`}</pre>
      </div>

      <h3>Key Characteristics of Reducers</h3>
      <ul>
        <li><strong>Pure Functions</strong>: Reducers must be pure functions - given the same arguments, they should return the same result with no side effects.</li>
        <li><strong>Immutable Updates</strong>: Reducers should not modify the existing state, but instead create a new copy with changes.</li>
        <li><strong>Single Responsibility</strong>: Each reducer should focus on updating a specific part of the state tree.</li>
        <li><strong>Default State</strong>: Reducers should provide a default state value when no state is provided.</li>
        <li><strong>Handle Unknown Actions</strong>: Reducers must return the current state for any unrecognized action.</li>
      </ul>

      <div className="example-box">
        <h3>Handling Different Action Types</h3>
        <pre>{`// Todos reducer with multiple action handlers
const initialState = {
  todos: [],
  loading: false,
  error: null
};

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'FETCH_TODOS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_TODOS_SUCCESS':
      return {
        ...state,
        loading: false,
        todos: action.payload
      };
    case 'FETCH_TODOS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}`}</pre>
      </div>

      <h3>Immutability in Reducers</h3>
      <p>
        Immutability is a core concept in Redux. Reducers must never mutate the existing state object.
        Instead, they should create a new state object with the desired changes.
      </p>

      <div className="example-box">
        <h3>Immutable Update Patterns</h3>
        <pre>{`// Updating objects immutably
const updateObjectInArray = (array, itemId, updateCallback) => {
  return array.map(item => {
    if (item.id !== itemId) {
      // Not the item we care about - keep it as-is
      return item;
    }

    // Otherwise, use the update callback to create a new item
    return {
      ...item,
      ...updateCallback(item)
    };
  });
};

// Usage in reducer
case 'UPDATE_TODO':
  return {
    ...state,
    todos: updateObjectInArray(state.todos, action.payload.id, todo => ({
      completed: !todo.completed
    }))
  };`}</pre>
      </div>

      <div className="example-box">
        <h3>Common Immutable Update Operations</h3>
        <table>
          <thead>
            <tr>
              <th>Operation</th>
              <th>Code Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Update object property</td>
              <td><code>{`{ ...state, name: 'New Name' }`}</code></td>
            </tr>
            <tr>
              <td>Update nested object</td>
              <td><code>{`{ ...state, user: { ...state.user, age: 30 } }`}</code></td>
            </tr>
            <tr>
              <td>Add to array</td>
              <td><code>{`{ ...state, items: [...state.items, newItem] }`}</code></td>
            </tr>
            <tr>
              <td>Remove from array</td>
              <td><code>{`{ ...state, items: state.items.filter(item => item.id !== id) }`}</code></td>
            </tr>
            <tr>
              <td>Update item in array</td>
              <td><code>{`{ ...state, items: state.items.map(item => item.id === id ? { ...item, ...changes } : item) }`}</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Combining Reducers</h3>
      <p>
        As your app grows, you'll want to split your reducing function into separate functions, 
        each managing independent parts of the state. Redux provides the <code>combineReducers</code> utility 
        to help with this.
      </p>

      <div className="example-box">
        <h3>Using combineReducers</h3>
        <pre>{`import { combineReducers } from 'redux';

// Separate reducers for different parts of the state
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    default:
      return state;
  }
};

const filtersReducer = (state = { status: 'All', colors: [] }, action) => {
  switch (action.type) {
    case 'SET_STATUS_FILTER':
      return { ...state, status: action.payload };
    case 'SET_COLOR_FILTERS':
      return { ...state, colors: action.payload };
    default:
      return state;
  }
};

// Combine them into a single reducer
const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer
});

// State shape will be:
// {
//   todos: [],
//   filters: { status: 'All', colors: [] }
// }`}</pre>
      </div>

      <h3>Advanced Reducer Patterns</h3>

      <div className="example-box">
        <h3>Reducer Composition</h3>
        <p>
          Reducer composition is a pattern where a reducer delegates parts of the state update to other "sub-reducers".
        </p>
        <pre>{`// Main todos reducer
function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'TOGGLE_TODO':
      return state.map(todo => 
        todo.id === action.payload ? todoReducer(todo, action) : todo
      );
    default:
      return state;
  }
}

// Sub-reducer handling individual todo updates
function todoReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_TODO':
      return {
        ...state,
        completed: !state.completed
      };
    case 'UPDATE_TODO_TEXT':
      return {
        ...state,
        text: action.payload.text
      };
    default:
      return state;
  }
}`}</pre>
      </div>

      <div className="example-box">
        <h3>Higher-Order Reducers</h3>
        <p>
          Higher-order reducers are functions that take a reducer and return a new enhanced reducer.
        </p>
        <pre>{`// A higher-order reducer to add undo/redo functionality
function undoable(reducer) {
  // Call the reducer with empty action to get initial state
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: []
  };

  return function(state = initialState, action) {
    const { past, present, future } = state;

    switch (action.type) {
      case 'UNDO':
        if (past.length === 0) return state;
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: previous,
          future: [present, ...future]
        };
      case 'REDO':
        if (future.length === 0) return state;
        const next = future[0];
        const newFuture = future.slice(1);
        return {
          past: [...past, present],
          present: next,
          future: newFuture
        };
      default:
        // Delegate handling to the wrapped reducer
        const newPresent = reducer(present, action);
        if (present === newPresent) {
          return state;
        }
        return {
          past: [...past, present],
          present: newPresent,
          future: []
        };
    }
  };
}`}</pre>
      </div>

      <h3>Best Practices for Reducers</h3>
      <ul>
        <li><strong>Keep Reducers Pure</strong> - No side effects, API calls, or mutations</li>
        <li><strong>Organize by Data Domain</strong> - Split reducers by the type of data they manage</li>
        <li><strong>Normalize Complex State</strong> - Use normalized state for relational data</li>
        <li><strong>Avoid Deep Nesting</strong> - Flatten your state structure when possible</li>
        <li><strong>Use Action Constants</strong> - Define action types as constants to avoid typos</li>
        <li><strong>Keep Logic Simple</strong> - Move complex logic to action creators when possible</li>
        <li><strong>Consider Using Immer</strong> - Use Immer for easier immutable updates (especially with Redux Toolkit)</li>
      </ul>

      <div className="example-box">
        <h3>Reducer with Redux Toolkit</h3>
        <p>Redux Toolkit simplifies reducer logic with the <code>createSlice</code> API:</p>
        <pre>{`import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    entities: [],
    loading: false,
    error: null
  },
  reducers: {
    // Immer allows "mutating" code in reducers
    addTodo: (state, action) => {
      state.entities.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.entities.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      const index = state.entities.findIndex(todo => todo.id === action.payload);
      if (index !== -1) {
        state.entities.splice(index, 1);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase('FETCH_TODOS_REQUEST', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('FETCH_TODOS_SUCCESS', (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase('FETCH_TODOS_FAILURE', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Extract auto-generated action creators
export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;

// Extract the reducer
export default todosSlice.reducer;`}</pre>
      </div>
      <BackButton />
      <NextButton to="/concepts/store" label="Next: Store" />
    </div>
  );
};

export const StoreComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>Store</h2>
      <p>The Redux store brings together the state, actions, and reducers. 
         The store is the central piece of your Redux application that holds the state tree 
         and provides methods to interact with it.</p>
      
      <ul>
        <li>Holds application state</li>
        <li>Allows access to state via <code>getState()</code></li>
        <li>Allows state to be updated via <code>dispatch(action)</code></li>
        <li>Registers listeners via <code>subscribe(listener)</code></li>
      </ul>
      
      <div className="example-box">
        <h3>Basic Store Creation:</h3>
        <pre>
          {`import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);`}
        </pre>
      </div>

      <h3>The Store API</h3>
      <p>The Redux store provides a small API with just a few methods:</p>
      
      <div className="explanation-box">
        <h4><code>getState()</code></h4>
        <p>Returns the current state tree of your application.</p>
        <pre>
          {`const currentState = store.getState();
console.log(currentState);`}
        </pre>
        
        <h4><code>dispatch(action)</code></h4>
        <p>Dispatches an action to trigger a state change.</p>
        <pre>
          {`store.dispatch({ type: 'INCREMENT' });
store.dispatch(incrementAction(5)); // using an action creator`}
        </pre>
        
        <h4><code>subscribe(listener)</code></h4>
        <p>Adds a change listener that is called whenever an action is dispatched and the state changes.</p>
        <pre>
          {`// The subscribe method returns a function for unsubscribing
const unsubscribe = store.subscribe(() => {
  console.log('State updated:', store.getState());
});

// Later, when you want to unsubscribe:
unsubscribe();`}
        </pre>
        
        <h4><code>replaceReducer(nextReducer)</code></h4>
        <p>Replaces the reducer currently used by the store. This is advanced functionality typically used for code splitting or hot reloading.</p>
        <pre>
          {`import newRootReducer from './newReducers';
store.replaceReducer(newRootReducer);`}
        </pre>
      </div>

      <h3>Enhancing the Store with Middleware</h3>
      <p>
        Middleware provides a third-party extension point between dispatching an action and reaching the reducer.
        It can be used for logging, crash reporting, async API calls, and more.
      </p>
      
      <div className="example-box">
        <h4>Adding Middleware:</h4>
        <pre>
          {`import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);`}
        </pre>
      </div>
      
      <h3>Store Configuration Options</h3>
      <p>The <code>createStore</code> function accepts additional parameters:</p>
      
      <div className="example-box">
        <h4>Providing Preloaded State:</h4>
        <pre>
          {`const preloadedState = {
  counter: {
    value: 10
  }
};

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk)
);`}
        </pre>
      </div>
      
      <div className="example-box">
        <h4>Enabling Redux DevTools:</h4>
        <pre>
          {`import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Enable Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);`}
        </pre>
      </div>

      <h3>Store Enhancers</h3>
      <p>
        Store enhancers are higher-order functions that enhance the store with additional capabilities.
        <code>applyMiddleware()</code> is one example of a store enhancer.
      </p>
      
      <div className="example-box">
        <h4>Custom Store Enhancer:</h4>
        <pre>
          {`// A simple enhancer that logs state changes
const monitorEnhancer = createStore => (reducer, initialState, enhancer) => {
  const monitoredReducer = (state, action) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    const diff = end - start;
    
    console.log('reducer process time:', diff);
    
    return newState;
  };
  
  return createStore(monitoredReducer, initialState, enhancer);
};

// Use it alongside middleware
const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), monitorEnhancer)
);`}
        </pre>
      </div>

      <h3>Using Multiple Stores</h3>
      <p>
        While it's technically possible to create multiple Redux stores, it's not recommended.
        Redux was designed to have a single store with a single state tree to make debugging and testing easier.
      </p>
      <p>
        Instead of multiple stores, organize your state with proper reducer composition and use
        the <code>combineReducers</code> utility to separate concerns.
      </p>

      <h3>Store with Redux Toolkit</h3>
      <p>
        Redux Toolkit provides a simplified way to configure a store with sensible defaults:
      </p>
      
      <div className="example-box">
        <h4>Using configureStore:</h4>
        <pre>
          {`import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  // These are all optional with good defaults:
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState,
  enhancers: [reduxBatch],
});`}
        </pre>
      </div>

      <h3>Subscribing to the Store</h3>
      <p>
        While React-Redux handles subscriptions for you in components, 
        sometimes you might need direct subscriptions. Here's how to safely use them:
      </p>
      
      <div className="example-box">
        <h4>Safe State Access Pattern:</h4>
        <pre>
          {`// Set up a store subscription
const unsubscribe = store.subscribe(() => {
  // Get current state
  const state = store.getState();
  
  // Example: Persist to localStorage when auth state changes
  localStorage.setItem('authToken', state.auth.token);
  
  // Example: Send analytics when specific state changes
  if (previousCount !== state.counter.value) {
    sendAnalyticsEvent('counter-changed', {
      prevValue: previousCount,
      newValue: state.counter.value
    });
  }
  
  // Update reference values for the next run
  previousCount = state.counter.value;
});

// Don't forget to unsubscribe when appropriate
unsubscribe();`}
        </pre>
      </div>

      <h3>Common Patterns with Store</h3>
      
      <div className="example-box">
        <h4>1. Store Initialization with Data:</h4>
        <pre>
          {`// Fetch initial data before creating store
async function initializeApp() {
  try {
    // Get initial data
    const initialData = await fetchInitialData();
    
    // Create store with preloaded state
    const store = createStore(
      rootReducer,
      { data: initialData },
      applyMiddleware(thunk)
    );
    
    // Render app
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
  } catch (error) {
    // Handle initialization error
    renderErrorScreen(error);
  }
}

initializeApp();`}
        </pre>
      </div>
      
      <div className="example-box">
        <h4>2. Persisting and Rehydrating Store:</h4>
        <pre>
          {`import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

// Configure persistence
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user'] // Only persist these reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store using the persisted reducer
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

// Create the persistor
const persistor = persistStore(store);

// Use in your app
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingScreen />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);`}
        </pre>
      </div>

      <h3>Store Performance Considerations</h3>
      <ul>
        <li><strong>Think carefully about state shape</strong> - Structure it to minimize unnecessary re-renders</li>
        <li><strong>Be cautious with large state trees</strong> - Very large state objects can impact performance</li>
        <li><strong>Use memoized selectors</strong> - Libraries like Reselect help optimize derived data</li>
        <li><strong>Batch related actions</strong> - Use middleware like redux-batched-actions for multiple updates</li>
        <li><strong>Consider middleware performance</strong> - Complex middleware can slow down your application</li>
      </ul>

      <h3>Common Store Mistakes</h3>
      <ul>
        <li><strong>Mutating state directly</strong> - Always create new state objects</li>
        <li><strong>Storing non-serializable values</strong> - Keep only plain serializable objects in state</li>
        <li><strong>Putting everything in Redux</strong> - Not all state belongs in the store</li>
        <li><strong>Creating multiple stores</strong> - Use a single store with combined reducers</li>
        <li><strong>Excessive subscriptions</strong> - Let React-Redux handle most subscriptions</li>
      </ul>
      
      <BackButton />
      <NextButton to="/concepts/hooks" label="Next: React-Redux Hooks" />
    </div>
  );
};

export const HooksComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>React-Redux Integration with Hooks</h2>
      <p>React-Redux provides hooks that allow your React components to interact with the Redux store.</p>
      
      <div className="example-box">
        <h3>Key React-Redux Hooks:</h3>
        <ul>
          <li><code>useSelector()</code>: Extracts data from the Redux store state</li>
          <li><code>useDispatch()</code>: Returns the dispatch function to dispatch actions</li>
        </ul>
        <pre>
          {`import { useSelector, useDispatch } from 'react-redux';
import { increment } from './actions';

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
}`}
        </pre>
      </div>
      
      <p>Live example with hooks:</p>
      <Counter />
      <BackButton />
    </div>
  );
};

export const ThunksComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>Async Operations using Redux Thunk</h2>
      <p>Redux Thunk middleware allows you to write action creators that return a function instead of an action. 
         This is particularly useful for asynchronous operations like API calls.</p>
      
      <div className="example-box">
        <h3>Example Thunk:</h3>
        <pre>
          {`const fetchTodos = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_TODOS_REQUEST' });
    try {
      const response = await fetch('https://api.example.com/todos');
      const data = await response.json();
      dispatch({ 
        type: 'FETCH_TODOS_SUCCESS', 
        payload: data 
      });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_TODOS_FAILURE', 
        payload: error.message 
      });
    }
  };
};`}
        </pre>
      </div>
      
      <p>Live example with async actions:</p>
      <TodoList />
      <BackButton to="/concepts/middleware" label="Back: Middleware Intro" />
      <NextButton to="/concepts/redux-thunk" label="Next: Redux Thunk" />
    </div>
  );
};

export const ReduxSagaComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>Redux Saga</h2>
      <p>Redux Saga is a middleware library that aims to make application side effects 
         (i.e., asynchronous operations like data fetching) easier to manage, more efficient 
         to execute, simple to test, and better at handling failures.</p>
      
      <div className="example-box">
        <h3>Saga Example:</h3>
        <pre>
          {`import { takeEvery, call, put } from 'redux-saga/effects';

// Worker saga: will be fired on FETCH_TODOS_REQUEST actions
function* fetchTodos() {
  try {
    const response = yield call(fetch, 'https://api.example.com/todos');
    const data = yield response.json();
    yield put({ type: 'FETCH_TODOS_SUCCESS', payload: data });
  } catch (error) {
    yield put({ type: 'FETCH_TODOS_FAILURE', payload: error.message });
  }
}

// Watcher saga: spawns a new fetchTodos task on each FETCH_TODOS_REQUEST
function* todoSaga() {
  yield takeEvery('FETCH_TODOS_REQUEST', fetchTodos);
}

// Setup in store.js:
// import createSagaMiddleware from 'redux-saga';
// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(todoSaga);`}
        </pre>
      </div>
      
      <p>Key features of Redux Saga:</p>
      <ul>
        <li>Uses ES6 generators for better control flow</li>
        <li>Declarative effects make testing easier</li>
        <li>Can handle complex async flows like race conditions</li>
        <li>Provides cancellation, throttling, and debouncing</li>
      </ul>
      
      <BackButton to="/concepts/redux-thunk" label="Back: Redux Thunk" />
      <NextButton to="/concepts/redux-observable" label="Next: Redux Observable" />
    </div>
  );
};

export const ReduxObservableComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>Redux Observable</h2>
      <p>
        Redux Observable is a middleware that enables complex, reactive programming
        patterns using RxJS observables.
      </p>

      <div className="example-box">
        <h3>Basic Epic:</h3>
        <pre>
          {`import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';

// An Epic is a function that takes a stream of actions and returns a stream of actions
const fetchUserEpic = (action$) => action$.pipe(
  ofType('FETCH_USER_REQUEST'),
  mergeMap(action => 
    ajax.getJSON(\`https://api.github.com/users/\${action.payload}\`).pipe(
      map(response => ({ type: 'FETCH_USER_SUCCESS', payload: response })),
      catchError(error => of({ type: 'FETCH_USER_FAILURE', payload: error.message }))
    )
  )
);`}
        </pre>
      </div>

      <BackButton to="/concepts/redux-saga" label="Back: Redux Saga" />
      <NextButton to="/concepts/websockets" label="Next: Redux with WebSockets" />
    </div>
  );
};

export const WebSocketsComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>Redux with WebSockets</h2>
      <p>Integrating WebSockets with Redux allows for real-time data updates in your application.
         This is useful for features like live notifications, chat messages, or real-time data feeds.</p>
      
      <h3>Understanding WebSocket Integration</h3>
      <p>
        WebSocket integration typically involves:
      </p>
      <ul>
        <li>Establishing a WebSocket connection when the app loads</li>
        <li>Listening for messages and dispatching actions to update the state</li>
        <li>Handling connection open, close, and error events</li>
        <li>Cleaning up the connection when the app unloads or the component unmounts</li>
      </ul>
      
      <div className="example-box">
        <h3>Basic WebSocket Setup:</h3>
        <pre>
          {`// websocket.js - WebSocket utility
let socket;

export const initWebSocket = (url) => {
  socket = new WebSocket(url);
  
  socket.addEventListener('open', () => {
    console.log('WebSocket connected');
  });
  
  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    // Dispatch an action with the received data
    store.dispatch({ type: 'WS_MESSAGE_RECEIVED', payload: data });
  });
  
  socket.addEventListener('close', () => {
    console.log('WebSocket disconnected');
  });
  
  socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
  });
};

export const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not open. Message not sent:', message);
  }
};

export const closeWebSocket = () => {
  if (socket) {
    socket.close();
  }
};`}
        </pre>
      </div>
      
      <div className="example-box">
        <h3>Integrating WebSocket with Redux:</h3>
        <pre>
          {`// store.js - Integrating WebSocket in Redux store
import { initWebSocket, closeWebSocket } from './websocket';

const store = createStore(rootReducer, applyMiddleware(thunk));

// Initialize WebSocket connection
initWebSocket('wss://api.example.com/realtime');

// Clean up WebSocket connection on store unsubscribe
store.subscribe(() => {
  const state = store.getState();
  
  if (state.app.webSocketConnected) {
    initWebSocket(state.app.webSocketUrl);
  } else {
    closeWebSocket();
  }
});`}
        </pre>
      </div>

      <h3>Handling WebSocket Events</h3>
      <p>
        When integrating WebSockets, you will handle various events like connection open, message received, error, and close.
        Here's how you can handle these events in your Redux application:
      </p>
      
      <div className="example-box">
        <h4>Connection Lifecycle:</h4>
        <pre>
          {`// actions.js - Action creators for WebSocket events
export const wsConnect = () => ({ type: 'WS_CONNECT' });
export const wsDisconnect = () => ({ type: 'WS_DISCONNECT' });
export const wsMessageReceived = (message) => ({ 
  type: 'WS_MESSAGE_RECEIVED', 
  payload: message 
});

// reducer.js - Handling WebSocket actions in reducer
const initialState = {
  connected: false,
  messages: [],
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'WS_CONNECT':
      return { ...state, connected: true };
    case 'WS_DISCONNECT':
      return { ...state, connected: false };
    case 'WS_MESSAGE_RECEIVED':
      return { 
        ...state, 
        messages: [...state.messages, action.payload] 
      };
    default:
      return state;
  }
}`}
        </pre>
      </div>

      <div className="example-box">
        <h4>Sending Messages:</h4>
        <pre>
          {`// Component.js - Sending messages via WebSocket
import { sendMessage } from '../websocket';

const MyComponent = () => {
  const handleSendMessage = () => {
    const message = { type: 'NEW_MESSAGE', content: 'Hello, world!' };
    sendMessage(message);
  };
  
  return (
    <button onClick={handleSendMessage}>
      Send Message
    </button>
  );
};`}
        </pre>
      </div>

      <h3>Best Practices for WebSocket Integration</h3>
      <ul>
        <li><strong>Use a dedicated WebSocket middleware</strong> to handle connections and messages</li>
        <li><strong>Keep WebSocket logic separate</strong> from your Redux reducers and actions</li>
        <li><strong>Handle reconnections and errors</strong> gracefully</li>
        <li><strong>Clean up resources</strong> when components unmount or store is destroyed</li>
        <li><strong>Test WebSocket interactions</strong> using mock servers or integration tests</li>
      </ul>
      
      <BackButton to="/concepts/redux-observable" label="Back: Redux Observable" />
    </div>
  );
};

export const MiddlewareComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>Redux Middleware</h2>
      <p>
        Middleware provides a way to interact with actions that have been dispatched to the store
        before they reach the reducers. They are used for logging, crash reporting, routing, async operations, and more.
      </p>
      
      <h3>Middleware Concept</h3>
      <p>
        Middleware forms a pipeline around your store's dispatch method, allowing you to take actions,
        then either pass them along, transform them, delay them, or even completely replace them before they reach your reducers.
      </p>
      
      <div className="example-box">
        <h4>Basic Middleware Structure:</h4>
        <pre>
          {`const myMiddleware = store => next => action => {
  // Do something before the action reaches reducers
  console.log('Dispatching:', action);
  
  // Call the next dispatch method in the middleware chain
  const result = next(action);
  
  // Do something after the action has been processed by reducers
  console.log('New State:', store.getState());
  
  // Return the result
  return result;
};`}
        </pre>
      </div>
      
      <h3>Common Types of Middleware</h3>
      <ul>
        <li><strong>Logging:</strong> Log actions and state for debugging</li>
        <li><strong>Async:</strong> Handle asynchronous operations (e.g. API calls)</li>
        <li><strong>Routing:</strong> Integrate with routing libraries</li>
        <li><strong>Analytics:</strong> Track user actions for analytics</li>
        <li><strong>Error reporting:</strong> Catch and report errors</li>
      </ul>
      
      <div className="example-box">
        <h4>Simple Logger Middleware:</h4>
        <pre>
          {`const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};`}
        </pre>
      </div>
      
      <div className="example-box">
        <h4>Adding Middleware to Your Store:</h4>
        <pre>
          {`import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);`}
        </pre>
      </div>
      
      <h3>Popular Middleware Libraries</h3>
      <ul>
        <li><strong>Redux Thunk:</strong> Handle async actions</li>
        <li><strong>Redux Saga:</strong> Manage side effects using generator functions</li>
        <li><strong>Redux Observable:</strong> Use RxJS to handle complex async flows</li>
        <li><strong>Redux Logger:</strong> Log actions and state changes</li>
      </ul>
      
      <BackButton />
      <NextButton to="/concepts/thunks" label="Next: Async with Thunks" />
    </div>
  );
};

export const ReduxThunkComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>Redux Thunk In-Depth</h2>
      <p>
        Redux Thunk is middleware that allows you to write action creators that return a function instead of an action.
        This is particularly useful for handling asynchronous logic like API calls.
      </p>
      
      <h3>How Redux Thunk Works</h3>
      <p>
        Redux Thunk intercepts actions that are functions and:
      </p>
      <ol>
        <li>Stops the function from reaching the reducer</li>
        <li>Calls the function with <code>dispatch</code> and <code>getState</code> as arguments</li>
        <li>Lets you dispatch real actions from inside that function when you're ready</li>
      </ol>
      
      <div className="example-box">
        <h4>The Thunk Middleware (Simplified Implementation):</h4>
        <pre>
          {`// This is a simplified version of how Redux Thunk works
const thunk = store => next => action => {
  // If the action is a function, call it with dispatch and getState
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }

  // Otherwise, just pass the action along to the next middleware
  return next(action);
};`}
        </pre>
      </div>
      
      <h3>Common Thunk Patterns</h3>
      
      <div className="example-box">
        <h4>Basic API Call:</h4>
        <pre>
          {`// Action Types
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// Regular action creators
const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
const fetchUsersSuccess = users => ({ type: FETCH_USERS_SUCCESS, payload: users });
const fetchUsersFailure = error => ({ type: FETCH_USERS_FAILURE, payload: error });

// Thunk action creator
const fetchUsers = () => {
  return async (dispatch, getState) => {
    dispatch(fetchUsersRequest()); // Signal request start
    
    try {
      const response = await fetch('https://api.example.com/users');
      const users = await response.json();
      dispatch(fetchUsersSuccess(users)); // On success
    } catch (error) {
      dispatch(fetchUsersFailure(error.message)); // On failure
    }
  };
};

// Usage in a component
dispatch(fetchUsers());`}
        </pre>
      </div>
      
      <div className="example-box">
        <h4>Sequential API Calls:</h4>
        <pre>
          {`const fetchUserData = (userId) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_USER_REQUEST', payload: userId });
    
    try {
      // First API call
      const userResponse = await fetch(\`/api/users/\${userId}\`);
      const userData = await userResponse.json();
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: userData });
      
      // Second API call using data from first one
      const postsResponse = await fetch(\`/api/users/\${userId}/posts\`);
      const posts = await postsResponse.json();
      dispatch({ type: 'FETCH_USER_POSTS_SUCCESS', payload: posts });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_FAILURE', payload: error.message });
    }
  };
};`}
        </pre>
      </div>
      
      <div className="example-box">
        <h4>Conditional Dispatching:</h4>
        <pre>
          {`const fetchUserIfNeeded = (userId) => {
  return (dispatch, getState) => {
    // Check if we need to fetch
    const { users, loading } = getState();
    
    // Don't fetch if already loaded or loading
    if (loading.users || users[userId]) {
      return Promise.resolve();
    }
    
    return dispatch(fetchUser(userId));
  };
};`}
        </pre>
      </div>
      
      <h3>Advanced Thunk Techniques</h3>
      
      <div className="example-box">
        <h4>Thunks That Return Values:</h4>
        <pre>
          {`const createUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: 'CREATE_USER_REQUEST' });
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      const newUser = await response.json();
      dispatch({ type: 'CREATE_USER_SUCCESS', payload: newUser });
      
      // Return a value from the thunk
      return newUser;
    } catch (error) {
      dispatch({ type: 'CREATE_USER_FAILURE', payload: error.message });
      throw error; // Re-throw to let the component handle it
    }
  };
};

// In a component
dispatch(createUser(userData))
  .then(newUser => {
    // Do something with the created user
    console.log('User created:', newUser);
    navigate(\`/users/\${newUser.id}\`);
  })
  .catch(error => {
    // Handle errors
    showErrorNotification(error.message);
  });`}
        </pre>
      </div>
      
      <div className="example-box">
        <h4>Accessing State in Thunks:</h4>
        <pre>
          {`const fetchRelatedItems = (itemId) => {
  return (dispatch, getState) => {
    const state = getState();
    const item = state.items.find(i => i.id === itemId);
    
    if (!item) {
      dispatch({ type: 'ITEM_NOT_FOUND', payload: itemId });
      return Promise.resolve();
    }
    
    // Use data from state to customize API call
    return fetch(\`/api/related?category=\${item.category}&tags=\${item.tags.join(',')}\`)
      .then(response => response.json())
      .then(relatedItems => {
        dispatch({ type: 'FETCH_RELATED_ITEMS_SUCCESS', payload: relatedItems });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_RELATED_ITEMS_FAILURE', payload: error.message });
      });
  };
};`}
        </pre>
      </div>
      
      <h3>Testing Thunks</h3>
      <p>
        Since thunks are just functions, they are relatively easy to test:
      </p>
      
      <div className="example-box">
        <h4>Testing with Jest and Redux Mock Store:</h4>
        <pre>
          {`import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchUsers } from './userActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates FETCH_USERS_SUCCESS when fetching users is done', () => {
    const mockUsers = [{ id: 1, name: 'John' }];
    
    fetchMock.getOnce('/api/users', {
      body: mockUsers,
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: 'FETCH_USERS_REQUEST' },
      { type: 'FETCH_USERS_SUCCESS', payload: mockUsers }
    ];
    
    const store = mockStore({ users: [] });

    return store.dispatch(fetchUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});`}
        </pre>
      </div>
      
      <h3>Alternatives to Redux Thunk</h3>
      <p>
        While Redux Thunk is simple and powerful, there are other middleware options for managing async flows:
      </p>
      <ul>
        <li><strong>Redux Saga:</strong> Uses generator functions for complex async flows</li>
        <li><strong>Redux Observable:</strong> Uses RxJS for reactive programming patterns</li>
        <li><strong>Redux Toolkit's createAsyncThunk:</strong> A modern approach that simplifies thunks</li>
      </ul>
      
      <BackButton to="/concepts/thunks" label="Back: Basic Thunks" />
      <NextButton to="/concepts/redux-saga" label="Next: Redux Saga" />
    </div>
  );
};
