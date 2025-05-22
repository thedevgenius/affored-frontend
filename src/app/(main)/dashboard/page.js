"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/lib/LoginContext";
import Loader from "@/components/shared/loader/Loader";

export default function Profile() {
    const router = useRouter();
    const { setOpenLogin, isAuthenticated, loading } = useLogin();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            setOpenLogin(true);
            router.push("/");
        }
    }, [loading, isAuthenticated, setOpenLogin, router]);

    if (loading) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        return null; // Return nothing while redirecting
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Profile</h1>
        </div>
    );
}
