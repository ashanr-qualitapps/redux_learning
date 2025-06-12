import React from 'react';
import Counter from './Counter';
import TodoList from './TodoList';
import { HomeButton, BackButton } from './NavigationButtons';

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
      <BackButton />
    </div>
  );
};

export const MiddlewareComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>Redux Middleware</h2>
      <p>
        Middleware provides a third-party extension point between dispatching an action and the moment it reaches the reducer. 
        Middleware can be used for logging, crash reporting, talking to an asynchronous API, routing, and more.
      </p>
      
      <h3>Understanding Redux Middleware</h3>
      <p>
        At its core, Redux middleware:
      </p>
      <ul>
        <li>Intercepts actions before they reach the reducers</li>
        <li>Can modify, delay, or cancel actions</li>
        <li>Can dispatch new actions</li>
        <li>Forms a pipeline that actions flow through</li>
        <li>Enables powerful side effects while maintaining Redux's predictability</li>
      </ul>

      <div className="middleware-flow-diagram">
        <div className="flow-box action">Action Dispatched</div>
        <div className="flow-arrow">↓</div>
        <div className="flow-box middleware1">Middleware 1</div>
        <div className="flow-arrow">↓</div>
        <div className="flow-box middleware2">Middleware 2</div>
        <div className="flow-arrow">↓</div>
        <div className="flow-box middleware3">Middleware 3</div>
        <div className="flow-arrow">↓</div>
        <div className="flow-box reducer">Reducer</div>
        <div className="flow-arrow">↓</div>
        <div className="flow-box state">New State</div>
      </div>
      
      <div className="example-box">
        <h3>Creating Custom Middleware</h3>
        <pre>
          {`// Middleware follows a specific signature with three nested functions
const customMiddleware = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

// Apply middleware when creating the store
const store = createStore(
  rootReducer,
  applyMiddleware(customMiddleware, thunk)
);`}
        </pre>
      </div>

      <h3>Middleware Signature Explained</h3>
      <p>The signature <code>store => next => action => {}</code> can be confusing at first. Let's break it down:</p>
      <ol>
        <li><strong>store</strong>: The Redux store instance, giving access to <code>getState()</code> and <code>dispatch()</code></li>
        <li><strong>next</strong>: A function that passes the action to the next middleware or to the reducer</li>
        <li><strong>action</strong>: The action object that was dispatched</li>
      </ol>
      <p>This curried function structure allows middleware to be composed together into a chain.</p>
      
      <div className="example-box">
        <h3>Middleware Chain Execution</h3>
        <pre>
          {`// Understanding how middleware chains work
// With three middleware: A, B, and C

// When you dispatch an action:
dispatch(action)

// Execution flows like this:
// 1. Middleware A receives the action
A(store)(next)(action) {
  // A's code before calling next
  const resultFromB = next(action);  // Calls middleware B
  // A's code after calling next
  return resultFromB;
}

// 2. Middleware B receives the action
B(store)(next)(action) {
  // B's code before calling next
  const resultFromC = next(action);  // Calls middleware C
  // B's code after calling next
  return resultFromC;
}

// 3. Middleware C receives the action
C(store)(next)(action) {
  // C's code before calling next
  const resultFromReducer = next(action);  // Calls the reducer
  // C's code after calling next
  return resultFromReducer;
}

// 4. The reducer processes the action and returns the new state`}
        </pre>
      </div>

      <h3>Common Middleware Patterns</h3>
      
      <div className="example-box">
        <h4>1. Conditional Logic</h4>
        <pre>
          {`// Only process specific action types
const filterMiddleware = store => next => action => {
  if (action.type.startsWith('USER_')) {
    // Do something with user-related actions
    console.log('User action:', action);
  }
  // Always call next to continue the chain
  return next(action);
};`}
        </pre>
      </div>
      
      <div className="example-box">
        <h4>2. Transforming Actions</h4>
        <pre>
          {`// Modify the action before passing it to reducers
const timestampMiddleware = store => next => action => {
  // Add a timestamp to every action
  const actionWithTimestamp = {
    ...action,
    meta: {
      ...action.meta,
      timestamp: Date.now()
    }
  };
  return next(actionWithTimestamp);
};`}
        </pre>
      </div>
      
      <div className="example-box">
        <h4>3. Async Actions</h4>
        <pre>
          {`// Handle promises in actions (simplified version of redux-promise)
const promiseMiddleware = store => next => action => {
  if (action.payload && typeof action.payload.then === 'function') {
    // Return a promise for chaining
    return action.payload
      .then(result => {
        // Dispatch a new action with the resolved value
        return next({
          ...action,
          payload: result
        });
      })
      .catch(error => {
        // Dispatch an error action
        return next({
          ...action,
          payload: error,
          error: true
        });
      });
  }
  
  // If it's not a promise, pass it on
  return next(action);
};`}
        </pre>
      </div>
      
      <div className="example-box">
        <h4>4. Dispatching Multiple Actions</h4>
        <pre>
          {`// Middleware that handles "batch" actions
const batchActionsMiddleware = store => next => action => {
  if (action.type === 'BATCH_ACTIONS' && Array.isArray(action.payload)) {
    // Dispatch each action in the batch
    action.payload.forEach(subAction => {
      store.dispatch(subAction);
    });
    return; // No need to pass the BATCH_ACTIONS to reducers
  }
  
  return next(action);
};

// Usage:
dispatch({
  type: 'BATCH_ACTIONS',
  payload: [
    { type: 'INCREMENT', payload: 1 },
    { type: 'ADD_TODO', payload: 'Learn middleware' },
    { type: 'SET_VISIBILITY_FILTER', payload: 'active' }
  ]
});`}
        </pre>
      </div>
      
      <div className="example-box">
        <h4>5. Analytics and Monitoring</h4>
        <pre>
          {`// Track user actions for analytics
const analyticsMiddleware = store => next => action => {
  // Send action data to analytics service
  if (action.type !== 'LOCATION_CHANGE') {  // Don't track router actions
    sendToAnalytics({
      action: action.type,
      data: action.payload,
      timestamp: Date.now()
    });
  }
  
  return next(action);
};`}
        </pre>
      </div>
      
      <h3>Advanced Middleware Techniques</h3>
      
      <div className="example-box">
        <h4>1. Accessing Previous and Next State</h4>
        <pre>
          {`const diffMiddleware = store => next => action => {
  const prevState = store.getState();
  const result = next(action);
  const nextState = store.getState();
  
  console.log('Action:', action.type);
  console.log('State diff:', {
    prev: prevState,
    next: nextState,
    // You would use a proper diff algorithm in real code
  });
  
  return result;
};`}
        </pre>
      </div>
      
      <div className="example-box">
        <h4>2. Early Returns and Action Cancellation</h4>
        <pre>
          {`// Middleware that can cancel actions based on conditions
const authMiddleware = store => next => action => {
  // List of actions that require authentication
  const protectedActions = ['DELETE_ACCOUNT', 'CHANGE_PASSWORD', 'PURCHASE'];
  
  if (
    protectedActions.includes(action.type) && 
    !store.getState().auth.isAuthenticated
  ) {
    console.warn('Unauthorized action attempted:', action.type);
    // Cancel the action by not calling next()
    // Optionally dispatch an "unauthorized" action
    store.dispatch({ type: 'UNAUTHORIZED_ACTION', payload: action.type });
    return;
  }
  
  // Proceed with the action
  return next(action);
};`}
        </pre>
      </div>

      <h3>Popular Redux Middleware</h3>
      <table className="middleware-table">
        <thead>
          <tr>
            <th>Middleware</th>
            <th>Purpose</th>
            <th>Key Features</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>redux-thunk</code></td>
            <td>Handle async logic</td>
            <td>
              <ul>
                <li>Dispatch functions instead of plain objects</li>
                <li>Access <code>dispatch</code> and <code>getState</code> in action creators</li>
                <li>Simple to use and understand</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td><code>redux-saga</code></td>
            <td>Manage side effects using generators</td>
            <td>
              <ul>
                <li>Uses ES6 generators for complex async flows</li>
                <li>Declarative effects (easier testing)</li>
                <li>Advanced features like race conditions, throttling, etc.</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td><code>redux-observable</code></td>
            <td>RxJS for reactive programming</td>
            <td>
              <ul>
                <li>Uses RxJS Observables</li>
                <li>Powerful operators for complex async operations</li>
                <li>Great for event streams like autocomplete</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td><code>redux-logger</code></td>
            <td>Logging actions and state</td>
            <td>
              <ul>
                <li>Console logs for actions and state changes</li>
                <li>Customizable log format and colors</li>
                <li>Collapsible groups in console</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td><code>redux-persist</code></td>
            <td>State persistence</td>
            <td>
              <ul>
                <li>Save Redux state to localStorage/AsyncStorage</li>
                <li>Rehydrate state on app startup</li>
                <li>Configurable storage engines and persistence</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Middleware Order Matters</h3>
      <p>
        The order in which middleware is applied can significantly impact behavior. Middleware is applied from left to right:
      </p>
      <div className="example-box">
        <pre>
          {`// Order matters!
applyMiddleware(thunk, logger)
// vs
applyMiddleware(logger, thunk)

// In the first case, actions will be logged after thunks are processed
// In the second case, the thunk functions themselves will be logged`}
        </pre>
      </div>
      <p>Common ordering considerations:</p>
      <ul>
        <li>Put <code>redux-thunk</code> or <code>redux-saga</code> early in the chain</li>
        <li>Put logging middleware at the end to see actions after other middleware have processed them</li>
        <li>Put crash reporting middleware early to catch errors in other middleware</li>
      </ul>
      
      <h3>Testing Middleware</h3>
      <div className="example-box">
        <pre>
          {`// Testing middleware with Jest
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import loggingMiddleware from './loggingMiddleware';

const middlewares = [thunk, loggingMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Middleware Tests', () => {
  it('should dispatch success action after API call', async () => {
    // Mock fetch response
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ data: 'test' })
    });
    
    // Create mock store
    const store = mockStore({ data: null });
    
    // Create async action
    const fetchData = () => async (dispatch) => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await fetch('/api/data');
        const json = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: json.data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };
    
    // Dispatch the action
    await store.dispatch(fetchData());
    
    // Check dispatched actions
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: 'FETCH_REQUEST' });
    expect(actions[1]).toEqual({ type: 'FETCH_SUCCESS', payload: 'test' });
  });
};`}
        </pre>
      </div>
      
      <BackButton />
    </div>
  );
};

