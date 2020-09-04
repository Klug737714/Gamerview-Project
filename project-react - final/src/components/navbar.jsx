import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};

  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <Link className="navbar-brand text-primary" to="/">
          <i className="fas fa-gamepad"></i>
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
          <span className="navbar-toggler-icon bg-success"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link text-danger" to="/about">
                About
              </NavLink>
            </li>
            {user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link text-light" to="/my-posts">
                    My Posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-warning" to="/favorited">
                    Favorites
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>

          <ul className="navbar-nav ml-auto">
            {!user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link text-light" to="/user/signin">
                    Sign in
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-warning" to="/user/signup">
                    Sign Up
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link text-danger" to="/user/logout">
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
