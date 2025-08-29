import './login.css';

import { useEffect, useState } from 'react';

const MobileLoginModal = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <div className="mobile-login-modal">
                <div className="mobile-modal-content bg-white p-4 w-full">
                    <div className='w-full'>
                        <h2 className='text-center text-3xl font-semibold mb-5'>Login</h2>
                        <form>
                            <input type="text" className='input mb-5' placeholder="Username" />
                            <button type="submit" className='btn w-full'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileLoginModal;