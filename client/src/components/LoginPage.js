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

    const [failedSignup, setFailedSignup] = useState(false);
    const [failedLogin, setFailedLogin] = useState(false);

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        setFailedSignup(false);
        setFailedLogin(false);
        if (isSignUp) {
            fetch('/users', {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({
                    "name": username,
                    "email": email,
                    "password": password,
                })
            })
            .then(r => {if (r.ok) {
                r.json()
                .then(user => {
                    // we don't really need all this and for login to have a plaintext arg if i just the username and password args here
                    // that would also be way more secure. will do soon
                    login(user['user']['name'], user['user']['_password_hash'], false);
                    history.push(`/user/${username}`);
                })
            } else {
                {setFailedSignup(true);}
            }})
        } else {
            const plaintext = true
            const name = username
            fetch("/login", {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify( {name, password, plaintext} ),
            })
            .then(r => {if (r.ok) {
                    history.push(`/user/${username}`);
                } else {setFailedLogin(true)}
                })
            // i kept trying to use login from auth but i can't access the promise object asynchronously that way
            // login(username, password)
            // .then(r => console.log(r))
            // .then(r => {if (r.ok) {
            //     history.push(`/user/${username}`);
            // } else {setFailedLogin(true)}
            // })
        }

          // Assuming login function updates auth context
        localStorage.setItem('currentUser', JSON.stringify({ username })); // Store user's information
        // should be able to not use localstorage bc of using cookies
        // history.push(`/user/${username}`); // Redirect to user's profile page
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
                <p style={{ textAlign: 'center' }}>{failedSignup ? "Username or email already registered!" : ""}</p>
                <p style={{ textAlign: 'center' }}>{failedLogin ? "Incorrect username or password!" : ""}</p>
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
