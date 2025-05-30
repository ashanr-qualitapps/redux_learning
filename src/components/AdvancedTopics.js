import React from 'react';
import { useNavigate } from 'react-router-dom';

// Back button component
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

// 1. Advanced: Caching with re-reselect
export const ReReselectComponent = () => {
  return (
    <div className="section">
      <BackButton />
      <h2>Advanced: Caching with re-reselect</h2>
      <p>
        While reselect provides memoization, it only caches the most recent arguments and result.
        re-reselect extends this by providing structured caching for different parameters.
      </p>

      <div className="example-box">
        <h3>Problem with Regular Reselect</h3>
        <pre>{`// Regular reselect doesn't handle parameterized selectors well
const getUserById = createSelector(
  state => state.users,
  (state, userId) => userId,
  (users, userId) => users[userId]
);

// This will only cache the LAST called user
const user1 = useSelector(state => getUserById(state, 'user1'));
const user2 = useSelector(state => getUserById(state, 'user2'));
// The cache for user1 is lost when we call with user2!`}</pre>
      </div>

      <div className="example-box">
        <h3>Solution with re-reselect</h3>
        <pre>{`import { createCachedSelector } from 're-reselect';

// Create a cache key from the userId parameter
const getUserById = createCachedSelector(
  state => state.users,
  (state, userId) => userId,
  (users, userId) => users[userId]
)(
  // Cache key resolver - creates separate cache entries by userId
  (state, userId) => userId
);

// Now both calls are cached separately
const user1 = useSelector(state => getUserById(state, 'user1'));
const user2 = useSelector(state => getUserById(state, 'user2'));`}</pre>
      </div>

      <h3>When to Use re-reselect</h3>
      <ul>
        <li>When you need to maintain separate caches for different parameter values</li>
        <li>When your selectors are called with varying arguments</li>
        <li>List rendering where you create selectors for individual items</li>
        <li>Filtering or searching with different criteria</li>
      </ul>

      <h3>Performance Considerations</h3>
      <p>
        While powerful, remember that re-reselect caches consume memory. Consider:
      </p>
      <ul>
        <li>Adding a maximum cache size to avoid memory leaks</li>
        <li>Using cache eviction strategies for rarely accessed items</li>
        <li>Only using cached selectors when there's a clear performance benefit</li>
      </ul>
    </div>
  );
};

// 2. Code Splitting and Dynamic Reducers
export const DynamicReducersComponent = () => {
  return (
    <div className="section">
      <BackButton />
      <h2>Code Splitting and Dynamic Reducers</h2>
      <p>
        Code splitting allows you to load parts of your application on demand, reducing initial load time.
        Dynamic reducers let you load Redux reducers only when needed.
      </p>

      <div className="example-box">
        <h3>Store Configuration with Injectable Reducers</h3>
        <pre>{`// configureStore.js
import { createStore, combineReducers } from 'redux';

export default function configureStore(initialState = {}) {
  // Define an object for all your reducers
  const reducers = {
    // Static reducers that are always loaded
    app: appReducer,
    users: usersReducer
  };

  // Create a function to inject reducers later
  const store = createStore(
    createReducer(reducers),
    initialState
  );
  
  // Reducer registry to keep track of all reducers
  store.asyncReducers = {};
  
  // Inject reducer function
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(
      createReducer({
        ...reducers,
        ...store.asyncReducers
      })
    );
    return store;
  };

  return store;
}

function createReducer(reducers) {
  return combineReducers(reducers);
}`}</pre>
      </div>

      <div className="example-box">
        <h3>Lazy Loading Components with Reducers</h3>
        <pre>{`// LazyPostsContainer.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Define an HOC that injects the reducer
const withReducer = (key, reducer) => WrappedComponent => {
  const ReducerInjector = props => {
    const { injectReducer } = props;
    
    // Inject on mount
    useEffect(() => {
      injectReducer(key, reducer);
    }, []);
    
    return <WrappedComponent {...props} />;
  };
  
  const mapDispatchToProps = dispatch => ({
    injectReducer: (key, asyncReducer) => 
      store.injectReducer(key, asyncReducer)
  });
  
  return connect(null, mapDispatchToProps)(ReducerInjector);
};

// Using it in a route
const PostsPage = () => {
  const PostsContainer = lazy(() => import('./PostsContainer'));
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostsContainer />
    </Suspense>
  );
};

// In your component file
import postsReducer from './postsReducer';

const Posts = ({ posts, fetchPosts }) => {
  // Component implementation
};

// Wrap with reducer before exporting
export default withReducer('posts', postsReducer)(Posts);`}</pre>
      </div>

      <h3>Benefits of Dynamic Reducers</h3>
      <ul>
        <li>Smaller initial bundle size - only load what's needed</li>
        <li>Feature-based code organization</li>
        <li>Better performance for large applications</li>
        <li>Enables true code splitting for Redux logic</li>
      </ul>
    </div>
  );
};

