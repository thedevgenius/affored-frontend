"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { requestOtp, verifyOtp } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import axios from "axios";


const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const [otpSent, setOtpSent] = useState(false);
    
    useEffect(() => {
        if (authState.isAuthenticated) {
            router.push("/");
        }
    }, [authState.isAuthenticated, router]);

    const handleSendOTP = (e: React.FormEvent) => {
        e.preventDefault();
        const phone = (e.target as any).phone.value;
        dispatch(requestOtp(phone));
        setOtpSent(true);
    }

    const handleVerifyOTP = (e: React.FormEvent) => {
        e.preventDefault();
        const otp = (e.target as any).otp.value;
        dispatch(verifyOtp({ phone: authState.phone, otp }));
    }

    if (authState.loading || authState.isAuthenticated) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {!otpSent && (
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Login</h2>
                    <form onSubmit={handleSendOTP}>
                        <input type="text" className="input" name="phone" placeholder="Phone" />
                        <button type="submit" className="btn mt-5">Continue with OTP</button>
                    </form>
                </div>
            )}

            {otpSent && (
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Enter OTP</h2>
                    <form onSubmit={handleVerifyOTP}>
                        <input type="text" className="input" name="otp" placeholder="OTP" />
                        <button type="submit" className="btn mt-5">Verify OTP</button>
                    </form>
                </div>
            )}
            
        </div>
    )
}

export default Login