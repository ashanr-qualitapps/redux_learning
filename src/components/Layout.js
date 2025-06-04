import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>Redux Demo Application</p>
      </footer>
    </div>
  );
};

export default Layout;
