import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (username, role = 'regular') => {
        const loggedInUser = {
            username,
            role: role === 'admin' ? 'admin' : 'regular'
        };

        setUser(loggedInUser);
    };

    const logout = () => {
        setUser(null);
    };

    const isAdmin = () => {
        return user?.role === 'admin';
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: user !== null,
        isAdmin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
