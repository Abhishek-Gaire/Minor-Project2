import React, { useState } from "react";

import { Send } from "lucide-react";

interface MessageInputProps {
  recipientId: string;
  senderId: string;
}

export function MessageInput({ recipientId, senderId }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sending) return;

    setSending(true);

    // save messages in database and send to recipient
  };

  return (
    <form onSubmit={handleSend} className="p-4 border-t">
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          type="submit"
          disabled={sending}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
