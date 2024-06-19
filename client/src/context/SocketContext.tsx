/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext, ReactNode, useRef } from "react";
import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";

interface ISocketContext {
	socket: Socket | null;
	onlineUsers: string[];
}

// create a context for the socket
const SocketContext = createContext<ISocketContext | undefined>(undefined);

// custom hook to use the socket context
export const useSocketContext = (): ISocketContext => {
	const context = useContext(SocketContext); // get the context value
	if (context === undefined) {
		throw new Error("useSocketContext must be used within a SocketContextProvider");
	}
	return context;
};

// determine the socket URL based on the env
const socketURL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

// context provider component for socket
const SocketContextProvider = ({ children }: { children: ReactNode }) => {
	const socketRef = useRef<Socket | null>(null); // Use ref to keep track of the socket instance

	const [onlineUsers, setOnlineUsers] = useState<string[]>([]); // State to store the list of online users
	const { authUser, isLoading } = useAuthContext(); // Get authenication details from the auth context

	useEffect(() => {
        // if user is authenticated and not loading, initialize the socket connection
		if (authUser && !isLoading) {
			const socket = io(socketURL, {
				query: {
					userId: authUser.id,
				},
			});
			socketRef.current = socket; // Set the socket reference
            // Event listener to update the list of onine users
			socket.on("getOnlineUsers", (users: string[]) => {
				setOnlineUsers(users);
			});
            // Clean up the socket connection
			return () => {
				socket.close();
				socketRef.current = null;
			};
		} else if (!authUser && !isLoading) {
            // Close the socket connection if the user logout
			if (socketRef.current) {
				socketRef.current.close();
				socketRef.current = null;
			}
		}
	}, [authUser, isLoading]); // Effect dependencies

	return (
		<SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
            {children}
        </SocketContext.Provider>
	);
};

export default SocketContextProvider;