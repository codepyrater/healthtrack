import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // AuthContext.js
const [auth, setAuth] = useState({
    token: null,
    isAuthenticated: false,
    userid: null,
    user: null,
});


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

// Explicitly export AuthContext
export { AuthContext };
