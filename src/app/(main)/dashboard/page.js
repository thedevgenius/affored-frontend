'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios'; // Adjust the import based on your axios setup

export default function ProfilePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/get-user-data/');
                setUser(res.data);
            } catch (err) {
                console.error("User fetch failed", err);
            }
        };

        fetchUser();
    }, []);  // ✅ Only runs once

    return (
        <div>
            <h1>Profile</h1>
            {user ? <p>Hello, {user.phone}</p> : <p>Loading...</p>}
        </div>
    );
}
