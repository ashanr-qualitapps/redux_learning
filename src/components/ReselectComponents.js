import React, { useState } from 'react';
import { createSelector } from 'reselect';

// Main Reselect Component
export const ReselectComponent = () => {
  return (
    <div className="section">
      <h2>Reselect and Memoization</h2>
      <p>
        Reselect is a library for creating memoized selector functions. Memoization helps
        prevent unnecessary recalculations when the underlying state hasn't changed.
      </p>

      <div className="example-box">
        <h3>Why Use Memoized Selectors?</h3>
        <ul>
          <li><strong>Performance:</strong> Prevents expensive calculations when data hasn't changed</li>
          <li><strong>Consistent:</strong> Returns the same reference if inputs haven't changed (important for React's rendering cycle)</li>
          <li><strong>Composable:</strong> You can build complex selectors from simpler ones</li>
          <li><strong>Testable:</strong> Selectors are pure functions and easy to test</li>
        </ul>
      </div>

      <p>Click on a topic below to learn more about Reselect:</p>
      <ul>
        <li><a className="concept-link" href="/concepts/reselect/basic-reselect">Basic Reselect Example</a></li>
        <li><a className="concept-link" href="/concepts/reselect/parameterized-selectors">Selectors with Parameters</a></li>
        <li><a className="concept-link" href="/concepts/reselect/filtering-todos">Practical Example: Filtering Todos</a></li>
      </ul>
    </div>
  );
};

// Basic Reselect Example
export const BasicReselectComponent = () => {
  return (
    <div className="section">
      <h2>Basic Reselect Example</h2>
      <p>
        Reselect allows you to create memoized selector functions that only recompute when their inputs change.
      </p>

      <div className="example-box">
        <h3>Without Reselect</h3>
        <pre>{`// This will recalculate on every render, even if state.todos hasn't changed
const getTodosByUser = state => {
  console.log("Computing todos by user - expensive operation!");
  return state.todos.filter(todo => todo.userId === state.currentUserId);
};

// In a component
const UserTodos = () => {
  // This selector runs on every state change, even unrelated ones
  const userTodos = useSelector(getTodosByUser);
  
  return (
    <TodoList todos={userTodos} />
  );
};`}</pre>
      </div>

      <div className="example-box">
        <h3>With Reselect</h3>
        <pre>{`import { createSelector } from 'reselect';

// These are your input selectors
const getTodos = state => state.todos;
const getCurrentUserId = state => state.currentUserId;

// createSelector memoizes the result
const getTodosByUser = createSelector(
  [getTodos, getCurrentUserId],
  (todos, userId) => {
    console.log("Computing todos by user - expensive operation!");
    return todos.filter(todo => todo.userId === userId);
  }
);

// In a component
const UserTodos = () => {
  // This will only recalculate when todos or currentUserId changes
  const userTodos = useSelector(getTodosByUser);
  
  return (
    <TodoList todos={userTodos} />
  );
};`}</pre>
      </div>

      <h3>How Memoization Works</h3>
      <ol>
        <li>Reselect caches the most recent arguments passed to the selector.</li>
        <li>If the arguments are the same as the previous call, it returns the previously computed result.</li>
        <li>If any argument changes, it reruns the computation and saves the new result.</li>
      </ol>

      <p>This greatly improves performance in Redux applications by avoiding unnecessary recalculations.</p>
    </div>
  );
};

// Parameterized Selectors
export const ParameterizedSelectorsComponent = () => {
  return (
    <div className="section">
      <h2>Selectors with Parameters</h2>
      <p>
        Sometimes you need to create selectors that accept parameters beyond just the Redux state.
        Here are a few ways to handle this with Reselect.
      </p>

      <div className="example-box">
        <h3>Approach 1: Factory Function</h3>
        <pre>{`import { createSelector } from 'reselect';

// This is a factory function that creates a selector
const makeGetTodosByUser = () => {
  return createSelector(
    [
      state => state.todos,
      (state, userId) => userId  // Second argument comes from selector call
    ],
    (todos, userId) => todos.filter(todo => todo.userId === userId)
  );
};

// In a component
const UserTodoList = ({ userId }) => {
  // Create a selector instance for this specific component
  const getTodosByUser = React.useMemo(
    () => makeGetTodosByUser(),
    []
  );
  
  // Pass userId as a parameter to the selector
  const userTodos = useSelector(state => getTodosByUser(state, userId));
  
  return (
    <TodoList todos={userTodos} />
  );
};`}</pre>
      </div>

      <div className="example-box">
        <h3>Approach 2: Using reselect's createStructuredSelector</h3>
        <pre>{`import { createSelector, createStructuredSelector } from 'reselect';

const getUsers = state => state.users;
const getTodos = state => state.todos;

// Create selector that maps each user to their todos
const getUsersWithTodos = createSelector(
  [getUsers, getTodos],
  (users, todos) => {
    return users.map(user => ({
      ...user,
      todos: todos.filter(todo => todo.userId === user.id)
    }));
  }
);

// Use structured selector to easily combine multiple selectors
const dashboardSelectors = createStructuredSelector({
  usersWithTodos: getUsersWithTodos,
  totalUsers: state => state.users.length,
  completedTodos: state => state.todos.filter(todo => todo.completed).length
});

// In a component
const Dashboard = () => {
  // Get all values with a single selector call
  const { usersWithTodos, totalUsers, completedTodos } = useSelector(dashboardSelectors);
  
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Users: {totalUsers}</p>
      <p>Completed Todos: {completedTodos}</p>
      {/* Render users with their todos */}
    </div>
  );
};`}</pre>
      </div>
    </div>
  );
};

