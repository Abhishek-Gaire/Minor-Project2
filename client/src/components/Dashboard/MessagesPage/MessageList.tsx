import { useEffect, useRef } from "react";
import Message from "./Message";
import { ScrollArea } from "@/components/ui/scroll-area";

const MessagesList = ({ messages, loading }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return <div className="flex justify-center p-4 ">Loading messages....</div>;
  }
  return (
    <ScrollArea className="flex-1">
      <div className="overflow-y-auto p-4 space-y-4">
        {messages?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>No Messages Yet</p>
            <p className="text-sm">
              Start the conversation by sending a message!
            </p>
          </div>
        ) : (
          messages?.map((message) => (
            <Message message={message} key={message.id} />
          ))
        )}
        <div ref={messageEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessagesList;
