import { create } from "zustand";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  image?: string; // ✅ optional
}

interface Chatroom {
  id: string;
  title: string;
  messages: Message[];
}

interface ChatState {
  chatrooms: Chatroom[];
  currentRoomId: string | null;
  createChatroom: (title: string) => void;
  deleteChatroom: (id: string) => void;
  sendMessage: (roomId: string, message: Message) => void;
  setCurrentRoom: (id: string) => void;
  setChatrooms: (rooms: Chatroom[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chatrooms: [],
  currentRoomId: null,

  createChatroom: (title) =>
    set((state) => {
      const newRoom: Chatroom = {
        id: Date.now().toString(),
        title,
        messages: [],
      };
      const updated = [...state.chatrooms, newRoom];
      if (typeof window !== "undefined") {
        localStorage.setItem("chatrooms", JSON.stringify(updated));
      }
      return { chatrooms: updated };
    }),

  deleteChatroom: (id) =>
    set((state) => {
      const updated = state.chatrooms.filter((room) => room.id !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem("chatrooms", JSON.stringify(updated));
      }
      return {
        chatrooms: updated,
        currentRoomId: state.currentRoomId === id ? null : state.currentRoomId,
      };
    }),

  sendMessage: (roomId, message) =>
    set((state) => {
      const chatrooms = state.chatrooms.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            messages: [...room.messages, message],
          };
        }
        return room;
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("chatrooms", JSON.stringify(chatrooms));
      }
      return { chatrooms };
    }),

  setCurrentRoom: (id) => set({ currentRoomId: id }),

  setChatrooms: (rooms) => set({ chatrooms: rooms }), // ✅ Make sure this exists
}));
