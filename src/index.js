import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import store from './redux/store';
import Layout from './components/Layout';
import { ActionsComponent, ReducersComponent, StoreComponent, HooksComponent, ThunksComponent, MiddlewareComponent, ReduxThunkComponent, ReduxSagaComponent, ReduxObservableComponent } from './components/TopicComponents';
import { NormalizationComponent, ManualNormalizationComponent, NormalizrComponent, EntityAdapterComponent } from './components/NormalizationComponents';
import { ReselectComponent, BasicReselectComponent, ParameterizedSelectorsComponent, FilteringTodosComponent } from './components/ReselectComponents';
import './index.css';
import './styles.css';

// Import our new advanced topic components
import { 
  ReReselectComponent,
  DynamicReducersComponent,
  ReduxToolkitComponent,
  ImmutablePatternsComponent,
  TestingReduxComponent,
  TypeScriptIntegrationComponent,
  SSRReduxComponent,
  EntityRelationshipsComponent,
  WebSocketsComponent
} from './components/AdvancedTopics';

// Add category field to core concepts for filtering and display
const coreReduxConcepts = [
  {
    id: 'actions',
    concept: 'Actions and Action Creators',
    description: 'Functions that create actions to update state',
    category: 'core'
  },
  {
    id: 'reducers',
    concept: 'Reducers',
    description: 'Functions that determine how state changes',
    category: 'core'
  },
  {
    id: 'store',
    concept: 'Store',
    description: 'The object that brings actions and reducers together',
    category: 'core'
  },
  {
    id: 'hooks',
    concept: 'React-Redux integration with hooks',
    description: 'Using React hooks to interact with Redux store',
    category: 'core'
  },
  {
    id: 'middleware',
    concept: 'Middleware',
    description: 'Extending Redux with custom functionality',
    category: 'core'
  },
  {
    id: 'thunks',
    concept: 'Async operations using Redux Thunk middleware',
    description: 'Handling asynchronous logic in Redux',
    category: 'core'
  },
];

// Add category field to advanced topics
const advancedReduxTopics = [
  {
    id: 'redux-thunk',
    concept: 'Redux-Thunk in depth',
    description: 'Function-based middleware for async actions',
    category: 'middleware'
  },
  {
    id: 'redux-saga',
    concept: 'Redux Saga',
    description: 'Generator-based middleware for complex async flows',
    category: 'middleware'
  },
  {
    id: 'redux-observable',
    concept: 'Redux Observable',
    description: 'RxJS-powered middleware for reactive programming',
    category: 'middleware'
  },
  {
    id: 'normalization',
    concept: 'Normalization of State',
    description: 'Techniques for structuring state for efficiency',
    category: 'advanced'
  },
  {
    id: 'reselect',
    concept: 'Reselect and Memoization',
    description: 'Performance optimization with memoized selectors',
    category: 'advanced'
  },
  {
    id: 're-reselect',
    concept: 'Advanced: Caching with re-reselect',
    description: 'Enhanced selector caching for complex applications',
    category: 'advanced'
  },
  {
    id: 'entity-relationships',
    concept: 'Entity Relationships',
    description: 'Managing complex entity relationships in a normalized state',
    category: 'advanced',
    date: '2025-05-29'
  },
  {
    id: 'websockets',
    concept: 'Redux with WebSockets',
    description: 'Using Redux with real-time data via WebSockets',
    category: 'middleware',
    date: '2025-05-29'
  },
  {
    id: 'dynamic-reducers',
    concept: 'Code Splitting and Dynamic Reducers',
    description: 'Loading Redux modules on demand',
    category: 'implementation'
  },
  {
    id: 'redux-toolkit',
    concept: 'Redux Toolkit',
    description: 'Official, opinionated toolset for Redux development',
    category: 'implementation'
  },
  {
    id: 'immutable-patterns',
    concept: 'Immutable Update Patterns',
    description: 'Techniques for maintaining state immutability',
    category: 'implementation'
  },
  {
    id: 'testing-redux',
    concept: 'Testing Redux Logic',
    description: 'Best practices for testing Redux code',
    category: 'implementation'
  },
  {
    id: 'typescript',
    concept: 'Integration with TypeScript',
    description: 'Adding static typing to Redux applications',
    category: 'implementation'
  },
  {
    id: 'ssr',
    concept: 'Server-Side Rendering with Redux',
    description: 'Rendering Redux apps on the server',
    category: 'implementation'
  }
];

// Add category and parent fields to sub-topics for proper routing and display
const normalizationTopics = [
  {
    id: 'manual-normalization',
    concept: 'Manual Normalized State Example',
    description: 'How to structure normalized state manually',
    category: 'normalization',
    parent: 'normalization'
  },
  {
    id: 'normalizr',
    concept: 'Using Normalizr Library',
    description: 'Simplifying normalization with Normalizr',
    category: 'normalization',
    parent: 'normalization'
  },
  {
    id: 'entity-adapter',
    concept: 'Redux Toolkit: createEntityAdapter',
    description: 'Modern approach to managing normalized entities',
    category: 'normalization',
    parent: 'normalization'
  }
];

