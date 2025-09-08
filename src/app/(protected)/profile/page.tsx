"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { fetchUserProfile } from "@/store/slices/userSlice";
import { logout as logoutAction } from "@/store/slices/authSlice";
import { log } from "console";

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector((state: RootState) => state.user);
    const authState = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        console.log("User state:", userState);
        if (!userState.phone) {
            dispatch(fetchUserProfile());
        }
    }, [userState.phone, dispatch]);

    const logout = () => {
        dispatch(logoutAction());
        router.push("/");
    }

    return (
        <div className="container mx-auto p-4">
            <h2>User Profile</h2>
            {userState.phone ? (
                <div>
                    <p><strong>Phone:</strong> {userState.phone}</p>
                    <button className="btn" onClick={()=>logout()}>Logout</button>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}

        </div>
    )

}

export default Profile;