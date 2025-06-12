import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from '../redux/actions';

const TodoList = () => {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="section">
      <h2>Todo List Example</h2>
      
      <div className="todo-input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo"
          className="todo-input"
        />
        <button onClick={handleAddTodo} className="add-todo-button">Add Todo</button>
      </div>
      
      <div className="todo-list-container" style={{ marginTop: '1rem' }}>
        {todos.length === 0 ? (
          <p className="no-todos-message">No todos yet! Add some above.</p>
        ) : (
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className="todo-item">
                <span
                  className={todo.completed ? 'completed' : ''}
                  onClick={() => dispatch(toggleTodo(todo.id))}
                  style={{ cursor: 'pointer', flex: 1 }}
                >
                  {todo.text}
                </span>
                <button 
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="delete-todo-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div style={{ marginTop: '1rem' }}>
        <h3>Redux Concepts Demonstrated:</h3>
        <ul>
          <li>Managing complex state (array of objects)</li>
          <li>Multiple actions changing the same state slice</li>
          <li>Immutable update patterns in reducers</li>
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
