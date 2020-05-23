import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Dashboard <span className="sr-only">(current)</span>
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/password/reset">
              /reset
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/password/reset/new">
              /reset/new
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/testauth">
              Test auth
            </Link>
          </li> */}
        </ul>

        {/* <div onClick={logout}> */}
        <div>
          <div className="btn btn-outline-success my-2 my-sm-0">Logout</div>
        </div>
        <Link to="/sign-in">
          <div className="btn btn-outline-success my-2 my-sm-0">Sign In</div>
        </Link>
        <Link to="/sign-up">
          <div className="btn btn-outline-success my-2 my-sm-0">Sign Up</div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
