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
      <h2>RTK Query - The Complete Guide</h2>
      <p>
        RTK Query is a powerful data fetching and caching tool built on top of Redux Toolkit. 
        It's designed to simplify common cases for loading data in a web application, 
        eliminating the need to hand-write data fetching & caching logic yourself.
      </p>

      <div className="key-points">
        <h3>Why RTK Query?</h3>
        <p>Traditional data fetching in Redux requires a lot of boilerplate code:</p>
        <ul>
          <li>Loading state management (isLoading, isError, etc.)</li>
          <li>Request deduplication</li>
          <li>Cache management and invalidation</li>
          <li>Background refetching</li>
          <li>Optimistic updates</li>
          <li>Error handling and retry logic</li>
        </ul>
        <p>RTK Query handles all of this automatically while providing excellent developer experience.</p>
      </div>

      <div className="concept-explanation">
        <h3>Core Architecture</h3>
        <p>RTK Query is built around several key concepts:</p>
        
        <div className="architecture-diagram">
          <div className="arch-box api-slice">
            <h4>API Slice</h4>
            <p>Central definition of endpoints</p>
          </div>
          <div className="arch-box base-query">
            <h4>Base Query</h4>
            <p>Wrapper around fetch/axios</p>
          </div>
          <div className="arch-box endpoints">
            <h4>Endpoints</h4>
            <p>Queries & Mutations</p>
          </div>
          <div className="arch-box cache">
            <h4>Normalized Cache</h4>
            <p>Automatic data storage</p>
          </div>
          <div className="arch-box hooks">
            <h4>Generated Hooks</h4>
            <p>React integration</p>
          </div>
        </div>
      </div>

      <h3>Getting Started - Basic Setup</h3>
      
      <div className="example-box">
        <h4>1. Install Dependencies</h4>
        <pre>
          {`npm install @reduxjs/toolkit react-redux
# RTK Query is included in Redux Toolkit`}
        </pre>
      </div>

      <div className="example-box">
        <h4>2. Create Your First API Slice</h4>
        <pre>
          {`// src/services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  // Unique key that defines where the cache is stored
  reducerPath: 'api',
  
  // Base query configuration
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
    
    // Global request configuration
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      const token = getState().auth?.token;
      if (token) {
        headers.set('authorization', \`Bearer \${token}\`);
      }
      
      // Add content type
      headers.set('content-type', 'application/json');
      return headers;
    },
  }),
  
  // Tag types for cache invalidation
  tagTypes: ['Posts', 'Users', 'Comments'],
  
  // Define endpoints
  endpoints: (builder) => ({
    // Query endpoints (for fetching data)
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Posts'],
    }),
    
    getPost: builder.query({
      query: (id) => \`posts/\${id}\`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    
    getUsers: builder.query({
      query: () => 'users',
      providesTags: ['Users'],
    }),
    
    // Mutation endpoints (for updating data)
    addPost: builder.mutation({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Posts'],
    }),
    
    updatePost: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: \`posts/\${id}\`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
    }),
    
    deletePost: builder.mutation({
      query: (id) => ({
        url: \`posts/\${id}\`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
  }),
});

// Export auto-generated hooks
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetUsersQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = api;`}
        </pre>
      </div>

      <div className="example-box">
        <h4>3. Configure Your Store</h4>
        <pre>
          {`// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '../services/api';
import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [api.reducerPath]: api.reducer,
    auth: authSlice,
  },
  
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`}
        </pre>
      </div>

      <h3>Using RTK Query in Components</h3>

      <div className="example-box">
        <h4>Simple Data Fetching</h4>
        <pre>
          {`// PostsList.js
import React from 'react';
import { useGetPostsQuery } from '../services/api';

const PostsList = () => {
  const {
    data: posts,
    error,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    refetch,
  } = useGetPostsQuery();

  if (isLoading) return <div className="loading">Loading posts...</div>;
  
  if (isError) {
    return (
      <div className="error">
        <h3>Error loading posts</h3>
        <p>{error?.data?.message || error?.message || 'Something went wrong'}</p>
        <button onClick={refetch}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2>All Posts ({posts?.length || 0})</h2>
        <button 
          onClick={refetch}
          disabled={isFetching}
          className={isFetching ? 'refreshing' : ''}
        >
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      
      <div className="posts-grid">
        {posts?.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className="post-meta">
              <span>ID: {post.id}</span>
              <span>User: {post.userId}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;`}
        </pre>
      </div>

      <div className="example-box">
        <h4>Handling Mutations</h4>
        <pre>
          {`// AddPostForm.js
import React, { useState } from 'react';
import { useAddPostMutation } from '../services/api';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState(1);
  
  const [addPost, { isLoading, isSuccess, isError, error }] = useAddPostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const result = await addPost({
        title: title.trim(),
        body: body.trim(),
        userId: Number(userId),
      }).unwrap();
      
      console.log('Post created:', result);
      
      // Reset form
      setTitle('');
      setBody('');
      setUserId(1);
      
      // Show success message
      alert('Post created successfully!');
    } catch (err) {
      console.error('Failed to create post:', err);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-post-form">
      <h2>Create New Post</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          disabled={isLoading}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="body">Content:</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter post content"
          rows={4}
          disabled={isLoading}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="userId">User ID:</label>
        <select
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          disabled={isLoading}
        >
          {[1, 2, 3, 4, 5].map(id => (
            <option key={id} value={id}>User {id}</option>
          ))}
        </select>
      </div>
      
      <button 
        type="submit" 
        disabled={isLoading || !title.trim() || !body.trim()}
        className="submit-btn"
      >
        {isLoading ? 'Creating...' : 'Create Post'}
      </button>
      
      {isError && (
        <div className="error-message">
          Error: {error?.data?.message || 'Failed to create post'}
        </div>
      )}
      
      {isSuccess && (
        <div className="success-message">
          Post created successfully!
        </div>
      )}
    </form>
  );
};

export default AddPostForm;`}
        </pre>
      </div>

      <h3>Advanced Query Techniques</h3>

      <div className="example-box">
        <h4>Conditional Queries</h4>
        <pre>
          {`// UserProfile.js
import React from 'react';
import { useGetUserQuery, useGetPostsQuery } from '../services/api';

const UserProfile = ({ userId }) => {
  // Skip the query if no userId is provided
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGetUserQuery(userId, {
    skip: !userId, // Don't run the query if userId is falsy
  });

  // Only fetch user's posts if we have a user
  const {
    data: userPosts,
    isLoading: postsLoading,
  } = useGetPostsQuery(undefined, {
    skip: !user?.id,
    selectFromResult: ({ data, ...other }) => ({
      // Filter posts to only show this user's posts
      data: data?.filter(post => post.userId === user?.id),
      ...other,
    }),
  });

  if (!userId) return <div>Please select a user</div>;
  if (userLoading) return <div>Loading user...</div>;
  if (userError) return <div>Error loading user</div>;

  return (
    <div className="user-profile">
      <div className="user-info">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Website: {user.website}</p>
        <p>Company: {user.company?.name}</p>
      </div>
      
      <div className="user-posts">
        <h3>Posts by {user.name}</h3>
        {postsLoading ? (
          <div>Loading posts...</div>
        ) : (
          <div className="posts-list">
            {userPosts?.map(post => (
              <div key={post.id} className="post-item">
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};`}
        </pre>
      </div>

      <div className="example-box">
        <h4>Polling and Background Sync</h4>
        <pre>
          {`// LiveDashboard.js
import React, { useState } from 'react';
import { useGetPostsQuery } from '../services/api';

const LiveDashboard = () => {
  const [pollingInterval, setPollingInterval] = useState(0);
  
  const {
    data: posts,
    isLoading,
    isFetching,
    error,
  } = useGetPostsQuery(undefined, {
    // Poll every 5 seconds when pollingInterval > 0
    pollingInterval: pollingInterval,
    
    // Refetch when user focuses window
    refetchOnFocus: true,
    
    // Refetch when network reconnects
    refetchOnReconnect: true,
    
    // Refetch when component mounts if data is older than 60 seconds
    refetchOnMountOrArgChange: 60,
  });

  const togglePolling = () => {
    setPollingInterval(current => current === 0 ? 5000 : 0);
  };

  return (
    <div className="live-dashboard">
      <div className="dashboard-controls">
        <button onClick={togglePolling}>
          {pollingInterval > 0 ? 'Stop Live Updates' : 'Start Live Updates'}
        </button>
        {isFetching && <span className="fetching-indicator">Updating...</span>}
      </div>
      
      <div className="dashboard-content">
        <h2>Live Posts Dashboard</h2>
        <p>Total Posts: {posts?.length || 0}</p>
        
        {pollingInterval > 0 && (
          <p className="polling-status">
            🔄 Auto-refreshing every {pollingInterval / 1000} seconds
          </p>
        )}
        
        {error && <div className="error">Error: {error.message}</div>}
        
        <div className="posts-summary">
          {posts?.slice(0, 5).map(post => (
            <div key={post.id} className="post-summary">
              <strong>{post.title}</strong>
              <span> - by User {post.userId}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};`}
        </pre>
      </div>

      <h3>Cache Management & Optimizations</h3>

      <div className="example-box">
        <h4>Manual Cache Updates</h4>
        <pre>
          {`// Optimistic Updates Example
import { api } from '../services/api';

// In a component
const OptimisticPostEditor = ({ postId }) => {
  const { data: post } = useGetPostQuery(postId);
  const [updatePost] = useUpdatePostMutation();
  const dispatch = useDispatch();

  const handleOptimisticUpdate = async (newTitle) => {
    // 1. Optimistically update the cache immediately
    const patchResult = dispatch(
      api.util.updateQueryData('getPost', postId, (draft) => {
        draft.title = newTitle;
      })
    );

    try {
      // 2. Make the actual request
      await updatePost({ id: postId, title: newTitle }).unwrap();
    } catch {
      // 3. If request fails, revert the optimistic update
      patchResult.undo();
      
      // 4. Optionally show error message
      alert('Failed to update post title');
    }
  };

  return (
    <div>
      <h3>Current title: {post?.title}</h3>
      <button onClick={() => handleOptimisticUpdate('New Optimistic Title')}>
        Update Title Optimistically
      </button>
    </div>
  );
};`}
        </pre>
      </div>

      <div className="example-box">
        <h4>Advanced Caching Strategies</h4>
        <pre>
          {`// Enhanced API slice with advanced caching
const enhancedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Search with caching by search term
    searchPosts: builder.query({
      query: (searchTerm) => \`posts?q=\${encodeURIComponent(searchTerm)}\`,
      
      // Keep cached data for 5 minutes
      keepUnusedDataFor: 300,
      
      // Custom cache key generation
      serializeQueryArgs: ({ queryArgs }) => {
        return \`search-\${queryArgs?.toLowerCase()}\`;
      },
      
      // Transform and normalize the response
      transformResponse: (response) => {
        return {
          results: response.map(post => ({
            ...post,
            searchRelevance: calculateRelevance(post, searchTerm),
          })),
          total: response.length,
          searchTerm,
        };
      },
    }),

    // Infinite scroll pagination
    getPostsPaginated: builder.query({
      query: ({ page = 1, limit = 10 }) => 
        \`posts?_page=\${page}&_limit=\${limit}\`,
      
      // Merge pages for infinite scroll
      serializeQueryArgs: ({ queryArgs }) => {
        const { limit } = queryArgs;
        return \`posts-paginated-\${limit}\`;
      },
      
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) {
          return newItems;
        }
        return [...(currentCache || []), ...newItems];
      },
      
      // Invalidate on a schedule or condition
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),

    // Prefetch related data
    getPostWithComments: builder.query({
      query: (postId) => \`posts/\${postId}\`,
      
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        // Prefetch comments while post is loading
        dispatch(api.endpoints.getComments.initiate(postId));
        
        try {
          await queryFulfilled;
        } catch {
          // Handle error
        }
      },
    }),
  }),
  overrideExisting: false,
});`}
        </pre>
      </div>

      <h3>Real-time Integration</h3>

      <div className="example-box">
        <h4>WebSocket Integration</h4>
        <pre>
          {`// Real-time posts with WebSocket updates
const realtimeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRealtimePosts: builder.query({
      query: () => 'posts',
      providesTags: ['Posts'],
      
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // Wait for initial data to load
        try {
          await cacheDataLoaded;
          
          // Create WebSocket connection
          const ws = new WebSocket('wss://api.example.com/posts/live');
          
          ws.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            
            updateCachedData((draft) => {
              switch (data.type) {
                case 'POST_ADDED':
                  draft.push(data.post);
                  break;
                  
                case 'POST_UPDATED':
                  const index = draft.findIndex(p => p.id === data.post.id);
                  if (index !== -1) {
                    draft[index] = { ...draft[index], ...data.post };
                  }
                  break;
                  
                case 'POST_DELETED':
                  return draft.filter(p => p.id !== data.postId);
                  
                default:
                  break;
              }
            });
          });
          
          // Cleanup when cache entry is removed
          await cacheEntryRemoved;
          ws.close();
          
        } catch (error) {
          console.error('WebSocket connection failed:', error);
        }
      },
    }),
  }),
});

// Usage in component
const RealtimePostsList = () => {
  const { data: posts, isLoading } = useGetRealtimePostsQuery();
  
  return (
    <div className="realtime-posts">
      <h2>Live Posts Feed 🔴 LIVE</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="posts-feed">
          {posts?.map(post => (
            <div key={post.id} className="live-post">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <small>By User {post.userId} • {post.timestamp}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};`}
        </pre>
      </div>

      <h3>Testing RTK Query</h3>

      <div className="example-box">
        <h4>Testing Components with RTK Query</h4>
        <pre>
          {`// PostsList.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import PostsList from '../components/PostsList';

// Mock data
const mockPosts = [
  { id: 1, title: 'Test Post 1', body: 'Content 1', userId: 1 },
  { id: 2, title: 'Test Post 2', body: 'Content 2', userId: 2 },
];

// Helper to create store with preloaded state
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    preloadedState,
  });
};

// Test with mocked successful response
test('displays posts when API call succeeds', async () => {
  // Create store with mocked data
  const store = createTestStore({
    api: {
      queries: {
        'getPosts(undefined)': {
          status: 'fulfilled',
          data: mockPosts,
        },
      },
    },
  });

  render(
    <Provider store={store}>
      <PostsList />
    </Provider>
  );

  // Wait for posts to appear
  await waitFor(() => {
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
  });
});

// Test with mocked error response
test('displays error when API call fails', async () => {
  const store = createTestStore({
    api: {
      queries: {
        'getPosts(undefined)': {
          status: 'rejected',
          error: { message: 'Network Error' },
        },
      },
    },
  });

  render(
    <Provider store={store}>
      <PostsList />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText(/Error loading posts/)).toBeInTheDocument();
    expect(screen.getByText(/Network Error/)).toBeInTheDocument();
  });
});`}
        </pre>
      </div>

      <h3>Performance Best Practices</h3>

      <div className="explanation-box">
        <h4>Optimization Techniques</h4>
        <ul>
          <li><strong>Selective Subscriptions:</strong> Use <code>selectFromResult</code> to subscribe to only specific parts of query results</li>
          <li><strong>Query Splitting:</strong> Split large queries into smaller, more focused ones</li>
          <li><strong>Prefetching:</strong> Use <code>dispatch(api.util.prefetch())</code> to load data before it's needed</li>
          <li><strong>Cache Management:</strong> Configure appropriate <code>keepUnusedDataFor</code> values</li>
          <li><strong>Request Deduplication:</strong> RTK Query automatically deduplicates identical requests</li>
        </ul>
      </div>

      <div className="example-box">
        <h4>Performance Monitoring</h4>
        <pre>
          {`// Custom hook for performance monitoring
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useRTKQueryStats = () => {
  const queryState = useSelector(state => state.api.queries);
  
  useEffect(() => {
    const stats = Object.values(queryState).reduce((acc, query) => {
      acc.total++;
      if (query.status === 'pending') acc.pending++;
      if (query.status === 'fulfilled') acc.fulfilled++;
      if (query.status === 'rejected') acc.rejected++;
      return acc;
    }, { total: 0, pending: 0, fulfilled: 0, rejected: 0 });
    
    console.log('RTK Query Stats:', stats);
  }, [queryState]);
  
  return queryState;
};

// Performance monitoring component
const QueryStatsMonitor = () => {
  const stats = useRTKQueryStats();
  
  return (
    <div className="query-stats">
      <h4>Query Performance</h4>
      <p>Active Queries: {Object.keys(stats).length}</p>
      <p>Cache Size: {JSON.stringify(stats).length} bytes</p>
    </div>
  );
};`}
        </pre>
      </div>

      <h3>Migration Guide</h3>

      <div className="explanation-box">
        <h4>Migrating from Traditional Redux</h4>
        <p>Here's how to gradually migrate from traditional Redux patterns to RTK Query:</p>
        
        <div className="migration-steps">
          <div className="step">
            <h5>Step 1: Identify Data Fetching Logic</h5>
            <p>Look for thunks, sagas, or other async logic that fetches server data</p>
          </div>
          
          <div className="step">
            <h5>Step 2: Create API Slices</h5>
            <p>Replace fetch logic with RTK Query endpoints</p>
          </div>
          
          <div className="step">
            <h5>Step 3: Update Components</h5>
            <p>Replace useSelector + useEffect patterns with RTK Query hooks</p>
          </div>
          
          <div className="step">
            <h5>Step 4: Remove Old Code</h5>
            <p>Clean up old reducers, actions, and async logic</p>
          </div>
        </div>
      </div>

      <div className="comparison-table">
        <h4>Before vs After Migration</h4>
        <table>
          <thead>
            <tr>
              <th>Traditional Redux</th>
              <th>RTK Query</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <pre>{`// Actions
const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

// Thunk
const fetchPosts = () => async (dispatch) => {
  dispatch({ type: FETCH_POSTS_REQUEST });
  try {
    const response = await fetch('/api/posts');
    const data = await response.json();
    dispatch({ type: FETCH_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_POSTS_FAILURE, payload: error.message });
  }
};

// Reducer
const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_POSTS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_POSTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Component
const PostsList = () => {
  const { data, loading, error } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  
  // Rest of component...
};`}</pre>
              </td>
              <td>
                <pre>{`// API Slice
const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
    }),
  }),
});

// Component  
const PostsList = () => {
  const { data, isLoading, error } = useGetPostsQuery();
  
  // Rest of component...
};`}</pre>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Common Patterns & Recipes</h3>

      <div className="example-box">
        <h4>Authentication Integration</h4>
        <pre>
          {`// Auth-aware API configuration
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', \`Bearer \${token}\`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);
  
  if (result.error && result.error.status === 401) {
    // Try to refresh token
    const refreshResult = await baseQueryWithAuth(
      '/auth/refresh', 
      api, 
      extraOptions
    );
    
    if (refreshResult.data) {
      api.dispatch(tokenReceived(refreshResult.data));
      // Retry the original query
      result = await baseQueryWithAuth(args, api, extraOptions);
    } else {
      api.dispatch(loggedOut());
    }
  }
  
  return result;
};`}
        </pre>
      </div>

      <div className="warning-box">
        <h4>Common Gotchas</h4>
        <ul>
          <li><strong>Don't overuse RTK Query:</strong> It's designed for server state, not client state</li>
          <li><strong>Cache key serialization:</strong> Be careful with object arguments that might not serialize consistently</li>
          <li><strong>Tag invalidation:</strong> Make sure your tag strategies don't cause unnecessary refetches</li>
          <li><strong>Memory usage:</strong> Monitor cache size in long-running applications</li>
          <li><strong>Error handling:</strong> Always handle network errors and edge cases</li>
        </ul>
      </div>

      <BackButton />
    </div>
  );
};
