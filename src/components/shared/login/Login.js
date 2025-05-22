'use client';

import "./login.css";
import axios from 'axios';
import { z } from "zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { useLogin } from "@/lib/LoginContext";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [step, setStep] = useState('send');
    const [submittedData, setSubmittedData] = useState(null);
    const { openLogin, setOpenLogin, setIsAuthenticated, setLoading } = useLogin();

    const handleLoginClose = () => {
        setOpenLogin(false);
    }

    const handleVerifyClose = () => {
        setStep('send');
    }

    const phoneSchema = z.object({
        phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
    });

    const otpSchema = z.object({
        phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
        otp: z.string().regex(/^\d{4}$/, "OTP must be 4 digits"),
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(step === 'send' ? phoneSchema : otpSchema),
    });

    const phone = watch("phone", "");
    const otp = watch("otp", "");

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        setValue('phone', value);
    };

    const handleOtpChange = (e) => { 
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) {
            value = value.slice(0, 4);
        }
        setValue('otp', value);
    }

    const onSubmit = (data) => {
        setSubmittedData(data);
        if (step === 'send') { 
            axios.post(apiUrl + 'send-otp/', { phone: data.phone })
                .then((response) => {
                    if (response.status === 200) {
                        toast.success('OTP send successfully');
                        setStep('verify');
                        console.log(response.data);
                    }
            })
            .catch((error) => {
                if (error.response && error.response.status === 429) {
                    toast.error('Too many requests. Please try again later.');
                } else {
                    console.error('Error sending OTP:', error);
                }
            });
        }
        
        
        if (step === 'verify') {
            axios.post(apiUrl + 'verify-otp/', { phone: data.phone, otp: data.otp }, { withCredentials: true})
                .then((response) => {
                    if (response.status === 200) {
                        toast.success('OTP verified successfully');
                        
                        router.push('/')
                        setOpenLogin(false);
                        setStep('verified');
                        localStorage.setItem('isAccessToken', true);
                        setIsAuthenticated(true);
                        setLoading(false);
                    } else {
                        toast.error('Invalid OTP. Please try again.');
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 400) {
                        toast.error('Invalid OTP. Please try again.');
                    } else {
                        console.error('Error verifying OTP:', error);
                    }
                });
        }
    }

    const onError = (errors) => {
        const firstErrorKey = Object.keys(errors)[0];
        const firstErrorMessage = errors[firstErrorKey]?.message || "Validation error";
        toast.error(firstErrorMessage);
    }

    if (step === 'verified') { 
        return;
    }

    return (
        <div>
            {step == 'send' && (
                <div className={`login_container ${openLogin ? 'active' : ''}`}>
                    <button className="back-btn" onClick={handleLoginClose}><img src="/icons/arrow-left.svg" alt="" /></button>
                    <div className="login_form">
                        <h1 className="text-center text-3xl font-medium mb-5">Login</h1>
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <div className="relative mb-4">
                                <span className="country_code">+91</span>
                                <input type="tel" className="input pl-12" placeholder="Enter Your Phone Number"
                                    {...register("phone")}
                                    onChange={handlePhoneChange}
                                />
                            </div>
                            <button type="submit" className="btn w-full" disabled={phone.length !== 10}>Continue</button>
                        </form>
                    </div>
                </div>
            )}
            
            {step == 'verify' && (
                <div className={`login_container ${openLogin ? 'active' : ''}`}>
                    <button className="back-btn" onClick={handleVerifyClose}>X</button>
                    <div className="login_form">
                        <h1 className="text-center text-3xl font-medium mb-5">Verify OTP</h1>
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <input type="text" className="input p-4 mb-3"
                                placeholder="Enter OTP"
                                {...register("otp")}
                                onChange={handleOtpChange}
                            />
                            <button type="submit" className="btn w-full">Verify OTP</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login;