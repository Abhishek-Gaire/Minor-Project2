import React, { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import useClassMessage from "@/hooks/useClassMessage";
import MessageInput from "@/components/Dashboard/ClassChat/MessageInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import ClassMessageList from "@/components/Dashboard/ClassChat/ClassMessageList";

const ClassChatPage: React.FC = () => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  const { loading, classMessages, user } = useClassMessage();

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [classMessages]);

  return (
    <div className="flex flex-col h-[87vh] bg-gray-50 ">
      <header className="bg-white shadow p-4">
        <div className="flex items-center">
          <MessageCircle className="text-blue-500 mr-2" />
          <h1 className="text-xl font-semibold">Class Chat</h1>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          Grade {user.grade.split("")[1]}
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center p-4 ">Loading messages....</div>
      ) : (
        <ScrollArea className="flex-1 ">
          <div className="overflow-y-auto p-4">
            {classMessages?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>No Messages Yet</p>
                <p className="text-sm">
                  Start the conversation by sending a message!
                </p>
              </div>
            ) : (
              classMessages.map((message) => (
                <ClassMessageList user={user} message={message} />
              ))
            )}
          </div>
          <div ref={messageEndRef} />
        </ScrollArea>
      )}

      <MessageInput sender={user} />
    </div>
  );
};

export default ClassChatPage;
