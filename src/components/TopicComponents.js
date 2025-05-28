import React from 'react';
import { useNavigate } from 'react-router-dom';
import Counter from './Counter';
import TodoList from './TodoList';

// Back button component for reuse
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

export const ActionsComponent = () => {
  return (
    <div className="section">
      <BackButton />
      <h2>Actions and Action Creators</h2>
      <p>Actions are plain JavaScript objects that represent an intention to change state. 
         Action creators are functions that create and return action objects.</p>
      
      <div className="example-box">
        <h3>Example Action Creator:</h3>
        <pre>
          {`const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: text
});`}
        </pre>
      </div>
      
      <p>Below is a live example of dispatching actions with our Counter component:</p>
      <Counter />
    </div>
  );
};

export const ReducersComponent = () => {
  return (
    <div className="section">
      <BackButton />
      <h2>Reducers</h2>
      <p>Reducers are pure functions that take the current state and an action as arguments, 
         and return a new state. They specify how the application's state changes in response to actions.</p>
      
      <div className="example-box">
        <h3>Example Reducer:</h3>
        <pre>
          {`const counterReducer = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, value: state.value + 1 };
    case 'DECREMENT':
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
};`}
        </pre>
      </div>
    </div>
  );
};

export const StoreComponent = () => {
  return (
    <div className="section">
      <BackButton />
      <h2>Store</h2>
      <p>The Redux store brings together the state, actions, and reducers. 
         The store has the following responsibilities:</p>
      
      <ul>
        <li>Holds application state</li>
        <li>Allows access to state via <code>getState()</code></li>
        <li>Allows state to be updated via <code>dispatch(action)</code></li>
        <li>Registers listeners via <code>subscribe(listener)</code></li>
      </ul>
      
      <div className="example-box">
        <h3>Example Store Creation:</h3>
        <pre>
          {`import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);`}
        </pre>
      </div>
    </div>
  );
};

export const HooksComponent = () => {
  return (
    <div className="section">
      <BackButton />
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
    </div>
  );
};

export const ThunksComponent = () => {
  return (
    <div className="section">
      <BackButton />
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
    </div>
  );
};

export const MiddlewareComponent = () => {
  return (
    <div className="section">
      <BackButton />
      <h2>Redux Middleware</h2>
      <p>Middleware provides a third-party extension point between dispatching an action and the moment it reaches the reducer. 
        Middleware can be used for logging, crash reporting, talking to an asynchronous API, routing, and more.</p>
      
      <div className="example-box">
        <h3>Creating Custom Middleware:</h3>
        <pre>
          {`const loggerMiddleware = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

// Apply middleware when creating the store
const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware, thunk)
);`}
        </pre>
      </div>
      
      <p>Popular Redux middleware includes:</p>
      <ul>
        <li><code>redux-thunk</code>: Handles async logic</li>
        <li><code>redux-saga</code>: Manages side effects using generators</li>
        <li><code>redux-observable</code>: Uses RxJS for reactive programming</li>
        <li><code>redux-logger</code>: Logs actions and state</li>
      </ul>
    </div>
  );
};

export const ReduxThunkComponent = () => {
  return (
    <div className="section">
      <BackButton />
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
    </div>
  );
};

export const ReduxSagaComponent = () => {
  return (
    <div className="section">
      <BackButton />
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
    </div>
  );
};

export const ReduxObservableComponent = () => {
  return (
    <div className="section">
      <BackButton />
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
    </div>
  );
};
