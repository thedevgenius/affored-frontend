'use client';

import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const MyBizContext = createContext();

export function MyBizProvider({ initialBiz, children }) {
    const [biz, setBiz] = useState(initialBiz);

    const refreshBiz = useCallback(async (id) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}my-business/${id}/`, { withCredentials: true });
            setBiz(res.data);
        } catch (err) {
            console.error("Error refreshing biz:", err);
            setBiz(null);
        }
    }, []);

    return (
        <MyBizContext.Provider value={{ biz, setBiz, refreshBiz }}>
            {children}
        </MyBizContext.Provider>
    );
}

export const useMyBiz = () => useContext(MyBizContext);
