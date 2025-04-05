import { useState } from "react";

import { Loader2, PaperclipIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase-config";
import { toast } from "react-toastify";

interface MessageInputProps {
  recipientId: string;
  senderId: string;
  setConversationId: (id: string | null) => void;
}

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

const MessageInput = ({
  recipientId,
  senderId,
  setConversationId,
}: MessageInputProps) => {
  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;
    setSending(true);
    const messageData = {
      sender: senderId,
      receiver: recipientId,
      content: messageInput,
    };

    try {
      const response = await fetch(`${BACKEND_URI}/api/v1/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });
      const responseData = await response.json();
      const savedMessage = responseData.data;
      setConversationId(responseData.conversationId);

      const { error } = await supabase.from("Messages").insert(savedMessage);
      if (error) throw error;
      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.message || "An error occurred.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-card p-4 ">
      <div className="flex space-x-2">
        <Button variant="outline" size="icon">
          <PaperclipIcon className="h-4 w-4" />
        </Button>
        <Textarea
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          className="min-h-10 flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button
          onClick={handleSendMessage}
          className="bg-card text-muted-foreground"
        >
          {sending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Send className="h-4 w-4 mr-2 " />
          )}
          {sending ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
