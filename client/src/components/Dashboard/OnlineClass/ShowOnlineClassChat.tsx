import { XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { HMSMessageType } from "@100mslive/react-sdk";

type ShowOnlineClassChatProps = {
  setShowChat: (value: boolean) => void;
  sendLiveMessage: () => void;
  messages: HMSMessageType[];
  messageInput: string;
  setMessageInput: (value: string) => void;
};

const ShowOnlineClassChat = ({
  setShowChat,
  sendLiveMessage,
  messages,
  messageInput,
  setMessageInput,
}: ShowOnlineClassChatProps) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-1/3 bg-primary-background p-4 flex flex-col border-l border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium">Class Chat</h2>
        <button onClick={() => setShowChat(false)} className="text-primary">
          <XIcon />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-4">
            <div className="text-xs text-primary mb-1">
              {msg.userName}
              {msg.role === "teacher" ? " (Teacher)" : " (Student)"}
            </div>
            <div className="bg-primary-foreground rounded-lg p-2">
              {msg.message}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {new Date(msg.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div>
        <textarea
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="w-full bg-primary-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          rows={2}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendLiveMessage();
            }
          }}
        />
      </div>
    </div>
  );
};

export default ShowOnlineClassChat;
