import React from 'react';

// SVG diagrams for Redux data flow
export const ReduxFlowDiagram = () => {
  return (
    <div className="diagram-container">
      <svg className="state-flow-diagram" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        {/* Action */}
        <rect x="50" y="160" width="120" height="60" rx="8" fill="#ffcccb" stroke="#cc0000" strokeWidth="2" />
        <text x="110" y="190" textAnchor="middle" fontWeight="bold">Action</text>
        
        {/* Middleware */}
        <rect x="250" y="140" width="120" height="100" rx="8" fill="#ffffcc" stroke="#cccc00" strokeWidth="2" />
        <text x="310" y="175" textAnchor="middle" fontWeight="bold">Middleware</text>
        <text x="310" y="195" textAnchor="middle" fontSize="10">Intercepts Actions</text>
        <text x="310" y="215" textAnchor="middle" fontSize="10">Handles Side Effects</text>
        
        {/* Reducer */}
        <rect x="450" y="160" width="120" height="60" rx="8" fill="#ccffcc" stroke="#00cc00" strokeWidth="2" />
        <text x="510" y="190" textAnchor="middle" fontWeight="bold">Reducer</text>
        
        {/* Store */}
        <rect x="450" y="280" width="120" height="60" rx="8" fill="#cce5ff" stroke="#0066cc" strokeWidth="2" />
        <text x="510" y="310" textAnchor="middle" fontWeight="bold">Store</text>
        
        {/* React Component */}
        <rect x="150" y="280" width="120" height="60" rx="8" fill="#e6ccff" stroke="#6600cc" strokeWidth="2" />
        <text x="210" y="310" textAnchor="middle" fontWeight="bold">Component</text>
        
        {/* Arrows */}
        {/* Action to Middleware */}
        <path d="M170 190 L250 190" stroke="#666" strokeWidth="2" fill="none" />
        <polygon points="245,185 255,190 245,195" fill="#666" />
        
        {/* Middleware to Reducer */}
        <path d="M370 190 L450 190" stroke="#666" strokeWidth="2" fill="none" />
        <polygon points="445,185 455,190 445,195" fill="#666" />
        
        {/* Reducer to Store */}
        <path d="M510 220 L510 280" stroke="#666" strokeWidth="2" fill="none" />
        <polygon points="505,275 510,285 515,275" fill="#666" />
        
        {/* Store to Component */}
        <path d="M450 310 L270 310" stroke="#666" strokeWidth="2" fill="none" />
        <polygon points="275,305 265,310 275,315" fill="#666" />
        
        {/* Component to Action */}
        <path d="M200 280 L110 220" stroke="#666" strokeWidth="2" fill="none" />
        <polygon points="115,225 105,215 105,225" fill="#666" />
      </svg>
      
      <div className="diagram-legend">
        <h4>Redux Data Flow</h4>
        <p>
          1. Components dispatch Actions
          <br/>
          2. Actions pass through Middleware
          <br/>
          3. Reducers process Actions and update state
          <br/>
          4. The Store holds the updated state
          <br/>
          5. Components subscribe to the Store for updates
        </p>
      </div>
    </div>
  );
};

