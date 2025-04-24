import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "react-toastify";

const MessageInput = ({ sender, sendClassChatMessage }) => {
  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;
    setSending(true);
    const messageData = {
      grade: sender.grade,
      content: messageInput,
    };

    try {
      sendClassChatMessage(messageData);
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
            <Send className="h-4 w-4 mr-2" />
          )}
          {sending ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
