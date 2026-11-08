
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Log in a user
    const login = (username, role = 'regular') => {
        const loggedInUser = {
            username,
            role: role === 'admin' ? 'admin' : 'regular'
        };

        setUser(loggedInUser);
    };

    // Log out the current user
    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: user !== null,
        isAdmin: user?.role === 'admin'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
