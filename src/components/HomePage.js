import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBookOpen, FaCode, FaRocket, FaLightbulb, FaStar } from 'react-icons/fa';

// Topics organized by category for the concept finder
const topicsByCategory = {
  core: [
    { path: '/concepts/actions', title: 'Actions', description: 'Learn how actions describe state changes' },
    { path: '/concepts/reducers', title: 'Reducers', description: 'Understand how reducers specify state updates' },
    { path: '/concepts/store', title: 'Store', description: 'Explore the central state container' },
    { path: '/concepts/hooks', title: 'Redux Hooks', description: 'Connect React components with Redux state' }
  ],
  middleware: [
    { path: '/concepts/middleware', title: 'Middleware', description: 'Adding middleware to the Redux pipeline' },
    { path: '/concepts/thunks', title: 'Thunks', description: 'Handle side effects and async logic' },
    { path: '/concepts/redux-saga', title: 'Redux Saga', description: 'Manage complex async flows with generators' }
  ],
  advanced: [
    { path: '/concepts/normalization', title: 'Normalization', description: 'Structure state for efficiency and maintainability' },
    { path: '/concepts/reselect', title: 'Reselect', description: 'Create memoized selectors for performance' },
    { path: '/concepts/redux-toolkit', title: 'Redux Toolkit', description: 'Modern Redux best practices and tools' }
  ]
};

// Learning paths for guided learning
const learningPaths = [
  {
    title: 'Redux Fundamentals',
    description: 'Start here to learn Redux from the ground up',
    path: '/concepts/actions',
    steps: [
      { title: 'Actions', path: '/concepts/actions' },
      { title: 'Reducers', path: '/concepts/reducers' },
      { title: 'Store', path: '/concepts/store' },
      { title: 'React-Redux Hooks', path: '/concepts/hooks' }
    ],
    level: 'Beginner'
  },
  {
    title: 'Asynchronous Redux',
    description: 'Manage side effects and asynchronous operations',
    path: '/concepts/middleware',
    steps: [
      { title: 'Middleware', path: '/concepts/middleware' },
      { title: 'Thunks', path: '/concepts/thunks' },
      { title: 'Redux Thunk', path: '/concepts/redux-thunk' },
      { title: 'Redux Saga', path: '/concepts/redux-saga' }
    ],
    level: 'Intermediate'
  },
  {
    title: 'Redux at Scale',
    description: 'Enterprise patterns for large Redux applications',
    path: '/concepts/architecture-patterns',
    steps: [
      { title: 'Architecture Patterns', path: '/concepts/architecture-patterns' },
      { title: 'Normalization', path: '/concepts/normalization' },
      { title: 'Redux Toolkit', path: '/concepts/redux-toolkit' },
      { title: 'Entity Relationships', path: '/concepts/entity-relationships' }
    ],
    level: 'Advanced'
  }
];