export const ReduxThunkComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>Redux-Thunk In Depth</h2>
      <p>Redux Thunk middleware allows you to write action creators that return a function instead of an action object. 
         The thunk can be used to delay the dispatch of an action, or to dispatch only if certain conditions are met.</p>
      
      <div className="example-box">
        <h3>How Thunk Works:</h3>
        <pre>
          {`// Simplified implementation of Redux Thunk
const thunk = ({ dispatch, getState }) => next => action => {
  // If action is a function, call it with dispatch and getState
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  
  // Otherwise, pass it to the next middleware
  return next(action);
};`}
        </pre>
        
        <h3>Advanced Thunk Usage:</h3>
        <pre>
          {`// Conditional dispatching
const incrementIfOdd = () => (dispatch, getState) => {
  const { counter } = getState();
  if (counter.value % 2 !== 0) {
    dispatch({ type: 'INCREMENT' });
  }
};

// Chaining thunks
const fetchUserAndTheirPosts = (userId) => async (dispatch) => {
  // First thunk fetches user
  await dispatch(fetchUser(userId));
  // Then fetches posts
  return dispatch(fetchPostsByUserId(userId));
};`}
        </pre>
      </div>
      
      <p>Thunk is great for simple async operations but can become unwieldy for complex async flows.</p>
      
      <BackButton />
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
      
      <BackButton />
    </div>
  );
};

