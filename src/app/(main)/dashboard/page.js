// app/profile/page.jsx
"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        api
            .get("profile/")
            .then((res) => setUser(res.data))
            .catch((err) => console.error("Profile fetch failed:", err));
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Profile</h1>
            <p><strong>Phone:</strong> {user.phone}</p>
        </div>
    );
}
