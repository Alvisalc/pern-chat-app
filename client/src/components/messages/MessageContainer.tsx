import useConversation from "@/zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

import { MessageCircle } from "lucide-react";

// Component displayed when no chat is selected
const NoChatSelected = () => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl  font-semibold flex flex-col items-center gap-2'>
				<p>Welcome</p> 
				<p>Select a chat to start messaging</p> 
				<MessageCircle className='text-3xl md:text-6xl text-center' /> 
			</div>
		</div>
	);
};

// Main container for messages and message input
const MessageContainer = () => {
	// get the selected conversation from the state
	const { selectedConversation } = useConversation();

	return (
		<div className='w-full flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected/> // Display component if no conversation is selected
			) : (
				<>
					{/* Header */}
					<div className='dark:bg-gray-700 px-4 py-5 mb-2 border-b-2'>
						<span className='label-text dark:text-gray-900'>To:</span> <span className=' text-blue-600 dark:text-white font-bold'>{selectedConversation.fullName}</span>
					</div>
					{/* Display messages */}
					<Messages />
					<MessageInput />
				</>
			)}
			
		</div>
	);
};
export default MessageContainer;
