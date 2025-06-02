'use client';

import { useEffect } from "react";
import { redirect } from 'next/navigation';
import { useAuth } from "@/lib/AuthContext";
import { Logout } from "@/lib/Logout";
import ProtectedLink from "@/components/shared/ProtectedLink";



const Profile = () => {
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            redirect('/');
        }
    }, [])

    return (
        <>
            <div className="px-5 pt-5">
                <h1 className="text-2xl font-medium">Profile Page</h1>
                {user && (
                    <div>
                        <p>Phone: {user.phone}</p>
                        <button onClick={Logout} className="text-red-600 mt-10 cursor-pointer">Logout</button>
                    </div>
                )}
            </div>
            
        </>
    )
}

export default Profile;