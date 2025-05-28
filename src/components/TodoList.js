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
      
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      
      <div style={{ marginTop: '1rem' }}>
        {todos.length === 0 ? (
          <p>No todos yet! Add some above.</p>
        ) : (
          <ul>
            {todos.map(todo => (
              <li key={todo.id} className="todo-item">
                <span
                  className={todo.completed ? 'completed' : ''}
                  onClick={() => dispatch(toggleTodo(todo.id))}
                  style={{ cursor: 'pointer' }}
                >
                  {todo.text}
                </span>
                <button onClick={() => dispatch(removeTodo(todo.id))}>
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
