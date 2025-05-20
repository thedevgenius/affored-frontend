import { useState, useEffect } from 'react';
import api from '@/lib/axios';

export default function useAuth() {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get('check-auth/');
                setAuthenticated(response.data.isAuthenticated);
            } catch (error) {
                console.error('Error checking authentication:', error);
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { isAuthenticated, loading };
}