export const ReduxObservableComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>Redux Observable</h2>
      <p>Redux Observable is middleware for Redux that uses RxJS to create side effects for asynchronous actions.
         It introduces "Epics" - functions that listen for actions and dispatch new actions in response.</p>
      
      <div className="example-box">
        <h3>Epic Example:</h3>
        <pre>
          {`import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// An Epic is a function that takes a stream of actions and returns a stream of actions
const fetchTodosEpic = action$ => action$.pipe(
  ofType('FETCH_TODOS_REQUEST'),
  mergeMap(() => 
    ajax.getJSON('https://api.example.com/todos').pipe(
      map(response => ({ 
        type: 'FETCH_TODOS_SUCCESS', 
        payload: response 
      })),
      catchError(error => of({ 
        type: 'FETCH_TODOS_FAILURE', 
        payload: error.message 
      }))
    )
  )
);

// Setup in store.js:
// import { createEpicMiddleware, combineEpics } from 'redux-observable';
// const epicMiddleware = createEpicMiddleware();
// const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
// epicMiddleware.run(combineEpics(fetchTodosEpic));`}
        </pre>
      </div>
      
      <p>Key features of Redux Observable:</p>
      <ul>
        <li>Leverages powerful RxJS operators for complex async flows</li>
        <li>Great for handling events over time (websockets, polling)</li>
        <li>Can easily cancel, debounce, retry operations</li>
        <li>Good for complex operations like autocomplete search</li>
      </ul>
      
      <BackButton />
    </div>
  );
};

