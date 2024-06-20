import { useSocketContext } from "../../context/SocketContext";
import useConversation from "@/zustand/useConversation";

// Display single conversation
const Conversation = ({ conversation }: { conversation: ConversationType; }) => {
	const { setSelectedConversation, selectedConversation } = useConversation(); // extract state and function from conversation hook
	const isSelected = selectedConversation?.id === conversation.id // check if the current conversation is selected

	const { onlineUsers } = useSocketContext(); // Extract online users from socket context

	const isOnline = onlineUsers.includes(conversation.id); // check if the user of this conversation is online

	return (
		<>
			{/* Container for the conversation */}
			<div className={`flex gap-2 items-center hover:bg-blue-300 dark:hover:bg-gray-700 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-blue-300 dark:bg-gray-700" : ""}`}
				onClick={()=> setSelectedConversation(conversation)}
			>
				{/* Avatar section */}
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-8 md:w-12 rounded-full overflow-hidden'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
					{isOnline && 
					<div className="online-indicator">
						<span className="blink"/>
					</div>
					}
				</div>
				{/* Conversation details */}
				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-sm md:text-md'>{conversation.fullName}</p>
					</div>
				</div>
			</div>
		</>
	);
};
export default Conversation;
