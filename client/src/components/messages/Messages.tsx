import useChatScroll from "@/hooks/useChatScroll";
import useGetMessages from "@/hooks/useGetMessages";
import useListenMessages from "@/hooks/useListenMessages";
import Message from "./Message";

const Messages = () => {
	const { loading, messages } = useGetMessages(); // fetch loading state and messages
	useListenMessages(); // message listener for real-time updates

	// reference for auto-scrolling to the latest message
	const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>;

	return (
		<div className='px-4 flex-1 overflow-auto' ref={ref}>
			{/* Display messages once loaded */}
			{!loading && messages.map((message) => <Message key={message.id} message={message} />)}
			{/* Display message when there are no messages */}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;