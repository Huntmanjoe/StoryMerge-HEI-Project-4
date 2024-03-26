import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch("/check_session").then((response) => {
          if (response.ok) {
            // response.json().then((user) => {setUser(user); setIsLoggedIn(True)});
          }
        });
      }, []);

    const login = (username) => {
        fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({ username }),
        })
        .then(() => setIsLoggedIn(true));
        // the above will create a cookie in session[user_id] that lets the database know you are logged in as that user
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    const value = {
        isLoggedIn,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
