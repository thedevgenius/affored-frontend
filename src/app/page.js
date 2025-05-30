'use client';

import { useEffect } from "react";
import Link from "next/link";

import { useAuth } from "@/lib/AuthContext";
import ProtectedLink from "@/components/shared/ProtectedLink";

export default function Home() {
    const { user } = useAuth();
    useEffect(() => {

    }, [])

    return (
        <>
            <h1>Home Page </h1>
            {/* <Link href='/profile'>Profile</Link> */}
            <ProtectedLink href={'profile'}>Profile</ProtectedLink>
            {user && (
                <>
                    <p>Phone: {user.phone}</p>
                    
                </>
            )}
        </>
        
        
    );
}
