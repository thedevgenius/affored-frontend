'use client';

import axios from 'axios';

export async function IsAuthenticated() {
    axios.get('http://localhost:8000/get-user-data/', {
        withCredentials: true, // ✅ Required to send cookies (access_token)
    })
        .then((response) => {
            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
        });
}
