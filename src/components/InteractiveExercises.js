import React, { useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

// Exercise component with interactive code editing and feedback
export const CodeExercise = ({ 
  title, 
  description, 
  initialCode, 
  solutionCode, 
  scope, 
  tasks = [] 
}) => {
  const [code, setCode] = useState(initialCode);
  const [showSolution, setShowSolution] = useState(false);
  const [feedback, setFeedback] = useState(null);
  
  const checkSolution = () => {
    // This is a simple check - in a real app, you might want to do 
    // more sophisticated validation based on the specific exercise
    const userSolution = code.replace(/\s/g, '');
    const correctSolution = solutionCode.replace(/\s/g, '');
    
    if (userSolution === correctSolution) {
      setFeedback({
        type: 'success',
        message: 'Great job! Your solution is correct.'
      });
    } else {
      setFeedback({
        type: 'error',
        message: 'Not quite right. Try again or check the solution.'
      });
    }
  };
  
  return (
    <div className="exercise-container">
      <h3>{title}</h3>
      <p>{description}</p>
      
      {tasks.length > 0 && (
        <div className="tasks-list">
          <h4>Tasks:</h4>
          <ol>
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ol>
        </div>
      )}
      
      <LiveProvider 
        code={showSolution ? solutionCode : code} 
        scope={scope} 
        noInline={true}
      >
        <div className="live-editor-container">
          <LiveEditor 
            onChange={newCode => {
              setCode(newCode);
              setFeedback(null);
            }}
            disabled={showSolution}
          />
        </div>
        <LiveError className="live-error" />
        <LivePreview className="live-preview" />
      </LiveProvider>
      
      {feedback && (
        <div className={`exercise-feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}
      
      <div className="exercise-actions">
        <button onClick={checkSolution} disabled={showSolution}>
          Check Solution
        </button>
        <button 
          onClick={() => setShowSolution(!showSolution)}
        >
          {showSolution ? 'Hide Solution' : 'Show Solution'}
        </button>
        <button 
          onClick={() => {
            setCode(initialCode);
            setShowSolution(false);
            setFeedback(null);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// Quiz component for testing knowledge
export const Quiz = ({ question, options, correctAnswerIndex }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    setShowFeedback(false);
  };
  
  const checkAnswer = () => {
    setShowFeedback(true);
  };
  
  return (
    <div className="quiz-container">
      <div className="quiz-question">{question}</div>
      
      <div className="quiz-options">
        {options.map((option, index) => (
          <div 
            key={index}
            className={`quiz-option ${selectedOption === index ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(index)}
          >
            {option}
          </div>
        ))}
      </div>
      
      {showFeedback && selectedOption !== null && (
        <div className={`quiz-feedback ${selectedOption === correctAnswerIndex ? 'correct' : 'incorrect'}`}>
          {selectedOption === correctAnswerIndex 
            ? 'Correct! Well done.' 
            : `Incorrect. The correct answer is: ${options[correctAnswerIndex]}`}
        </div>
      )}
      
      <div className="quiz-actions">
        <button 
          onClick={checkAnswer} 
          disabled={selectedOption === null || showFeedback}
        >
          Check Answer
        </button>
        <button 
          onClick={() => {
            setSelectedOption(null);
            setShowFeedback(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// Visual comparison component for comparing concepts
export const ConceptComparison = ({ title, concepts }) => {
  return (
    <div className="comparison-section">
      <h3>{title}</h3>
      <div className="comparison-container">
        {concepts.map((concept, index) => (
          <div key={index} className="comparison-panel">
            <div className="comparison-title">{concept.title}</div>
            <div className="comparison-content">{concept.description}</div>
            {concept.code && (
              <pre className="comparison-code">{concept.code}</pre>
            )}
            {concept.benefits && (
              <>
                <h4>Benefits:</h4>
                <ul>
                  {concept.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </>
            )}
            {concept.drawbacks && (
              <>
                <h4>Drawbacks:</h4>
                <ul>
                  {concept.drawbacks.map((drawback, i) => (
                    <li key={i}>{drawback}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Learning path/progress tracker 
export const LearningPath = ({ topics, currentTopic, completedTopics }) => {
  return (
    <div className="learning-path">
      <h3 className="learning-path-title">Your Learning Journey</h3>
      <div className="learning-progress">
        <div 
          className="learning-progress-bar" 
          style={{ width: `${(completedTopics.length / topics.length) * 100}%` }} 
        />
      </div>
      <div className="learning-path-items">
        {topics.map((topic, index) => (
          <div 
            key={index} 
            className={`learning-path-item ${
              completedTopics.includes(topic.id) ? 'completed' : ''
            } ${currentTopic === topic.id ? 'active' : ''}`}
          >
            <span className="completion-marker"></span>
            <span>{topic.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example usage:
export const ExampleReduxExercise = () => {
  const exerciseCode = `
// Complete the reducer function to handle the ADD_TODO action
const initialState = {
  todos: []
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      // Your code here
      
    default:
      return state;
  }
}

// Render example
render(() => {
  const [text, setText] = React.useState('');
  const [todos, setTodos] = React.useState([]);
  
  const addTodo = () => {
    if (!text.trim()) return;
    
    // Simulate Redux action
    const newState = todoReducer(
      { todos }, 
      { type: 'ADD_TODO', payload: text }
    );
    
    setTodos(newState.todos);
    setText('');
  };
  
  return (
    <div>
      <input 
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter a todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
});
`;

  const solutionCode = `
// Complete the reducer function to handle the ADD_TODO action
const initialState = {
  todos: []
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    default:
      return state;
  }
}

// Render example
render(() => {
  const [text, setText] = React.useState('');
  const [todos, setTodos] = React.useState([]);
  
  const addTodo = () => {
    if (!text.trim()) return;
    
    // Simulate Redux action
    const newState = todoReducer(
      { todos }, 
      { type: 'ADD_TODO', payload: text }
    );
    
    setTodos(newState.todos);
    setText('');
  };
  
  return (
    <div>
      <input 
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter a todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
});
`;

  return (
    <div className="section">
      <h2>Interactive Redux Exercises</h2>
      
      <CodeExercise
        title="Implementing a Todo Reducer"
        description="Practice creating a Redux reducer by implementing the ADD_TODO action handler."
        initialCode={exerciseCode}
        solutionCode={solutionCode}
        scope={{ React }}
        tasks={[
          "Complete the todoReducer function to handle the ADD_TODO action",
          "Return a new state object with the new todo added to the todos array",
          "Ensure you don't mutate the existing state"
        ]}
      />
      
      <Quiz
        question="Which Redux principle states that the state must only be changed by dispatching actions?"
        options={[
          "Single source of truth",
          "State is read-only", 
          "Changes are made with pure functions",
          "Immutable state tree"
        ]}
        correctAnswerIndex={1}
      />
      
      <ConceptComparison 
        title="Redux vs Context API"
        concepts={[
          {
            title: "Redux",
            description: "Centralized state management library with a unidirectional data flow",
            code: "const store = createStore(reducer);\nstore.dispatch({ type: 'ACTION' });",
            benefits: [
              "Powerful debugging tools",
              "Middleware for complex logic",
              "Time-travel debugging",
              "Predictable state updates"
            ],
            drawbacks: [
              "More boilerplate code",
              "Learning curve",
              "Additional bundle size"
            ]
          },
          {
            title: "React Context API",
            description: "Built-in React feature for passing data through component trees",
            code: "<Context.Provider value={state}>\n  <Component />\n</Context.Provider>",
            benefits: [
              "Built into React",
              "Less boilerplate",
              "Simpler for small apps",
              "No extra dependencies"
            ],
            drawbacks: [
              "Less powerful for complex state",
              "Limited middleware support",
              "Less tooling for debugging",
              "Can cause re-renders"
            ]
          }
        ]}
      />
    </div>
  );
};
