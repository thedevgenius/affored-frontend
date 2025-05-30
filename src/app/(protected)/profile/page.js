'use client';

import { useEffect } from "react";
import { redirect } from 'next/navigation';
import { useAuth } from "@/lib/AuthContext";
import { Logout } from "@/lib/Logout";



const Profile = () => {
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            redirect('/');
        }
    }, [])

    return (
        <>
            <h1>Profile Page</h1>
            {user && (
                <div>
                    Phone: {user.phone}
                    <button onClick={Logout}>Logout</button>
                </div>
            )}
        </>
    )
}

export default Profile;