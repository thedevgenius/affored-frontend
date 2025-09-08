"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
	const dispatch = useDispatch<AppDispatch>();
	const authState = useSelector((state: RootState) => state.auth);
	const userState = useSelector((state: RootState) => state.user)
	const router = useRouter();
	// useEffect(() => {
	// 	console.log("Auth state in profile:", authState);
	// }, []);

	return (
		<div className="container mx-auto p-4">
            {authState.isAuthenticated && (
				<h2>Welcome, {userState.phone}</h2>
			)}
			{!authState.isAuthenticated && (
				<Link href="/login" className="btn mt-5 me-2">Go to Login</Link>
			)}
            
			<Link href="/profile" className="btn mt-5">Go to Profile</Link>
		</div>
	)
}
