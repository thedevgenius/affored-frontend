"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Login from "@/components/login/Login";

const AuthContext = createContext();

export const AuthProvider = ({ children, initialUser }) => {
    const [user, setUser] = useState(initialUser || null);
    const [openLogin, setOpenLogin] = useState(false);
    const [opened, setOpened] = useState(false);

    const isAuthenticated = !!user;

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         const timer = setTimeout(() => setOpenLogin(true), 5000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, openLogin, setOpenLogin, setOpened }}>
            {children}
            {/* {!isAuthenticated && openLogin && <Login />} */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
