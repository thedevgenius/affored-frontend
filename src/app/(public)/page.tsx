"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";

export default function Home() {
	const dispatch = useDispatch<AppDispatch>();
	const authState = useSelector((state: RootState) => state.auth);
	const router = useRouter();
	useEffect(() => {
		console.log("Auth state in profile:", authState);
		// if (!authState.isAuthenticated) {
		// 	router.push("/login");
		// }
	}, []);

	return (
		<div className="container mx-auto p-4">
			<h2>User Profile</h2>
		</div>
	)
}
