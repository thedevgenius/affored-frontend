'use client';

import { useEffect } from "react";
import Link from "next/link";

import { useAuth } from "@/lib/AuthContext";
import ProtectedLink from "@/components/shared/ProtectedLink";
import SelectLocation from "@/components/shared/SelectLocation";

export default function Home() {
    const { user } = useAuth();
    useEffect(() => {

    }, []);

    return (
        <>
            <div className="flex items-center justify-between pt-1.5 px-3">
                <div className="WelcomeText">
                    <h6 className="font-semibold leading-4">Book or Buy?</h6>
                    <h1 className="font-bold text-xl">We have it all</h1>
                </div>
                <div className="UserData">
                    <ProtectedLink href="/profile"><img src="/icons/user-profile.svg" width={30} alt="User Profile Icon" /></ProtectedLink>
                </div>
            </div>

            <div className="SearchBar px-3 py-3">
                <div className="SearchInput">
                    <img src="/icons/search.svg" alt="Search Icon" />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
        </>
    );
}
