// ----------------------------
"use client";
import { useChatStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function ChatDashboard() {
  const { chatrooms, createChatroom, deleteChatroom, setCurrentRoom } =
    useChatStore();
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filteredRooms, setFilteredRooms] = useState(chatrooms);
  const router = useRouter();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      const lower = search.toLowerCase();
      setFilteredRooms(
        chatrooms.filter((room) => room.title.toLowerCase().includes(lower))
      );
    }, 300);
    return () => clearTimeout(timer);
  }, [search, chatrooms]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Your Chatrooms</h2>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search chatrooms..."
        className="border p-2 w-full mb-4"
        aria-label="Search chatrooms"
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (title) {
            createChatroom(title);
            setTitle("");
          }
        }}
        className="flex gap-2 mb-4"
      >
        <input
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Chatroom title"
          aria-label="Chatroom title"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      <ul>
        {filteredRooms.map((room) => (
          <li key={room.id} className="border p-2 mb-2 flex justify-between">
            <span>{room.title}</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setCurrentRoom(room.id);
                  router.push(`/chat/${room.id}`);
                }}
                className="text-blue-500"
                aria-label={`Open chatroom ${room.title}`}
              >
                Open
              </button>
              <button
                onClick={() => deleteChatroom(room.id)}
                className="text-red-500"
                aria-label={`Delete chatroom ${room.title}`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