// 3. Redux Toolkit
export const ReduxToolkitComponent = () => {
  return (
    <div className="section">
      <BackButton />
      <h2>Redux Toolkit</h2>
      <p>
        Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development.
        It addresses the three most common concerns about Redux: complex configuration, too much boilerplate, and immutability.
      </p>

      <div className="example-box">
        <h3>Store Configuration</h3>
        <pre>{`// store.js
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import usersReducer from './usersSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
  // Redux Toolkit includes redux-thunk by default
  // You can add more middleware:
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;`}</pre>
      </div>

      <div className="example-box">
        <h3>Creating a Slice</h3>
        <pre>{`// postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create a thunk for async fetching
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  // Regular reducers
  reducers: {
    addPost: (state, action) => {
      // With Immer, we can "mutate" state directly
      state.items.push(action.payload);
    },
    removePost: (state, action) => {
      state.items = state.items.filter(post => post.id !== action.payload);
    },
    updatePost: (state, action) => {
      const index = state.items.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    }
  },
  // Handle async thunk actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

// Export actions and reducer
export const { addPost, removePost, updatePost } = postsSlice.actions;
export default postsSlice.reducer;`}</pre>
      </div>

      <div className="example-box">
        <h3>Using in Components</h3>
        <pre>{`import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, addPost, removePost } from './postsSlice';

export const PostsList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.posts);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);
  
  // Simple component to add a post
  const handleAddPost = () => {
    dispatch(addPost({
      id: Date.now(),
      title: 'New Post',
      body: 'This is a new post'
    }));
  };
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      <button onClick={handleAddPost}>Add Post</button>
      <ul>
        {items.map(post => (
          <li key={post.id}>
            {post.title}
            <button onClick={() => dispatch(removePost(post.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};`}</pre>
      </div>

      <h3>Key Benefits of Redux Toolkit</h3>
      <ul>
        <li>Drastically reduced boilerplate code</li>
        <li>Built-in immutability through Immer</li>
        <li>Simplified async logic with createAsyncThunk</li>
        <li>Automatic creation of action creators</li>
        <li>Sensible defaults for store setup</li>
        <li>Integrated Redux DevTools</li>
        <li>One package instead of multiple dependencies</li>
      </ul>
    </div>
  );
};

// 4. Immutable Update Patterns
export const ImmutablePatternsComponent = () => {
  return (
    <div className="section">
      <BackButton />
      <h2>Immutable Update Patterns</h2>
      <p>
        Immutability is crucial in Redux for performance and predictability. 
        Here are various patterns to handle immutable updates in Redux.
      </p>

      <div className="example-box">
        <h3>Manual Object Updates</h3>
        <pre>{`// Updating object properties
case UPDATE_USER:
  return {
    ...state,
    user: {
      ...state.user,
      name: action.payload.name,
      email: action.payload.email
    }
  };

// Nested objects - gets verbose quickly
case UPDATE_USER_ADDRESS:
  return {
    ...state,
    user: {
      ...state.user,
      address: {
        ...state.user.address,
        street: action.payload.street,
        city: action.payload.city
      }
    }
  };`}</pre>
      </div>

      <div className="example-box">
        <h3>Array Operations</h3>
        <pre>{`// Adding an item to an array
case ADD_ITEM:
  return {
    ...state,
    items: [...state.items, action.payload]
  };

// Removing an item by index
case REMOVE_ITEM:
  return {
    ...state,
    items: [
      ...state.items.slice(0, action.payload.index),
      ...state.items.slice(action.payload.index + 1)
    ]
  };

// Removing an item by id
case REMOVE_ITEM_BY_ID:
  return {
    ...state,
    items: state.items.filter(item => item.id !== action.payload.id)
  };

// Updating an item in an array
case UPDATE_ITEM:
  return {
    ...state,
    items: state.items.map(item => 
      item.id === action.payload.id
        ? { ...item, ...action.payload.data }
        : item
    )
  };`}</pre>
      </div>

      <div className="example-box">
        <h3>Using Immer (as in Redux Toolkit)</h3>
        <pre>{`import produce from 'immer';

// Without Immer - complex nested update
const complexReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DEEPLY_NESTED:
      return {
        ...state,
        first: {
          ...state.first,
          second: {
            ...state.first.second,
            third: {
              ...state.first.second.third,
              value: action.payload
            }
          }
        }
      };
    default:
      return state;
  }
};

// With Immer - much cleaner
const complexReducerWithImmer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DEEPLY_NESTED:
      return produce(state, draft => {
        draft.first.second.third.value = action.payload;
      });
    default:
      return state;
  }
};`}</pre>
      </div>

      <h3>Helper Libraries for Immutable Updates</h3>
      <ul>
        <li><strong>Immer</strong>: Allows for "mutative" code that produces immutable results</li>
        <li><strong>Immutable.js</strong>: Provides immutable data structures</li>
        <li><strong>Ramda</strong>: Functional utilities for immutable transformations</li>
        <li><strong>lodash/fp</strong>: Functional programming version of lodash</li>
      </ul>
      
      <h3>Tips for Immutable Updates</h3>
      <ul>
        <li>For simple cases, use object spread and array methods</li>
        <li>For complex nested structures, consider a library like Immer</li>
        <li>Structure your state to minimize nesting</li>
        <li>Consider normalized state shapes</li>
      </ul>
    </div>
  );
};