export const RTKQueryComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>RTK Query</h2>
      <p>
        RTK Query is a powerful data fetching and caching tool included in Redux Toolkit. It eliminates
        the need to write data fetching logic, loading states, and cache management manually.
      </p>

      <div className="example-box">
        <h3>Setting Up RTK Query</h3>
        <pre>
          {`// api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => \`pokemon/\${name}\`
    }),
    getPokemonList: builder.query({
      query: (limit = 10) => \`pokemon?limit=\${limit}\`
    })
  })
});

// Export hooks for usage in components
export const { useGetPokemonByNameQuery, useGetPokemonListQuery } = pokemonApi;`}
        </pre>
      </div>

      <div className="example-box">
        <h3>Using RTK Query in Components</h3>
        <pre>
          {`import React from 'react';
import { useGetPokemonByNameQuery } from './api';

export function Pokemon({ name }) {
  // Automatically fetches data and handles loading, caching, and errors
  const { data, error, isLoading, refetch } = useGetPokemonByNameQuery(name);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>{data.name}</h3>
      <img src={data.sprites.front_default} alt={data.name} />
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}`}
        </pre>
      </div>
      <BackButton />
    </div>
  );
};

export const ReduxWithGraphQLComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>Redux with GraphQL</h2>
      <p>
        GraphQL and Redux are complementary technologies that can work together effectively.
        Learn how to integrate GraphQL clients like Apollo with Redux for sophisticated state management.
      </p>

      <div className="example-box">
        <h3>Apollo Client with Redux</h3>
        <pre>
          {`// apollo-redux-integration.js
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { configureStore } from '@reduxjs/toolkit';

// Create the Apollo Client
const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache()
});

// Create Redux store with Apollo as a property
const store = configureStore({
  reducer: {
    todos: todosReducer,
    users: usersReducer,
    // Other reducers...
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { client } // Make Apollo available in thunks
      }
    })
});

// Now you can use Apollo in your Redux thunks
const fetchUserWithPosts = (userId) => async (dispatch, getState, { client }) => {
  dispatch({ type: 'FETCH_USER_REQUEST' });
  
  try {
    const { data } = await client.query({
      query: GET_USER_WITH_POSTS,
      variables: { id: userId }
    });
    
    dispatch({ 
      type: 'FETCH_USER_SUCCESS',
      payload: data.user
    });
  } catch (error) {
    dispatch({ 
      type: 'FETCH_USER_FAILURE',
      payload: error.message
    });
  }
};`}
        </pre>
      </div>
      <BackButton />
    </div>
  );
};

export const EventSourcingComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>Event Sourcing with Redux</h2>
      <p>
        Event sourcing is a pattern where state changes are stored as a sequence of events.
        Redux's architecture makes it ideal for implementing event sourcing principles.
      </p>

      <div className="example-box">
        <h3>Basic Event Sourcing Implementation</h3>
        <pre>
          {`// eventSourcedReducer.js
// Instead of storing current state, store all events that led to it
const initialState = {
  events: [],
  currentState: { balance: 0 }
};

// Events describe WHAT HAPPENED, not what should change
const eventTypes = {
  MONEY_DEPOSITED: 'MONEY_DEPOSITED',
  MONEY_WITHDRAWN: 'MONEY_WITHDRAWN',
  INTEREST_ADDED: 'INTEREST_ADDED'
};

// Event handlers compute state transitions
const eventHandlers = {
  [eventTypes.MONEY_DEPOSITED]: (state, event) => ({
    ...state,
    balance: state.balance + event.payload.amount
  }),
  [eventTypes.MONEY_WITHDRAWN]: (state, event) => ({
    ...state,
    balance: state.balance - event.payload.amount
  }),
  [eventTypes.INTEREST_ADDED]: (state, event) => ({
    ...state,
    balance: state.balance * (1 + event.payload.rate / 100)
  })
};

// Reducer that applies events to rebuild current state
const bankAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'APPLY_EVENT':
      // Add the event to history
      const updatedEvents = [...state.events, action.event];
      
      // Apply event handler to compute new current state
      const handler = eventHandlers[action.event.type];
      const newCurrentState = handler 
        ? handler(state.currentState, action.event)
        : state.currentState;
      
      return {
        events: updatedEvents,
        currentState: newCurrentState
      };
      
    case 'REBUILD_STATE':
      // Rebuild entire state from events (e.g., after loading from storage)
      return {
        events: action.events,
        currentState: action.events.reduce((state, event) => {
          const handler = eventHandlers[event.type];
          return handler ? handler(state, event) : state;
        }, { balance: 0 })
      };
      
    default:
      return state;
  }
};

// Action creators that generate events
export const depositMoney = (amount) => ({
  type: 'APPLY_EVENT',
  event: {
    type: eventTypes.MONEY_DEPOSITED,
    payload: { amount },
    timestamp: Date.now()
  }
});

export const withdrawMoney = (amount) => ({
  type: 'APPLY_EVENT',
  event: {
    type: eventTypes.MONEY_WITHDRAWN,
    payload: { amount },
    timestamp: Date.now()
  }
});`}
        </pre>
      </div>
      <BackButton />
    </div>
  );
};

