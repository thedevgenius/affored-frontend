"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import useAuth from '@/hooks/useAuth';
import { useLogin } from "@/lib/LoginContext";

export default function Profile() {
    const [user, setUser] = useState(null);
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const { setOpenLogin } = useLogin();

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            console.error("User is not authenticated");
            router.push("/");
            setOpenLogin(true);
            return;
        }
        api
            .get("profile/")
            .then((res) => setUser(res.data))
            .catch((err) => console.error("Profile fetch failed:", err));
    }, [loading, isAuthenticated]);

    if (loading) {
        return <p>Checking authentication...</p>; // optional loader
    }

    if (!isAuthenticated) {
        return null; // Don't show dashboard while not logged in
    }

    if (!user) {
        return <p>Loading profile...</p>; // optional loader
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Profile</h1>
            <p><strong>Phone:</strong> {user.phone}</p>
        </div>
    );
}