// 5. Testing Redux Logic
export const TestingReduxComponent = () => {
  return (
    <div className="section">
      <BackButton />
      <h2>Testing Redux Logic</h2>
      <p>
        Testing is essential for maintainable Redux applications. Here's how to test
        the different parts of your Redux logic.
      </p>

      <div className="example-box">
        <h3>Testing Reducers</h3>
        <pre>{`// postsReducer.test.js
import reducer from './postsReducer';
import * as actions from './actions';

describe('Posts Reducer', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_POST', () => {
    const post = { id: 1, title: 'Test Post' };
    const newState = reducer(initialState, actions.addPost(post));
    
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toEqual(post);
  });

  it('should handle REMOVE_POST', () => {
    const startingState = {
      ...initialState,
      items: [{ id: 1, title: 'Test Post' }]
    };
    
    const newState = reducer(startingState, actions.removePost(1));
    expect(newState.items).toHaveLength(0);
  });
});`}</pre>
      </div>

      <div className="example-box">
        <h3>Testing Action Creators</h3>
        <pre>{`// actions.test.js
import * as actions from './actions';
import * as types from './actionTypes';

describe('Action Creators', () => {
  it('should create an action to add a post', () => {
    const post = { title: 'Test Post' };
    const expectedAction = {
      type: types.ADD_POST,
      payload: post
    };
    expect(actions.addPost(post)).toEqual(expectedAction);
  });
});`}</pre>
      </div>

      <div className="example-box">
        <h3>Testing Thunks</h3>
        <pre>{`// thunks.test.js
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'jest-fetch-mock';
import { fetchPosts } from './actions';
import * as types from './actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Async Actions', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('creates FETCH_POSTS_SUCCESS when fetching posts is done', async () => {
    const posts = [{ id: 1, title: 'Test Post' }];
    fetchMock.mockResponseOnce(JSON.stringify(posts));

    const expectedActions = [
      { type: types.FETCH_POSTS_REQUEST },
      { type: types.FETCH_POSTS_SUCCESS, payload: posts }
    ];

    const store = mockStore({ posts: [] });
    await store.dispatch(fetchPosts());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_POSTS_FAILURE when fetching posts fails', async () => {
    const errorMsg = 'Network Error';
    fetchMock.mockRejectOnce(new Error(errorMsg));

    const expectedActions = [
      { type: types.FETCH_POSTS_REQUEST },
      { type: types.FETCH_POSTS_FAILURE, payload: errorMsg }
    ];

    const store = mockStore({ posts: [] });
    await store.dispatch(fetchPosts());
    expect(store.getActions()).toEqual(expectedActions);
  });
});`}</pre>
      </div>

      <div className="example-box">
        <h3>Testing Selectors</h3>
        <pre>{`// selectors.test.js
import { getVisiblePosts } from './selectors';

describe('Posts Selectors', () => {
  const state = {
    posts: {
      items: [
        { id: 1, title: 'First Post', published: true },
        { id: 2, title: 'Second Post', published: false },
        { id: 3, title: 'Third Post', published: true }
      ]
    }
  };

  it('should return only published posts', () => {
    const publishedPosts = getVisiblePosts(state, 'published');
    expect(publishedPosts).toHaveLength(2);
    expect(publishedPosts.map(post => post.id)).toEqual([1, 3]);
  });

  it('should return only drafts', () => {
    const drafts = getVisiblePosts(state, 'drafts');
    expect(drafts).toHaveLength(1);
    expect(drafts[0].id).toBe(2);
  });
});`}</pre>
      </div>

      <div className="example-box">
        <h3>Testing Connected Components</h3>
        <pre>{`// PostsList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PostsList from './PostsList';
import { removePost } from './actions';

const mockStore = configureStore([]);

describe('PostsList Component', () => {
  let store;
  const initialState = {
    posts: {
      items: [
        { id: 1, title: 'Test Post 1' },
        { id: 2, title: 'Test Post 2' }
      ],
      loading: false,
      error: null
    }
  };

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it('renders posts from store', () => {
    render(
      <Provider store={store}>
        <PostsList />
      </Provider>
    );
    
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
  });

  it('dispatches removePost action when delete button clicked', () => {
    render(
      <Provider store={store}>
        <PostsList />
      </Provider>
    );
    
    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(store.dispatch).toHaveBeenCalledWith(removePost(1));
  });
});`}</pre>
      </div>

      <div className="example-box">
        <h3>Testing Best Practices</h3>
        <ul>
          <li>Test each Redux part in isolation: reducers, actions, selectors</li>
          <li>Use snapshot testing for reducers with complex state</li>
          <li>Mock API calls in thunk tests</li>
          <li>For component integration tests, use a real or mock store</li>
          <li>Test edge cases and error conditions</li>
        </ul>
      </div>
    </div>
  );
};

