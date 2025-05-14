'use client';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/lib/LoginContext';


export default function Login() {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('send');
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { openLogin, setOpenLogin } = useLogin();

    const handleClose = () => {
        setOpenLogin(false);
    }

    const sendOTP = async () => {
        await axios.post(apiUrl + '/send-otp/', { phone });
        setStep('verify');
    };

    const verifyOTP = async () => {
        const res = await axios.post(apiUrl + '/verify-otp/', { phone, otp });

        Cookies.set('access', res.data.access);
        Cookies.set('refresh', res.data.refresh);
        router.push('/');
    };
    return (
        <>
            <div className={`login-backdrop pt-14 px-2 ${openLogin && 'open'}`}>
                {step === 'send' && (
                    <div>
                        <button className='back-btn' onClick={handleClose}>X</button>
                        <img src="/images/login-img.jpg" alt="Login Image" />
                        <div className='login-form'>
                            <h1 className='text-2xl font-bold text-center'>Login</h1>
                            <p className='text-center text-sm'>Please enter your phone number to receive an OTP.</p>
                            <div className='mt-4'>
                                <input
                                    type="tel"
                                    placeholder="Enter Phone Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className='input mb-6'
                                />
                                <button onClick={sendOTP} className='btn w-full'>Login with OTP</button>
                            </div>
                            <p className='text-center text-gray-500 font-light text-sm mt-5'>By clicking I am agree to <a href="#" className='text-green-400'>Terms & Conditions</a></p>
                        </div>
                        
                    </div>
                )}
            </div>
        </>
    );
}
