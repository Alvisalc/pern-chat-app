import { Send } from "lucide-react";
import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

// Message Input Form
const MessageInput = () => {
	const [message, setMessage] = useState(""); // Message input state
	const { loading, sendMessage } = useSendMessage(); // hook to get loading state and sendMessage function

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Prevent the default form submission behavior
		if (!message.trim()) return; // Exit if the message is empty
		await sendMessage(message); // send message
		setMessage(""); // clear the input field after sending the message
	};
	return (
		<form className='px-4 mb-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-200 dark:bg-gray-700'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)} // update message state on input change
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? (
						<span className='loading loading-spinner' /> // Spinner while loading
					) : (
						<Send className='w-6 h-6 dark:text-white' /> // Send icon when not loading
					)}				
				</button>
			</div>
		</form>
	);
};
export default MessageInput;