// 6. Integration with TypeScript
export const TypeScriptIntegrationComponent = () => {
  return (
    <div className="section">
      <BackButton />
      <h2>Integration with TypeScript</h2>
      <p>
        TypeScript brings static typing to Redux, improving code reliability
        and developer experience through better autocompletion and error checking.
      </p>

      <div className="example-box">
        <h3>Type Definitions for State</h3>
        <pre>{`// types.ts
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AppState {
  posts: PostsState;
  users: UsersState;
}

export interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
}

export interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}`}</pre>
      </div>

      <div className="example-box">
        <h3>Typed Actions</h3>
        <pre>{`// postsActions.ts
import { Post, AppThunk } from './types';

// Define action types as string literals
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

// Define interfaces for each action
interface AddPostAction {
  type: typeof ADD_POST;
  payload: Post;
}

interface RemovePostAction {
  type: typeof REMOVE_POST;
  payload: number;
}

interface FetchPostsRequestAction {
  type: typeof FETCH_POSTS_REQUEST;
}

interface FetchPostsSuccessAction {
  type: typeof FETCH_POSTS_SUCCESS;
  payload: Post[];
}

interface FetchPostsFailureAction {
  type: typeof FETCH_POSTS_FAILURE;
  payload: string;
}

// Union of all actions for this reducer
export type PostActionTypes = 
  | AddPostAction 
  | RemovePostAction
  | FetchPostsRequestAction
  | FetchPostsSuccessAction
  | FetchPostsFailureAction;

// Action creators
export const addPost = (post: Post): AddPostAction => ({
  type: ADD_POST,
  payload: post
});

export const removePost = (id: number): RemovePostAction => ({
  type: REMOVE_POST,
  payload: id
});

// Async action with thunk
export const fetchPosts = (): AppThunk => async dispatch => {
  try {
    dispatch({ type: FETCH_POSTS_REQUEST });
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    dispatch({
      type: FETCH_POSTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_POSTS_FAILURE,
      payload: error.message
    });
  }
};`}</pre>
      </div>

      <div className="example-box">
        <h3>Typed Reducer</h3>
        <pre>{`// postsReducer.ts
import { PostsState, PostActionTypes, ADD_POST, REMOVE_POST, 
  FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from './types';

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null
};

const postsReducer = (
  state = initialState,
  action: PostActionTypes
): PostsState => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case REMOVE_POST:
      return {
        ...state,
        items: state.items.filter(post => post.id !== action.payload)
      };
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      // This ensures we handle all possible action types
      return state;
  }
};

export default postsReducer;`}</pre>
      </div>

      <div className="example-box">
        <h3>Typed Store</h3>
        <pre>{`// store.ts
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { AppState, AppAction } from './types';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer
});

// Using ThunkMiddleware<AppState, AppAction> ensures correct types
export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppAction>)
  )
);

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`}</pre>
      </div>

      <div className="example-box">
        <h3>Typed Redux Hooks</h3>
        <pre>{`// hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;`}</pre>
      </div>

      <div className="example-box">
        <h3>Using in a Component</h3>
        <pre>{`// PostsList.tsx
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchPosts, removePost } from '../actions/postsActions';
import { Post } from '../types';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(state => state.posts);
  
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  
  const handleRemove = (id: number) => {
    dispatch(removePost(id));
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {items.map((post: Post) => (
          <li key={post.id}>
            {post.title}
            <button onClick={() => handleRemove(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};`}</pre>
      </div>

      <h3>Benefits of TypeScript with Redux</h3>
      <ul>
        <li>Catch errors at compile-time instead of runtime</li>
        <li>Better developer experience with autocomplete</li>
        <li>Improved code navigation and refactoring</li>
        <li>Self-documenting code</li>
        <li>Type safety across your entire Redux flow</li>
      </ul>
    </div>
  );
};

