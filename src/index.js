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

const coreReduxConcepts = [
  {
    id: 'actions',
    concept: 'Actions and Action Creators',
    description: 'Functions that create actions to update state',
  },
  {
    id: 'reducers',
    concept: 'Reducers',
    description: 'Functions that determine how state changes',
  },
  {
    id: 'store',
    concept: 'Store',
    description: 'The object that brings actions and reducers together',
  },
  {
    id: 'hooks',
    concept: 'React-Redux integration with hooks',
    description: 'Using React hooks to interact with Redux store',
  },
  {
    id: 'middleware',
    concept: 'Middleware',
    description: 'Extending Redux with custom functionality',
  },
  {
    id: 'thunks',
    concept: 'Async operations using Redux Thunk middleware',
    description: 'Handling asynchronous logic in Redux',
  },
];

const advancedReduxTopics = [
  {
    id: 'redux-thunk',
    concept: 'Redux-Thunk in depth',
    description: 'Function-based middleware for async actions',
  },
  {
    id: 'redux-saga',
    concept: 'Redux Saga',
    description: 'Generator-based middleware for complex async flows',
  },
  {
    id: 'redux-observable',
    concept: 'Redux Observable',
    description: 'RxJS-powered middleware for reactive programming',
  },
  {
    id: 'normalization',
    concept: 'Normalization of State',
    description: 'Techniques for structuring state for efficiency',
  },
  {
    id: 'reselect',
    concept: 'Reselect and Memoization',
    description: 'Performance optimization with memoized selectors',
  }
];

const normalizationTopics = [
  {
    id: 'manual-normalization',
    concept: 'Manual Normalized State Example',
    description: 'How to structure normalized state manually',
  },
  {
    id: 'normalizr',
    concept: 'Using Normalizr Library',
    description: 'Simplifying normalization with Normalizr',
  },
  {
    id: 'entity-adapter',
    concept: 'Redux Toolkit: createEntityAdapter',
    description: 'Modern approach to managing normalized entities',
  }
];

const reselectTopics = [
  {
    id: 'basic-reselect',
    concept: 'Basic Reselect Example',
    description: 'Introduction to memoized selectors',
  },
  {
    id: 'parameterized-selectors',
    concept: 'Selectors with Parameters',
    description: 'Creating selectors that accept arguments',
  },
  {
    id: 'filtering-todos',
    concept: 'Practical Example: Filtering Todos',
    description: 'Using Reselect for filtered lists',
  }
];

const ConceptTable = ({ concepts, title }) => (
  <div className="section">
    <h3>{title}</h3>
    <table>
      <thead>
        <tr>
          <th>Concept</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {concepts.map((item) => (
          <tr key={item.id}>
            <td>
              <Link to={`/concepts/${item.id}`} className="concept-link">
                {item.concept}
              </Link>
            </td>
            <td>{item.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const HomePage = () => {
  return (
    <>
      <h2>Welcome to Redux Demo</h2>
      <p>This is a simple application demonstrating Redux core concepts.</p>
      
      <ConceptTable concepts={coreReduxConcepts} title="Redux Core Concepts" />
      <ConceptTable concepts={advancedReduxTopics} title="Advanced Redux Topics" />
      
      {/* Add sub-tables for the new topics */}
      <div className="section">
        <h3>Normalization of State</h3>
        <p>Different approaches to structure your Redux store for efficiency with related data</p>
        <table>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {normalizationTopics.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link to={`/concepts/normalization/${item.id}`} className="concept-link">
                    {item.concept}
                  </Link>
                </td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Reselect and Memoization</h3>
        <p>Performance optimization techniques for Redux applications</p>
        <table>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {reselectTopics.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link to={`/concepts/reselect/${item.id}`} className="concept-link">
                    {item.concept}
                  </Link>
                </td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
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
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
