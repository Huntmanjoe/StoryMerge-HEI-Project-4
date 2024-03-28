import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); 


    useEffect(() => {
      
        fetch("/check_session")
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(user => {
            setCurrentUser(user);
            setIsLoggedIn(true);
        })
        .catch(() => {
      
            setCurrentUser(null);
            setIsLoggedIn(false);
        });
    }, []);

    const login = (name, password, plaintext = true) => {
        fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password, plaintext }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Login failed');
        })
        .then(user => {
            setCurrentUser(user);
            setIsLoggedIn(true);
        })
        .catch(error => {
            console.error('Login error:', error);
            setCurrentUser(null);
            setIsLoggedIn(false);
        });
    };

    const logout = () => {
        fetch("/logout", {
            method: "DELETE",
            headers: {"Content-Type": "application/json",},
        })
        .then(r => {if (r.ok) {
            setIsLoggedIn(false);
            console.log('delete successful')
        } else {console.log('delete failed')}});
    };

    const value = {
        activeUser,
        isLoggedIn,
        currentUser, 
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
