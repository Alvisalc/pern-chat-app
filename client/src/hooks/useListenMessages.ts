import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

// Function to listen for new messages via the socket
const useListenMessages = () => {
	const { socket } = useSocketContext(); // Get the socket instance from the socket context
	const { messages, setMessages } = useConversation(); // Extract state and funcitons from the conversation hook

	useEffect(() => {
        // Event listener for "newMessage"
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true; // Add a property to indicate the message
			setMessages([...messages, newMessage]); // udpate the message state with new message
		});
        // Clean up the event listener
		return () => {
			socket?.off("newMessage");
		};
	}, [socket, messages, setMessages]); // Dependency array to re-run the effect when socket, messages, or setMessages change
};
export default useListenMessages;