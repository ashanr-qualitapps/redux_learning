import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
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
            <Counter />
            <TodoList />
          </main>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
