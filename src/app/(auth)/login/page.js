'use client';

import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';



export default function Login() {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('send');
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const sendOTP = async () => {
        await axios.post(apiUrl+'/send-otp/', { phone });
        setStep('verify');
    };

    const verifyOTP = async () => {
        const res = await axios.post(apiUrl+'/verify-otp/', { phone, otp });

        Cookies.set('access', res.data.access);
        Cookies.set('refresh', res.data.refresh);
        router.push('/dashboard');
    };
    return (
        <>
            <div className="px-3 pt-5">
                <h1>This is Login Page</h1>
                {step === 'send' && (
                    <>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="border border-gray-400 outline-0 w-full h-10" />
                        <button type="submit" onClick={sendOTP} className="bg-blue-500 w-full h-10 text-white mt-4">Send OTP</button>
                    </>
                )}

                {step === 'verify' && (
                    <>
                        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="border border-gray-400 outline-0 w-full h-10"  placeholder='OTP'/>
                        <button type="submit" onClick={verifyOTP} className="bg-blue-500 w-full h-10 text-white mt-4">Verify OTP</button>
                    </>
                )}
                
            </div>
        </>
  );
}
