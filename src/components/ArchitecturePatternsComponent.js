import React, { useState, useEffect } from 'react';
import { LiveProvider, LiveEditor, LiveError } from 'react-live';
import TutorialTOC from './TutorialTOC';
import ExpandableCode from './ExpandableCode';
import QuizComponent from './QuizComponent';
import SectionNavigation from './SectionNavigation';
import ProgressIndicator from './ProgressIndicator';
import { HomeButton, BackButton, BackToTopButton, NextButton } from './NavigationButtons';

// Redux Architecture Patterns component
export const ReduxArchitecturePatternsComponent = () => {
  // Scope for react-live
  const scope = {
    React
  };
  
  // State to track active section
  const [activeSection, setActiveSection] = useState('intro');

  // Effect to update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.subsection');
      const scrollPosition = window.scrollY;
      
      // Find the current section
      let current = 'intro';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if(scrollPosition >= sectionTop - 100) {
          current = section.id;
        }
      });
      
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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

  // Define sections for the TOC
  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'feature-sliced', title: 'Feature-Sliced Design' },
    { id: 'ducks', title: 'Ducks Pattern' },
    { id: 'modules', title: 'Redux Modules' },
    { id: 'event-driven', title: 'Event-Driven Architecture' },
    { id: 'choosing', title: 'Choosing the Right Pattern' }
  ];
  
  return (
    <div className="section">
      <HomeButton />
      <h2><span className="topic-date">2025-06-03</span> Redux Architecture Patterns</h2>
      <p>Effective ways to organize and structure your Redux codebase for better maintainability</p>
      
      {/* Add reading time indicator */}
      <div className="reading-time">
        <i>⏱️</i> Reading time: ~15 minutes
      </div>
      
      {/* Add progress indicator */}
      <ProgressIndicator />
      
      {/* Add Table of Contents */}
      <TutorialTOC 
        sections={sections} 
        activeSection={activeSection}
      />
      
      <div id="intro" className="subsection">
        <span className="section-anchor"></span>
        <h3>Introduction to Redux Architecture Patterns</h3>
        <p>
          As Redux applications grow in size and complexity, it becomes increasingly important to 
          adopt consistent patterns for organizing your code. This tutorial explores four powerful 
          patterns that can help keep your Redux codebase maintainable and scalable.
        </p>
        
        {/* Add a key points summary */}
        <div className="key-points">
          <h3>Why Architecture Matters</h3>
          <ul>
            <li>Improves developer experience and onboarding</li>
            <li>Makes the codebase more maintainable</li>
            <li>Reduces bugs by enforcing consistency</li>
            <li>Helps teams collaborate more effectively</li>
          </ul>
        </div>
        
        <SectionNavigation
          nextSection="feature-sliced"
          nextTitle="Feature-Sliced Design"
        />
      </div>
      
      <div id="feature-sliced" className="subsection">
        <span className="section-anchor"></span>
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
        {/* Add concept visualization */}
        <div className="concept-diagram">
          <img 
            src="https://via.placeholder.com/800x400?text=Feature+Sliced+Design+Visualization" 
            alt="Feature Sliced Design Architecture Diagram" 
          />
        </div>
        
        {/* Use expandable code for example */}
        <ExpandableCode title="Complete Feature-Sliced Example">
          <LiveProvider code={featureSlicedCode} scope={scope} noInline={false}>
            <div className="live-editor-container">
              <LiveEditor className="live-editor" />
            </div>
            <LiveError className="live-error" />
          </LiveProvider>
        </ExpandableCode>

        <h4>Benefits:</h4>
        <ul>
          <li>Clear business domain boundaries</li>
          <li>Better team collaboration (teams can own features)</li>
          <li>Easier to understand the codebase by feature</li>
          <li>Improved scalability for large applications</li>
        </ul>
        
        <SectionNavigation
          prevSection="intro"
          prevTitle="Introduction"
          nextSection="ducks"
          nextTitle="Ducks Pattern"
        />
      </div>

      <div id="ducks" className="subsection">
        <span className="section-anchor"></span>
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
        <ExpandableCode title="Ducks Pattern Example">
          <LiveProvider code={ducksPatternCode} scope={scope} noInline={false}>
            <div className="live-editor-container">
              <LiveEditor className="live-editor" />
            </div>
            <LiveError className="live-error" />
          </LiveProvider>
        </ExpandableCode>

        {/* Add an interactive quiz after ducks section */}
        <QuizComponent
          question="Which of the following is NOT a rule of the Ducks pattern?"
          options={[
            "Must export a default function called reducer()",
            "Must export action creators as functions",
            "Must keep UI components in the same file",
            "Must have action types in the format app/feature/ACTION_TYPE"
          ]}
          correctAnswer={2}
          explanation="The Ducks pattern focuses on grouping Redux logic (reducers, actions, types) together, but UI components are typically kept separate."
        />

        <h4>Benefits:</h4>
        <ul>
          <li>Reduced boilerplate with cohesive modules</li>
          <li>Easier to understand the relationship between actions and their reducers</li>
          <li>Self-contained modules that can be reasoned about independently</li>
          <li>Improved maintainability for medium-sized applications</li>
        </ul>
        
        <SectionNavigation
          prevSection="feature-sliced"
          prevTitle="Feature-Sliced Design"
          nextSection="modules"
          nextTitle="Redux Modules"
        />
      </div>

      <div id="modules" className="subsection">
        <span className="section-anchor"></span>
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
        <ExpandableCode title="Redux Modules Example">
          <LiveProvider code={reduxModulesCode} scope={scope} noInline={false}>
            <div className="live-editor-container">
              <LiveEditor className="live-editor" />
            </div>
            <LiveError className="live-error" />
          </LiveProvider>
        </ExpandableCode>

        <h4>Benefits:</h4>
        <ul>
          <li>Strong encapsulation boundaries</li>
          <li>Freedom to change implementation details without breaking consumers</li>
          <li>Clear, controlled API surface for each module</li>
          <li>Better maintainability in complex applications with many contributors</li>
        </ul>
        
        <SectionNavigation
          prevSection="ducks"
          prevTitle="Ducks Pattern"
          nextSection="event-driven"
          nextTitle="Event-Driven Architecture"
        />
      </div>

      <div id="event-driven" className="subsection">
        <span className="section-anchor"></span>
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
        <ExpandableCode title="Event-Driven Architecture Example">
          <LiveProvider code={eventDrivenCode} scope={scope} noInline={false}>
            <div className="live-editor-container">
              <LiveEditor className="live-editor" />
            </div>
            <LiveError className="live-error" />
          </LiveProvider>
        </ExpandableCode>

        <h4>Commands vs Events</h4>
        <div className="code-comparison">
          <div>
            <h4>Command-Based Approach</h4>
            <pre>{`// Command: tells what to do
dispatch({
  type: 'ADD_USER_TO_STATE',
  payload: userData
});

// Single reducer handles it
case 'ADD_USER_TO_STATE':
  return {
    ...state,
    users: [...state.users, action.payload]
  };`}</pre>
          </div>
          <div>
            <h4>Event-Based Approach</h4>
            <pre>{`// Event: tells what happened
dispatch(userEvents.registered(userData));

// Multiple reducers can respond
// In profileReducer:
case USER_EVENTS.REGISTERED:
  return { ...state, profile: action.payload };
  
// In authReducer:
case USER_EVENTS.REGISTERED:
  return { ...state, isLoggedIn: true };
  
// In notificationsReducer:
case USER_EVENTS.REGISTERED:
  return { ...state, 
    messages: [...state.messages, 
      { text: 'Welcome!', type: 'success' }] 
  };`}</pre>
          </div>
        </div>

        <h4>Benefits:</h4>
        <ul>
          <li>Loose coupling between components</li>
          <li>Better adherence to single responsibility principle</li>
          <li>More extensible system - new features can listen to existing events</li>
          <li>Easier to implement cross-cutting concerns (logging, analytics)</li>
        </ul>
        
        <SectionNavigation
          prevSection="modules"
          prevTitle="Redux Modules"
          nextSection="choosing"
          nextTitle="Choosing the Right Pattern"
        />
      </div>

      <div id="choosing" className="subsection">
        <span className="section-anchor"></span>
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
        
        <SectionNavigation
          prevSection="event-driven"
          prevTitle="Event-Driven Architecture"
        />
      </div>

      {/* Add key takeaways section */}
      <div className="key-points">
        <h3>Key Takeaways</h3>
        <ul>
          <li><strong>Feature-Sliced Design</strong> works best for large applications with clear domain boundaries</li>
          <li><strong>Ducks Pattern</strong> simplifies Redux code organization for small to medium projects</li>
          <li><strong>Redux Modules</strong> provide strong encapsulation and are great for shared libraries</li>
          <li><strong>Event-Driven Architecture</strong> enables loose coupling and works well for complex business processes</li>
          <li>Consider combining patterns to address specific needs in your application</li>
        </ul>
      </div>
      
      <BackButton />
      <BackToTopButton />
      <NextButton to="/concepts/entity-relationships" label="Next: Entity Relationships" />
    </div>
  );
};
