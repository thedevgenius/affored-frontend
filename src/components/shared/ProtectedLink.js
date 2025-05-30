"use client";

import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function ProtectedLink({ href, children, ...props }) {
    const { isAuthenticated, setOpenLogin } = useAuth();

    const handleClick = (e) => {
        if (!isAuthenticated) {
            e.preventDefault();
            localStorage.setItem("redirect_after_login", href);
            setOpenLogin(true);
        }
    };

    return (
        <Link href={href} onClick={handleClick} {...props}>
            {children}
        </Link>
    );
}
