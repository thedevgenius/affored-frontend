export async function Logout() {
    const res = await fetch('http://localhost:8000/v1/logout/', {
        method: 'POST',
        credentials: 'include',
    });

    if (res.ok) {
        window.location.href = '/';
    }
}