import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Fetch and manage conversations
const useGetConversations = () => {
    const [loading, setLoading] = useState(false); // loading status
    const [conversations, setConversations] = useState<ConversationType[]>([]); // store the list of conversations

    useEffect(() => {
        // Function to fetch conversations from the API
        const getConversations = async () => {
            setLoading(true);
            try{
                const res = await fetch("/api/messages/conversations"); // Fetch conversations from the API
                const data = await res.json(); // Parse the JSON res
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data); // update state with the fetched converations
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getConversations(); // Call function to fetch conversations
    }, []); // empty dependency array

  return {loading, conversations }; // Return loading status and conversations

};

export default useGetConversations