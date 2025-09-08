import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface User{
    phone: string;
    name?: string | null;
}

interface UserState {
    phone: string;
    name?: string | null;
    loading?: boolean;
    error?: string | null;

}

const initialState: UserState = {
    phone: "",
    name: null,
    loading: false,
    error: null,
};

// Thunks
export const fetchUserProfile = createAsyncThunk<User>(
    "auth/fetchUserProfile",
    async (_, { rejectWithValue }) => {
        try {
            const acccessToken = Cookies.get("accessToken");
            if (!acccessToken) {
                return rejectWithValue("No access token found");
            }
            const response = await axios.get("http://127.0.0.1:8000/user/profile", {
                headers: {
                    Authorization: `Bearer ${acccessToken}`, // ✅ send JWT
                },
            });
            return {
                phone: response.data.phone,
                name: response.data.name,
            };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
        }
    }
);

// Slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUser: () => initialState,  
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.phone = action.payload.phone;
                state.name=action.payload.name;
            })
            .addCase(fetchUserProfile.rejected, (state) => {
                state.loading = false;
                state.phone = "";
            });
    },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
