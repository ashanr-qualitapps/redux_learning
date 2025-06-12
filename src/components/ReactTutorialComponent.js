import React, { useState, useEffect } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import TutorialTOC from './TutorialTOC';
import ExpandableCode from './ExpandableCode';
import QuizComponent from './QuizComponent';
import SectionNavigation from './SectionNavigation';
import ProgressIndicator from './ProgressIndicator';
import { HomeButton, BackButton, BackToTopButton, NextButton } from './NavigationButtons';

export const ReactTutorialComponent = () => {
  // Scope for react-live
  const scope = {
    React,
    useState,
    useEffect
  };
  
  // State to track active section
  const [activeSection, setActiveSection] = useState('intro');

  // Effect to update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.subsection');
      const scrollPosition = window.scrollY;
      
      // Find the current section
      let current = 'intro';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if(scrollPosition >= sectionTop - 100) {
          current = section.id;
        }
      });
      
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const componentCode = `
// Basic functional component
import React from 'react';

function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default Greeting;
`;

  const hooksCode = `
import React, { useState, useEffect } from 'react';

function Counter() {
  // State Hook
  const [count, setCount] = useState(0);
  
  // Effect Hook
  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
    
    // Cleanup function (optional)
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Only re-run if count changes
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
`;

  const contextCode = `
// Creating a context
import React, { createContext, useContext, useState } from 'react';

// Create a context with a default value
const ThemeContext = createContext('light');

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Consumer component using the useContext Hook
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px'
      }}
    >
      Toggle Theme ({theme})
    </button>
  );
}

// Usage
function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px' }}>
        <h1>Context API Example</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}
`;

  const performanceCode = `
import React, { useState, useCallback, useMemo } from 'react';

// Component that will be memoized
const ExpensiveCalculation = React.memo(({ value }) => {
  console.log('Expensive calculation running...');
  
  // Simulate expensive operation
  const calculateResult = () => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result + value;
  };
  
  const result = calculateResult();
  
  return <div>Result: {result}</div>;
});

function PerformanceExample() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(10);
  
  // Function reference changes on every render WITHOUT useCallback
  const badIncrement = () => setCount(c => c + 1);
  
  // Function reference is stable USING useCallback
  const goodIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  // Compute expensive value only when dependencies change
  const expensiveValue = useMemo(() => {
    console.log('Computing expensive value...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result + value;
  }, [value]);
  
  return (
    <div>
      <h2>Performance Optimization Example</h2>
      <div>Count: {count}</div>
      <div>Expensive Value: {expensiveValue}</div>
      
      <button onClick={goodIncrement}>
        Increment Count (optimized)
      </button>
      
      <button onClick={() => setValue(v => v + 10)}>
        Update Value
      </button>
      
      <ExpensiveCalculation value={value} />
    </div>
  );
}
`;

  // Define sections for the TOC
  const sections = [
    { id: 'intro', title: 'Introduction to React' },
    { id: 'components', title: 'Components & Props' },
    { id: 'hooks', title: 'React Hooks' },
    { id: 'context', title: 'Context API' },
    { id: 'performance', title: 'Performance Optimization' },
    { id: 'patterns', title: 'Common React Patterns' }
  ];
  
  return (
    <div className="section">
      <HomeButton />
      <h2><span className="topic-date">2025-07-15</span> React Fundamentals Tutorial</h2>
      <p>A comprehensive guide to modern React development</p>
      
      {/* Add reading time indicator */}
      <div className="reading-time">
        <i>⏱️</i> Reading time: ~20 minutes
      </div>
      
      {/* Add progress indicator */}
      <ProgressIndicator />
      
      {/* Add Table of Contents */}
      <TutorialTOC 
        sections={sections} 
        activeSection={activeSection}
      />
      
      <div id="intro" className="subsection">
        <span className="section-anchor"></span>
        <h3>Introduction to React</h3>
        <p>
          React is a JavaScript library for building user interfaces, particularly 
          single-page applications. It's used for handling the view layer in web and mobile apps.
          React allows you to design simple views for each state in your application, and it 
          efficiently updates and renders just the right components when your data changes.
        </p>
        
        {/* Add a key points summary */}
        <div className="key-points">
          <h4>Why React?</h4>
          <ul>
            <li><strong>Declarative:</strong> React makes it painless to create interactive UIs</li>
            <li><strong>Component-Based:</strong> Build encapsulated components that manage their own state</li>
            <li><strong>Learn Once, Write Anywhere:</strong> Develop new features without rewriting existing code</li>
            <li><strong>Efficient:</strong> Virtual DOM ensures minimal operations on the browser DOM</li>
          </ul>
        </div>
        
        <SectionNavigation
          nextSection="components"
          nextTitle="Components & Props"
        />
      </div>
      
      <div id="components" className="subsection">
        <span className="section-anchor"></span>
        <h3>Components & Props</h3>
        <p>
          React components are the building blocks of any React application. A component is a 
          JavaScript function or class that optionally accepts inputs (props) and returns a 
          React element that describes how a section of the UI should appear.
        </p>

        <h4>Functional Components</h4>
        <ExpandableCode title="Basic Component Example">
          <LiveProvider code={componentCode} scope={scope} noInline={false}>
            <div className="live-editor-container">
              <LiveEditor className="live-editor" />
            </div>
            <LiveError className="live-error" />
            <div className="live-preview-wrapper">
              <h4>Live Preview</h4>
              <LivePreview />
            </div>
          </LiveProvider>
        </ExpandableCode>

        <h4>Props</h4>
        <p>
          Props (short for "properties") are inputs to React components. They are passed from a parent
          component to a child component and are read-only. Props allow you to pass data down the 
          component tree.
        </p>

        <pre>
{`// Parent component passing props
<Greeting name="John" />

// Child component receiving props
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}`}
        </pre>

        <h4>Component Composition</h4>
        <p>
          Instead of inheritance, React uses composition to reuse code between components. This allows
          for greater flexibility in building complex UIs.
        </p>

        <pre>
{`function App() {
  return (
    <div>
      <Header />
      <MainContent>
        <Sidebar />
        <ArticleList>
          <Article />
          <Article />
        </ArticleList>
      </MainContent>
      <Footer />
    </div>
  );
}`}
        </pre>

        <QuizComponent
          question="Which of these is NOT a characteristic of React props?"
          options={[
            "Props are passed from parent to child components",
            "Props are read-only in the child component",
            "Props can be modified by the child component",
            "Props can be of any data type"
          ]}
          correctAnswer={2}
          explanation="Props are immutable (read-only) and should not be modified by the child component. If a component needs to modify its data, it should use state instead."
        />
        
        <SectionNavigation
          prevSection="intro"
          prevTitle="Introduction"
          nextSection="hooks"
          nextTitle="React Hooks"
        />
      </div>
      
      <div id="hooks" className="subsection">
        <span className="section-anchor"></span>
        <h3>React Hooks</h3>
        <p>
          Hooks are functions that let you "hook into" React state and lifecycle features from 
          functional components. They were introduced in React 16.8 and allow you to use state and 
          other React features without writing a class.
        </p>

        <h4>Common Hooks</h4>
        <ul>
          <li><strong>useState</strong> - Adds state to functional components</li>
          <li><strong>useEffect</strong> - Performs side effects in components</li>
          <li><strong>useContext</strong> - Consumes context from a Context Provider</li>
          <li><strong>useReducer</strong> - Alternative to useState for complex state logic</li>
          <li><strong>useMemo</strong> - Memoizes expensive calculations</li>
          <li><strong>useCallback</strong> - Returns a memoized callback function</li>
          <li><strong>useRef</strong> - Creates a mutable reference that persists across renders</li>
        </ul>

        <ExpandableCode title="useState and useEffect Example">
          <LiveProvider code={hooksCode} scope={scope} noInline={false}>
            <div className="live-editor-container">
              <LiveEditor className="live-editor" />
            </div>
            <LiveError className="live-error" />
            <div className="live-preview-wrapper">
              <h4>Live Preview</h4>
              <LivePreview />
            </div>
          </LiveProvider>
        </ExpandableCode>

        <h4>Rules of Hooks</h4>
        <ol>
          <li>Only call Hooks at the top level (not inside loops, conditions, or nested functions)</li>
          <li>Only call Hooks from React function components or custom Hooks</li>
        </ol>

        <h4>Custom Hooks</h4>
        <p>
          You can create your own Hooks to reuse stateful logic between different components.
        </p>

        <pre>
{`// Custom Hook for form handling
function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  function handleChange(e) {
    setValue(e.target.value);
  }
  
  return {
    value,
    onChange: handleChange
  };
}

// Using the custom Hook
function SignupForm() {
  const name = useFormInput('');
  const email = useFormInput('');
  
  return (
    <form>
      <input {...name} placeholder="Name" />
      <input {...email} placeholder="Email" />
      <button type="submit">Sign Up</button>
    </form>
  );
}`}
        </pre>
        
        <SectionNavigation
          prevSection="components"
          prevTitle="Components & Props"
          nextSection="context"
          nextTitle="Context API"
        />
      </div>
      
      <div id="context" className="subsection">
        <span className="section-anchor"></span>
        <h3>Context API</h3>
        <p>
          Context provides a way to pass data through the component tree without having to pass props 
          down manually at every level. It's designed to share data that can be considered "global" for 
          a tree of React components.
        </p>

        <h4>When to Use Context</h4>
        <ul>
          <li>Theming (light/dark mode)</li>
          <li>User authentication</li>
          <li>Localization/language preferences</li>
          <li>State that needs to be accessed by many components</li>
        </ul>

        <ExpandableCode title="Context API Example">
          <LiveProvider code={contextCode} scope={{...scope, createContext: React.createContext}} noInline={false}>
            <div className="live-editor-container">
              <LiveEditor className="live-editor" />
            </div>
            <LiveError className="live-error" />
          </LiveProvider>
        </ExpandableCode>

        <h4>Context vs. Props</h4>
        <div className="code-comparison">
          <div>
            <h4>Props Drilling</h4>
            <pre>{`// Props have to be passed through all intermediary components
function App() {
  const [theme, setTheme] = useState('light');
  return (
    <Header theme={theme} />
  );
}

function Header({ theme }) {
  return (
    <Nav theme={theme} />
  );
}

function Nav({ theme }) {
  return (
    <Button theme={theme} />
  );
}

function Button({ theme }) {
  return (
    <button className={theme}>Click me</button>
  );
}`}</pre>
          </div>
          <div>
            <h4>Using Context</h4>
            <pre>{`// Context provides direct access to values without props drilling
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <Header />
    </ThemeContext.Provider>
  );
}

function Header() {
  return <Nav />;
}

function Nav() {
  return <Button />;
}

function Button() {
  const theme = useContext(ThemeContext);
  return (
    <button className={theme}>Click me</button>
  );
}`}</pre>
          </div>
        </div>
        
        <SectionNavigation
          prevSection="hooks"
          prevTitle="React Hooks"
          nextSection="performance"
          nextTitle="Performance Optimization"
        />
      </div>

      <div id="performance" className="subsection">
        <span className="section-anchor"></span>
        <h3>Performance Optimization</h3>
        <p>
          As your application grows, it's important to be mindful of performance. React provides several 
          ways to optimize your components and prevent unnecessary re-renders.
        </p>

        <h4>Key Performance Optimization Techniques</h4>
        <ul>
          <li><strong>React.memo</strong> - Memoizes functional components to prevent re-renders</li>
          <li><strong>useMemo</strong> - Memoizes expensive calculations</li>
          <li><strong>useCallback</strong> - Returns a memoized callback function</li>
          <li><strong>React.PureComponent</strong> - Class component that implements shouldComponentUpdate with a shallow prop and state comparison</li>
          <li><strong>Code Splitting</strong> - Only load the code users need</li>
        </ul>

        <ExpandableCode title="Performance Optimization Example">
          <LiveProvider code={performanceCode} scope={{...scope, memo: React.memo, useMemo: React.useMemo, useCallback: React.useCallback}} noInline={false}>
            <div className="live-editor-container">
              <LiveEditor className="live-editor" />
            </div>
            <LiveError className="live-error" />
          </LiveProvider>
        </ExpandableCode>

        <h4>Common Performance Issues</h4>
        <ul>
          <li><strong>Unnecessary re-renders</strong> - Components re-rendering when their props or state haven't changed</li>
          <li><strong>Large component trees</strong> - Too many components in a single render tree</li>
          <li><strong>Expensive calculations</strong> - Complex operations performed on each render</li>
          <li><strong>Memory leaks</strong> - Failing to clean up event listeners, timers, or subscriptions</li>
        </ul>
        
        <SectionNavigation
          prevSection="context"
          prevTitle="Context API"
          nextSection="patterns"
          nextTitle="Common React Patterns"
        />
      </div>

      <div id="patterns" className="subsection">
        <span className="section-anchor"></span>
        <h3>Common React Patterns</h3>
        <p>
          Over the years, the React community has developed several patterns and best practices. Understanding 
          these patterns can help you write more maintainable and efficient code.
        </p>

        <h4>Compound Components</h4>
        <p>
          A pattern where components are used together and share implicit state.
        </p>
        <pre>
{`// Compound Components Example
function Tabs({ children, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  
  const context = {
    activeIndex,
    setActiveIndex
  };
  
  return (
    <TabsContext.Provider value={context}>
      {children}
    </TabsContext.Provider>
  );
}

// Used like this:
<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Content 1</TabPanel>
    <TabPanel>Content 2</TabPanel>
  </TabPanels>
</Tabs>`}
        </pre>

        <h4>Render Props</h4>
        <p>
          A technique for sharing code between components using a prop whose value is a function.
        </p>
        <pre>
{`// Render Props Example
function MouseTracker(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return props.render(position);
}

// Used like this:
<MouseTracker 
  render={({ x, y }) => (
    <h1>Mouse position: {x}, {y}</h1>
  )}
/>`}
        </pre>

        <h4>Higher-Order Components (HOCs)</h4>
        <p>
          A function that takes a component and returns a new component with additional props or behavior.
        </p>
        <pre>
{`// HOC Example
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = useAuth(); // Custom hook to check auth
    
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    return <Component {...props} />;
  };
}

// Used like this:
const ProtectedDashboard = withAuth(Dashboard);`}
        </pre>

        <h4>Custom Hooks</h4>
        <p>
          Extract and reuse stateful logic from components.
        </p>
        <pre>
{`// Custom Hook Example
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  
  return [storedValue, setValue];
}

// Used like this:
function App() {
  const [name, setName] = useLocalStorage('name', 'Bob');
  return (
    <input
      value={name}
      onChange={e => setName(e.target.value)}
    />
  );
}`}
        </pre>
        
        <SectionNavigation
          prevSection="performance"
          prevTitle="Performance Optimization"
        />
      </div>

      {/* Add key takeaways section */}
      <div className="key-points">
        <h3>Key Takeaways</h3>
        <ul>
          <li><strong>Components</strong> are the building blocks of React applications</li>
          <li><strong>Hooks</strong> allow you to use state and other React features in functional components</li>
          <li><strong>Context API</strong> provides a way to share data across the component tree</li>
          <li><strong>Performance optimizations</strong> like React.memo, useMemo, and useCallback help prevent unnecessary renders</li>
          <li><strong>React patterns</strong> such as Compound Components, Render Props, and Custom Hooks help with code reuse and organization</li>
        </ul>
      </div>
      
      <BackButton />
      <BackToTopButton />
      <NextButton to="/concepts/architecture-patterns" label="Next: Redux Architecture Patterns" />
    </div>
  );
};
