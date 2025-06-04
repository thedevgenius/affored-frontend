'use client';

import { useEffect } from "react";
import Link from "next/link";

import { useAuth } from "@/lib/AuthContext";
import ProtectedLink from "@/components/shared/ProtectedLink";
import SelectLocation from "@/components/shared/SelectLocation";

export default function Home() {
    const { user } = useAuth();
    useEffect(() => {

    }, [])

    return (
        <>
            <div className="p-3">
                <h1>Home Page </h1> <br />
                {user && (
                    <>
                        <p>Phone: {user.phone}</p> <br />
                        
                    </>
                )}
                <SelectLocation /> <br />
                <ProtectedLink href={'profile'} className="text-blue-600 underline">Profile</ProtectedLink>
                
            </div>
        </>
        
        
    );
}
