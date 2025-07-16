"use client";
import { useEffect } from "react";
import { useChatStore } from "@/lib/store";

export default function StoreInitializer() {
  const setChatrooms = useChatStore((state) => state.setChatrooms);

  useEffect(() => {
    const saved = localStorage.getItem("chatrooms");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setChatrooms(parsed);
      } catch (error) {
        console.error("Failed to parse chatrooms from localStorage", error);
      }
    }
  }, [setChatrooms]);

  return null;
}
