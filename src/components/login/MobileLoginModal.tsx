import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { openLogin, closeLogin } from '@/store/slices/modalSlice';

const MobileLoginModal = () => {
    const isOpen = useSelector((state: RootState) => state.modal.isLoginOpen);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => { 
        const timeoutId = setTimeout(() => { 
            dispatch(openLogin());
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, [dispatch]);

    if (!isOpen) return null;

    return (
        <div>
            <h2>Login</h2>
            <form>
                <button type='button' onClick={()=> dispatch(closeLogin())}>X</button>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default MobileLoginModal;