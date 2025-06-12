import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BackToTopButton } from './NavigationButtons';
import DarkModeToggle from './DarkModeToggle';

// Menu data structure
const menuItems = [
  {
    category: 'Core Redux',
    items: [
      { to: '/concepts/actions', icon: '🔄', text: 'Actions' },
      { to: '/concepts/reducers', icon: '🧩', text: 'Reducers' },
      { to: '/concepts/store', icon: '🗄️', text: 'Store' },
      { to: '/concepts/hooks', icon: '⚓', text: 'Hooks' },
    ]
  },
  {
    category: 'Middleware',
    items: [
      { to: '/concepts/middleware', icon: '🔌', text: 'Middleware Intro' },
      { to: '/concepts/thunks', icon: '⚡', text: 'Thunks' },
      { to: '/concepts/redux-thunk', icon: '🔀', text: 'Redux Thunk' },
      { to: '/concepts/redux-saga', icon: '🧬', text: 'Redux Saga' },
      { to: '/concepts/redux-observable', icon: '🔭', text: 'Redux Observable' },
      { to: '/concepts/websockets', icon: '🔄', text: 'WebSockets' }
    ]
  },
  {
    category: 'Advanced',
    items: [
      { to: '/concepts/normalization', icon: '📊', text: 'Normalization' },
      { to: '/concepts/reselect', icon: '🔍', text: 'Reselect' },
      { to: '/concepts/re-reselect', icon: '🔎', text: 'Re-reselect' },
      { to: '/concepts/redux-toolkit', icon: '🧰', text: 'Redux Toolkit' },
      { to: '/concepts/redux-persist', icon: '💾', text: 'Redux Persist' },
      { to: '/concepts/rtk-query', icon: '📡', text: 'RTK Query' },
      { to: '/concepts/entity-relationships', icon: '🔗', text: 'Entity Relationships' },
      { to: '/concepts/architecture-patterns', icon: '🏗️', text: 'Architecture Patterns' },
    ]
  },
  // Add Specialized Patterns category to sidebar
  {
    category: 'Specialized Patterns',
    items: [
      { to: '/concepts/bff-pattern', icon: '🔌', text: 'Backend-for-Frontend' },
      // Add more specialized patterns here as they are created
      { to: '/concepts/undo-redo-pattern', icon: '⏱️', text: 'Undo/Redo Pattern' },
    ]
  },
  {
    category: 'Implementation',
    items: [
      { to: '/concepts/immutable-patterns', icon: '🔒', text: 'Immutable Patterns' },
      { to: '/concepts/testing-redux', icon: '🧪', text: 'Testing Redux' },
      { to: '/concepts/typescript', icon: '📘', text: 'TypeScript Integration' },
      { to: '/concepts/ssr', icon: '🖥️', text: 'Server-Side Rendering' },
      { to: '/concepts/dynamic-reducers', icon: '📦', text: 'Dynamic Reducers' },
    ]
  }
];

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Close menu when route changes (mobile)
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Check if screen is wide enough for collapsed menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="app-layout">
      {/* Side Menu */}
      <aside className={`app-menu ${menuOpen ? 'menu-open' : ''} ${collapsed ? 'menu-collapsed' : ''}`}>
        <div className="menu-header">
          <span>{collapsed ? 'R' : 'Redux'}</span>
          {!collapsed && (
            <button className="menu-toggle" onClick={toggleMenu}>
              ✕
            </button>
          )}
          {window.innerWidth >= 768 && (
            <button className="menu-toggle" onClick={toggleCollapse} style={{ display: 'block' }}>
              {collapsed ? '→' : '←'}
            </button>
          )}
        </div>

        <nav>
          <ul className="menu-list">
            <li>
              <NavLink to="/" className="menu-item" end>
                <span className="menu-item-icon">🏠</span>
                <span className="menu-item-text">Home</span>
              </NavLink>
            </li>

            {menuItems.map((section, index) => (
              <React.Fragment key={index}>
                <li className="menu-category">
                  {!collapsed ? section.category : '●'}
                </li>
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <NavLink 
                      to={item.to} 
                      className={({isActive}) => 
                        isActive ? "menu-item active" : "menu-item"
                      }
                    >
                      <span className="menu-item-icon">{item.icon}</span>
                      <span className="menu-item-text">{item.text}</span>
                    </NavLink>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        </nav>

        <div className="menu-footer">
          <DarkModeToggle />
        </div>
      </aside>
      
      {/* Overlay for mobile */}
      <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>
      
      {/* Main Content */}
      <main className="app-content">
        <div className="mobile-header">
          <button className="menu-toggle" onClick={toggleMenu}>☰</button>
          <h1>Redux Guide</h1>
          <DarkModeToggle />
        </div>
        
        {children}
        <BackToTopButton />
      </main>
    </div>
  );
};

export default Layout;
