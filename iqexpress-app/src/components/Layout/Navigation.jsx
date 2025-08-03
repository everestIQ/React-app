// iqexpress-app/src/components/Layout/Navigation.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // <--- CORRECTED: Import Link specifically

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        {/* Your brand link should also use Link */}
        <Link className="navbar-brand" to="/">ADC-GLOBAL</Link> 

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
              <li className="nav-item">
              <Link className="nav-link" to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact"> {/* Update with actual path */}
                Contact
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link // Make sure this is also Link if it's a router navigation
                className="nav-link dropdown-toggle"
                to="#" // Consider if this should be a real path or just a placeholder for JS dropdown
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/action">Action</Link></li> {/* Update with actual path */}
                <li><Link className="dropdown-item" to="/another-action">Another action</Link></li> {/* Update with actual path */}
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/something-else">Something else here</Link></li> {/* Update with actual path */}
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link disabled" to="#" aria-disabled="true">
                Disabled
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;