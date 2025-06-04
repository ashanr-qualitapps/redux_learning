import React from 'react';

// Main component for Normalization
export const NormalizationComponent = () => {
  return (
    <div className="section">
      <h2>Normalization of State</h2>
      <p>
        Normalization is a technique for organizing structured data in a way that reduces redundancy and
        improves performance. In Redux, normalized state typically means:
      </p>
      <ul>
        <li>Each type of data gets its own "table" in the state</li>
        <li>Each "data table" stores items in an object, with IDs as keys and items as values</li>
        <li>Any references to individual items are done by storing the item's ID</li>
        <li>Arrays of IDs are used to indicate ordering</li>
      </ul>

      <div className="example-box">
        <h3>Benefits of Normalization</h3>
        <ul>
          <li>Eliminates duplicate data</li>
          <li>Makes state updates more efficient</li>
          <li>Enables more consistent UI updates</li>
          <li>Simplifies managing relationships between entities</li>
        </ul>
      </div>

      <p>Click on a topic below to learn about different normalization approaches:</p>
      <ul>
        <li><a className="concept-link" href="/concepts/normalization/manual-normalization">Manual Normalized State Example</a></li>
        <li><a className="concept-link" href="/concepts/normalization/normalizr">Using Normalizr Library</a></li>
        <li><a className="concept-link" href="/concepts/normalization/entity-adapter">Redux Toolkit: createEntityAdapter</a></li>
      </ul>
    </div>
  );
};

// Manual Normalization Example
export const ManualNormalizationComponent = () => {
  return (
    <div className="section">
      <h2>Manual Normalized State Example</h2>
      <p>
        Below is an example of manually organizing your Redux state in a normalized structure.
        This is a common pattern for managing relational data in Redux applications.
      </p>

      <div className="example-box">
        <h3>Non-Normalized State (Before)</h3>
        <pre>{JSON.stringify({
          users: [
            { id: 1, name: "Sarah", posts: [1, 2] },
            { id: 2, name: "Michael", posts: [3] }
          ],
          posts: [
            { id: 1, title: "Hello World", author: 1, comments: [1, 2] },
            { id: 2, title: "Redux Tips", author: 1, comments: [] },
            { id: 3, title: "Normalization", author: 2, comments: [3] }
          ],
          comments: [
            { id: 1, text: "Great post!", author: 2 },
            { id: 2, text: "Thanks for sharing", author: 2 },
            { id: 3, text: "Very helpful", author: 1 }
          ]
        }, null, 2)}</pre>
      </div>

      <div className="example-box">
        <h3>Normalized State (After)</h3>
        <pre>{JSON.stringify({
          entities: {
            users: {
              byId: {
                1: { id: 1, name: "Sarah", postIds: [1, 2] },
                2: { id: 2, name: "Michael", postIds: [3] }
              },
              allIds: [1, 2]
            },
            posts: {
              byId: {
                1: { id: 1, title: "Hello World", authorId: 1, commentIds: [1, 2] },
                2: { id: 2, title: "Redux Tips", authorId: 1, commentIds: [] },
                3: { id: 3, title: "Normalization", authorId: 2, commentIds: [3] }
              },
              allIds: [1, 2, 3]
            },
            comments: {
              byId: {
                1: { id: 1, text: "Great post!", authorId: 2 },
                2: { id: 2, text: "Thanks for sharing", authorId: 2 },
                3: { id: 3, text: "Very helpful", authorId: 1 }
              },
              allIds: [1, 2, 3]
            }
          }
        }, null, 2)}</pre>
      </div>

      <h3>Benefits:</h3>
      <ul>
        <li>Easier updates - update a single entity without touching related data</li>
        <li>Efficient lookups by ID - O(1) complexity</li>
        <li>Prevents data duplication</li>
        <li>Maintains relationships through IDs instead of nested objects</li>
      </ul>

      <h3>Implementation Example:</h3>
      <pre>{`// Reducer example
const postsReducer = (state = { byId: {}, allIds: [] }, action) => {
  switch(action.type) {
    case 'ADD_POST':
      return {
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload
        },
        allIds: [...state.allIds, action.payload.id]
      };
    case 'UPDATE_POST':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            ...action.payload
          }
        }
      };
    case 'DELETE_POST':
      const { [action.payload]: deletedPost, ...remainingPosts } = state.byId;
      return {
        byId: remainingPosts,
        allIds: state.allIds.filter(id => id !== action.payload)
      };
    default:
      return state;
  }
}`}</pre>
    </div>
  );
};

