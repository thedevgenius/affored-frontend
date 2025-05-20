'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';

const LoginContext = createContext();

export function LoginProvider({ children }) {
    const [openLogin, setOpenLogin] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const { isAuthenticated, loading } = useAuth();


    useEffect(() => {
        if (!isAuthenticated && !loading) {
            setIsLogin(false);
        }
        if (loading) {
            return;
        }
        console.log("isAuthenticated", isAuthenticated);
        console.log("loading", loading);
        console.log("isLogin", isLogin);
        console.log("openLogin", openLogin);

        if (isAuthenticated) {
            setIsLogin(true);
        }
        console.log(isLogin);

        if (!isLogin) {
            const timer = setTimeout(() => {
                setOpenLogin(true);
            }, 5000);
            return () => clearTimeout(timer);
        }

        

    }, []);

    return (
        <LoginContext.Provider value={{ openLogin, setOpenLogin, isLogin }}>
            {children}
        </LoginContext.Provider>
    );
}

export function useLogin() {
    return useContext(LoginContext);
}