// Practical Example: Filtering Todos
export const FilteringTodosComponent = () => {
  const [filter, setFilter] = useState('all');

  // Example todo state (would normally come from Redux)
  const initialTodos = [
    { id: 1, text: 'Learn Redux', completed: true },
    { id: 2, text: 'Learn Reselect', completed: false },
    { id: 3, text: 'Master selectors', completed: false }
  ];

  // Define our selectors
  const getTodos = () => initialTodos; // This selector now directly returns the local initialTodos
  const getFilter = () => filter; // This selector now directly returns the local filter state
  
  // Create a memoized selector for filtered todos
  const getFilteredTodos = createSelector(
    [getTodos, getFilter],
    (todos, filter) => {
      console.log('Computing filtered todos');
      switch (filter) {
        case 'completed':
          return todos.filter(todo => todo.completed);
        case 'active':
          return todos.filter(todo => !todo.completed);
        default:
          return todos;
      }
    }
  );

  // Get the filtered todos using the selector
  const filteredTodos = getFilteredTodos();

  return (
    <div className="section">
      <h2>Practical Example: Filtering Todos</h2>
      <p>
        This example demonstrates how to use Reselect to efficiently filter a list of todos.
        Notice that "Computing filtered todos" only logs when you change the filter.
      </p>

      <div>
        <button 
          onClick={() => setFilter('all')} 
          className={filter === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')} 
          className={filter === 'active' ? 'active' : ''}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')} 
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            {todo.text}
          </li>
        ))}
      </ul>

      <div className="example-box">
        <h3>Code Implementation</h3>
        <pre>{`import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

// Define our basic selectors
const getTodos = state => state.todos;
const getVisibilityFilter = state => state.visibilityFilter;

// Create the memoized selector
const getVisibleTodos = createSelector(
  [getTodos, getVisibilityFilter],
  (todos, filter) => {
    console.log('Computing filtered todos');
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }
);

// In your component
const TodoList = () => {
  // This will only recalculate when todos or filter changes
  const filteredTodos = useSelector(getVisibleTodos);
  const dispatch = useDispatch();
  
  return (
    <div>
      <div>
        <button onClick={() => dispatch(setVisibilityFilter('all'))}>
          All
        </button>
        <button onClick={() => dispatch(setVisibilityFilter('active'))}>
          Active
        </button>
        <button onClick={() => dispatch(setVisibilityFilter('completed'))}>
          Completed
        </button>
      </div>
      
      <ul>
        {filteredTodos.map(todo => (
          <li 
            key={todo.id}
            onClick={() => dispatch(toggleTodo(todo.id))}
            className={todo.completed ? 'completed' : ''}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};`}</pre>
      </div>

      <h3>Performance Implications</h3>
      <ul>
        <li>Without Reselect: The filtering would run on every render</li>
        <li>With Reselect: Filtering only runs when todos or filter changes</li>
        <li>Benefit increases with larger lists or more expensive calculations</li>
      </ul>
    </div>
  );
};

export const reselectTopics = [
  {
    id: 'basic-reselect',
    concept: 'Basic Reselect Example',
    description: 'Introduction to memoized selectors',
    category: 'reselect',
    parent: 'reselect',
    order: 11.1
  },
  {
    id: 'parameterized-selectors',
    concept: 'Selectors with Parameters',
    description: 'Creating selectors that accept arguments',
    category: 'reselect',
    parent: 'reselect',
    order: 11.2
  },
  {
    id: 'filtering-todos',
    concept: 'Practical Example: Filtering Todos',
    description: 'Using Reselect for filtered lists',
    category: 'reselect',
    parent: 'reselect',
    order: 11.3
  }
];
