"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    useEffect(() => {
        console.log("Auth state in profile:", authState);
        if (!authState.isAuthenticated) {
            router.push("/login");
        }
    }, [authState.isAuthenticated, router]);

    return (
        <div className="container mx-auto p-4">
            <h2>User Profile</h2>
        </div>
    )

}

export default Profile;