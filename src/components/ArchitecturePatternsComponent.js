import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

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

export const ReduxArchitecturePatternsComponent = () => {
  // Scope for react-live
  const scope = {
    React
  };
  
  const featureSlicedCode = `
// Feature-sliced structure example

// users/model/slice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: { list: [], current: null },
  reducers: {
    setUsers: (state, action) => {
      state.list = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.current = action.payload;
    }
  }
});

export const { setUsers, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;

// users/api.js
export const fetchUsers = () => async (dispatch) => {
  const response = await fetch('/api/users');
  const users = await response.json();
  dispatch(setUsers(users));
};

// Feature-specific components in users/ui/
// Feature-specific pages in users/pages/
`;

  const ducksPatternCode = `
// users.js - Duck module
import { createSlice } from '@reduxjs/toolkit';

// Actions
const FETCH_USERS = 'app/users/FETCH_USERS';
const FETCH_USERS_SUCCESS = 'app/users/FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'app/users/FETCH_USERS_FAILURE';

// Reducer
const initialState = {
  list: [],
  loading: false,
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsers: (state) => {
      state.loading = true;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

// Action creators
export const { 
  fetchUsers, 
  fetchUsersSuccess, 
  fetchUsersFailure 
} = usersSlice.actions;

// Side effects / Thunks
export const loadUsers = () => async (dispatch) => {
  dispatch(fetchUsers());
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    dispatch(fetchUsersSuccess(data));
  } catch (error) {
    dispatch(fetchUsersFailure(error.toString()));
  }
};

// Selectors
export const getUsersList = (state) => state.users.list;
export const getUsersLoading = (state) => state.users.loading;
export const getUsersError = (state) => state.users.error;

export default usersSlice.reducer;
`;

  const reduxModulesCode = `
// userModule.js
import { createSlice } from '@reduxjs/toolkit';

// Private action types (not exported)
const SET_USERS = 'users/set';
const SET_LOADING = 'users/setLoading';
const SET_ERROR = 'users/setError';

// Module state
const initialState = {
  users: [],
  loading: false,
  error: null
};

// Module reducer
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

// Private action creators
const { setUsers, setLoading, setError } = usersSlice.actions;

// Public API - These are the only functions consumers should use
export const userModule = {
  reducer: usersSlice.reducer,
  
  // Public selectors
  selectors: {
    getUsers: (state) => state.users.users,
    getLoading: (state) => state.users.loading,
    getError: (state) => state.users.error
  },
  
  // Public operations (thunks/effects)
  operations: {
    fetchUsers: () => async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const response = await fetch('/api/users');
        const users = await response.json();
        dispatch(setUsers(users));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.toString()));
        dispatch(setLoading(false));
      }
    }
  }
};

// Usage:
// import { userModule } from './userModule';
// store.dispatch(userModule.operations.fetchUsers());
// const users = useSelector(userModule.selectors.getUsers);
`;

  const eventDrivenCode = `
// Event types
export const USER_EVENTS = {
  REGISTERED: 'user/registered',
  LOGGED_IN: 'user/loggedIn',
  PROFILE_UPDATED: 'user/profileUpdated',
  SUBSCRIPTION_CHANGED: 'user/subscriptionChanged'
};

// Event creators
export const userEvents = {
  registered: (userData) => ({
    type: USER_EVENTS.REGISTERED,
    payload: userData,
    meta: {
      timestamp: Date.now()
    }
  }),
  
  loggedIn: (userId, sessionInfo) => ({
    type: USER_EVENTS.LOGGED_IN,
    payload: { userId, sessionInfo },
    meta: {
      timestamp: Date.now()
    }
  })
};

// Event handlers in various reducers
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_EVENTS.REGISTERED:
    case USER_EVENTS.PROFILE_UPDATED:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

const analyticsMiddleware = store => next => action => {
  // Log all user events to analytics
  if (action.type.startsWith('user/')) {
    logToAnalytics(action.type, action.payload);
  }
  
  return next(action);
};

// Usage example:
// When user registers:
dispatch(userEvents.registered({
  id: 'user123',
  name: 'Jane Doe',
  email: 'jane@example.com'
}));

// This single event might update multiple slices:
// - profiles slice (user profile data)
// - auth slice (authentication state)
// - notifications slice (welcome notification)
// - analytics middleware (log signup event)
`;

  return (
    <div className="section">
      <BackButton />
      <h2><span className="topic-date">2025-06-03</span> Redux Architecture Patterns</h2>
      <p>Effective ways to organize and structure your Redux codebase for better maintainability</p>
      
      <div className="subsection">
        <h3>1. Feature-Sliced Design: Organizing by domains/features</h3>
        <p>
          Feature-Sliced Design is an architectural methodology that organizes code by features 
          or business domains rather than technical concerns. It's particularly effective for 
          large Redux applications.
        </p>

        <h4>Key Principles:</h4>
        <ul>
          <li><strong>Slices by Domain:</strong> Code is divided into feature slices that represent business domains (users, products, checkout, etc.)</li>
          <li><strong>Layer Organization:</strong> Each slice is further organized by layers (UI components, business logic, API)</li>
          <li><strong>Isolation:</strong> Features should be as independent as possible with clear boundaries</li>
        </ul>

        <h4>Typical Structure:</h4>
        <pre>
{`src/
  ├── features/
  │   ├── users/
  │   │   ├── model/       # Redux slice, selectors
  │   │   ├── api/         # API calls related to users
  │   │   ├── ui/          # Reusable components specific to users
  │   │   └── pages/       # Page components for user feature
  │   ├── products/
  │   │   ├── model/
  │   │   ├── api/
  │   │   └── ...
  │   └── checkout/
  │       └── ...
  ├── shared/              # Shared utilities, types, UI components
  │   ├── ui/
  │   ├── api/
  │   └── lib/
  └── app/                 # App-wide setup (store config, providers)`}
        </pre>

        <h4>Example Implementation:</h4>
        <LiveProvider code={featureSlicedCode} scope={scope} noInline={false}>
          <div className="live-editor-container">
            <LiveEditor className="live-editor" />
          </div>
          <LiveError className="live-error" />
        </LiveProvider>

        <h4>Benefits:</h4>
        <ul>
          <li>Clear business domain boundaries</li>
          <li>Better team collaboration (teams can own features)</li>
          <li>Easier to understand the codebase by feature</li>
          <li>Improved scalability for large applications</li>
        </ul>
      </div>

      <div className="subsection">
        <h3>2. Ducks Pattern: Grouping related Redux code</h3>
        <p>
          The Ducks pattern, introduced by Erik Rasmussen, proposes bundling all related Redux code (actions, 
          action creators, reducers) into a single file called a "duck" module. This approach simplifies the 
          Redux structure by keeping related code together.
        </p>

        <h4>Rules of a Duck:</h4>
        <ol>
          <li>Must export a default function called reducer()</li>
          <li>Must export its action creators as functions</li>
          <li>Must have action types in the format app/feature/ACTION_TYPE</li>
          <li>May export its action types as UPPER_SNAKE_CASE constants</li>
        </ol>

        <h4>Example Implementation:</h4>
        <LiveProvider code={ducksPatternCode} scope={scope} noInline={false}>
          <div className="live-editor-container">
            <LiveEditor className="live-editor" />
          </div>
          <LiveError className="live-error" />
        </LiveProvider>

        <h4>Benefits:</h4>
        <ul>
          <li>Reduced boilerplate with cohesive modules</li>
          <li>Easier to understand the relationship between actions and their reducers</li>
          <li>Self-contained modules that can be reasoned about independently</li>
          <li>Improved maintainability for medium-sized applications</li>
        </ul>
      </div>

      <div className="subsection">
        <h3>3. Redux Modules: Encapsulated state management</h3>
        <p>
          The Redux Modules pattern takes encapsulation further by creating modules with public APIs and 
          private implementation details. It applies the principle of information hiding to Redux.
        </p>

        <h4>Key Characteristics:</h4>
        <ul>
          <li><strong>Public API:</strong> Each module exposes a clear public API (selectors, operations)</li>
          <li><strong>Private Implementation:</strong> Internal action types, creators, and helpers are not exported</li>
          <li><strong>Implementation Hiding:</strong> Consumers can't directly dispatch actions, they must use the provided operations</li>
        </ul>

        <h4>Example Implementation:</h4>
        <LiveProvider code={reduxModulesCode} scope={scope} noInline={false}>
          <div className="live-editor-container">
            <LiveEditor className="live-editor" />
          </div>
          <LiveError className="live-error" />
        </LiveProvider>

        <h4>Benefits:</h4>
        <ul>
          <li>Strong encapsulation boundaries</li>
          <li>Freedom to change implementation details without breaking consumers</li>
          <li>Clear, controlled API surface for each module</li>
          <li>Better maintainability in complex applications with many contributors</li>
        </ul>
      </div>

      <div className="subsection">
        <h3>4. Event-Driven Architecture: Redux as an event bus</h3>
        <p>
          Event-Driven Architecture treats Redux actions as events rather than commands. In this pattern, 
          components dispatch events that describe what happened, and multiple reducers can respond to the same event.
        </p>

        <h4>Key Concepts:</h4>
        <ul>
          <li><strong>Events vs Commands:</strong> "User Registered" instead of "Add User to State"</li>
          <li><strong>Multiple Listeners:</strong> Many reducers can react to the same event</li>
          <li><strong>Loose Coupling:</strong> Event producers don't know who will consume their events</li>
        </ul>

        <h4>Example Implementation:</h4>
        <LiveProvider code={eventDrivenCode} scope={scope} noInline={false}>
          <div className="live-editor-container">
            <LiveEditor className="live-editor" />
          </div>
          <LiveError className="live-error" />
        </LiveProvider>

        <h4>Benefits:</h4>
        <ul>
          <li>Loose coupling between components</li>
          <li>Better adherence to single responsibility principle</li>
          <li>More extensible system - new features can listen to existing events</li>
          <li>Easier to implement cross-cutting concerns (logging, analytics)</li>
        </ul>
      </div>

      <div className="subsection">
        <h3>Choosing the Right Pattern</h3>
        <p>
          The best architecture pattern depends on your application size, team structure, and specific needs:
        </p>
        <ul>
          <li><strong>Small Projects:</strong> Ducks Pattern is often sufficient</li>
          <li><strong>Large Projects:</strong> Feature-Sliced Design helps with organization</li>
          <li><strong>Large Teams:</strong> Redux Modules provide clear boundaries between different parts of the system</li>
          <li><strong>Complex Domains:</strong> Event-Driven Architecture can help model complex business processes</li>
        </ul>
        <p>
          These patterns aren't mutually exclusive - many applications combine aspects of different patterns.
          For example, you might use Feature-Sliced Design for overall organization while implementing
          each feature's Redux code using the Ducks pattern.
        </p>
      </div>
    </div>
  );
};
