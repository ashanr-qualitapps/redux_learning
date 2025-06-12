import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { HomeButton, BackButton } from './NavigationButtons';

export const RTKQueryComponent = () => {
  // For react-live code examples
  const scope = { React };

  // Basic RTK Query API example
  const basicApiExample = `
// api.js - Creating an API slice
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define our single API slice
export const apiSlice = createApi({
  // The cache reducer expects to be added at \`state.api\` (already default)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/api'
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    // You can add headers, credentials, etc.
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', \`Bearer \${token}\`);
      }
      return headers;
    }
  }),
  // "Endpoints" represent operations and requests
  endpoints: (builder) => ({
    // 'getPosts' is the name of this operation
    getPosts: builder.query({
      // The URL for the request
      query: () => '/posts',
      // Optional: Transform the response data
      transformResponse: (response) => response.sort((a, b) => b.date.localeCompare(a.date)),
      // Data tag for cache invalidation
      providesTags: ['Posts']
    }),
    getPost: builder.query({
      query: (postId) => \`/posts/\${postId}\`,
      providesTags: (result, error, postId) => [{ type: 'Posts', id: postId }]
    }),
    addPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost
      }),
      // When a post is added, invalidate the Posts cache
      invalidatesTags: ['Posts']
    }),
    updatePost: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: \`/posts/\${id}\`,
        method: 'PATCH',
        body: patch
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }]
    })
  })
});

// Auto-generated hooks
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUpdatePostMutation
} = apiSlice;
  `;

  // Component usage example
  const componentUsageExample = `
// PostsList.js - Using the generated hooks
import React from 'react';
import { useGetPostsQuery } from './api';

const PostsList = () => {
  // The query hook automatically fetches data and returns:
  // - data: the result (undefined while loading)
  // - error: any error that occurred
  // - isLoading: true when loading
  // - isFetching: true during any request
  // - refetch: function to force refetch
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch
  } = useGetPostsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

render(<PostsList />);
  `;

  // Mutation example
  const mutationExample = `
// PostForm.js - Using mutation hooks
import React, { useState } from 'react';
import { useAddPostMutation } from './api';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  // Mutation hook returns an array:
  // - addPost: function to trigger the mutation
  // - { isLoading, isError, ... }: mutation state
  const [addPost, { isLoading, isError }] = useAddPostMutation();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // The mutation function returns a Promise
      await addPost({ title, content, date: new Date().toISOString() }).unwrap();
      // Reset form on success
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Failed to save the post:', err);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Post</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Post'}
      </button>
      {isError && <div className="error">Error saving post</div>}
    </form>
  );
};

render(<PostForm />);
  `;

  // Store configuration example
  const storeConfigExample = `
// store.js - Configure store with the API slice
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [apiSlice.reducerPath]: apiSlice.reducer,
    // Your other reducers here...
    auth: authReducer,
    ui: uiReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of RTK Query.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// See \`setupListeners\` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
  `;

  return (
    <div className="section">
      <HomeButton />
      <h2>RTK Query</h2>
      <p>
        RTK Query is a powerful data fetching and caching tool, included in Redux Toolkit. 
        It simplifies the common tasks of loading, caching, and updating server data in your Redux applications.
      </p>

      <div className="key-points">
        <h3>Key Features</h3>
        <ul>
          <li><strong>Automated Caching & Refetching</strong> - Create APIs with caching, polling, and cache invalidation</li>
          <li><strong>Automatic Loading & Error States</strong> - Track loading, success, and error states for each request</li>
          <li><strong>Zero Configuration</strong> - No middleware or thunks required</li>
          <li><strong>Normalized Cache</strong> - Efficient updates and access patterns for data</li>
          <li><strong>TypeScript Support</strong> - Full TypeScript support with inference</li>
        </ul>
      </div>

      <div className="concept-explanation">
        <h3>How RTK Query Works</h3>
        <p>
          RTK Query simplifies API interactions by abstracting away the complexities of state management for server data.
          Here's what's happening under the hood:
        </p>
        
        <div className="rtk-query-diagram">
          <div className="diagram-box component">
            <h4>React Component</h4>
            <p>Uses <code>useGetPostsQuery</code></p>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-box query-hook">
            <h4>Generated Query Hook</h4>
            <p>Checks cache, manages subscriptions</p>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-box cache">
            <h4>RTK Query Cache</h4>
            <p>Stores normalized data with tags</p>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-box endpoint">
            <h4>Endpoint Definition</h4>
            <p>Contains query logic</p>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-box fetch">
            <h4>Base Query Function</h4>
            <p>Makes actual API request</p>
          </div>
        </div>
        
        <ol>
          <li><strong>Request Lifecycle:</strong> When a component mounts and calls <code>useGetPostsQuery()</code>, RTK Query checks if the data exists in the cache and is still valid.</li>
          <li><strong>Cache Management:</strong> If valid data exists, it's immediately returned. If not, a request is triggered.</li>
          <li><strong>Reference Counting:</strong> RTK Query tracks how many components are using each query, and only removes data from the cache when nothing is using it.</li>
          <li><strong>Automatic Re-fetching:</strong> If the same data is requested elsewhere while a request is in-flight, components will share the same Promise.</li>
        </ol>
      </div>

      <h3>Setting Up RTK Query</h3>
      <p>
        RTK Query is included in the Redux Toolkit package. Let's start by creating an API slice:
      </p>

      <div className="example-box">
        <h4>Creating an API Slice:</h4>
        <LiveProvider code={basicApiExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
        </LiveProvider>
        
        <div className="code-explanation">
          <p><strong>What's happening here:</strong></p>
          <ul>
            <li><code>createApi</code> creates a set of Redux logic for interacting with a specific API.</li>
            <li><code>fetchBaseQuery</code> is a simplified fetch wrapper that handles common cases.</li>
            <li><code>endpoints</code> define the operations your API supports (queries for retrieving data, mutations for updating data).</li>
            <li>The auto-generated hooks (<code>useGetPostsQuery</code>, etc.) contain all the Redux logic for API interactions.</li>
          </ul>
        </div>
      </div>

      <h3>Configuring Your Store</h3>
      <p>
        To use RTK Query, you'll need to add the API slice reducer to your store and include the middleware:
      </p>

      <div className="example-box">
        <h4>Store Configuration:</h4>
        <LiveProvider code={storeConfigExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
        </LiveProvider>
        
        <div className="code-explanation">
          <p><strong>The key parts:</strong></p>
          <ul>
            <li>The generated reducer is added to your root reducer under the API slice's <code>reducerPath</code>.</li>
            <li>The middleware is essential for RTK Query's caching behavior.</li>
            <li><code>setupListeners</code> enables refetching on window focus and network reconnection.</li>
          </ul>
        </div>
      </div>

      <h3>Using Query Hooks</h3>
      <p>
        RTK Query auto-generates React hooks based on your endpoints. These hooks handle all aspects of data fetching:
      </p>

      <div className="example-box">
        <h4>Component Using Query Hook:</h4>
        <LiveProvider code={componentUsageExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
        
        <div className="code-explanation">
          <p><strong>What you get from the hook:</strong></p>
          <ul>
            <li><code>data</code>: The successful response (if available)</li>
            <li><code>error</code>: Error result if present</li>
            <li><code>isLoading</code>: True on first load only</li>
            <li><code>isFetching</code>: True whenever a request is in-flight (including re-fetches)</li>
            <li><code>isSuccess</code>: True when data is available and request succeeded</li>
            <li><code>isError</code>: True when the request resulted in an error</li>
            <li><code>refetch</code>: Function to force re-fetch the data</li>
          </ul>
        </div>
      </div>

      <h3>Mutations</h3>
      <p>
        Mutations are used for creating, updating, and deleting data:
      </p>

      <div className="example-box">
        <h4>Using Mutation Hooks:</h4>
        <LiveProvider code={mutationExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
        
        <div className="code-explanation">
          <p><strong>Understanding mutations:</strong></p>
          <ul>
            <li>Mutation hooks return a tuple: <code>[trigger function, result object]</code></li>
            <li>The trigger function returns a Promise that resolves with the response</li>
            <li><code>unwrap()</code> can be called on the Promise to get just the response data or throw an error</li>
            <li>The result object contains status flags like <code>isLoading</code>, <code>isSuccess</code>, etc.</li>
            <li>Mutations can automatically invalidate cached data using the tag system</li>
          </ul>
        </div>
      </div>

      <h3>Advanced Features</h3>

      <div className="explanation-box">
        <h4>Cache Invalidation</h4>
        <p>RTK Query uses a powerful tag-based system for cache invalidation:</p>
        <pre>
          {`// Define tags when creating endpoints
endpoints: (builder) => ({
  getPosts: builder.query({
    query: () => '/posts',
    // This endpoint provides "Posts" tag data
    providesTags: ['Posts']
  }),
  addPost: builder.mutation({
    query: (newPost) => ({
      url: '/posts',
      method: 'POST',
      body: newPost
    }),
    // This mutation invalidates all data with "Posts" tag
    invalidatesTags: ['Posts']
  }),
  // More granular cache updates
  getPost: builder.query({
    query: (id) => \`/posts/\${id}\`,
    providesTags: (result, error, id) => [{ type: 'Post', id }]
  }),
  updatePost: builder.mutation({
    query: ({ id, ...patch }) => ({
      url: \`/posts/\${id}\`,
      method: 'PATCH',
      body: patch
    }),
    // Only invalidate this specific post
    invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }]
  })
})`}
        </pre>
        <div className="code-explanation">
          <p><strong>How the tag system works:</strong></p>
          <ol>
            <li>Query endpoints "provide" tags for the data they return using <code>providesTags</code></li>
            <li>Mutation endpoints can "invalidate" tags using <code>invalidatesTags</code></li>
            <li>When a tag is invalidated, all queries that provide that tag are automatically re-fetched</li>
            <li>Tags can be either string literals (<code>'Posts'</code>) or objects (<code>{'{'} type: 'Post', id: 5 {'}'}</code>)</li>
            <li>Using object tags allows for more precise control over invalidation</li>
          </ol>
        </div>
      </div>

      <div className="explanation-box">
        <h4>Transforming Response Data</h4>
        <p>Process API responses before they reach your components:</p>
        <pre>
          {`getPosts: builder.query({
  query: () => '/posts',
  // Transform the response before it's cached
  transformResponse: (response) => {
    return response.data.map(post => ({
      ...post,
      title: post.title.toUpperCase(),
      excerpt: post.body.substring(0, 100) + '...'
    }));
  },
  // The transformed data is what gets cached
  providesTags: (result) => 
    result
      ? [
          ...result.map(({ id }) => ({ type: 'Posts', id })),
          { type: 'Posts', id: 'LIST' }
        ]
      : [{ type: 'Posts', id: 'LIST' }]
})`}
        </pre>
        <div className="code-explanation">
          <p><strong>Benefits of transformResponse:</strong></p>
          <ul>
            <li>Normalizes data at the API layer, keeping components simpler</li>
            <li>Transforms happen once, not on every component render</li>
            <li>Results are cached after transformation</li>
            <li>Computation only happens when fresh data is fetched</li>
          </ul>
        </div>
      </div>

      <div className="explanation-box">
        <h4>Manual Cache Updates</h4>
        <p>
          Sometimes you need to update the cache without refetching from the server:
        </p>
        <pre>
          {`// Import utility
import { api } from './api';

// In a component
const [updatePost, { isLoading }] = useUpdatePostMutation();

const optimisticallyToggleComplete = async (postId, currentStatus) => {
  try {
    // Update the post on the server
    await updatePost({ id: postId, completed: !currentStatus }).unwrap();
  } catch (err) {
    // If the server request fails, we can manually update the cache to revert our optimistic update
    dispatch(
      api.util.updateQueryData('getPosts', undefined, (draft) => {
        // Find the post in the draft and revert it
        const post = draft.find(post => post.id === postId);
        if (post) {
          post.completed = currentStatus;
        }
      })
    );
  }
};

// While the request is in flight
dispatch(
  api.util.updateQueryData('getPosts', undefined, (draft) => {
    // Find the post and update it
    const post = draft.find(post => post.id === postId);
    if (post) {
      post.completed = !currentStatus;
    }
  })
);`}
        </pre>
        <div className="code-explanation">
          <p><strong>Understanding cache updates:</strong></p>
          <ul>
            <li><code>updateQueryData</code> lets you directly modify cached data using Immer</li>
            <li>It's perfect for optimistic updates where you want UI to change immediately</li>
            <li>You can also use it in response to WebSocket events or other server pushes</li>
            <li>All components using that query data will re-render with the updated data</li>
          </ul>
        </div>
      </div>

      <div class="example-box">
        <h4>Real-time Updates with WebSockets</h4>
        <p>
          RTK Query provides a lifecycle hook <code>onCacheEntryAdded</code> that's perfect for setting up WebSocket connections:
        </p>
        <pre>
          {`getPosts: builder.query({
  query: () => '/posts',
  providesTags: ['Posts'],
  // Setup a WebSocket connection when this query is used
  async onCacheEntryAdded(
    arg,
    { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
  ) {
    // Wait for the initial query to resolve before proceeding
    try {
      await cacheDataLoaded;
      
      // Create a WebSocket connection
      const socket = new WebSocket('wss://example.com/posts');
      
      socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'newPost') {
          updateCachedData(draft => {
            // Add the new post to our cache
            draft.push(data.post);
          });
          
          // You can also dispatch actions to other slices
          dispatch(notificationsReceived(data));
        }
      });
      
      // When this query is no longer used anywhere, clean up
      await cacheEntryRemoved;
      socket.close();
    } catch {
      // Handle any errors here
    }
  },
})`}
        </pre>
        <div className="code-explanation">
          <p><strong>The lifecycle of onCacheEntryAdded:</strong></p>
          <ol>
            <li>Function runs when a component first subscribes to this query</li>
            <li><code>cacheDataLoaded</code> resolves when the initial data is fetched</li> 
            <li><code>updateCachedData</code> allows updating the cached data (using Immer)</li>
            <li><code>cacheEntryRemoved</code> resolves when no components are subscribed anymore</li>
            <li>Perfect pattern for "subscribe when used, unsubscribe when not used"</li>
          </ol>
        </div>
      </div>

      <div class="example-box">
        <h4>Pagination and Infinite Scrolling</h4>
        <pre>
          {`// Define a query with pagination parameters
const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPaginatedPosts: builder.query({
      query: ({ page = 1, limit = 10 }) => 
        \`/posts?_page=\${page}&_limit=\${limit}\`,
      // Merge previous pages when fetching more
      serializeQueryArgs: ({ queryArgs }) => {
        // Only use pagination limit in the cache key
        return { limit: queryArgs?.limit };
      },
      // Only merge pages with the same limit
      merge: (currentCache, newItems, { arg }) => {
        if (arg?.page === 1) {
          // If it's page 1, just return the new items
          return newItems;
        }
        // Otherwise merge with existing data
        return [...currentCache, ...newItems];
      },
      // Provide a tag for each post, plus a 'PARTIAL-LIST' tag
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Posts', id })),
        { type: 'Posts', id: 'PARTIAL-LIST' }
      ]
    })
  })
});

// In a component
const InfinitePostsList = () => {
  const [page, setPage] = useState(1);
  const { data: posts = [], isLoading, isFetching } = 
    useGetPaginatedPostsQuery({ page, limit: 10 });
    
  return (
    <div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      
      <button 
        onClick={() => setPage(page + 1)}
        disabled={isLoading || isFetching}
      >
        {isFetching ? 'Loading more...' : 'Load More'}
      </button>
    </div>
  );
};`}
        </pre>
        <div className="code-explanation">
          <p><strong>Understanding the pagination approach:</strong></p>
          <ul>
            <li><code>serializeQueryArgs</code> controls how RTK Query creates cache keys</li>
            <li><code>merge</code> defines how new data is combined with existing data</li>
            <li>This pattern works well for "load more" buttons or infinite scrolling</li>
            <li>For traditional pagination, you'd typically not use the merge approach</li>
          </ul>
        </div>
      </div>

      <h3>When to Use RTK Query vs. Traditional Redux</h3>
      <div className="explanation-box">
        <p><strong>Use RTK Query when:</strong></p>
        <ul>
          <li>You're working with REST APIs or GraphQL endpoints</li>
          <li>You need automatic caching, loading states, and error handling</li>
          <li>Your data has clear CRUD operations</li>
          <li>You want to avoid writing repetitive data fetching logic</li>
          <li>Your data updates are primarily driven by user actions</li>
        </ul>
        
        <p><strong>Consider traditional Redux when:</strong></p>
        <ul>
          <li>You're dealing with complex client-side state that isn't from an API</li>
          <li>Your state has complex interdependencies not easily modeled as separate endpoints</li>
          <li>You need fine-grained control over how and when state updates</li>
          <li>You're dealing with WebSocket data that doesn't map well to queries/mutations</li>
          <li>Your app uses a custom state synchronization protocol</li>
        </ul>
      </div>

      <div className="comparison-table">
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Traditional Redux</th>
              <th>RTK Query</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data Fetching</td>
              <td>Manual with thunks/sagas</td>
              <td>Automated</td>
            </tr>
            <tr>
              <td>Loading States</td>
              <td>Manually tracked</td>
              <td>Automatic</td>
            </tr>
            <tr>
              <td>Caching</td>
              <td>Custom implementation</td>
              <td>Built-in</td>
            </tr>
            <tr>
              <td>Cache Invalidation</td>
              <td>Manual</td>
              <td>Tag-based system</td>
            </tr>
            <tr>
              <td>Request Deduplication</td>
              <td>Manual tracking</td>
              <td>Automatic</td>
            </tr>
            <tr>
              <td>Boilerplate</td>
              <td>High</td>
              <td>Minimal</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Best Practices</h3>
      <ul>
        <li><strong>Use one API slice per base URL</strong> - Split different APIs into separate slices</li>
        <li><strong>Keep endpoint definitions together</strong> - Group related endpoints within the same slice</li>
        <li><strong>Use specific tags for precise cache invalidation</strong> - Avoid invalidating more data than necessary</li>
        <li><strong>Transform responses at the API level</strong> - Keep components simple by handling data transformation in your API slice</li>
        <li><strong>Leverage query hook options</strong> - Use options like <code>skip</code>, <code>refetchOnMountOrArgChange</code>, etc. to control behavior</li>
        <li><strong>Prefer RTK Query for server state</strong> - Use regular Redux state for client-only state</li>
      </ul>

      <div className="warning-box">
        <h4>Common Pitfalls</h4>
        <ul>
          <li><strong>Over-fetching</strong> - Be careful not to trigger too many queries in a single component</li>
          <li><strong>Cache lifetime</strong> - By default, unused data is removed after 60 seconds. Configure this with <code>keepUnusedDataFor</code></li>
          <li><strong>Webhook integration</strong> - For real-time updates, consider using the <code>onCacheEntryAdded</code> lifecycle to set up WebSocket subscriptions</li>
          <li><strong>Large responses</strong> - For very large datasets, consider pagination or infinite scrolling</li>
        </ul>
      </div>

      <BackButton />
    </div>
  );
};
