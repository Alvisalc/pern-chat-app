/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

// Custom hook to handle user login
const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext(); // Extract AuthUser from useAuthContext

	// Function to handle login
	const login = async (username: string, password: string) => {
		try {
			setLoading(true);
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" }, // Set headers for the req
				body: JSON.stringify({ username, password }), // send username and password in the req body
			});

			const data = await res.json(); // Parse the JSON res

			if (!res.ok) throw new Error(data.error);
			setAuthUser(data); // update the authenticated user in the context
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login }; // return loading status and function
};
export default useLogin;