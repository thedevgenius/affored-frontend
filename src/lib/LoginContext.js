'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const LoginContext = createContext();

export function LoginProvider({ children }) {
    const [openLogin, setOpenLogin] = useState(false);

        

    useEffect(() => {
        const timer = setTimeout(() => {
                setOpenLogin(true);
            }, 5000);
            return () => clearTimeout(timer);
    }, []);

    return (
        <LoginContext.Provider value={{ openLogin, setOpenLogin }}>
            {children}
        </LoginContext.Provider>
    );
}

export function useLogin() {
    return useContext(LoginContext);
}
