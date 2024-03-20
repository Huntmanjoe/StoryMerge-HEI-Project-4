import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; 

function Navbar() {
    return (
      <nav className="navbar">
        <Link to="/" className="navbar-title">StoryMerge</Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/create-prompt" className="navbar-link">Create New Prompt</Link>
          <button className="login-button">Login</button>
        </div>
      </nav>
    );
}
export default Navbar;