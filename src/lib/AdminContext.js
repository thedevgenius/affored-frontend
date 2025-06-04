"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [step, setStep] = useState('');
    const [loading, setLoading] = useState(true);

    return (
        <AdminContext.Provider value={{ step, setStep, loading, setLoading }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);
