import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';

function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { login } = useAuth();
    const history = useHistory();

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        if (isSignUp) {
            // Here you'd include your actual sign-up logic, possibly sending info to a server
            // For demonstration, we're logging and invoking the login upon registration
            console.log('Sign up:', { username, password, email });
            login(username); // Simulate login by setting the username in the context
            history.push(`/user/${username}`); // Redirect to the newly signed-up user's profile
        } else {
            login(username); // In a real application, validate credentials before logging in
            history.push(`/user/${username}`); // Redirect to the existing user's profile
        }
    };

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setUsername('');
        setPassword('');
        setEmail('');
    };

    const styles = {
        loginPage: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f7f7f7',
        },
        form: {
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
            width: '100%',
            maxWidth: '400px',
        },
        heading: {
            textAlign: 'center',
            marginBottom: '20px',
        },
        input: {
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            fontSize: '16px',
        },
        button: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
        },
    };

    return (
        <div style={styles.loginPage}>
            <form onSubmit={handleLoginSubmit} style={styles.form}>
                <h2 style={styles.heading}>{isSignUp ? 'Sign Up' : 'Login'}</h2>
                {isSignUp && (
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                )}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    {isSignUp ? 'Sign Up' : 'Login'}
                </button>
                <p style={{ textAlign: 'center' }}>
                    {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                    <span 
                        onClick={toggleForm} 
                        style={{ color: '#4CAF50', cursor: 'pointer' }}
                    >
                        {isSignUp ? 'Login' : 'Sign up'}
                    </span>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
