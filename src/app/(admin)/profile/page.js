'use client';

import axios from "axios";
import { useEffect } from "react";
import { redirect } from 'next/navigation';
import { useAuth } from "@/lib/AuthContext";
import { Logout } from "@/lib/Logout";
import ProtectedLink from "@/components/shared/ProtectedLink";
import { set } from "zod";



const Profile = () => {
    const { user, setUser } = useAuth();
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.11.65:8000/v1/';

    useEffect(() => {
        if (!user) {
            redirect('/');
        }
        axios.get(`${baseURL}user/profile`, {withCredentials: true})
            .then(response => {
               if (response.status === 200) {
                    setUser(response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching profile:", error);
            });

    }, []);


    return (
        <>
            <div className="AdminHeader">
                <div className="flex items-center gap-1.5">
                    <button className="BrowseBack" onClick={() => history.back()}><img src="/icons/arrow-left.svg" alt="" /></button><h2>Profile</h2>
                </div>
            </div>
            <div className="AdminContent">
                {user && (
                    <>
                        <h2 className="text-xl font-medium">{user.first_name} {user.last_name}</h2>
                        <div className="flex items-center gap-1">
                            <img src="/icons/call.svg" width={13} alt="" />
                            <p className="text-xs text-gray-500">{ user.phone }</p>
                        </div>
                        <ProtectedLink href="#" className="text-sm mt-2 inline-block">Edit Profile</ProtectedLink> <br />
                        <button onClick={Logout} className="text-red-600 mt-10 cursor-pointer">Logout</button>
                    </>
                )}
            </div>
        </>
    )
}

export default Profile;