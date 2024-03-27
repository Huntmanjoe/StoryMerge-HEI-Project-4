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
            response.json().then((user) => {
                // setUser(user); 
                setIsLoggedIn(true)});
          }
        });
      }, []);

    const login = (name, password, plaintext=true) => {
        fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify( {name, password, plaintext} ),
        })
        // .then(r => { if (r.ok) {setIsLoggedIn(true); return true
        // } else {console.log(`false: ${r.json()}`);return false}
    // });
        .then(r => {return r})
    };
        // the above will create a cookie in session[user_id] that lets the database know you are logged in as that user

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
        isLoggedIn,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
