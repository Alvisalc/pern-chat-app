import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false); // tack loading status
	const { messages, setMessages, selectedConversation } = useConversation(); // values from conversation state
    // function to Send Message
	const sendMessage = async (message: string) => {
		if (!selectedConversation) return; // if no conversation is selected, exit the function
		setLoading(true); // set loading state
		try {
            // POST req to API to send the message
			const res = await fetch(`/api/messages/send/${selectedConversation.id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json(); // Parse the JSON res
			if (data.error) throw new Error(data.error); // error tracking
            // Add new message to the current list of messages
			setMessages([...messages, data]);
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;