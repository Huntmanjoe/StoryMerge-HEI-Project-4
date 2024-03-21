import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Add this line

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">
                <h1 style={{ margin: 0 }}>StoryMerge</h1>
            </Link>
            <div>
                <Link to="/create-prompt" className="nav-link">Create New Prompt</Link>
                <Link to="/view-stories" className="nav-link">View Stories</Link>
                <Link to="/new-entry" className="nav-link">Submit an Entry</Link>
                <Link to="/login" className="nav-link nav-login">Login</Link>
            </div>
        </nav>
    );
}

export default Navbar;