// Normalizr Library Example
export const NormalizrComponent = () => {
  return (
    <div className="section">
      <h2>Using Normalizr Library</h2>
      <p>
        <a href="https://github.com/paularmstrong/normalizr" target="_blank" rel="noopener noreferrer">Normalizr</a> is a library
        that helps you normalize nested JSON according to a schema. It simplifies the process
        of converting nested data structures into a normalized form.
      </p>

      <div className="example-box">
        <h3>Schema Definition</h3>
        <pre>{`import { normalize, schema } from 'normalizr';

// Define schemas for our entities
const user = new schema.Entity('users');
const comment = new schema.Entity('comments', {
  author: user
});

const post = new schema.Entity('posts', {
  author: user,
  comments: [comment]
});

// Define a schema for an array of posts
const postsSchema = [post];`}</pre>
      </div>

      <div className="example-box">
        <h3>Input Data (Nested)</h3>
        <pre>{JSON.stringify([
          {
            id: 1,
            title: 'My first post!',
            author: { id: 1, name: 'John Doe' },
            comments: [
              {
                id: 1,
                text: 'Great post!',
                author: { id: 2, name: 'Jane Smith' }
              },
              {
                id: 2,
                text: 'Thanks for sharing',
                author: { id: 3, name: 'Bob Johnson' }
              }
            ]
          },
          {
            id: 2,
            title: 'Normalizr is great',
            author: { id: 1, name: 'John Doe' },
            comments: [
              {
                id: 3,
                text: 'I agree!',
                author: { id: 2, name: 'Jane Smith' }
              }
            ]
          }
        ], null, 2)}</pre>
      </div>

      <div className="example-box">
        <h3>Normalized Output</h3>
        <pre>{JSON.stringify({
          entities: {
            users: {
              1: { id: 1, name: 'John Doe' },
              2: { id: 2, name: 'Jane Smith' },
              3: { id: 3, name: 'Bob Johnson' }
            },
            comments: {
              1: { id: 1, text: 'Great post!', author: 2 },
              2: { id: 2, text: 'Thanks for sharing', author: 3 },
              3: { id: 3, text: 'I agree!', author: 2 }
            },
            posts: {
              1: { id: 1, title: 'My first post!', author: 1, comments: [1, 2] },
              2: { id: 2, title: 'Normalizr is great', author: 1, comments: [3] }
            }
          },
          result: [1, 2]
        }, null, 2)}</pre>
      </div>

      <h3>Using in Redux:</h3>
      <pre>{`// In your API response handler or action creator
const fetchPostsSuccess = (data) => {
  const normalizedData = normalize(data, postsSchema);
  
  return {
    type: 'FETCH_POSTS_SUCCESS',
    payload: normalizedData
  };
};

// In your reducer
const reducer = (state = { users: {}, posts: {}, comments: {} }, action) => {
  switch(action.type) {
    case 'FETCH_POSTS_SUCCESS':
      return {
        ...state,
        users: {
          ...state.users,
          ...action.payload.entities.users
        },
        posts: {
          ...state.posts,
          ...action.payload.entities.posts
        },
        comments: {
          ...state.comments,
          ...action.payload.entities.comments
        }
      };
    default:
      return state;
  }
};`}</pre>
    </div>
  );
};

// Redux Toolkit createEntityAdapter Example
export const EntityAdapterComponent = () => {
  return (
    <div className="section">
      <h2>Redux Toolkit: createEntityAdapter</h2>
      <p>
        <code>createEntityAdapter</code> is a utility provided by Redux Toolkit that generates
        a set of reusable reducers and selectors to manage normalized data in your Redux store.
      </p>

      <div className="example-box">
        <h3>Creating an Entity Adapter</h3>
        <pre>{`import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

// Create an adapter for our "posts" entity
const postsAdapter = createEntityAdapter({
  // Optional: specify how to get the ID from an entity
  selectId: post => post.id,
  
  // Optional: specify how to sort the entities
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt)
});

// The adapter provides initial state with ids and entities properties
const initialState = postsAdapter.getInitialState({
  // You can add additional state properties here
  loading: false,
  error: null
});`}</pre>
      </div>

      <div className="example-box">
        <h3>Using with Redux Toolkit's createSlice</h3>
        <pre>{`const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Adapter provides reducer case generators
    postAdded: postsAdapter.addOne,
    postsAdded: postsAdapter.addMany,
    postUpdated: postsAdapter.updateOne,
    postRemoved: postsAdapter.removeOne,
    
    // You can also include your own reducers
    postsLoading(state) {
      state.loading = true;
    },
    postsLoadingFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    postsLoaded(state, action) {
      state.loading = false;
      // Use adapter methods in custom reducers
      postsAdapter.setAll(state, action.payload);
    }
  }
});

// Export the auto-generated action creators
export const {
  postAdded,
  postsAdded,
  postUpdated,
  postRemoved,
  postsLoading,
  postsLoadingFailed,
  postsLoaded
} = postsSlice.actions;`}</pre>
      </div>

      <div className="example-box">
        <h3>Using the Generated Selectors</h3>
        <pre>{`// Generate selectors
const postsSelectors = postsAdapter.getSelectors(state => state.posts);

// Export the selectors
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsSelectors;

// Usage in a component
const AllPosts = () => {
  // Get all posts, sorted by the sortComparer
  const posts = useSelector(selectAllPosts);
  
  return (
    <div>
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

const PostDetail = ({ postId }) => {
  // Get a specific post by ID
  const post = useSelector(state => selectPostById(state, postId));
  
  if (!post) return <div>Post not found!</div>;
  
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};`}</pre>
      </div>

      <h3>Benefits of createEntityAdapter:</h3>
      <ul>
        <li>Provides pre-built CRUD operations for entities</li>
        <li>Automatically generates optimal selectors</li>
        <li>Works seamlessly with Immer for immutable updates</li>
        <li>Integrates perfectly with Redux Toolkit's createSlice</li>
        <li>Handles normalization automatically</li>
        <li>Supports sorting out of the box</li>
      </ul>
    </div>
  );
};

export const normalizationTopics = [
  {
    id: 'manual-normalization',
    concept: 'Manual Normalized State Example',
    description: 'How to structure normalized state manually',
    category: 'normalization',
    parent: 'normalization',
    order: 10.1
  },
  {
    id: 'normalizr',
    concept: 'Using Normalizr Library',
    description: 'Simplifying normalization with Normalizr',
    category: 'normalization',
    parent: 'normalization',
    order: 10.2
  },
  {
    id: 'entity-adapter',
    concept: 'Redux Toolkit: createEntityAdapter',
    description: 'Modern approach to managing normalized entities',
    category: 'normalization',
    parent: 'normalization',
    order: 10.3
  }
];
