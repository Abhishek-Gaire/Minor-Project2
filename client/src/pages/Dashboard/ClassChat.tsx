import React, { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import MessageInput from "@/components/Dashboard/ClassChat/MessageInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import ClassMessageList from "@/components/Dashboard/ClassChat/ClassMessageList";
import { useAuth } from "@/contexts/useAuth";
import { ClassMessage } from "@/constants/types";
import io, { Socket } from "socket.io-client";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

const ClassChatPage: React.FC = () => {
  const { user } = useAuth();
  const [classMessages, setClassMessages] = useState<ClassMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);

  const messageEndRef = useRef<HTMLDivElement>(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(BACKEND_URI);
    setSocket(newSocket);

    const handleClassMessages = (messages: ClassMessage[]) => {
      setClassMessages(messages);
      setLoading(false);
    };

    newSocket.on("classHistory", handleClassMessages);
    newSocket.on("sendClassMessage", (message) => {
      setClassMessages((prev) => [...prev, message]);
    });
    newSocket.emit("getClassHistory", { className: user.grade });
    newSocket.on("error", (error) => {
      console.error("Socket error:", error.message);
    });
    return () => {
      newSocket.off("classHistory", handleClassMessages);
      newSocket.off("sendClassMessage", (message) => {
        setClassMessages((prev) => [...prev, message]);
      });
      newSocket.off("error", (error) => {
        console.error("Socket error:", error.message);
      });
      newSocket.disconnect();
    };
  }, [user]);

  // Join Room For Class Chat
  useEffect(() => {
    if (socket && user) {
      socket.emit("joinClassRoom", {
        userName: user.name,
        conversationId: user.grade,
      });
    }
  }, [socket, user]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendClassChatMessage = ({
    grade,
    content,
  }: {
    grade: string;
    content: string;
  }) => {
    if (socket) {
      socket.emit("receiveClassMessage", {
        className: grade,
        msg: content,
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [classMessages]);

  return (
    <div className="flex flex-col h-[87vh] bg-background">
      <header className="bg-card shadow p-4 ">
        <div className="flex items-center">
          <MessageCircle className="text-blue-500 mr-2" />
          <h1 className="text-xl font-semibold">Class Chat</h1>
        </div>
        <p className="text-card-foreground text-sm mt-1">
          Grade {user.grade.split("")[1]}
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center p-4 ">Loading messages....</div>
      ) : (
        <ScrollArea className="flex-1 ">
          <div className="overflow-y-auto p-4">
            {classMessages?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-card-foreground">
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

      <MessageInput sender={user} sendClassChatMessage={sendClassChatMessage} />
    </div>
  );
};

export default ClassChatPage;