// 7. Server-Side Rendering (SSR) with Redux
export const SSRReduxComponent = () => {
  return (
    <div className="section">
      <BackButton />
      <h2>Server-Side Rendering (SSR) with Redux</h2>
      <p>
        Server-Side Rendering (SSR) allows you to render React components on the server 
        and send HTML to the client. When combined with Redux, it enables data prefetching 
        and state hydration for a more performant user experience.
      </p>

      <div className="example-box">
        <h3>Basic SSR Setup with Redux</h3>
        <pre>{`// server.js (Node.js with Express)
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import App from './App';

const app = express();

app.get('*', (req, res) => {
  // 1. Create a new store instance for each request
  const store = configureStore({
    reducer: rootReducer
  });

  // 2. Prepare the context for StaticRouter
  const context = {};

  // 3. Render the app to string
  const appHTML = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  // 4. Get the Redux state to pass to client
  const preloadedState = store.getState();

  // 5. Construct the full HTML response
  const html = \`
    <!doctype html>
    <html>
      <head>
        <title>Redux SSR Example</title>
      </head>
      <body>
        <div id="root">\${appHTML}</div>
        <script>
          // WARNING: See https://redux.js.org/usage/server-rendering#security-considerations
          window.__PRELOADED_STATE__ = \${JSON.stringify(preloadedState).replace(
            /</g,
            '\\\\u003c'
          )}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  \`;

  // 6. Send the response
  res.send(html);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});`}</pre>
      </div>

      <div className="example-box">
        <h3>Client-Side Hydration</h3>
        <pre>{`// client.js
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import App from './App';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Create Redux store with initial state from the server
const store = configureStore({
  reducer: rootReducer,
  preloadedState
});

// Delete the global variable to avoid unwanted access
delete window.__PRELOADED_STATE__;

// Hydrate the app
hydrateRoot(
  document.getElementById('root'),
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);`}</pre>
      </div>

      <div className="example-box">
        <h3>Data Prefetching</h3>
        <pre>{`// Component with data requirements
import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from './actions';

class PostsList extends React.Component {
  componentDidMount() {
    if (this.props.posts.length === 0) {
      this.props.fetchPosts();
    }
  }

  render() {
    const { posts, loading } = this.props;
    if (loading) return <div>Loading...</div>;

    return (
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    );
  }
}

// Static method for server-side data loading
PostsList.fetchData = (store) => store.dispatch(fetchPosts());

export default connect(
  state => ({
    posts: state.posts.items,
    loading: state.posts.loading
  }),
  { fetchPosts }
)(PostsList);`}</pre>
      </div>

      <div className="example-box">
        <h3>Handling Data Loading on Server</h3>
        <pre>{`// Enhanced server.js with data loading
import { matchRoutes } from 'react-router-config';
import routes from './routes';

app.get('*', async (req, res) => {
  const store = configureStore({
    reducer: rootReducer
  });

  // Find the matching routes that need to load data
  const branch = matchRoutes(routes, req.path);
  
  // Execute fetchData for each matching route
  const promises = branch.map(({ route, match }) => {
    const component = route.component;
    return component.fetchData
      ? component.fetchData(store, match.params)
      : Promise.resolve(null);
  });

  try {
    // Wait for all data fetching to complete
    await Promise.all(promises);
    
    // Now render with populated data
    const appHTML = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    // Rest of the code to send the response...
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});`}</pre>
      </div>

      <h3>Benefits of SSR with Redux</h3>
      <ul>
        <li>Better SEO as search engines see fully rendered content</li>
        <li>Faster initial page loads and Time to First Contentful Paint</li>
        <li>Better performance on low-powered devices</li>
        <li>Consistent experience across devices</li>
      </ul>

      <h3>Challenges and Considerations</h3>
      <ul>
        <li>More complex build setup and deployment</li>
        <li>Security concerns with serializing state</li>
        <li>Server load and performance</li>
        <li>Handling authentication and cookies</li>
        <li>Code splitting becomes more complicated</li>
      </ul>
    </div>
  );
};

