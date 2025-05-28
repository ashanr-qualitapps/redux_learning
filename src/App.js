import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Redux Demo App</h1>
        </header>
        <main>
          <Counter />
          <TodoList />
        </main>
      </div>
    </Provider>
  );
}

export default App;
