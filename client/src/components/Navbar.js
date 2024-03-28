import {React, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css'; 
import { useAuth } from './AuthContext'; 

function Navbar() {
    const { isLoggedIn, currentUser } = useAuth();
    const history = useHistory();

    useEffect(() => {
        console.log('Authentication state changed: ', isLoggedIn, currentUser);
    }, [isLoggedIn, currentUser]);

    const handleLogout = () => {
        logout();
        history.push('/');
    };


    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">
                <h1 style={{ margin: 0 }}>StoryMerge</h1>
            </Link>
            <div>
                <Link to="/create-prompt" className="nav-link">Create New Prompt</Link>
                <Link to="/view-stories" className="nav-link">View Stories</Link>
                <Link to="/prompts" className="nav-link">View Prompts</Link>
                {isLoggedIn && currentUser ? (
                <>
                    <Link to={`/user/${currentUser.name}`} className="nav-link">Profile</Link>
                </>
            ) : (
                <Link to="/login" className="nav-link nav-login">Login</Link>
            )}

            </div>
        </nav>
    );
}

export default Navbar;
