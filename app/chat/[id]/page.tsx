// ✅ Gemini-Style Conversational AI Chat App (Chatroom UI + Debounced Search + Loading Skeletons)
// Technologies: Next.js 15 App Router, Tailwind CSS, Zustand, React Hook Form, Zod

// ----------------------------
// app/chat/[id]/page.tsx
// ----------------------------
"use client";
import { useParams } from "next/navigation";
import { useChatStore } from "@/lib/store";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ChatRoomPage() {
  const { id } = useParams();
  const { chatrooms, sendMessage } = useChatStore();
  const chatroom = chatrooms.find((room) => room.id === id);

  const bottomRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>("");
  const [typing, setTyping] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading messages
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatroom?.messages?.length]);

  if (!chatroom) {
    return <div className="p-4 text-red-500">Chatroom not found</div>;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSend = () => {
    if (!input.trim() && !imagePreview) return;

    const now = new Date().toLocaleTimeString();
    const message = {
      id: uuidv4(),
      sender: "user" as const,
      text: input,
      timestamp: now,
      image: imagePreview || undefined,
    };
    sendMessage(chatroom.id, message);
    setInput("");
    setImagePreview(null);
    setTyping(true);

    setTimeout(() => {
      const aiReply = {
        id: uuidv4(),
        sender: "ai" as const,
        text: "Here's Gemini's response 🤖",
        timestamp: new Date().toLocaleTimeString(),
      };
      sendMessage(chatroom.id, aiReply);
      setTyping(false);
    }, 2000);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Chatroom: {chatroom.title}</h1>

      <div className="border rounded p-4 min-h-[300px] bg-white dark:bg-gray-900 max-h-[400px] overflow-y-auto">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 dark:bg-gray-700 h-16 rounded"
              />
            ))}
          </div>
        ) : (
          chatroom.messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 p-2 rounded ${
                msg.sender === "user"
                  ? "bg-blue-100 text-right"
                  : "bg-gray-200 text-left"
              }`}
            >
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Uploaded"
                  className="w-32 h-32 object-cover rounded mb-1 cursor-pointer"
                  onClick={() => window.open(msg.image, "_blank")}
                />
              )}
              <div
                className="text-sm cursor-pointer"
                title="Click to copy"
                onClick={() => navigator.clipboard.writeText(msg.text)}
              >
                {msg.text}
              </div>
              <div className="text-xs text-gray-500">{msg.timestamp}</div>
            </div>
          ))
        )}
        {typing && (
          <div className="text-sm text-gray-500 italic">
            Gemini is typing...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex flex-col gap-2">
        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            className="w-32 h-32 object-cover rounded"
          />
        )}
        <div className="flex gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm"
            aria-label="Upload image"
          />
          <input
            className="border p-2 flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            aria-label="Chat message input"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