// 8. Entity Relationships
export const EntityRelationshipsComponent = () => {
  return (
    <div className="section">
      <BackButton />
      <h2><span className="topic-date">2025-05-30</span> Managing Entity Relationships in Redux</h2>
      <p>
        One of the challenges in Redux applications is properly managing relationships between
        different entities in a normalized state structure. This is especially important for 
        complex data with many interconnections.
      </p>

      <div className="example-box">
        <h3>Normalized State with Relationships</h3>
        <pre>{`// Example of normalized state with relationships
const state = {
  entities: {
    users: {
      byId: {
        '1': { id: '1', name: 'Alice', favoritePostIds: ['101', '104'] },
        '2': { id: '2', name: 'Bob', favoritePostIds: ['102'] },
        '3': { id: '3', name: 'Charlie', favoritePostIds: [] }
      },
      allIds: ['1', '2', '3']
    },
    posts: {
      byId: {
        '101': { id: '101', title: 'Redux Basics', authorId: '1', tagIds: ['t1', 't2'] },
        '102': { id: '102', title: 'Normalization', authorId: '2', tagIds: ['t2', 't3'] },
        '103': { id: '103', title: 'Async Redux', authorId: '1', tagIds: ['t1', 't4'] },
        '104': { id: '104', title: 'Redux Toolkit', authorId: '3', tagIds: ['t1'] }
      },
      allIds: ['101', '102', '103', '104']
    },
    tags: {
      byId: {
        't1': { id: 't1', name: 'redux' },
        't2': { id: 't2', name: 'normalization' },
        't3': { id: 't3', name: 'data' },
        't4': { id: 't4', name: 'async' }
      },
      allIds: ['t1', 't2', 't3', 't4']
    },
    comments: {
      byId: {
        'c1': { id: 'c1', text: 'Great article!', postId: '101', authorId: '2' },
        'c2': { id: 'c2', text: 'Thanks for sharing', postId: '101', authorId: '3' },
        'c3': { id: 'c3', text: 'Very helpful', postId: '102', authorId: '1' }
      },
      allIds: ['c1', 'c2', 'c3']
    }
  }
}`}</pre>
      </div>

      <h3>Types of Relationships</h3>
      <ul>
        <li><strong>One-to-Many</strong>: One entity relates to many entities (e.g., user → posts)</li>
        <li><strong>Many-to-Many</strong>: Many entities relate to many entities (e.g., posts ↔ tags)</li>
        <li><strong>One-to-One</strong>: One entity relates to exactly one other entity (e.g., user → profile)</li>
      </ul>

      <div className="example-box">
        <h3>Selectors for Related Data</h3>
        <pre>{`// Selectors to retrieve related entities
import { createSelector } from 'reselect';

// Simple selectors for each entity type
const selectUserEntities = state => state.entities.users.byId;
const selectPostEntities = state => state.entities.posts.byId;
const selectTagEntities = state => state.entities.tags.byId;
const selectCommentEntities = state => state.entities.comments.byId;

// Get a post with its author and tags
export const selectPostWithRelations = createSelector(
  [
    selectPostEntities,
    selectUserEntities,
    selectTagEntities,
    (_, postId) => postId
  ],
  (posts, users, tags, postId) => {
    const post = posts[postId];
    if (!post) return null;
    
    return {
      ...post,
      author: users[post.authorId],
      tags: post.tagIds.map(tagId => tags[tagId])
    };
  }
);

// Get all posts for a user
export const selectPostsByUser = createSelector(
  [
    selectPostEntities,
    state => state.entities.posts.allIds,
    (_, userId) => userId
  ],
  (posts, allPostIds, userId) => {
    return allPostIds
      .map(id => posts[id])
      .filter(post => post.authorId === userId);
  }
);

// Get all comments for a post with their authors
export const selectCommentsForPost = createSelector(
  [
    selectCommentEntities,
    selectUserEntities,
    state => state.entities.comments.allIds,
    (_, postId) => postId
  ],
  (comments, users, allCommentIds, postId) => {
    return allCommentIds
      .map(id => comments[id])
      .filter(comment => comment.postId === postId)
      .map(comment => ({
        ...comment,
        author: users[comment.authorId]
      }));
  }
);`}</pre>
      </div>

      <div className="example-box">
        <h3>Updating Related Entities</h3>
        <pre>{`// Updating relationships in reducers
// Adding a tag to a post
case ADD_TAG_TO_POST: {
  const { postId, tagId } = action.payload;
  return {
    ...state,
    posts: {
      ...state.posts,
      byId: {
        ...state.posts.byId,
        [postId]: {
          ...state.posts.byId[postId],
          tagIds: [...state.posts.byId[postId].tagIds, tagId]
        }
      }
    }
  };
}

// Adding a favorite post for a user
case ADD_FAVORITE_POST: {
  const { userId, postId } = action.payload;
  return {
    ...state,
    users: {
      ...state.users,
      byId: {
        ...state.users.byId,
        [userId]: {
          ...state.users.byId[userId],
          favoritePostIds: [
            ...state.users.byId[userId].favoritePostIds,
            postId
          ]
        }
      }
    }
  };
}

// With Immer (Redux Toolkit approach)
case ADD_FAVORITE_POST:
  return produce(state, draft => {
    const { userId, postId } = action.payload;
    draft.entities.users.byId[userId].favoritePostIds.push(postId);
  });`}</pre>
      </div>

      <h3>Best Practices for Entity Relationships</h3>
      <ul>
        <li>Use IDs to reference related entities instead of nesting</li>
        <li>Keep entity types in separate "tables" in your state</li>
        <li>Use selectors to reconstruct relationships when needed</li>
        <li>Consider denormalization at the selector level for UI components</li>
        <li>Use a consistent naming convention for ID arrays (e.g., authorId, tagIds)</li>
        <li>Handle relationship updates carefully to maintain integrity</li>
        <li>Consider using Redux Toolkit's entity adapters for managing collections</li>
      </ul>

      <div className="example-box">
        <h3>Data Integrity</h3>
        <pre>{`// Handling cascading deletions when removing an entity
// Example: Removing a post and its associated comments
function removePostWithComments(postId) {
  return (dispatch, getState) => {
    // First, find all comments for this post
    const state = getState();
    const commentsToRemove = Object.values(state.entities.comments.byId)
      .filter(comment => comment.postId === postId)
      .map(comment => comment.id);
    
    // Remove all associated comments first
    dispatch(removeComments(commentsToRemove));
    
    // Then remove the post itself
    dispatch(removePost(postId));
  };
}`}</pre>
      </div>
    </div>
  );
};

