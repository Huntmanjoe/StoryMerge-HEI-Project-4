import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'; 

function Homepage() {
    return (
        <div className="homepage-container">
            <section className="welcome-section">
                <div className="welcome-text">
                    <h1>Welcome to StoryMerge!</h1>
                    <p>Explore, contribute, and create interactive stories with our community.</p>
                    <Link to="/view-stories" className="action-button">Discover Stories</Link> {/* Updated */}
                </div>
                <div className="welcome-image">
                    <img src="/Storypage.jpg" alt="Welcome" />
                </div>
            </section>
            <section className="features-section">
                <div className="feature">
                    <h2>Create</h2>
                    <p>Unleash your creativity by writing your own stories.</p>
                    <Link to="/new-entry" className="feature-link">Submit an Entry</Link>
                </div>
                <div className="feature">
                    <h2>Explore</h2>
                    <p>Dive into a variety of stories created by our community.</p>
                    <Link to="/view-stories" className="feature-link">Discover Stories</Link> {/* Updated for consistency */}
                </div>
                <div className="feature">
                    <h2>Connect</h2>
                    <p>Join discussions and connect with fellow storytellers.</p>
                    <Link to="/login" className="feature-link">Join Now</Link>
                </div>
            </section>
            <section className="about-section">
                <h2>About StoryMerge</h2>
                <p>StoryMerge is a collaborative platform for sharing and creating stories. Join our community of writers and readers, explore new genres, and contribute to collaborative storytelling.</p>
            </section>
        </div>
    );
}

export default Homepage;



