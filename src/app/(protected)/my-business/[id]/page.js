'use client';

import axios from "axios";
import { use, useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { useAuth } from "@/lib/AuthContext";
import ProtectedLink from "@/components/shared/ProtectedLink";



const Profile = ({params}) => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const { user } = useAuth();
    const [business, setBusiness] = useState(null);
    const { id } = use(params);

    useEffect(() => {
        if (!user) {
            redirect('/');
        }

        axios.get(`${baseURL}my-business/${id}/`, { withCredentials: true })
            .then(response => {
                if (response.data) {
                    setBusiness(response.data); // Assuming you want the first business
                } else {
                    setBusiness(null);
                }
            })
            .catch(error => {
                console.error("Error fetching business data:", error);
                setBusiness(null);
            });
    }, [])

    return (
        <>
            <div className="px-5 pt-5">
                <h1 className="text-2xl font-medium">My Businesses</h1>
                {business && (
                    <>
                        {business.name}
                    </>
                )}
            </div>
            
        </>
    )
}

export default Profile;