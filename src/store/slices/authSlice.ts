import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
    isAuthenticated: boolean;
    phone: string;
    otpSent: boolean;
    loading: boolean;
    error: string | null;
    token: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    phone: "",
    otpSent: false,
    loading: false,
    error: null,
    token: null,
};

// Thunks
export const requestOtp = createAsyncThunk(
    "auth/requestOtp",
    async (phone: string, { rejectWithValue }) => {
        try {
            await axios.post("http://127.0.0.1:8000/auth/send-otp", { phone });
            return phone;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to send OTP");
        }
    }
);

export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async ({ phone, otp }: { phone: string; otp: string }, { rejectWithValue }) => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/auth/verify-otp", { phone, otp });
            return res.data.token; // assume backend sends JWT
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "OTP verification failed");
        }
    }
);

// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuth: () => initialState,  
    },
    extraReducers: (builder) => {
        builder
            .addCase(requestOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(requestOtp.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.phone = action.payload;
                state.otpSent = true;
            })
            .addCase(requestOtp.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.token = action.payload;
                state.otpSent = false;
                state.isAuthenticated = true;
            })
            .addCase(verifyOtp.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
