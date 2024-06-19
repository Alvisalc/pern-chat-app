/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext(); // Extract AuthUser data from authenication conetxt

	// Logout custom hook
	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/auth/logout", {
				method: "POST", // sned POST req to logout endpoint
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			setAuthUser(null); // Clear the authenticated user in the context
		} catch (error: any) {
			console.error(error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout }; // return status and funciton
};
export default useLogout;