import { useAuthContext } from "@/context/AuthContext";
import { extractTime } from "@/utils/extractTime";
import useConversation, { MessageType } from "@/zustand/useConversation";

const Message = ({ message }: { message: MessageType }) => {
	// Get Auth user & conversation details
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();

	// Determine if the message is sent by the authenticated user
	const fromMe = message?.senderId === authUser?.id;
	// Set profile picture based on the message sender
	const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
	// CSS for chat bubble alignment
	const chatClass = fromMe ? "justify-end" : "justify-start";
	// chat bubble color
	const bubbleBg = fromMe ? "bg-blue-300 dark:bg-blue-500" : "bg-gray-300 dark:bg-gray-700";
	// text algin for message content
	const textAlign = fromMe ? "text-right" : "text-left";

  return (
    <div className={`flex items-end ${chatClass} mb-4`}>
		{!fromMe && (
			<div className='w-8 h-8 rounded-full overflow-hidden mr-2'>
			<img alt='Profile' src={img} />
			</div>
		)}
		<div className={`flex flex-col ${fromMe ? 'items-end' : 'items-start'} max-w-xs`}>
			<div className={`px-4 py-2 rounded-lg shadow ${bubbleBg}`}>
				<p className={textAlign}>{message.body}</p>
			</div>
			<span className={`text-xs text-gray-500 mt-1 ${textAlign}`}>
			{extractTime(message.createdAt)}
			</span>
        </div>
		{fromMe && (
			<div className='w-8 h-8 rounded-full overflow-hidden ml-2'>
			<img alt='Profile' src={img} />
			</div>
		)}
    </div>
  );
};

export default Message;
