'use client';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/lib/LoginContext';
import { toast } from 'react-hot-toast';

import { set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const phoneSchema = z.object({
    phoneNumber: z.string()
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(15, { message: "Phone number must be at most 15 digits" })
        .regex(/^[0-9+]+$/, { message: "Only numbers and + allowed" })
});


export default function Login() {
    const { openLogin, setOpenLogin } = useLogin();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('send');
    const [btn, setBtn] = useState(false);
    
    const [submittedData, setSubmittedData] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm({
        resolver: zodResolver(phoneSchema)
    });

    const phoneNumber = watch('phoneNumber');

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        } else {
            setBtn(false);
        }
        setValue('phoneNumber', value);
    };

    const onSubmit = (data) => {
        setSubmittedData(data);
        console.log('Valid data:', data);
        // Here you would typically send the data to your backend
        axios.post(apiUrl + '/send-otp/', { phone: data.phoneNumber })
            .then((response) => {
                console.log('OTP sent successfully:', response.data);
                setStep('verify');
                toast.success('You did it!'); 
            })
            .catch((error) => {
                console.error('Error sending OTP:', error);

            });
        setStep('verify');
    };

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    {step === 'send' && (
                        <div>
                            <button className='back-btn' type='button' onClick={handleClose}>X</button>
                            <img src="/images/login-img.jpg" alt="Login Image" />
                            <div className='login-form'>
                                <h1 className='text-3xl font-bold text-center'>Login</h1>
                                <p className='text-center text-base'>Discover. Decide. Direct</p>
                                <div className='mt-4'>
                                    <input
                                        id="phoneNumber"
                                        type="tel"
                                        className={`input ${errors.phoneNumber ? 'input-error' : ''}`}
                                        placeholder="Enter your phone number"
                                        {...register('phoneNumber')}
                                        onChange={handlePhoneChange}
                                        onBlur={() => {
                                            if (errors.phoneNumber) {
                                                toast.error(errors.phoneNumber.message, {
                                                id: 'phone-error'
                                                });
                                            }
                                            }}
                                    />
                                    
                                    
                                    <button type='submit' className='btn w-full mt-4'>Login with OTP</button>
                                </div>
                                <p className='text-center text-gray-500 font-light text-sm mt-5'>By clicking I am agree to <a href="#" className='text-green-400'>Terms & Conditions</a></p>
                            </div>

                        </div>
                    )}
                    {step === 'verify' && (
                        <div>
                            <div className='login-form'>
                                <h1 className='text-3xl font-bold text-center'>Verify OTP</h1>
                                <div className='mt-4'>
                                    <input type="text" placeholder='Verify OTP' />
                                    <button type='submit' className='btn w-full mt-4'>Verify OTP</button>
                                </div>
                                <p className='text-center text-gray-500 font-light text-sm mt-5'>By clicking I am agree to <a href="#" className='text-green-400'>Terms & Conditions</a></p>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}
