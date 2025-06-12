import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import store, { persistor } from './redux/store';
import Layout from './components/Layout';
import App from './App';
import './index.css';
import './styles.css';
// Add import for specialized patterns CSS
import './components/SpecializedPatterns/specializedPatterns.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Layout>
          <App />
        </Layout>
      </Router>
    </PersistGate>
  </Provider>
);