// 9. Redux with WebSockets
export const WebSocketsComponent = () => {
  return (
    <div className="section">
      <BackButton />
      <h2><span className="topic-date">2025-05-30</span> Redux with WebSockets</h2>
      <p>
        WebSockets provide a persistent connection between client and server, enabling
        real-time data exchange. Integrating WebSockets with Redux allows your application
        to handle real-time updates while maintaining a predictable state flow.
      </p>

      <div className="example-box">
        <h3>WebSocket Middleware</h3>
        <pre>{`// websocketMiddleware.js
// Simple WebSocket middleware for Redux

const websocketMiddleware = () => {
  let socket = null;

  return store => next => action => {
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close();
        }

        // Connect to the WebSocket server
        socket = new WebSocket(action.payload.url);

        // Handle WebSocket events
        socket.onopen = () => store.dispatch({ 
          type: 'WS_CONNECTED' 
        });

        socket.onclose = (event) => store.dispatch({ 
          type: 'WS_DISCONNECTED', 
          payload: event 
        });

        socket.onmessage = (event) => {
          // Parse the message and dispatch corresponding actions
          const message = JSON.parse(event.data);
          
          switch (message.type) {
            case 'NEW_MESSAGE':
              store.dispatch({
                type: 'RECEIVE_MESSAGE',
                payload: message.data
              });
              break;
            
            case 'USER_STATUS_CHANGE':
              store.dispatch({
                type: 'UPDATE_USER_STATUS',
                payload: message.data
              });
              break;
              
            default:
              // You could also dispatch a generic action
              store.dispatch({
                type: 'WS_MESSAGE',
                payload: message
              });
          }
        };

        socket.onerror = (error) => store.dispatch({ 
          type: 'WS_ERROR', 
          payload: error 
        });

        break;

      case 'WS_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;

      case 'WS_SEND':
        // Send a message through the WebSocket
        if (socket !== null && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(action.payload));
        } else {
          console.error('WebSocket is not connected');
          // Optionally queue message or reconnect
        }
        break;

      default:
        // Pass all other actions to the next middleware
        return next(action);
    }

    return next(action);
  };
};

export default websocketMiddleware;`}</pre>
      </div>

      <div className="example-box">
        <h3>Adding the WebSocket Middleware to the Store</h3>
        <pre>{`// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import websocketMiddleware from './middlewares/websocketMiddleware';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      websocketMiddleware()
    )
  )
);

// Connect to WebSocket when the store is created
store.dispatch({
  type: 'WS_CONNECT',
  payload: {
    url: 'wss://echo.websocket.org'
  }
});

export default store;`}</pre>
      </div>

      <div className="example-box">
        <h3>WebSocket Reducer</h3>
        <pre>{`// websocketReducer.js
const initialState = {
  connected: false,
  error: null
};

const websocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'WS_CONNECTED':
      return {
        ...state,
        connected: true,
        error: null
      };
      
    case 'WS_DISCONNECTED':
      return {
        ...state,
        connected: false
      };
      
    case 'WS_ERROR':
      return {
        ...state,
        error: action.payload
      };
      
    default:
      return state;
  }
};

export default websocketReducer;`}</pre>
      </div>

      <div className="example-box">
        <h3>Usage in Components</h3>
        <pre>{`// ChatComponent.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const connected = useSelector(state => state.websocket.connected);
  const messages = useSelector(state => state.chat.messages);
  
  const handleSend = () => {
    if (message.trim()) {
      // Send chat message through WebSocket
      dispatch({
        type: 'WS_SEND',
        payload: {
          type: 'CHAT_MESSAGE',
          data: {
            content: message,
            timestamp: Date.now()
          }
        }
      });
      
      setMessage('');
    }
  };
  
  return (
    <div className="chat-container">
      <div className="status">
        Status: {connected ? 'Connected' : 'Disconnected'}
      </div>
      
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <span className="timestamp">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
            <span className="content">{msg.content}</span>
          </div>
        ))}
      </div>
      
      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!connected}
          placeholder="Type a message..."
        />
        <button 
          onClick={handleSend}
          disabled={!connected}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;`}</pre>
      </div>

      <h3>Advanced WebSocket Handling</h3>
      <ul>
        <li><strong>Reconnection Strategy</strong>: Implement exponential backoff for reconnection attempts</li>
        <li><strong>Message Queue</strong>: Queue messages when disconnected and send once reconnected</li>
        <li><strong>Heartbeat Mechanism</strong>: Keep the connection alive with periodic pings</li>
        <li><strong>Authentication</strong>: Handle token-based auth for secure WebSocket connections</li>
        <li><strong>Selective Subscriptions</strong>: Subscribe to specific channels or topics</li>
      </ul>

      <div className="example-box">
        <h3>Reconnection Strategy</h3>
        <pre>{`// Enhanced WebSocket middleware with reconnection
const websocketMiddleware = () => {
  let socket = null;
  let reconnectTimer = null;
  let reconnectAttempts = 0;
  const MAX_RECONNECT_ATTEMPTS = 5;
  
  const getReconnectDelay = () => {
    // Exponential backoff: 1s, 2s, 4s, 8s, 16s
    return Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
  };

  return store => next => action => {
    switch (action.type) {
      case 'WS_CONNECT':
        // Clear any existing connection and timers
        if (socket !== null) {
          socket.close();
        }
        
        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
          reconnectTimer = null;
        }
        
        // Connect with the url from the action
        const connect = () => {
          socket = new WebSocket(action.payload.url);
          
          socket.onopen = () => {
            reconnectAttempts = 0;
            store.dispatch({ type: 'WS_CONNECTED' });
          };
          
          socket.onclose = (event) => {
            store.dispatch({ type: 'WS_DISCONNECTED', payload: event });
            
            // Attempt to reconnect if not explicitly disconnected
            if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
              reconnectAttempts++;
              store.dispatch({ 
                type: 'WS_RECONNECTING', 
                payload: { attempt: reconnectAttempts } 
              });
              
              reconnectTimer = setTimeout(() => {
                connect();
              }, getReconnectDelay());
            } else {
              store.dispatch({ 
                type: 'WS_RECONNECT_FAILED' 
              });
            }
          };
          
          // Same message and error handlers as before
          // ...
        };
        
        connect();
        break;
        
      // Other cases remain the same
      // ...
    }
    
    return next(action);
  };
};`}</pre>
      </div>

      <h3>Common Use Cases for Redux with WebSockets</h3>
      <ul>
        <li>Real-time chat applications</li>
        <li>Collaborative editing tools</li>
        <li>Live notifications and updates</li>
        <li>Financial data and trading platforms</li>
        <li>Multiplayer games</li>
        <li>IoT device monitoring dashboards</li>
      </ul>
    </div>
  );
};
