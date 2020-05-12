import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../actions/authActions';

function Header({ auth, logout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Navbar
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
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
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
          </li>
        </ul>
        {auth.isSignedIn ? (
          <div onClick={logout}>
            <div className="btn btn-outline-success my-2 my-sm-0">Logout</div>
          </div>
        ) : (
          <>
            <Link to="/login">
              <div className="btn btn-outline-success my-2 my-sm-0">Log in</div>
            </Link>
            <Link to="/register">
              <div className="btn btn-outline-success my-2 my-sm-0">
                Sign up
              </div>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { logout })(Header);