// Timeline visualization for async Redux operations
export const AsyncTimelineDiagram = () => {
  return (
    <div className="diagram-container">
      <div className="async-timeline">
        <div className="timeline-header">
          <div className="timeline-label">Component</div>
          <div className="timeline-label">Action Creator</div>
          <div className="timeline-label">Middleware</div>
          <div className="timeline-label">API</div>
          <div className="timeline-label">Reducer</div>
          <div className="timeline-label">Store</div>
        </div>
        
        <div className="timeline-flow">
          {/* Event 1: Component dispatches action */}
          <div className="timeline-event">
            <div className="timeline-time">t=0ms</div>
            <div className="timeline-node component-node active">
              <div className="event-description">
                User clicks "Load Data" button
              </div>
            </div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
          </div>
          
          {/* Event 2: Action Creator creates FETCH_REQUEST action */}
          <div className="timeline-event">
            <div className="timeline-time">t=5ms</div>
            <div className="timeline-node component-node"></div>
            <div className="timeline-node action-node active">
              <div className="event-description">
                Create FETCH_REQUEST action
              </div>
            </div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
          </div>
          
          {/* Event 3: Middleware processes action */}
          <div className="timeline-event">
            <div className="timeline-time">t=10ms</div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node middleware-node active">
              <div className="event-description">
                Thunk middleware intercepts action
              </div>
            </div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
          </div>
          
          {/* Event 4: Request starts */}
          <div className="timeline-event">
            <div className="timeline-time">t=20ms</div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node middleware-node active">
              <div className="event-description">
                Dispatch FETCH_START action
              </div>
            </div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
          </div>
          
          {/* Event 5: Reducer updates loading state */}
          <div className="timeline-event">
            <div className="timeline-time">t=25ms</div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node reducer-node active">
              <div className="event-description">
                Update state: loading = true
              </div>
            </div>
            <div className="timeline-node"></div>
          </div>
          
          {/* Event 6: Store updates */}
          <div className="timeline-event">
            <div className="timeline-time">t=30ms</div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node store-node active">
              <div className="event-description">
                Store updates, notifies subscribers
              </div>
            </div>
          </div>
          
          {/* Event 7: API Call starts */}
          <div className="timeline-event">
            <div className="timeline-time">t=35ms</div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node middleware-node active">
              <div className="event-description">
                Make API request
              </div>
            </div>
            <div className="timeline-node api-node active">
              <div className="event-description">
                Process request
              </div>
            </div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
          </div>
          
          {/* Event 8: API Response */}
          <div className="timeline-event">
            <div className="timeline-time">t=500ms</div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node api-node active">
              <div className="event-description">
                Send response data
              </div>
            </div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
          </div>
          
          {/* Event 9: Success action */}
          <div className="timeline-event">
            <div className="timeline-time">t=505ms</div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node middleware-node active">
              <div className="event-description">
                Dispatch FETCH_SUCCESS with data
              </div>
            </div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
          </div>
          
          {/* Event 10: Reducer handles success */}
          <div className="timeline-event">
            <div className="timeline-time">t=510ms</div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node reducer-node active">
              <div className="event-description">
                Update state with data, loading = false
              </div>
            </div>
            <div className="timeline-node"></div>
          </div>
          
          {/* Event 11: Store updates */}
          <div className="timeline-event">
            <div className="timeline-time">t=515ms</div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node store-node active">
              <div className="event-description">
                Store updates, notifies subscribers
              </div>
            </div>
          </div>
          
          {/* Event 12: Component re-renders */}
          <div className="timeline-event">
            <div className="timeline-time">t=520ms</div>
            <div className="timeline-node component-node active">
              <div className="event-description">
                Component re-renders with data
              </div>
            </div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
            <div className="timeline-node"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// State transition visualization
export const StateTransitionDiagram = ({ initialState, action, finalState }) => {
  return (
    <div className="diagram-container">
      <div className="state-transition">
        <div className="state-box initial-state">
          <h4>Initial State</h4>
          <pre>{JSON.stringify(initialState, null, 2)}</pre>
        </div>
        
        <div className="transition-arrow">
          <div className="arrow-line">→</div>
          <div className="action-box">
            <pre>{JSON.stringify(action, null, 2)}</pre>
          </div>
        </div>
        
        <div className="state-box final-state">
          <h4>New State</h4>
          <pre>{JSON.stringify(finalState, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

// Example usage
export const ReduxVisualExplanations = () => {
  // Example states for the transition diagram
  const initialState = {
    todos: [
      { id: 1, text: 'Learn Redux', completed: false }
    ]
  };
  
  const action = {
    type: 'TOGGLE_TODO',
    payload: 1
  };
  
  const finalState = {
    todos: [
      { id: 1, text: 'Learn Redux', completed: true }
    ]
  };
  
  return (
    <div className="section">
      <h2>Visual Redux Explanations</h2>
      
      <h3>Redux Data Flow</h3>
      <p>
        Redux follows a unidirectional data flow pattern. This visualization shows 
        how data flows through a Redux application:
      </p>
      <ReduxFlowDiagram />
      
      <h3>Asynchronous Redux Timeline</h3>
      <p>
        This timeline shows how asynchronous operations (like API calls) work with Redux:
      </p>
      <AsyncTimelineDiagram />
      
      <h3>State Transitions</h3>
      <p>
        Redux updates state predictably based on actions. Here's an example of 
        how an action transforms state:
      </p>
      <StateTransitionDiagram 
        initialState={initialState}
        action={action}
        finalState={finalState}
      />
    </div>
  );
};
