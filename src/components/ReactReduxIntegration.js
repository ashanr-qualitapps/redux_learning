import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { HomeButton, BackButton } from './NavigationButtons';

// React Context vs Redux Component
export const ContextVsReduxComponent = () => {
  const scope = { React, useState, useCallback };
  
  const contextExample = `
// React Context API approach
import React, { createContext, useContext, useReducer } from 'react';

// 1. Create a context
const CounterContext = createContext();

// 2. Create a reducer (similar to Redux)
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// 3. Create a Context Provider
export const CounterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

// 4. Create a custom hook to use the context
export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
};

// Usage in a component
const CounterComponent = () => {
  const { state, dispatch } = useCounter();
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
};

// Wrap your app
const App = () => (
  <CounterProvider>
    <CounterComponent />
  </CounterProvider>
);

render(<App />);
`;

  const reduxExample = `
// Redux approach
import React from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// 1. Create a reducer
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// 2. Create a store
const store = createStore(counterReducer);

// 3. Component using Redux
const CounterComponent = () => {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
};

// 4. Wrap your app with Provider
const App = () => (
  <Provider store={store}>
    <CounterComponent />
  </Provider>
);

render(<App />);
`;

  return (
    <div className="section">
      <HomeButton />
      <h2>React Context vs Redux</h2>
      <p>
        Both React Context API and Redux can manage state in React applications, but they have 
        different use cases and trade-offs. Understanding when to use each one can help you 
        make better architecture decisions.
      </p>
      
      <div className="subsection">
        <h3>React Context API Approach</h3>
        <p>
          React's Context API provides a way to pass data through the component tree 
          without having to pass props down manually at every level.
        </p>
        
        <LiveProvider code={contextExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>
      
      <div className="subsection">
        <h3>Redux Approach</h3>
        <p>
          Redux provides a centralized store for state management with a strict unidirectional data flow.
        </p>
        
        <LiveProvider code={reduxExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>
      
      <div className="subsection">
        <h3>When to Choose Context API</h3>
        <ul>
          <li>For simpler applications with less complex state</li>
          <li>When you need to avoid prop drilling in component hierarchies</li>
          <li>For component-specific or UI state</li>
          <li>When you don't need advanced features like middleware, time-travel debugging</li>
          <li>For smaller teams or projects where the overhead of Redux might not be justified</li>
        </ul>
      </div>
      
      <div className="subsection">
        <h3>When to Choose Redux</h3>
        <ul>
          <li>For complex applications with significant state management needs</li>
          <li>When you need to handle complex side effects (with middleware like Redux Thunk/Saga)</li>
          <li>For managing global application state that many components need to access</li>
          <li>When you want powerful debugging capabilities (Redux DevTools)</li>
          <li>For applications that require predictable state management at scale</li>
          <li>When multiple teams are working on a single application</li>
        </ul>
      </div>
      
      <div className="subsection">
        <h3>Hybrid Approach</h3>
        <p>
          Many modern applications use a hybrid approach:
        </p>
        <ul>
          <li>Redux for global application state</li>
          <li>Context API for more localized state or UI concerns</li>
          <li>Component state (useState) for truly component-specific state</li>
        </ul>
      </div>
      <BackButton />
    </div>
  );
};

// React-Redux Performance Component
export const ReactReduxPerformanceComponent = () => {
  const scope = { React, useSelector, useDispatch, useState, useCallback, useMemo };
  
  const optimizationExample = `
// Performance optimizations with React and Redux
import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';

// BAD: This component will re-render on ANY state change
const InefficientComponent = () => {
  // This selector returns a new object every time, causing re-renders
  const userData = useSelector(state => ({
    name: state.user.name,
    email: state.user.email
  }));
  
  const dispatch = useDispatch();
  
  // This creates a new function on every render
  const handleUpdate = () => {
    dispatch({ type: 'UPDATE_USER' });
  };
  
  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

// GOOD: Optimized component with proper memoization
const EfficientComponent = () => {
  // 1. Use primitive values when possible
  const name = useSelector(state => state.user.name);
  const email = useSelector(state => state.user.email);
  
  // 2. Or use shallowEqual for object comparisons
  const userData = useSelector(state => ({
    name: state.user.name,
    email: state.user.email
  }), shallowEqual);
  
  // 3. Create memoized selectors for complex data
  const selectUserWithCounts = useMemo(() => {
    return createSelector(
      state => state.user,
      state => state.posts.length,
      (user, postCount) => ({
        ...user,
        postCount
      })
    );
  }, []);
  
  const userWithCounts = useSelector(selectUserWithCounts);
  
  const dispatch = useDispatch();
  
  // 4. Memoize callbacks
  const handleUpdate = useCallback(() => {
    dispatch({ type: 'UPDATE_USER' });
  }, [dispatch]);
  
  return (
    <div>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Post Count: {userWithCounts.postCount}</p>
      <button onClick={handleUpdate}>Update</button>
      
      {/* 5. Use React.memo for child components */}
      <MemoizedChildComponent data={userData} onAction={handleUpdate} />
    </div>
  );
};

// 6. Memoize child components
const ChildComponent = ({ data, onAction }) => (
  <div>
    <p>User: {data.name}</p>
    <button onClick={onAction}>Child Action</button>
  </div>
);

const MemoizedChildComponent = React.memo(ChildComponent);

// Demo component that lets you compare rendering
const Demo = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Update Counter (Causes Parent Re-render)
      </button>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <h3>Inefficient (check console)</h3>
          <InefficientComponent />
        </div>
        <div>
          <h3>Efficient (check console)</h3>
          <EfficientComponent />
        </div>
      </div>
    </div>
  );
};

render(<Demo />);
`;

  const selectorExample = `
// Advanced selector patterns
import { createSelector } from 'reselect';

// Basic selector
const getUsers = state => state.users;
const getPosts = state => state.posts;

// Memoized selector for expensive operations
const getUsersWithPosts = createSelector(
  [getUsers, getPosts],
  (users, posts) => {
    console.log('Computing users with posts');
    return users.map(user => ({
      ...user,
      posts: posts.filter(post => post.userId === user.id)
    }));
  }
);

// Parameterized selector factory
const makeGetUserById = () => {
  return createSelector(
    [getUsers, (_, userId) => userId],
    (users, userId) => users.find(user => user.id === userId)
  );
};

// Usage in component
const UserProfile = ({ userId }) => {
  // Create a memoized selector instance
  const getUserById = useMemo(
    () => makeGetUserById(), 
    []
  );
  
  // Use the selector with parameters
  const user = useSelector(
    state => getUserById(state, userId)
  );
  
  return user ? (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  ) : (
    <p>Loading user...</p>
  );
};

// example state
const exampleState = {
  users: [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Alice', email: 'alice@example.com' }
  ],
  posts: [
    { id: 101, userId: 1, title: 'John\'s first post' },
    { id: 102, userId: 1, title: 'John\'s second post' },
    { id: 103, userId: 2, title: 'Alice\'s post' }
  ]
};

// Show selector results
render(() => {
  const result = getUsersWithPosts(exampleState);
  return (
    <div>
      <h3>Users with their posts:</h3>
      {result.map(user => (
        <div key={user.id} style={{margin: '1rem 0', padding: '1rem', border: '1px solid #ddd'}}>
          <h4>{user.name}</h4>
          <p>{user.email}</p>
          <ul>
            {user.posts.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
});
`;

  return (
    <div className="section">
      <HomeButton />
      <h2>React-Redux Performance Optimization</h2>
      <p>
        Performance optimization is crucial for React-Redux applications, especially as they grow in complexity.
        This guide covers key strategies to prevent unnecessary re-renders and optimize your application.
      </p>
      
      <div className="subsection">
        <h3>Common Performance Issues</h3>
        <ul>
          <li><strong>Over-rendering:</strong> Components re-rendering when they don't need to</li>
          <li><strong>Expensive calculations:</strong> Performing the same calculations repeatedly</li>
          <li><strong>Object identity:</strong> Creating new object references that trigger re-renders</li>
          <li><strong>Unnecessary prop changes:</strong> Passing new function instances to child components</li>
        </ul>
      </div>
      
      <div className="subsection">
        <h3>Optimization Techniques</h3>
        <LiveProvider code={optimizationExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>
      
      <div className="subsection">
        <h3>Advanced Selector Patterns</h3>
        <p>
          Selectors are a powerful way to optimize Redux data access. Here are some advanced patterns:
        </p>
        <LiveProvider code={selectorExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>
      
      <div className="subsection">
        <h3>Best Practices Checklist</h3>
        <ul>
          <li>Use primitive values in selectors when possible</li>
          <li>Use <code>shallowEqual</code> as a second argument to <code>useSelector</code> when selecting objects</li>
          <li>Create memoized selectors with Reselect for expensive computations</li>
          <li>Memoize callback functions with <code>useCallback</code></li>
          <li>Memoize complex derived data with <code>useMemo</code></li>
          <li>Use <code>React.memo()</code> for components that receive props from Redux-connected parents</li>
          <li>Keep your Redux state normalized to avoid deep nesting</li>
          <li>Use the Redux DevTools profiler to identify unnecessary re-renders</li>
          <li>Consider using RTK Query for API data to avoid manual caching logic</li>
        </ul>
      </div>
      <BackButton />
    </div>
  );
};

// Custom Redux Hooks Component
export const CustomReduxHooksComponent = () => {
  const scope = { React, useState, useCallback, useSelector, useDispatch };
  
  const customHooksExample = `
// Custom Redux Hooks
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';

// 1. Basic CRUD operations for a resource
export function useUsers() {
  const users = useSelector(state => state.users.list);
  const loading = useSelector(state => state.users.loading);
  const error = useSelector(state => state.users.error);
  const dispatch = useDispatch();
  
  const fetchUsers = useCallback(() => {
    dispatch({ type: 'FETCH_USERS_REQUEST' });
  }, [dispatch]);
  
  const addUser = useCallback((user) => {
    dispatch({ type: 'ADD_USER', payload: user });
  }, [dispatch]);
  
  const updateUser = useCallback((id, data) => {
    dispatch({ type: 'UPDATE_USER', payload: { id, data } });
  }, [dispatch]);
  
  const deleteUser = useCallback((id) => {
    dispatch({ type: 'DELETE_USER', payload: id });
  }, [dispatch]);
  
  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
  };
}

// 2. Custom hook with filtering logic
export function useFilteredUsers(filterCriteria) {
  const users = useSelector(state => state.users.list);
  
  const filteredUsers = useMemo(() => {
    if (!filterCriteria) return users;
    
    return users.filter(user => {
      return Object.entries(filterCriteria).every(([key, value]) => {
        return user[key] === value;
      });
    });
  }, [users, filterCriteria]);
  
  return filteredUsers;
}

// 3. Custom hook for pagination
export function usePagination(items, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage);
  }, [items.length, itemsPerPage]);
  
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);
  
  const goToPage = useCallback((page) => {
    const pageNumber = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(pageNumber);
  }, [totalPages]);
  
  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [goToPage, currentPage]);
  
  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [goToPage, currentPage]);
  
  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage
  };
}

// 4. Custom hook for resource selection
export function useSelection() {
  const [selectedIds, setSelectedIds] = useState(new Set());
  
  const toggleSelection = useCallback((id) => {
    setSelectedIds(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  }, []);
  
  const selectAll = useCallback((ids) => {
    setSelectedIds(new Set(ids));
  }, []);
  
  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);
  
  const isSelected = useCallback((id) => {
    return selectedIds.has(id);
  }, [selectedIds]);
  
  return {
    selectedIds: Array.from(selectedIds),
    toggleSelection,
    selectAll,
    clearSelection,
    isSelected
  };
}

// Example Component using these hooks
const UserList = () => {
  // Use our custom hook
  const { users, loading, error, fetchUsers } = useUsers();
  
  // Filter active users only
  const activeUsers = useFilteredUsers({ status: 'active' });
  
  // Add pagination
  const { 
    paginatedItems: paginatedUsers, 
    nextPage, 
    prevPage, 
    currentPage, 
    totalPages 
  } = usePagination(activeUsers);
  
  // Add selection
  const { 
    selectedIds, 
    toggleSelection, 
    selectAll, 
    clearSelection, 
    isSelected 
  } = useSelection();
  
  // Mock users for our example
  const mockUsers = [
    { id: 1, name: 'John', status: 'active' },
    { id: 2, name: 'Alice', status: 'active' },
    { id: 3, name: 'Bob', status: 'inactive' },
    { id: 4, name: 'Carol', status: 'active' }
  ];
  
  // Render our component
  return (
    <div>
      <h3>Active Users (Page {currentPage}/{totalPages})</h3>
      
      <div>
        <button onClick={() => selectAll(activeUsers.map(u => u.id))}>
          Select All
        </button>
        <button onClick={clearSelection}>
          Clear Selection
        </button>
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {mockUsers.filter(u => u.status === 'active').map(user => (
            <li key={user.id}>
              <input
                type="checkbox"
                checked={isSelected(user.id)}
                onChange={() => toggleSelection(user.id)}
              />
              {user.name}
            </li>
          ))}
        </ul>
      )}
      
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
      
      {selectedIds.length > 0 && (
        <p>Selected: {selectedIds.join(', ')}</p>
      )}
    </div>
  );
};

render(<UserList />);
`;

  return (
    <div className="section">
      <HomeButton />
      <h2>Custom Redux Hooks</h2>
      <p>
        Custom Redux hooks can significantly improve code organization, reusability, and 
        developer experience by encapsulating common Redux patterns into simple, reusable hooks.
      </p>
      
      <div className="subsection">
        <h3>Benefits of Custom Redux Hooks</h3>
        <ul>
          <li><strong>Abstraction:</strong> Hide complex Redux interactions behind simple interfaces</li>
          <li><strong>Reusability:</strong> Share common state management patterns across components</li>
          <li><strong>Maintainability:</strong> Centralize Redux logic for easier updates</li>
          <li><strong>Testability:</strong> Test Redux interactions in isolation</li>
          <li><strong>Cleaner Components:</strong> Remove Redux boilerplate from UI components</li>
        </ul>
      </div>
      
      <div className="subsection">
        <h3>Implementing Custom Redux Hooks</h3>
        <p>Let's create several useful custom hooks that combine Redux with React's built-in hooks:</p>
        
        <LiveProvider code={customHooksExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>
      
      <div className="subsection">
        <h3>Best Practices for Custom Redux Hooks</h3>
        <ul>
          <li>Keep hooks focused on a single responsibility</li>
          <li>Use memoization to prevent unnecessary re-renders</li>
          <li>Return callbacks wrapped in useCallback</li>
          <li>Combine multiple useSelector calls for related data</li>
          <li>Use consistent naming conventions (e.g., useResource pattern)</li>
          <li>Document the return values and expected parameters</li>
          <li>Consider creating TypeScript interfaces for hook returns</li>
        </ul>
      </div>
      <BackButton />
    </div>
  );
};

// Redux Router Integration Component
export const ReduxRouterIntegrationComponent = () => {
  const scope = { React };
  
  const routerReduxExample = `
// Redux and React Router Integration
import React from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  useLocation
} from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// 1. Create reducers with routing awareness
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [
      { id: 1, title: 'Redux and Router', content: 'Integration details...' },
      { id: 2, title: 'Advanced Routing', content: 'More complex scenarios...' }
    ],
    selectedPostId: null,
    loading: false,
    error: null
  },
  reducers: {
    selectPost: (state, action) => {
      state.selectedPostId = action.payload;
    },
    // other reducers...
  }
});

// 2. Create store
const store = configureStore({
  reducer: {
    posts: postsSlice.reducer
  }
});

// 3. Extract action creators
const { selectPost } = postsSlice.actions;

// 4. Create a hook that combines routing and redux
const usePostNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const goToPost = React.useCallback((postId) => {
    // Update Redux state
    dispatch(selectPost(postId));
    
    // Update URL
    navigate(\`/posts/\${postId}\`);
  }, [dispatch, navigate]);
  
  return { goToPost };
};

// 5. Create components with routing and Redux
const PostsList = () => {
  const posts = useSelector(state => state.posts.items);
  const { goToPost } = usePostNavigation();
  
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <button onClick={() => goToPost(post.id)}>
              {post.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(state => 
    state.posts.items.find(p => p.id === parseInt(postId))
  );
  
  // Sync URL params with Redux state
  React.useEffect(() => {
    if (postId) {
      dispatch(selectPost(parseInt(postId)));
    }
  }, [postId, dispatch]);
  
  if (!post) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <Link to="/posts">Back to Posts</Link>
    </div>
  );
};

// 6. Create a synchronization component
const RouterSync = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Sync route changes to Redux
  React.useEffect(() => {
    // Example: track current route in Redux
    dispatch({ type: 'ROUTE_CHANGED', payload: location.pathname });
    
    // Example: handle specific routes 
    if (location.pathname === '/posts') {
      dispatch({ type: 'POSTS_ROUTE_ACCESSED' });
    }
  }, [location, dispatch]);
  
  return null; // This component doesn't render anything
};

// Main App
const App = () => (
  <Provider store={store}>
    <Router>
      <RouterSync />
      <nav>
        <Link to="/">Home</Link> | <Link to="/posts">Posts</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
      </Routes>
    </Router>
  </Provider>
);

render(<App />);
`;

  return (
    <div className="section">
      <HomeButton />
      <h2>Redux and React Router Integration</h2>
      <p>
        Integrating Redux with React Router allows you to create applications with both 
        state management and routing working together seamlessly. This combination is 
        powerful for building complex applications with deep linking and navigation state.
      </p>
      
      <div className="subsection">
        <h3>Key Concepts</h3>
        <ul>
          <li><strong>URL as a Source of Truth:</strong> The URL reflects a specific application state</li>
          <li><strong>State-Driven Navigation:</strong> Redux state can trigger navigation changes</li>
          <li><strong>Route Parameters:</strong> Extract and store route parameters in Redux</li>
          <li><strong>Deep Linking:</strong> Load the correct state when accessing a deep link</li>
          <li><strong>Navigation Guards:</strong> Control navigation based on Redux state</li>
        </ul>
      </div>
      
      <div className="subsection">
        <h3>Integration Patterns</h3>
        <LiveProvider code={routerReduxExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>
      
      <div className="subsection">
        <h3>Best Practices</h3>
        <ul>
          <li>Decide what belongs in the URL vs. Redux state</li>
          <li>Consider using Connected-React-Router library for direct synchronization</li>
          <li>Keep URL parameters for shareable, bookmarkable state</li>
          <li>Use Redux for complex state that doesn't need to be in the URL</li>
          <li>Create custom hooks that combine routing and Redux operations</li>
          <li>Always handle deep linking scenarios to ensure proper state initialization</li>
        </ul>
      </div>
      <BackButton />
    </div>
  );
};

// Redux with React Suspense Component
export const ReduxSuspenseComponent = () => {
  const scope = { React };
  
  const suspenseExample = `
// Redux with React Suspense
import React, { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Resource cache for data loading
const createResource = (asyncFn) => {
  let status = 'pending';
  let result;
  let promise = asyncFn()
    .then(data => {
      status = 'success';
      result = data;
    })
    .catch(error => {
      status = 'error';
      result = error;
    });
    
  return {
    read() {
      if (status === 'pending') {
        throw promise; // Suspense will catch this
      } else if (status === 'error') {
        throw result; // Error boundary will catch this
      } else {
        return result; // Successfully loaded data
      }
    }
  };
};

// Simulated API
const fetchUserApi = (userId) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: userId, name: \`User \${userId}\` });
    }, 1000);
  });
};

const fetchPostsApi = (userId) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, userId, title: 'Post 1' },
        { id: 2, userId, title: 'Post 2' }
      ]);
    }, 1500);
  });
};

// Resources for Suspense
let userResource = null;
let postsResource = null;

// Redux slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUserId: null,
    userCache: {},
    postsCache: {}
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUserId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userCache[action.payload.id] = action.payload;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postsCache[action.meta.arg] = action.payload;
      });
  }
});

// Thunks
const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId) => {
    return await fetchUserApi(userId);
  }
);

const fetchPosts = createAsyncThunk(
  'user/fetchPosts',
  async (userId) => {
    return await fetchPostsApi(userId);
  }
);

// Export actions
const { setCurrentUser } = userSlice.actions;

// Suspense-enabled components
const UserProfile = ({ userId }) => {
  // This will suspend until the data is available
  const userData = userResource.read();
  
  return (
    <div>
      <h2>{userData.name}'s Profile</h2>
      <p>User ID: {userData.id}</p>
    </div>
  );
};

const UserPosts = ({ userId }) => {
  // This will suspend until the data is available
  const posts = postsResource.read();
  
  return (
    <div>
      <h3>Posts</h3>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

// Container that prepares data resources
const UserPageContainer = () => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.user.currentUserId) || 1;
  const userCache = useSelector(state => state.user.userCache);
  const postsCache = useSelector(state => state.user.postsCache);
  
  // Create resources for Suspense if they don't exist
  React.useEffect(() => {
    // Initialize resources for current user
    userResource = createResource(() => {
      // If we have cached data, return it immediately
      if (userCache[currentUserId]) {
        return Promise.resolve(userCache[currentUserId]);
      }
      
      // Otherwise dispatch the action to fetch it
      return dispatch(fetchUser(currentUserId)).unwrap();
    });
    
    postsResource = createResource(() => {
      // If we have cached data, return it immediately
      if (postsCache[currentUserId]) {
        return Promise.resolve(postsCache[currentUserId]);
      }
      
      // Otherwise dispatch the action to fetch it
      return dispatch(fetchPosts(currentUserId)).unwrap();
    });
  }, [currentUserId, dispatch, userCache, postsCache]);
  
  const switchUser = () => {
    // Toggle between user 1 and 2
    dispatch(setCurrentUser(currentUserId === 1 ? 2 : 1));
  };
  
  return (
    <div>
      <button onClick={switchUser}>
        Switch to User {currentUserId === 1 ? '2' : '1'}
      </button>
      
      <Suspense fallback={<div>Loading user profile...</div>}>
        <UserProfile userId={currentUserId} />
        
        <Suspense fallback={<div>Loading posts...</div>}>
          <UserPosts userId={currentUserId} />
        </Suspense>
      </Suspense>
    </div>
  );
};

// Main demo - in real app this would use a real Redux store
// This is a simplified example showing the pattern
const mockStore = {
  getState: () => ({
    user: {
      currentUserId: 1,
      userCache: {},
      postsCache: {}
    }
  }),
  dispatch: (action) => {
    console.log('Dispatched:', action);
    if (typeof action === 'function') {
      return action(mockStore.dispatch, mockStore.getState);
    }
    return action;
  },
  subscribe: () => () => {}
};

// Simplified Provider for the example
const MockProvider = ({ children }) => {
  return React.createElement(
    React.createContext({}).Provider,
    { value: { store: mockStore } },
    children
  );
};

// Demo component
render(
  <MockProvider>
    <div>
      <h1>React Suspense with Redux</h1>
      <p>This example shows how to use React Suspense with Redux for data fetching.</p>
      <UserPageContainer />
    </div>
  </MockProvider>
);
`;

  return (
    <div className="section">
      <HomeButton />
      <h2>Redux with React Suspense</h2>
      <p>
        React Suspense is a feature that lets components "wait" for something before rendering.
        Integrating Redux with Suspense can improve the user experience by making loading states 
        more declarative and coordinating complex loading sequences.
      </p>
      
      <div className="subsection">
        <h3>Understanding React Suspense</h3>
        <ul>
          <li><strong>Suspense:</strong> A React feature that lets components "suspend" rendering while waiting for data</li>
          <li><strong>Fallback:</strong> UI to show while components are suspended</li>
          <li><strong>"Throw Promise" Pattern:</strong> Components throw promises to signal they're waiting for data</li>
          <li><strong>Future of Data Fetching:</strong> Suspense represents React's vision for declarative data loading</li>
        </ul>
      </div>
      
      <div className="subsection">
        <h3>Redux with Suspense Implementation</h3>
        <p>Here's an example showing how to integrate Redux with React Suspense:</p>
        
        <LiveProvider code={suspenseExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>
      
      <div className="subsection">
        <h3>Integration Patterns</h3>
        <ol>
          <li><strong>Resource Pattern:</strong> Create a resource object that can throw promises</li>
          <li><strong>Redux Integration:</strong> Create resources based on Redux state</li>
          <li><strong>Cache Coordination:</strong> Use Redux to store cached data</li>
          <li><strong>Concurrent Mode:</strong> Enable concurrent rendering with useTransition</li>
        </ol>
        <p>
          Note: React's Suspense for data fetching is still evolving. The patterns shown here might 
          change as React and Redux continue to evolve. Always check the latest documentation.
        </p>
      </div>
      
      <div className="subsection">
        <h3>Considerations and Trade-offs</h3>
        <ul>
          <li>Suspense doesn't replace Redux - they solve different problems</li>
          <li>Suspense focuses on the rendering phase, while Redux manages application state</li>
          <li>Consider using RTK Query or SWR with Suspense support</li>
          <li>Error boundaries are important when using Suspense for data fetching</li>
        </ul>
      </div>
      <BackButton />
    </div>
  );
};
