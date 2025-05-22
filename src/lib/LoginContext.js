'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const LoginContext = createContext();

export function LoginProvider({ children }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [openLogin, setOpenLogin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const openLoginHandler = () => {
        const timer = setTimeout(() => {
            setOpenLogin(true);
        }, 5000);
        return () => clearTimeout(timer);
    }


    useEffect(() => {
        const isAccessToken = localStorage.getItem('isAccessToken');
        console.log('isAccessToken', isAccessToken);
        const checkAuth = async () => {
            try {
                const res = await fetch(apiUrl + 'check-auth/', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (res.ok) {
                    const data = await res.json();
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    openLoginHandler();
                }
            } catch (error) {
                setIsAuthenticated(false);
                openLoginHandler();
            } finally {
                setLoading(false);
            }
        };
        if (!isAccessToken) { 
            setIsAuthenticated(false);
            openLoginHandler();
        }
        
    }, []);

    return (
        <LoginContext.Provider value={{ openLogin, setOpenLogin, isAuthenticated, setIsAuthenticated, user, loading }}>
            {children}
        </LoginContext.Provider>
    );
}

export function useLogin() {
    return useContext(LoginContext);
}

