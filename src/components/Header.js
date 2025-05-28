import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const concepts = [
    { id: 'actions', name: 'Actions' },
    { id: 'reducers', name: 'Reducers' },
    { id: 'store', name: 'Store' },
    { id: 'hooks', name: 'Hooks' },
    { id: 'thunks', name: 'Thunks' }
  ];

  return (
    <header className="header">
      <h1>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Redux Demo App</Link>
      </h1>
      <nav>
        <ul>
          <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
          {concepts.map(concept => (
            <li key={concept.id}>
              <Link to={`/concepts/${concept.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                {concept.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
