import React from 'react';
import { Link } from 'react-router-dom';

import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-body-tertiary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <h1>iQexpress</h1>
        </Link>
      </div>
    </header>
  );
}

export default Header;