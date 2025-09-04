'use client';

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { requestOtp, verifyOtp } from "../store/slices/authSlice";

export const useLogin = () => {
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth);

    const sendOtp = (phone: string) => {
        dispatch(requestOtp(phone));
    };

    const checkOtp = (phone: string, otp: string) => {
        dispatch(verifyOtp({ phone, otp }))
    }

    return { sendOtp, checkOtp, authState}
}

