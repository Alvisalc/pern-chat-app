import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation(); // Extract state from conversation hook

	useEffect(() => {
		// Function to fetch messages for selected conversation
		const getMessages = async () => {
			if (!selectedConversation) return; // Exit if no conversation is selected
			setLoading(true); // loading
			setMessages([]); // clear current messages
			try {
				const res = await fetch(`/api/messages/${selectedConversation.id}`); // Fetch messages for the selected conversation
				const data = await res.json(); // Parse JSON res
				if (!res.ok) throw new Error(data.error || "An error occurred"); 
				setMessages(data); // update state with the fetched messages
			} catch (error: any) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getMessages(); // Call the function to fetch messages
	}, [selectedConversation, setMessages]); // Dependency array to triger the effect when selected conversation change

	return { messages, loading }; // return the messages and loading status
};
export default useGetMessages;