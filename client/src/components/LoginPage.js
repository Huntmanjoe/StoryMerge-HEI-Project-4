import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LoginPage({ onLogin }) {
    const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and sign-up
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); // Only needed for sign-up
    const history = useHistory();

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        onLogin(username); // Implement your login logic here
        history.push('/'); // Navigate to the home page after login
    };

    const handleSignUpSubmit = (event) => {
        event.preventDefault();
        // Add your sign-up logic here
        // For example, onSignUp(email, username, password);
        history.push('/'); // Navigate to the home page after sign-up, or show a success message
    };

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        // Clear the form fields when switching between forms
        setUsername('');
        setPassword('');
        setEmail('');
    };

    return (
        <div style={styles.loginPage}>
            <form onSubmit={isSignUp ? handleSignUpSubmit : handleLoginSubmit} style={styles.form}>
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
                <button type="submit" style={styles.button}>{isSignUp ? 'Sign Up' : 'Login'}</button>
                <p style={styles.signUpText}>
                    {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                    <span style={styles.signUpLink} onClick={toggleForm}>
                        {isSignUp ? 'Login' : 'Sign up'}
                    </span>.
                </p>
            </form>
        </div>
    );
}

// Styles
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
        maxWidth: '400px'
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
    signUpText: {
        marginTop: '20px',
        textAlign: 'center',
    },
    signUpLink: {
        color: '#4CAF50',
        cursor: 'pointer',
    }
};

export default LoginPage;


