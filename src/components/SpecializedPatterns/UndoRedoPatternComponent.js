import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { HomeButton, BackButton, NextButton } from '../NavigationButtons';

export const UndoRedoPatternComponent = () => {
  const scope = { React };
  
  const basicUndoRedoCode = `
import { createAction, createReducer } from '@reduxjs/toolkit';

// Define the actions
const increment = createAction('counter/increment');
const decrement = createAction('counter/decrement');
const undo = createAction('counter/undo');
const redo = createAction('counter/redo');

// Create an initial state with history
const initialState = {
  present: { value: 0 },
  past: [],
  future: []
};

// Create the reducer
const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state) => {
      // Save current state to past
      state.past.push({ value: state.present.value });
      // Update present
      state.present.value += 1;
      // Clear future when a new action is performed
      state.future = [];
    })
    .addCase(decrement, (state) => {
      state.past.push({ value: state.present.value });
      state.present.value -= 1;
      state.future = [];
    })
    .addCase(undo, (state) => {
      // Make sure we have a past state to restore
      if (state.past.length === 0) return;
      
      // Move present to future
      state.future.unshift(state.present);
      // Set present to the last item from past
      state.present = state.past.pop();
    })
    .addCase(redo, (state) => {
      // Make sure we have a future state to restore
      if (state.future.length === 0) return;
      
      // Move present to past
      state.past.push(state.present);
      // Set present to the first item from future
      state.present = state.future.shift();
    });
});

// Component using the undo/redo functionality
function UndoRedoCounter() {
  const [state, setState] = React.useState(initialState);
  
  const dispatch = (action) => {
    // Simulate dispatch behavior
    if (action.type === increment.type) {
      setState(prevState => {
        return {
          past: [...prevState.past, { value: prevState.present.value }],
          present: { value: prevState.present.value + 1 },
          future: []
        };
      });
    } else if (action.type === decrement.type) {
      setState(prevState => {
        return {
          past: [...prevState.past, { value: prevState.present.value }],
          present: { value: prevState.present.value - 1 },
          future: []
        };
      });
    } else if (action.type === undo.type) {
      setState(prevState => {
        if (prevState.past.length === 0) return prevState;
        const newPast = [...prevState.past];
        const previous = newPast.pop();
        return {
          past: newPast,
          present: previous,
          future: [prevState.present, ...prevState.future]
        };
      });
    } else if (action.type === redo.type) {
      setState(prevState => {
        if (prevState.future.length === 0) return prevState;
        const [next, ...newFuture] = prevState.future;
        return {
          past: [...prevState.past, prevState.present],
          present: next,
          future: newFuture
        };
      });
    }
  };
  
  return (
    <div>
      <h3>Count: {state.present.value}</h3>
      <div>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button 
          onClick={() => dispatch(undo())}
          disabled={state.past.length === 0}
        >
          Undo
        </button>
        <button 
          onClick={() => dispatch(redo())}
          disabled={state.future.length === 0}
        >
          Redo
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <div><strong>Past:</strong> {state.past.map(p => p.value).join(', ')}</div>
        <div><strong>Present:</strong> {state.present.value}</div>
        <div><strong>Future:</strong> {state.future.map(f => f.value).join(', ')}</div>
      </div>
    </div>
  );
}

render(<UndoRedoCounter />);
`;

  return (
    <div className="section">
      <HomeButton />
      <h2>Undo/Redo Pattern in Redux</h2>
      <p>
        The Undo/Redo pattern allows users to step back through previous states and then forward again,
        providing a powerful way to recover from mistakes or explore alternate paths.
      </p>
      
      <div className="example-box">
        <h3>Basic Implementation</h3>
        <p>
          The core idea is to maintain three pieces of state: <code>past</code>, <code>present</code>, and <code>future</code>.
          Each action adds the current state to <code>past</code> before updating <code>present</code>.
        </p>
        
        <LiveProvider code={basicUndoRedoCode} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>
      
      <h3>Best Practices</h3>
      <ul>
        <li><strong>Limit History Size:</strong> Implement a maximum history size to prevent memory issues</li>
        <li><strong>Group Actions:</strong> Consider batching rapid changes into a single undo step</li>
        <li><strong>Clear Future on New Actions:</strong> When user performs a new action after undoing, clear the future stack</li>
        <li><strong>Use Higher-Order Reducers:</strong> The pattern can be implemented as a reusable higher-order reducer</li>
      </ul>
      
      <BackButton />
      <NextButton to="/concepts/bff-pattern" label="Next: BFF Pattern" />
    </div>
  );
};

export default UndoRedoPatternComponent;
