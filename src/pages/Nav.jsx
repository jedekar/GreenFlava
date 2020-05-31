import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

function Nav() {
  const navStyle = {
    color: "white",
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="no-bottomline logo" style={navStyle} to="/">
        <h1>GreenFlava</h1>
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <Link className="no-bottomline" style={navStyle} to="/login">
              <li className="nav-links">Sign In</li>
            </Link>
          </li>
          <li class="nav-item">
            <Link className="no-bottomline" style={navStyle} to="/user-orders">
              <li className="nav-links nav-links">Orders</li>
            </Link>
          </li>
          <li class="nav-item">
            <Link className="no-bottomline" style={navStyle} to="/about">
              <li className="nav-links nav-links">About</li>
            </Link>
          </li>
        </ul>
      </div>
    </nav>

    /* <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-center">
      <Link className="no-bottomline logo" style={navStyle} to="/">
        <h1>GreenFlava</h1>
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <a class="nav-item nav-link" href="/">
            Home <span class="sr-only">(current)</span>
          </a>
          <a class="nav-item nav-link" href="/orders">
            Orders
          </a>
          @loggedIn
          <a class="nav-item nav-link" href="/profile">
            Profile
          </a>
          <a class="nav-item nav-link" href="/logout">
            Logout
          </a>
          @else
          <a class="nav-item nav-link" href="/">
            login
          </a>
          @endloggedIn
        </div>
      </div>
    </nav> */

    /*     <div className="navbar">
      <Link className="no-bottomline logo" style={navStyle} to="/">
        <h1>GreenFlava</h1>
      </Link>
      <ul className="nav-links">
        <Link className="no-bottomline" style={navStyle} to="/about">
          <li className="nav-links-main">About</li>
        </Link>
        <Link className="no-bottomline" style={navStyle} to="/login">
          <li className="nav-links-main">Sign In</li>
        </Link>
        <Link className="no-bottomline" style={navStyle} to="/user-orders">
          <li className="nav-links-main">User Orders</li>
        </Link>
      </ul>
    </div> */
  );
}

export default Nav;
