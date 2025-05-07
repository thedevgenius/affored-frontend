// app/profile/page.tsx
import { cookies } from 'next/headers';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/Auth';

const UserProfile = async () => {
    const user = await getAuthenticatedUser();
    

    return (
        <div>
            <h2>User Profile</h2>
            <p>Phone: {user.phone}</p>
        </div>
    );
};

export default UserProfile;
