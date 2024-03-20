// Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
    return (
        <div style={{ margin: '20px auto', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Welcome to Our Collaborative Platform</h1>
            <p>Explore, contribute, and create interactive stories with our community.</p>
            <div style={{ marginTop: '20px' }}>
                <Link to="/new-prompt" style={{ marginRight: '10px' }}>Create New Prompt</Link>
                <Link to="/story-list">View Stories</Link>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Link to="/login">Login</Link> | 
                <Link to="/new-entry" style={{ marginLeft: '10px' }}>Submit an Entry</Link>
            </div>
        </div>
    );
}

export default Homepage;
