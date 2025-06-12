import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { HomeButton, BackButton } from '../NavigationButtons';

const UndoRedoPatternComponent = () => {
  // Add debugging message
  console.log('UndoRedoPatternComponent rendered');
  
  // Scope for react-live code examples
  const scope = { React };

  const basicUndoableReducerExample = `
// Basic undoable reducer pattern
const undoable = (reducer) => {
  // Initial state with empty past/future and present initialized by reducer
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: []
  };

  // Return a reducer that handles undo/redo actions
  return (state = initialState, action) => {
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
      
      // Handle clear history action  
      case 'CLEAR_HISTORY':
        return {
          past: [],
          present,
          future: []
        };

      // Default: delegate handling to the wrapped reducer
      default:
        const newPresent = reducer(present, action);
        
        // If state didn't change, don't create a new history entry
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
};

// Example usage
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

// Create an undoable version of the counter reducer
const undoableCounterReducer = undoable(counterReducer);

// Initial state shape will be:
// {
//   past: [],
//   present: { count: 0 },
//   future: []
// }

// Render a demo to visualize the pattern
render(() => {
  const [state, setState] = React.useState({
    past: [],
    present: { count: 0 },
    future: []
  });
  
  // Simulate dispatch with our undoable reducer
  const dispatch = (action) => {
    setState(undoableCounterReducer(state, action));
  };
  
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Undo/Redo Counter Example</h3>
      <div style={{ margin: '20px 0' }}>
        <button 
          onClick={() => dispatch({ type: 'UNDO' })}
          disabled={state.past.length === 0}
        >
          Undo
        </button>
        <span style={{ margin: '0 20px', fontSize: '24px' }}>
          Count: {state.present.count}
        </span>
        <button 
          onClick={() => dispatch({ type: 'REDO' })}
          disabled={state.future.length === 0}
        >
          Redo
        </button>
      </div>
      <div>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
        <button onClick={() => dispatch({ type: 'CLEAR_HISTORY' })}>Clear History</button>
      </div>
      <div style={{ marginTop: '20px', fontSize: '14px', textAlign: 'left' }}>
        <div>Past: [{state.past.map(p => p.count).join(', ')}]</div>
        <div>Present: {JSON.stringify(state.present)}</div>
        <div>Future: [{state.future.map(f => f.count).join(', ')}]</div>
      </div>
    </div>
  );
});
`;

  const advancedUndoableExample = `
// Advanced pattern with filtering and configuration options
const undoable = (reducer, config = {}) => {
  // Configuration with defaults
  const {
    limit = 10, // Limit history entries to prevent memory issues
    filter = () => true, // Filter actions that should be tracked in history
    actionTypes = {
      UNDO: 'UNDO',
      REDO: 'REDO',
      CLEAR_HISTORY: 'CLEAR_HISTORY'
    },
    groupBy = null // Function to group consecutive actions
  } = config;
  
  // Initial state
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
    group: null // Current action group identifier
  };

  return (state = initialState, action) => {
    const { past, present, future, group } = state;
    
    // Handle undo/redo actions based on configured action types
    if (action.type === actionTypes.UNDO) {
      const historyIndex = action.payload?.steps || 1;
      if (past.length < historyIndex) return state;
      
      const newPast = [...past];
      const newPresent = newPast[past.length - historyIndex];
      const itemsToMove = newPast.splice(past.length - historyIndex);
      
      return {
        past: newPast,
        present: newPresent,
        future: [...itemsToMove.slice(1).reverse(), present, ...future],
        group: null
      };
    }
    
    if (action.type === actionTypes.REDO) {
      const historyIndex = action.payload?.steps || 1;
      if (future.length < historyIndex) return state;
      
      const itemsToMove = future.slice(0, historyIndex);
      const newPresent = itemsToMove[itemsToMove.length - 1];
      
      return {
        past: [...past, present, ...itemsToMove.slice(0, -1)],
        present: newPresent,
        future: future.slice(historyIndex),
        group: null
      };
    }
    
    if (action.type === actionTypes.CLEAR_HISTORY) {
      return {
        past: [],
        present,
        future: [],
        group: null
      };
    }
    
    // Handle normal actions
    const newPresent = reducer(present, action);
    
    // If state didn't change, return as is
    if (present === newPresent) {
      return state;
    }
    
    // Check if this action should be tracked in history
    if (!filter(action, newPresent)) {
      return {
        ...state,
        present: newPresent
      };
    }
    
    // Handle action grouping
    let isNewGroup = true;
    if (groupBy) {
      const currentGroup = groupBy(action);
      isNewGroup = currentGroup !== group;
      
      // If in same group, replace last past entry instead of adding new one
      if (!isNewGroup && past.length > 0) {
        return {
          past: [...past.slice(0, -1), present],
          present: newPresent,
          future: [],
          group: currentGroup
        };
      }
    }
    
    // Limit history size for performance
    const updatedPast = [...past, present];
    const limitedPast = updatedPast.length > limit 
      ? updatedPast.slice(-limit) 
      : updatedPast;
      
    return {
      past: limitedPast,
      present: newPresent,
      future: [],
      group: groupBy ? groupBy(action) : null
    };
  };
};

// Example of advanced usage
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

// Configure undoable enhancer
const undoableTodos = undoable(todosReducer, {
  limit: 20,
  filter: (action) => ['ADD_TODO', 'REMOVE_TODO'].includes(action.type),
  // Group consecutive toggle actions on the same todo
  groupBy: (action) => 
    action.type === 'TOGGLE_TODO' ? \`toggle_\${action.payload}\` : null
});

// Simple rendering to demonstrate
render(() => {
  return (
    <div>
      <h4>Advanced Configuration Options:</h4>
      <ul>
        <li><strong>History Limit:</strong> Prevent memory issues with large histories</li>
        <li><strong>Action Filtering:</strong> Only track important actions</li>
        <li><strong>Action Grouping:</strong> Combine related consecutive actions</li>
        <li><strong>Multiple Steps:</strong> Undo/redo multiple steps at once</li>
      </ul>
    </div>
  );
});
`;

  const combiningWithReduxToolkitExample = `
// Using Redux Toolkit with undoable enhancer
import { createSlice, configureStore } from '@reduxjs/toolkit';

// Create a slice as usual with Redux Toolkit
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }
  }
});

// Extract actions and reducer
const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;
const todosReducer = todosSlice.reducer;

// Create undoable version of the reducer
const undoableTodosReducer = undoable(todosReducer, {
  filter: (action) => action.type.startsWith('todos/'),
  actionTypes: {
    UNDO: 'todos/undo',
    REDO: 'todos/redo',
    CLEAR_HISTORY: 'todos/clearHistory'
  }
});

// Create store with the undoable reducer
const store = configureStore({
  reducer: {
    todos: undoableTodosReducer,
    // ...other reducers
  }
});

// Action creators for undo/redo
const undoTodos = () => ({ type: 'todos/undo' });
const redoTodos = () => ({ type: 'todos/redo' });
const clearTodosHistory = () => ({ type: 'todos/clearHistory' });

// Usage in a component would look like:
// 
// const dispatch = useDispatch();
// const { past, present, future } = useSelector(state => state.todos);
// 
// // Dispatch regular actions
// dispatch(addTodo({ id: 1, text: 'Learn Redux' }));
// 
// // Undo/redo
// dispatch(undoTodos());
// dispatch(redoTodos());

render(() => (
  <div>
    <h3>Redux Toolkit Integration</h3>
    <p>
      The undoable higher-order reducer pattern works well with Redux Toolkit,
      allowing you to combine the simplicity of createSlice with time travel capabilities.
    </p>
  </div>
));
`;

  const persistenceExample = `
// Integrating with Redux Persist
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStore, combineReducers } from 'redux';

// Our base reducer
const todosReducer = (state = [], action) => {
  // reducer implementation...
};

// Enhance with undoable
const undoableTodosReducer = undoable(todosReducer);

// Persist configuration
const persistConfig = {
  key: 'todos',
  storage,
  // Only persist the present state, not the history
  whitelist: ['present']
};

// Create a persisted version of the undoable reducer
const persistedUndoableTodos = persistReducer(
  persistConfig, 
  undoableTodosReducer
);

// Store setup
const rootReducer = combineReducers({
  todos: persistedUndoableTodos,
  // other reducers...
});

const store = createStore(rootReducer);
const persistor = persistStore(store);

render(() => (
  <div>
    <h3>Persistence Strategy Options:</h3>
    <div style={{ marginBottom: '15px' }}>
      <h4>Option 1: Persist Only Present State</h4>
      <pre>{
\`persistConfig = {
  key: 'todos',
  storage,
  whitelist: ['present']
}\`
      }</pre>
      <p><em>Best for most cases - keeps current state but starts with fresh history on reload</em></p>
    </div>
    
    <div>
      <h4>Option 2: Persist Full History</h4>
      <pre>{
\`persistConfig = {
  key: 'todos',
  storage
  // No whitelist - persist everything
}\`
      }</pre>
      <p><em>For applications where history is critical across sessions</em></p>
    </div>
  </div>
));
`;

  const performanceExample = `
// Performance optimizations for undo/redo functionality
const createOptimizedUndoable = (reducer, options = {}) => {
  const {
    limit = 20,
    filter = () => true,
    // New options
    debounceMs = 0,
    historyLimit = Infinity,
    maxSize = 1000000, // ~1MB in approximate characters
    compressor = null,
  } = options;
  
  let debounceTimeout = null;
  let lastActionTime = Date.now();
  let historySize = 0;
  
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
    historyType: 'init'
  };
  
  // Function to estimate object size (simplified)
  const estimateSize = obj => {
    return JSON.stringify(obj).length;
  };
  
  return (state = initialState, action) => {
    // Handle special actions (undo/redo)
    // ...

    // For regular actions:
    const newPresent = reducer(state.present, action);
    
    // Skip if unchanged
    if (newPresent === state.present) {
      return state;
    }
    
    // Skip if filtered out
    if (!filter(action)) {
      return {
        ...state,
        present: newPresent
      };
    }

    // Debounce handling
    if (debounceMs > 0) {
      const now = Date.now();
      if (now - lastActionTime < debounceMs) {
        // If debounced, replace the last history entry
        if (state.past.length > 0) {
          clearTimeout(debounceTimeout);
          
          // Schedule adding to history after debounce period
          debounceTimeout = setTimeout(() => {
            lastActionTime = Date.now();
          }, debounceMs);
          
          return {
            ...state,
            past: [...state.past.slice(0, -1), state.present],
            present: newPresent,
            future: []
          };
        }
      }
      lastActionTime = now;
    }
    
    // Compression handling
    let pastEntry = state.present;
    if (compressor) {
      pastEntry = compressor(state.present);
    }
    
    // Size management
    const newPastSize = estimateSize(pastEntry);
    const newTotalSize = historySize + newPastSize;
    
    // If adding this entry exceeds size limit, remove oldest entries
    if (newTotalSize > maxSize) {
      let sizeToRemove = 0;
      let itemsToRemove = 0;
      
      // Calculate how many items to remove to stay under limit
      for (let i = 0; i < state.past.length; i++) {
        const itemSize = estimateSize(state.past[i]);
        sizeToRemove += itemSize;
        itemsToRemove++;
        
        if (newTotalSize - sizeToRemove <= maxSize) {
          break;
        }
      }
      
      const trimmedPast = state.past.slice(itemsToRemove);
      const newHistorySize = historySize - sizeToRemove + newPastSize;
      
      historySize = newHistorySize;
      
      return {
        past: [...trimmedPast, pastEntry],
        present: newPresent,
        future: [],
        historyType: 'size-limited'
      };
    }
    
    // Standard case - add to history with limits
    const newPast = [...state.past, pastEntry];
    const limitedPast = newPast.length > limit ? newPast.slice(-limit) : newPast;
    
    historySize += newPastSize;
    if (limitedPast.length < newPast.length) {
      // Adjust history size if oldest entries were removed
      historySize -= newPast.slice(0, newPast.length - limitedPast.length)
        .reduce((size, entry) => size + estimateSize(entry), 0);
    }
    
    return {
      past: limitedPast,
      present: newPresent,
      future: [],
      historyType: 'standard'
    };
  };
};

render(() => (
  <div>
    <h3>Performance Optimizations:</h3>
    <ul>
      <li><strong>Debouncing:</strong> Group rapid changes into a single history entry</li>
      <li><strong>Memory Management:</strong> Limit history size by number or memory footprint</li>
      <li><strong>Compression:</strong> Store compact representations of history states</li>
      <li><strong>Selective Persistence:</strong> Only persist the critical parts of history</li>
    </ul>
  </div>
));
`;

  const domainSpecificHistoryExample = `
// Managing multiple history contexts for different domains
import { combineReducers } from 'redux';

// Specialized undoable enhancer for different domains
const createDomainUndoable = (reducer, options = {}) => {
  const {
    scope = 'global', // Domain identifier
    actionTypes = {
      UNDO: 'UNDO',
      REDO: 'REDO',
      CLEAR_HISTORY: 'CLEAR_HISTORY',
    },
    mergeItems = null, // Function to merge consecutive actions
  } = options;
  
  // Standard undoable implementation with domain scope
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
    scope
  };
  
  return (state = initialState, action) => {
    // Special handling for targeted domain actions
    if (action.scope && action.scope !== scope) {
      // This action targets a different domain, ignore special actions
      const newPresent = reducer(state.present, action);
      if (newPresent === state.present) return state;
      
      return {
        ...state,
        present: newPresent
      };
    }
    
    // Rest of implementation is similar to basic undoable
    // ...
  };
};

// Application with multiple domains
const todosReducer = (state = [], action) => {/* implementation */};
const notesReducer = (state = [], action) => {/* implementation */};
const settingsReducer = (state = {}, action) => {/* implementation */};

// Apply undoable to specific domains with different options
const rootReducer = combineReducers({
  todos: createDomainUndoable(todosReducer, { 
    scope: 'todos',
    // Custom options for todos
  }),
  notes: createDomainUndoable(notesReducer, { 
    scope: 'notes',
    // Custom options for notes
  }),
  // Settings don't need history
  settings: settingsReducer
});

// Actions for domain-specific undo/redo
const undoTodos = () => ({ type: 'UNDO', scope: 'todos' });
const redoTodos = () => ({ type: 'REDO', scope: 'todos' });
const undoNotes = () => ({ type: 'UNDO', scope: 'notes' });
const redoNotes = () => ({ type: 'REDO', scope: 'notes' });

render(() => (
  <div>
    <h3>Domain-Specific History Management</h3>
    
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px', margin: '5px' }}>
        <h4>Todos Domain</h4>
        <p>Independent history stack for todos</p>
        <button>Undo Todos</button>
        <button>Redo Todos</button>
      </div>
      
      <div style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px', margin: '5px' }}>
        <h4>Notes Domain</h4>
        <p>Independent history stack for notes</p>
        <button>Undo Notes</button>
        <button>Redo Notes</button>
      </div>
    </div>
    
    <p><strong>Benefit:</strong> Users can undo/redo actions in one part of the app without affecting other areas.</p>
  </div>
));
`;

  return (
    <div className="section">
      <HomeButton />
      <h2>Advanced Undo/Redo Functionality - Implementing Application-Wide Time Travel</h2>
      <p>
        Implementing a robust undo/redo system is essential for applications where users make complex edits,
        such as document editors, design tools, data manipulation interfaces, or any situation where users
        need to safely experiment with changes and revert if necessary.
      </p>

      <div className="subsection">
        <h3>Core Concept: The Undoable Higher-Order Reducer</h3>
        <p>
          The primary pattern for implementing undo/redo in Redux is through a higher-order reducer that
          enhances an existing reducer with time-travel capabilities. This pattern wraps the state in a
          structure that tracks previous and future states.
        </p>

        <div className="diagram-container">
          <h4>Undoable State Structure</h4>
          <pre>{`{
  past: [state1, state2, state3],  // Previous states
  present: currentState,           // Current state
  future: [state5, state6]         // States that were undone
}`}</pre>
          <div className="diagram-legend">
            <p>When the user:</p>
            <ul>
              <li><strong>Makes a change:</strong> Current state moves to past, new state becomes present</li>
              <li><strong>Undoes:</strong> Present state moves to future, last past state becomes present</li>
              <li><strong>Redoes:</strong> Present state moves to past, first future state becomes present</li>
            </ul>
          </div>
        </div>

        <LiveProvider code={basicUndoableReducerExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>

      <div className="subsection">
        <h3>Advanced Configuration Options</h3>
        <p>
          A basic undo/redo implementation works for simple cases, but real-world applications 
          require more sophisticated options:
        </p>

        <LiveProvider code={advancedUndoableExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>

      <div className="subsection">
        <h3>Integration with Redux Toolkit</h3>
        <p>
          Redux Toolkit has become the standard way to write Redux code, and the undoable pattern
          can be seamlessly integrated with it:
        </p>

        <LiveProvider code={combiningWithReduxToolkitExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>

      <div className="subsection">
        <h3>Persistence Strategies</h3>
        <p>
          When combined with Redux Persist, you need to carefully consider how history should be
          persisted across sessions:
        </p>

        <LiveProvider code={persistenceExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>

      <div className="subsection">
        <h3>Performance Considerations</h3>
        <p>
          For applications with complex state or frequent updates, naively storing all history
          can lead to memory issues and performance problems:
        </p>

        <LiveProvider code={performanceExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>

      <div className="subsection">
        <h3>Domain-Specific History Management</h3>
        <p>
          In complex applications, you often want different parts of your state to have independent
          history stacks:
        </p>

        <LiveProvider code={domainSpecificHistoryExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>

      <div className="subsection">
        <h3>Best Practices for Application-Wide Time Travel</h3>
        <ul>
          <li><strong>Batch Related Actions:</strong> Group related changes to avoid cluttering history with intermediary states</li>
          <li><strong>Clear UX Feedback:</strong> Make it obvious what will be undone/redone with clear history labels</li>
          <li><strong>Memory Management:</strong> Implement size limits or compression for history</li>
          <li><strong>Selective History:</strong> Not all actions need to be undoable - filter trivial state changes</li>
          <li><strong>Testing:</strong> Time travel increases state complexity - thoroughly test all undo/redo flows</li>
          <li><strong>Custom Serialization:</strong> For large objects, consider custom serialization/deserialization for history entries</li>
          <li><strong>UI Integration:</strong> Provide keyboard shortcuts (Ctrl+Z/Ctrl+Y) and consider showing history as a timeline</li>
        </ul>
      </div>

      <div className="warning-box">
        <h4>Common Pitfalls</h4>
        <ul>
          <li><strong>Memory Leaks:</strong> Unbounded history growth can cause performance degradation over time</li>
          <li><strong>Unexpected Side Effects:</strong> Undoing actions with external side effects (e.g., API calls) may require special handling</li>
          <li><strong>Complex State Dependencies:</strong> If parts of state depend on each other, domain-specific histories can become inconsistent</li>
          <li><strong>User Confusion:</strong> Without clear indication of what's being undone/redone, users may be surprised by results</li>
        </ul>
      </div>

      <BackButton />
    </div>
  );
};

export default UndoRedoPatternComponent;
