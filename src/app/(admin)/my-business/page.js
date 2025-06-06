'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { useAuth } from "@/lib/AuthContext";
import ProtectedLink from "@/components/shared/ProtectedLink";



const Profile = () => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const { user } = useAuth();
    const [business, setBusiness] = useState(null);

    useEffect(() => {
        if (!user) {
            redirect('/');
        }

        axios.get(baseURL + 'my-businesses/', { withCredentials: true })
            .then(response => {
                if (response.data && response.data.length > 0) {
                    setBusiness(response.data); // Assuming you want the first business
                } else {
                    setBusiness(null);
                }
            })
            .catch(error => {
                console.error("Error fetching business data:", error);
                setBusiness(null);
            });
    }, []);

    

    return (
        <>
            <div className="px-5 pt-5">
                <h1 className="text-2xl font-medium">My Businesses</h1>
                {business ? (
                    <>
                        {business.map((b, index) => (
                            <ProtectedLink href={`/my-business/${b.id}`} key={index} className="text-blue-500 p-3.5 rounded-lg block border border-gray-400 bg-white shadow-md mb-4">
                                <h2 className="text-xl font-semibold text-black">{b.name}</h2>
                                <p className="text-gray-600">{b.category.name}</p>
                            </ProtectedLink>
                        ))}
                    </>
                ) : (
                        <>
                            <p>Getting</p>
                        </>
                )}

                <p><ProtectedLink href={'add-business'} className="btn w-full">Add New Business</ProtectedLink></p>
            </div>

        </>
    )
}

export default Profile;