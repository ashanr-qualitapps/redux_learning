import React from 'react';
import { CodeExercise, Quiz } from './InteractiveExercises';
import { ReduxFlowDiagram } from './VisualLearningAids';
import { HomeButton, BackButton } from './NavigationButtons';

export const LearningImprovementsComponent = () => {
  // Scope for react-live
  const scope = {
    React
  };
  
  const debuggingExerciseCode = `
// This Redux reducer has bugs. Can you fix them?
const initialState = {
  count: 0,
  lastAction: null
};

function buggyReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      // Bug 1: Mutating state directly
      state.count = state.count + 1;
      return state;
      
    case 'DECREMENT':
      // Bug 2: Missing return statement
      if (state.count > 0) {
        return {
          ...state,
          count: state.count - 1,
          lastAction: action.type
        };
      }
      
    case 'RESET':
      // Bug 3: Incomplete state reset
      return {
        count: 0
      };
      
    default:
      return state;
  }
}

// Render example to test the reducer
render(() => {
  const [state, setState] = React.useState({ count: 0, lastAction: null });
  
  const dispatch = (action) => {
    const newState = buggyReducer(state, action);
    setState(newState);
  };
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Last Action: {state.lastAction || 'None'}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        Decrement
      </button>
      <button onClick={() => dispatch({ type: 'RESET' })}>
        Reset
      </button>
    </div>
  );
});
`;

  const debuggingSolutionCode = `
// This Redux reducer has bugs. Can you fix them?
const initialState = {
  count: 0,
  lastAction: null
};

function buggyReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      // Fixed Bug 1: Create new state object instead of mutating
      return {
        ...state,
        count: state.count + 1,
        lastAction: action.type
      };
      
    case 'DECREMENT':
      // Fixed Bug 2: Added return for default case when count is 0
      if (state.count > 0) {
        return {
          ...state,
          count: state.count - 1,
          lastAction: action.type
        };
      }
      return {
        ...state,
        lastAction: action.type
      };
      
    case 'RESET':
      // Fixed Bug 3: Preserve all state properties
      return {
        ...state,
        count: 0,
        lastAction: action.type
      };
      
    default:
      return state;
  }
}

// Render example to test the reducer
render(() => {
  const [state, setState] = React.useState({ count: 0, lastAction: null });
  
  const dispatch = (action) => {
    const newState = buggyReducer(state, action);
    setState(newState);
  };
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Last Action: {state.lastAction || 'None'}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        Decrement
      </button>
      <button onClick={() => dispatch({ type: 'RESET' })}>
        Reset
      </button>
    </div>
  );
});
`;

  return (
    <div className="section">
      <HomeButton />
      <h2>Learning Experience Improvements</h2>
      <p>
        This page demonstrates various improvements to enhance the Redux learning experience:
      </p>
      
      <div className="subsection">
        <h3>1. Visual Learning Aids</h3>
        <p>
          Visual diagrams help understand complex concepts like Redux data flow:
        </p>
        <ReduxFlowDiagram />
        <p>
          Visual aids can help learners grasp difficult concepts more quickly than text alone.
          Additional diagrams could include:
        </p>
        <ul>
          <li>State tree visualizations</li>
          <li>Component hierarchy with Redux connections</li>
          <li>Middleware pipeline illustrations</li>
        </ul>
      </div>
      
      <div className="subsection">
        <h3>2. Interactive Exercises</h3>
        <p>
          Hands-on practice reinforces learning. Try fixing the bugs in this reducer:
        </p>
        
        <CodeExercise
          title="Debugging Redux Reducers"
          description="This reducer contains three common bugs. Find and fix them."
          initialCode={debuggingExerciseCode}
          solutionCode={debuggingSolutionCode}
          scope={scope}
          tasks={[
            "Fix the state mutation in INCREMENT case",
            "Fix the missing return statement in DECREMENT case",
            "Fix the incomplete state reset in RESET case"
          ]}
        />
        
        <p>
          More interactive exercises could include:
        </p>
        <ul>
          <li>Implementing selectors for specific data needs</li>
          <li>Creating action creators and thunks</li>
          <li>Optimizing Redux performance</li>
          <li>Implementing middleware for specific use cases</li>
        </ul>
      </div>
      
      <div className="subsection">
        <h3>3. Knowledge Assessment</h3>
        <p>
          Short quizzes help reinforce key concepts:
        </p>
        
        <Quiz
          question="What is the primary purpose of middleware in Redux?"
          options={[
            "To create actions that update the store",
            "To intercept actions before they reach the reducer",
            "To connect React components to the Redux store",
            "To persist Redux state across page reloads"
          ]}
          correctAnswerIndex={1}
        />
        
        <p>
          A comprehensive learning system could include:
        </p>
        <ul>
          <li>End-of-section quizzes</li>
          <li>Practical coding challenges</li>
          <li>Progress tracking across topics</li>
          <li>Certification upon completion</li>
        </ul>
      </div>
      
      <div className="subsection">
        <h3>4. Comparison with Alternatives</h3>
        <p>
          Understanding how Redux compares to alternatives helps developers make informed decisions:
        </p>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Redux</th>
              <th>Context API</th>
              <th>MobX</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Learning Curve</td>
              <td>Steeper</td>
              <td>Low</td>
              <td>Medium</td>
            </tr>
            <tr>
              <td>Boilerplate</td>
              <td>More (less with Redux Toolkit)</td>
              <td>Minimal</td>
              <td>Minimal</td>
            </tr>
            <tr>
              <td>Debugging</td>
              <td>Excellent (time travel)</td>
              <td>Basic</td>
              <td>Good</td>
            </tr>
            <tr>
              <td>Scalability</td>
              <td>Excellent</td>
              <td>Limited</td>
              <td>Good</td>
            </tr>
            <tr>
              <td>Middleware</td>
              <td>Built-in support</td>
              <td>Manual implementation</td>
              <td>Through reactions</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="subsection">
        <h3>5. Debugging Redux Applications</h3>
        <p>
          Add a section specifically on debugging Redux applications, covering:
        </p>
        <ul>
          <li>Using Redux DevTools</li>
          <li>Time travel debugging</li>
          <li>Action tracing</li>
          <li>Common Redux bugs and how to fix them</li>
          <li>Performance profiling</li>
        </ul>
        <div className="example-box">
          <h4>Redux DevTools Example:</h4>
          <pre>{`
// Enable Redux DevTools using Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  // DevTools Extension is enabled by default in development
  // You can explicitly control it:
  devTools: process.env.NODE_ENV !== 'production',
});`}</pre>
        </div>
      </div>
      
      <div className="subsection">
        <h3>6. Real-World Case Studies</h3>
        <p>
          Add practical examples of Redux in real-world applications:
        </p>
        <ul>
          <li>E-commerce site (cart management, product filtering)</li>
          <li>Social media application (feed, notifications)</li>
          <li>Dashboard application (multiple data sources)</li>
          <li>Form-heavy application (complex form state)</li>
        </ul>
        <p>
          For each case study, cover:
        </p>
        <ul>
          <li>State structure design decisions</li>
          <li>Performance considerations</li>
          <li>Common patterns and solutions</li>
          <li>Lessons learned</li>
        </ul>
      </div>
      
      <div className="subsection">
        <h3>7. Learning Path Customization</h3>
        <p>
          Different learners have different needs. Consider providing learning paths for:
        </p>
        <ul>
          <li><strong>Beginners:</strong> Focus on core concepts and simple implementations</li>
          <li><strong>Intermediate:</strong> Patterns, best practices, and optimizations</li>
          <li><strong>Advanced:</strong> Complex state management, performance, and edge cases</li>
          <li><strong>Migration:</strong> Moving from other state management solutions to Redux</li>
        </ul>
      </div>
      
      <div className="subsection">
        <h3>8. Mobile-Friendly Learning</h3>
        <p>
          Ensure the learning experience works well on mobile devices:
        </p>
        <ul>
          <li>Responsive design for all content</li>
          <li>Touch-friendly interactive elements</li>
          <li>Simplified code examples that fit smaller screens</li>
          <li>Progress saving across devices</li>
        </ul>
      </div>
      
      <div className="subsection">
        <h3>9. Accessibility Improvements</h3>
        <p>
          Make learning accessible to all users:
        </p>
        <ul>
          <li>Proper heading structure for screen readers</li>
          <li>Alternative text for diagrams and visual aids</li>
          <li>Keyboard navigation for all interactive elements</li>
          <li>Sufficient color contrast</li>
          <li>Text resizing without loss of functionality</li>
        </ul>
      </div>
      <BackButton />
    </div>
  );
};