// New features and updates
const latestUpdates = [
  { title: 'Undo/Redo Pattern', path: '/concepts/undo-redo-pattern', date: '2025-06-15' },
  { title: 'BFF Pattern', path: '/concepts/bff-pattern', date: '2025-06-05' },
  { title: 'Redux Architecture Patterns', path: '/concepts/architecture-patterns', date: '2025-05-30' },
  { title: 'React Fundamentals Tutorial', path: '/concepts/react-fundamentals', date: '2025-05-15' }
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter topics based on search term and category
  const filteredTopics = Object.entries(topicsByCategory)
    .flatMap(([category, topics]) => 
      selectedCategory === 'all' || selectedCategory === category 
        ? topics
        : []
    )
    .filter(topic => 
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      topic.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
  return (
    <div className="homepage-container">
      {/* Hero section */}
      <section className="hero-section">
        <h1>Redux Interactive Learning Guide</h1>
        <p className="hero-text">
          A comprehensive, interactive guide to mastering Redux state management, 
          from fundamental concepts to advanced patterns and best practices.
        </p>
        <div className="hero-buttons">
          <Link to="/concepts/actions" className="primary-button">
            <FaRocket className="button-icon" /> Start Learning
          </Link>
          <a href="https://redux.js.org" target="_blank" rel="noopener noreferrer" className="secondary-button">
            <FaBookOpen className="button-icon" /> Official Docs
          </a>
        </div>
      </section>
      
      {/* Concept finder */}
      <section className="concept-finder-section">
        <h2><FaSearch className="section-icon" /> Concept Finder</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for Redux concepts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="category-filters">
            <button 
              className={`filter-button ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            <button 
              className={`filter-button ${selectedCategory === 'core' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('core')}
            >
              Core
            </button>
            <button 
              className={`filter-button ${selectedCategory === 'middleware' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('middleware')}
            >
              Middleware
            </button>
            <button 
              className={`filter-button ${selectedCategory === 'advanced' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('advanced')}
            >
              Advanced
            </button>
          </div>
        </div>
        
        <div className="search-results">
          {searchTerm && filteredTopics.length === 0 ? (
            <p className="no-results">No concepts match your search</p>
          ) : (
            <div className="concept-grid">
              {filteredTopics.map((topic, index) => (
                <Link to={topic.path} key={index} className="concept-card">
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                  <span className="learn-more">Learn more →</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Learning paths */}
      <section className="learning-paths-section">
        <h2><FaLightbulb className="section-icon" /> Learning Paths</h2>
        <p className="section-description">
          Follow these curated learning paths to master Redux step by step
        </p>
        
        <div className="path-cards">
          {learningPaths.map((path, index) => (
            <div key={index} className="path-card">
              <div className="path-header">
                <h3>{path.title}</h3>
                <span className={`level-badge ${path.level.toLowerCase()}`}>{path.level}</span>
              </div>
              <p>{path.description}</p>
              <ol className="path-steps">
                {path.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>
                    <Link to={step.path}>{step.title}</Link>
                  </li>
                ))}
              </ol>
              <Link to={path.path} className="start-path-button">Begin Path</Link>
            </div>
          ))}
        </div>
      </section>
      
      {/* Featured tutorials */}
      <section className="featured-tutorials-section">
        <h2><FaStar className="section-icon" /> Featured Tutorials</h2>
        <div className="tutorial-cards">
          <div className="tutorial-card">
            <span className="premium-badge">Premium</span>
            <h3>Redux Architecture Patterns</h3>
            <p>Learn effective ways to organize your Redux codebase</p>
            <div className="tutorial-meta">
              <span className="reading-time">15 min read</span>
              <span className="difficulty">Advanced</span>
            </div>
            <Link to="/concepts/architecture-patterns" className="tutorial-link">Start Tutorial</Link>
          </div>
          
          <div className="tutorial-card">
            <span className="new-badge">New</span>
            <h3>React Fundamentals</h3>
            <p>Master the core concepts of React development</p>
            <div className="tutorial-meta">
              <span className="reading-time">20 min read</span>
              <span className="difficulty">Beginner</span>
            </div>
            <Link to="/concepts/react-fundamentals" className="tutorial-link">Start Tutorial</Link>
          </div>
          
          <div className="tutorial-card">
            <h3>Mastering Middleware</h3>
            <p>Take a deep dive into Redux middleware concepts</p>
            <div className="tutorial-meta">
              <span className="reading-time">12 min read</span>
              <span className="difficulty">Intermediate</span>
            </div>
            <Link to="/concepts/middleware" className="tutorial-link">Start Tutorial</Link>
          </div>
        </div>
      </section>
      
      {/* What's new section */}
      <section className="whats-new-section">
        <h2><FaCode className="section-icon" /> Latest Updates</h2>
        <div className="updates-list">
          {latestUpdates.map((update, index) => (
            <Link to={update.path} key={index} className="update-item">
              <span className="update-title">{update.title}</span>
              <span className="update-date">{update.date}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
