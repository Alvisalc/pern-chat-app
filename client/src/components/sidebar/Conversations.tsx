import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

// display the list of conversations
const Conversations = () => {
	const { conversations, loading } = useGetConversations(); // fetch conversations and loading state
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{/* Map through the conversations and render a conversation component for each */}
			{conversations.map((conversation) => (
				<Conversation key={conversation.id} conversation={conversation} />
			))}
			{/* show a loading spinner if loading is true */}
			{loading ? <span className='loading loading-spinner mx-auto' /> : null}
		</div>
	);
};
export default Conversations;