import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Redux </Link>
      </h1>
      <nav>
        <ul>
          <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
