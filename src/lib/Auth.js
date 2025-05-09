'use server';

import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getAuthenticatedUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('access')?.value;

    if (!token) 
    redirect('/login');

    try {
        const res = await axios.get('http://127.0.0.1:8000/get-user-data/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        // redirect('/dashboard');
        return res.data;
        
    } catch (err) {
        redirect('/login');
    }
}
