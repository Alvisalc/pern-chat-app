/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// user type
type AuthUserType = {
	id: string;
	fullName: string;
	email: string;
	profilePic: string;
	gender: string;
};

// AuthContext with initial values
const AuthContext = createContext<{
	authUser: AuthUserType | null;
	setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
	isLoading: boolean;
}>({
	authUser: null,
	setAuthUser: () => {},
	isLoading: true,
});

// custom hook to acess AuthContext
export const useAuthContext = () => {
	return useContext(AuthContext);
};

// provider component for AuthContext
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// fetch authenticated user on component mount
	useEffect(() => {
		const fetchAuthUser = async () => {
			try {
				const res = await fetch("/api/auth/me"); // fetch server side
				const data = await res.json(); // data res as json format
				if (!res.ok) {
					throw new Error(data.error);
				}
				setAuthUser(data); // get user data 
			} catch (error: any) {
				console.error(error);
				toast.error(error.message);
			} finally {
				setIsLoading(false);
			}
		};
		fetchAuthUser();
	}, []);
	// proivding context values to children components
	return (
		<AuthContext.Provider
			value={{
				authUser,
				isLoading,
				setAuthUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};