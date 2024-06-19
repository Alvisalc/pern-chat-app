import { create } from "zustand";

// type for converstation data
export type ConversationType = {
    id: string;
    fullName: string;
    profilePic: string;
}

// type for message data
export type MessageType = {
    id: string;
    body: string;
    senderId: string;
    createdAt: string;
}

// Conversation state interface
interface ConversationState{
    selectedConversation: ConversationType | null; // current selected conversation
    messages: MessageType[]; // array of conversation messages
    setSelectedConversation: (conversation: ConversationType|null) => void; // update selected conversation
    setMessages: (messages: MessageType[]) => void; // update conversation messages
}

// create a Zustand store for Conversation state
const useConversation = create<ConversationState> ((set)=>({
    selectedConversation: null, // initially no conversation is selected
    setSelectedConversation: (conversation) => set({selectedConversation: conversation}), // update selected converation

    messages: [], // initial there are no messages
    setMessages: (messages) => set({messages: messages}), // update conversation messages
}));

export default useConversation;