import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import store, { persistor } from './redux/store';
import Layout from './components/Layout';
import { ActionsComponent, ReducersComponent, StoreComponent, HooksComponent, ThunksComponent, MiddlewareComponent, ReduxThunkComponent, ReduxSagaComponent, ReduxObservableComponent } from './components/TopicComponents';
import { NormalizationComponent, ManualNormalizationComponent, NormalizrComponent, EntityAdapterComponent } from './components/NormalizationComponents';
import { ReselectComponent, BasicReselectComponent, ParameterizedSelectorsComponent, FilteringTodosComponent } from './components/ReselectComponents';
import { ReduxPersistComponent } from './components/PersistComponents';
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
import { ReduxArchitecturePatternsComponent } from './components/ArchitecturePatternsComponent';

// Add category field to core concepts for filtering and display
const coreReduxConcepts = [
  {
    id: 'store',
    concept: 'Store',
    description: 'The object that brings actions and reducers together',
    category: 'core',
    order: 1
  },
  {
    id: 'actions',
    concept: 'Actions and Action Creators',
    description: 'Functions that create actions to update state',
    category: 'core',
    order: 2
  },
  {
    id: 'reducers',
    concept: 'Reducers',
    description: 'Functions that determine how state changes',
    category: 'core',
    order: 3
  },
  {
    id: 'hooks',
    concept: 'React-Redux integration with hooks',
    description: 'Using React hooks to interact with Redux store',
    category: 'core',
    order: 4
  },
  {
    id: 'middleware',
    concept: 'Middleware',
    description: 'Extending Redux with custom functionality',
    category: 'core',
    order: 5
  },
  {
    id: 'thunks',
    concept: 'Async operations using Redux Thunk middleware',
    description: 'Handling asynchronous logic in Redux',
    category: 'core',
    order: 6
  },
  {
    id: 'redux-persist',
    concept: 'Redux Persist',
    description: 'Persistently store Redux state across application sessions',
    category: 'core',
    date: '2025-06-02',
    order: 12
  }
];

// Add category field to advanced topics
const advancedReduxTopics = [
  {
    id: 'redux-thunk',
    concept: 'Redux-Thunk in depth',
    description: 'Function-based middleware for async actions',
    category: 'middleware',
    order: 7
  },
  {
    id: 'redux-saga',
    concept: 'Redux Saga',
    description: 'Generator-based middleware for complex async flows',
    category: 'middleware',
    order: 8
  },
  {
    id: 'redux-observable',
    concept: 'Redux Observable',
    description: 'RxJS-powered middleware for reactive programming',
    category: 'middleware',
    order: 9
  },
  {
    id: 'normalization',
    concept: 'Normalization of State',
    description: 'Techniques for structuring state for efficiency',
    category: 'advanced',
    order: 10
  },
  {
    id: 'reselect',
    concept: 'Reselect and Memoization',
    description: 'Performance optimization with memoized selectors',
    category: 'advanced',
    order: 11
  },
  {
    id: 'redux-toolkit',
    concept: 'Redux Toolkit',
    description: 'Official, opinionated toolset for Redux development',
    category: 'implementation',
    order: 13
  },
  {
    id: 'immutable-patterns',
    concept: 'Immutable Update Patterns',
    description: 'Techniques for maintaining state immutability',
    category: 'implementation',
    order: 14
  },
  {
    id: 're-reselect',
    concept: 'Advanced: Caching with re-reselect',
    description: 'Enhanced selector caching for complex applications',
    category: 'advanced',
    order: 15
  },
  {
    id: 'architecture-patterns',
    concept: 'Redux Architecture Patterns',
    description: 'Effective ways to organize and structure your Redux codebase for better maintainability',
    category: 'advanced',
    date: '2025-06-03',
    order: 16
  },
  {
    id: 'entity-relationships',
    concept: 'Entity Relationships',
    description: 'Managing complex entity relationships in a normalized state',
    category: 'advanced',
    date: '2025-05-29',
    order: 17
  },
  {
    id: 'testing-redux',
    concept: 'Testing Redux Logic',
    description: 'Best practices for testing Redux code',
    category: 'implementation',
    order: 18
  },
  {
    id: 'typescript',
    concept: 'Integration with TypeScript',
    description: 'Adding static typing to Redux applications',
    category: 'implementation',
    order: 19
  },
  {
    id: 'dynamic-reducers',
    concept: 'Code Splitting and Dynamic Reducers',
    description: 'Loading Redux modules on demand',
    category: 'implementation',
    order: 20
  },
  {
    id: 'ssr',
    concept: 'Server-Side Rendering with Redux',
    description: 'Rendering Redux apps on the server',
    category: 'implementation',
    order: 21
  },
  {
    id: 'websockets',
    concept: 'Redux with WebSockets',
    description: 'Using Redux with real-time data via WebSockets',
    category: 'middleware',
    date: '2025-05-29',
    order: 22
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
  // Sort concepts by order property
  const sortedConcepts = [...allConcepts].sort((a, b) => (a.order || 100) - (b.order || 100));
  
  // Group the concepts by category
  const groupedConcepts = sortedConcepts.reduce((acc, concept) => {
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
                      {item.date && <span className="topic-date">{item.date}</span>}
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
      <ConceptTable allConcepts={allConcepts} />
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
              
              {/* Add Redux Persist Route */}
              <Route path="/concepts/redux-persist" element={<ReduxPersistComponent />} />
              
              {/* Add Architecture Patterns Route */}
              <Route path="/concepts/architecture-patterns" element={<ReduxArchitecturePatternsComponent />} />
            </Routes>
          </Layout>
        </Router>
      </PersistGate>
    </Provider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
