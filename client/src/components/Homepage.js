import React from 'react';
import { Link } from 'react-router-dom'; 
import '../index.css'; 


function Homepage() {
    return (
        <div className="homepage-container">
            <div className="welcome-section">
                <h1>Welcome to Our Collaborative Platform!</h1>
                <p>Explore, contribute, and create interactive stories with our community.</p>
                <img src="../Storypage.jpg" alt="Welcome" className="welcome-image" />
            </div>
            <div className="action-links">
                <Link to="/new-prompt" className="action-link">Create New Prompt</Link>
                <Link to="/story-list" className="action-link">View Stories</Link>
            </div>
            <div className="auth-links">
                <Link to="/login" className="auth-link">Login</Link>
                <span className="separator">|</span>
                <Link to="/new-entry" className="auth-link">Submit an Entry</Link>
            </div>
            <h2 className="stories-header">New Stories:</h2>
            <div className="stories-grid">
                <div className="story">
                <div className="story">
                    <h3>Story Title</h3> 
                    <p>by Username</p> 
                    <p>Original prompt by: Placeholder Username</p> 
                    <Link to="/story/1" className="view-story-link">View This Story</Link> 
                </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;