const reselectTopics = [
  {
    id: 'basic-reselect',
    concept: 'Basic Reselect Example',
    description: 'Introduction to memoized selectors',
    category: 'reselect',
    parent: 'reselect'
  },
  {
    id: 'parameterized-selectors',
    concept: 'Selectors with Parameters',
    description: 'Creating selectors that accept arguments',
    category: 'reselect',
    parent: 'reselect'
  },
  {
    id: 'filtering-todos',
    concept: 'Practical Example: Filtering Todos',
    description: 'Using Reselect for filtered lists',
    category: 'reselect',
    parent: 'reselect'
  }
];

// Replace the separate ConceptTable component with a more generic version that handles categories
const ConceptTable = ({ allConcepts }) => {
  // Group the concepts by category
  const groupedConcepts = allConcepts.reduce((acc, concept) => {
    if (!acc[concept.category]) {
      acc[concept.category] = [];
    }
    acc[concept.category].push(concept);
    return acc;
  }, {});

  // Define the display order and labels for categories
  const categoryOrder = ['core', 'middleware', 'advanced', 'normalization', 'reselect', 'implementation'];
  const categoryLabels = {
    core: 'Core Redux Concepts',
    middleware: 'Middleware Solutions',
    advanced: 'Advanced Concepts',
    normalization: 'Normalization Techniques',
    reselect: 'Reselect Techniques',
    implementation: 'Advanced Implementation Patterns'
  };

  return (
    <div className="unified-concepts-table">
      <table>
        <thead>
          <tr>
            <th>Concept</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {categoryOrder.map(category => {
            const conceptsInCategory = groupedConcepts[category] || [];
            if (conceptsInCategory.length === 0) return null;
            
            return (
              <React.Fragment key={category}>
                <tr className="category-header">
                  <td colSpan="3">{categoryLabels[category]}</td>
                </tr>
                {conceptsInCategory.map(item => (
                  <tr key={item.id} className="concept-row">
                    <td>
                      <Link 
                        to={item.parent 
                          ? `/concepts/${item.parent}/${item.id}` 
                          : `/concepts/${item.id}`} 
                        className="concept-link"
                      >
                        {item.concept}
                      </Link>
                    </td>
                    <td>{item.description}</td>
                    <td>{categoryLabels[item.category]}</td>
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const HomePage = () => {
  // Combine all concepts into a single array for the unified table
  const allConcepts = [
    ...coreReduxConcepts,
    ...advancedReduxTopics,
    ...normalizationTopics,
    ...reselectTopics
  ];

  return (
    <div className="homepage-container">
      <h2 className="homepage-header">Learning Redux</h2>
      <p className="homepage-intro">This is a simple application demonstrating Redux concepts.</p>
      
      {/* Unified table with all concepts */}
      <ConceptTable allConcepts={allConcepts} />
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            {/* Existing routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/concepts/actions" element={<ActionsComponent />} />
            <Route path="/concepts/reducers" element={<ReducersComponent />} />
            <Route path="/concepts/store" element={<StoreComponent />} />
            <Route path="/concepts/hooks" element={<HooksComponent />} />
            <Route path="/concepts/middleware" element={<MiddlewareComponent />} />
            <Route path="/concepts/thunks" element={<ThunksComponent />} />
            <Route path="/concepts/redux-thunk" element={<ReduxThunkComponent />} />
            <Route path="/concepts/redux-saga" element={<ReduxSagaComponent />} />
            <Route path="/concepts/redux-observable" element={<ReduxObservableComponent />} />
            
            {/* Normalization Routes */}
            <Route path="/concepts/normalization" element={<NormalizationComponent />} />
            <Route path="/concepts/normalization/manual-normalization" element={<ManualNormalizationComponent />} />
            <Route path="/concepts/normalization/normalizr" element={<NormalizrComponent />} />
            <Route path="/concepts/normalization/entity-adapter" element={<EntityAdapterComponent />} />
            
            {/* Reselect Routes */}
            <Route path="/concepts/reselect" element={<ReselectComponent />} />
            <Route path="/concepts/reselect/basic-reselect" element={<BasicReselectComponent />} />
            <Route path="/concepts/reselect/parameterized-selectors" element={<ParameterizedSelectorsComponent />} />
            <Route path="/concepts/reselect/filtering-todos" element={<FilteringTodosComponent />} />

            {/* Advanced Topics Routes */}
            <Route path="/concepts/re-reselect" element={<ReReselectComponent />} />
            <Route path="/concepts/dynamic-reducers" element={<DynamicReducersComponent />} />
            <Route path="/concepts/redux-toolkit" element={<ReduxToolkitComponent />} />
            <Route path="/concepts/immutable-patterns" element={<ImmutablePatternsComponent />} />
            <Route path="/concepts/testing-redux" element={<TestingReduxComponent />} />
            <Route path="/concepts/typescript" element={<TypeScriptIntegrationComponent />} />
            <Route path="/concepts/ssr" element={<SSRReduxComponent />} />
            
            {/* New Topic Routes */}
            <Route path="/concepts/entity-relationships" element={<EntityRelationshipsComponent />} />
            <Route path="/concepts/websockets" element={<WebSocketsComponent />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
