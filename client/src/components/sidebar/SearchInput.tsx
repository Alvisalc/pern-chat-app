import { Search } from "lucide-react";
import { useState } from "react"; 
import toast from "react-hot-toast"; 
import useConversation from "../../zustand/useConversation"; 
import useGetConversations from "../../hooks/useGetConversations";

// Define the SearchInput component
const SearchInput = () => {
  const [search, setSearch] = useState(""); // State for managing the search input value
  const { setSelectedConversation } = useConversation(); // Destructure setSelectedConversation function from conversation state
  const { conversations } = useGetConversations(); // Destructure conversations array from fetched conversations

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!search) return; // Exit if search input is empty

    // Find a conversation that matches the search term
    const conversation = conversations.find((c: ConversationType) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation); // Set the selected conversation if found
      setSearch(""); // Clear the search input
    } else {
      toast.error("No such user found!"); // Show error if no matching conversation is found
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <div className="relative w-full max-w-md">
        <input
        type="text"
        placeholder="Search…"
        className="input input-bordered bg-gray-300 rounded-full w-full text-black px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-sky-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Update search state on input change
        />
        <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
        <Search className="w-4 h-4 md:w-6 md:h-6 text-gray-500 hover:text-gray-700" /> {/* Render the Search icon */}
        </button>
      </div>
	</form>
  );
};

export default SearchInput;