export const ReduxOfflineFirstComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>Offline-First Redux Applications</h2>
      <p>
        Build resilient applications that work with or without an internet connection
        by combining Redux with offline-storage solutions and synchronization strategies.
      </p>

      <div className="example-box">
        <h3>Setting Up Redux Offline</h3>
        <pre>
          {`// configureStore.js
import { applyMiddleware, createStore, compose } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import rootReducer from './reducers';

// Custom retry strategy
const customConfig = {
  ...offlineConfig,
  effect: (effect, action) => {
    // Customize how offline actions are processed
    return fetch(effect.url, {
      method: effect.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(effect.body)
    }).then(res => res.json());
  },
  discard: (error, action, retries) => {
    const { status } = error.response || {};
    // Don't retry on client errors (4xx)
    return status >= 400 && status < 500;
  }
};

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(/* your middleware */),
    offline(customConfig)
  )
);

export default store;`}
        </pre>
      </div>

      <div className="example-box">
        <h3>Creating Offline-Ready Actions</h3>
        <pre>
          {`// actions.js
// This action will be queued when offline and sent when online
export const createTodo = (todo) => ({
  type: 'CREATE_TODO',
  payload: todo,
  meta: {
    offline: {
      // Effect describes the API call to make when online
      effect: {
        url: 'https://api.example.com/todos',
        method: 'POST',
        body: { todo }
      },
      // Optimistic action to update UI immediately
      commit: { type: 'CREATE_TODO_COMMIT', meta: { todo } },
      // Action to dispatch if the effect fails
      rollback: { type: 'CREATE_TODO_ROLLBACK', meta: { todo } }
    }
  }
});

// Reducers handle all phases of the offline action
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_TODO':
      // Optimistic update with temporary ID
      return [...state, { ...action.payload, _id: Date.now(), _synced: false }];
      
    case 'CREATE_TODO_COMMIT':
      // Replace temporary ID with server ID
      return state.map(todo => 
        todo._id === action.meta.todo._id
          ? { ...todo, id: action.payload.id, _synced: true }
          : todo
      );
      
    case 'CREATE_TODO_ROLLBACK':
      // Remove the optimistically added todo or mark as failed
      return state.map(todo => 
        todo._id === action.meta.todo._id
          ? { ...todo, _syncFailed: true }
          : todo
      );
    
    default:
      return state;
  }
};`}
        </pre>
      </div>
      <BackButton />
    </div>
  );
};

export const ReduxMicroFrontendsComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>Redux with Micro Frontends</h2>
      <p>
        Learn how to use Redux in micro frontend architectures where multiple teams
        work on different parts of an application independently.
      </p>

      <div className="example-box">
        <h3>Federated Redux Stores</h3>
        <pre>
          {`// In a shared library: redux-federation.js
let globalStore = null;

export const setGlobalStore = (store) => {
  globalStore = store;
};

export const getGlobalStore = () => globalStore;

// Function to register a micro frontend's reducers to the global store
export const registerReducers = (reducers) => {
  if (!globalStore) {
    console.error('Global store not initialized');
    return;
  }
  
  // Use replaceReducer to add new reducers from a micro frontend
  const currentReducers = globalStore._reducers || {};
  const nextReducers = { ...currentReducers, ...reducers };
  
  // Create a new combined reducer
  const combinedReducer = combineReducers(nextReducers);
  
  // Store the reducers map for future reference
  globalStore._reducers = nextReducers;
  
  // Replace the current reducer with the new combined one
  globalStore.replaceReducer(combinedReducer);
};

// Function for a micro frontend to add middleware
export const addMiddleware = (middleware) => {
  if (!globalStore || !globalStore.dispatch) {
    console.error('Global store not properly initialized');
    return;
  }
  
  // Create new enhancers chain with the additional middleware
  // Note: This is simplified; in a real app you'd need to handle this differently
  // since middleware normally needs to be applied during store creation
  
  // For this example, we're assuming the store was created with a 
  // special enhancer that allows dynamic middleware addition
};`}
        </pre>
      </div>
      
      <div className="example-box">
        <h3>Host Application Setup</h3>
        <pre>
          {`// In the host application: store.js
import { createStore, combineReducers } from 'redux';
import { setGlobalStore } from './redux-federation';
import coreReducers from './reducers';

// Create store with initial core reducers
const rootReducer = combineReducers(coreReducers);
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Store the initial reducers map for future reference
store._reducers = coreReducers;

// Make the store globally available for micro frontends
setGlobalStore(store);

export default store;`}
        </pre>
      </div>

      <div className="example-box">
        <h3>Micro Frontend Integration</h3>
        <pre>
          {`// In a micro frontend: setup.js
import { registerReducers, getGlobalStore } from 'shared-library/redux-federation';
import microFrontendReducers from './reducers';

// Register this micro frontend's reducers with the global store
registerReducers(microFrontendReducers);

// Now the micro frontend can access the global store
const globalStore = getGlobalStore();

// Use it in components
import { Provider } from 'react-redux';

const MicroFrontendRoot = () => (
  <Provider store={globalStore}>
    <MicroFrontendApp />
  </Provider>
);`}
        </pre>
      </div>
      <BackButton />
    </div>
  );
};

export const ReduxSecurityComponent = () => {
  return (
    <div className="section">
      <HomeButton />
      <h2>Redux Security Best Practices</h2>
      <p>
        Learn how to secure your Redux applications against common vulnerabilities
        and protect sensitive data in your store.
      </p>

      <div className="example-box">
        <h3>Sanitizing Action Payloads</h3>
        <pre>
          {`// Middleware to sanitize input data
import DOMPurify from 'dompurify';

const sanitizeMiddleware = store => next => action => {
  // Deep sanitize all string values in the action payload
  const sanitizeData = (data) => {
    if (!data) return data;
    
    if (typeof data === 'string') {
      return DOMPurify.sanitize(data);
    }
    
    if (Array.isArray(data)) {
      return data.map(sanitizeData);
    }
    
    if (typeof data === 'object') {
      return Object.keys(data).reduce((acc, key) => {
        acc[key] = sanitizeData(data[key]);
        return acc;
      }, {});
    }
    
    return data;
  };

  // Create a sanitized version of the action
  const sanitizedAction = {
    ...action,
    payload: sanitizeData(action.payload)
  };
  
  return next(sanitizedAction);
};

// Add to your store
const store = createStore(
  rootReducer,
  applyMiddleware(sanitizeMiddleware, /* other middleware */)
);`}
        </pre>
      </div>

      <div className="example-box">
        <h3>Protecting Sensitive Data</h3>
        <pre>
          {`// Sensitive data handling with redux-persist
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import SecureStorage from 'redux-persist-secure-storage';
import CryptoJS from 'crypto-js';

// Create secure storage for sensitive data
const secureStorage = new SecureStorage(storage, {
  encrypt: data => {
    return CryptoJS.AES.encrypt(data, 'secret_key').toString();
  },
  decrypt: data => {
    return CryptoJS.AES.decrypt(data, 'secret_key').toString(CryptoJS.enc.Utf8);
  }
});

// Define which parts of the state are sensitive
const regularPersistConfig = {
  key: 'regular',
  storage: storage,
  whitelist: ['ui', 'preferences']
};

const securePersistConfig = {
  key: 'secure',
  storage: secureStorage,
  whitelist: ['auth', 'user', 'payment']
};

// Create two separate reducers for regular and sensitive data
const regularReducer = combineReducers({
  ui: uiReducer,
  preferences: preferencesReducer
});

const secureReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  payment: paymentReducer
});

// Create persistable versions of each reducer
const persistedRegularReducer = persistReducer(regularPersistConfig, regularReducer);
const persistedSecureReducer = persistReducer(securePersistConfig, secureReducer);

// Combine them into the root reducer
const rootReducer = combineReducers({
  regular: persistedRegularReducer,
  secure: persistedSecureReducer
});`}
        </pre>
      </div>
      <BackButton />
    </div>
  );
};
