import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import Layout from './components/Layout';
import './index.css';

const reduxConcepts = [
  {
    concept: 'Actions and Action Creators',
    description: 'Functions that create actions to update state',
  },
  {
    concept: 'Reducers',
    description: 'Functions that determine how state changes',
  },
  {
    concept: 'Store',
    description: 'The object that brings actions and reducers together',
  },
  {
    concept: 'React-Redux integration with hooks',
    description: 'Using React hooks to interact with Redux store',
  },
  {
    concept: 'Async operations using Redux Thunk middleware',
    description: 'Handling asynchronous logic in Redux',
  },
];

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <h2>Welcome to Redux Demo</h2>
        <p>This is a simple application demonstrating Redux core concepts.</p>
        <h3>Redux Core Concepts</h3>
        <table>
          <thead>
            <tr>
              <th>Concept</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {reduxConcepts.map((item) => (
              <tr key={item.concept}>
                <td>{item.concept}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </Provider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
