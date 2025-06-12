import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Routes, Route } from 'react-router-dom';
import store, { persistor } from './store';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import { RTKQueryComponent } from './components/RTKQueryComponent';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <div className="App">
          <header className="App-header">
            <h1>Redux</h1>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Counter />} />
              <Route path="/todos" element={<TodoList />} />
              <Route path="/concepts/rtk-query" element={<RTKQueryComponent />} />
            </Routes>
          </main>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
