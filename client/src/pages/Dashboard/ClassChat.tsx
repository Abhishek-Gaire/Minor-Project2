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
  const [selectedClass, setSelectedClass] = useState<string | null>(
    null
  ); // Track selected 
  const className = selectedClass || user?.grade;
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
  }, []);

  // Join Room For Class Chat
  useEffect(() => {
    
    if (socket && user && className) {
      socket.emit("joinClassRoom", {
        userName: user.name,
        conversationId: className, // Use selected class instead of user.grade
      });
      socket.emit("getClassHistory", { className }); // Fetch history for selected class
    }
  }, [socket, user, className]);

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

  // Render class selection dropdown for teachers
  const renderClassSelection = () => {
    const classes = Array.isArray(user.grade)
      ? user.grade
      : user.grade
      ? [user.grade]
      : ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"]; // Fallback example list

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-semibold mb-4">Select a Class</h2>
        <select
          className="p-2 border rounded"
          value={selectedClass || ""}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">-- Select a Class --</option>
          {classes.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[87vh] bg-background">
      <header className="bg-card shadow p-4">
        <div className="flex items-center">
          <MessageCircle className="text-blue-500 mr-2" />
          <h1 className="text-xl font-semibold">Class Chat</h1>
        </div>
        <p className="text-card-foreground text-sm mt-1">
          {user?.role === "teacher" && selectedClass
            ? `Selected Class: ${selectedClass}`
            : user?.role === "student"
            ? `Grade ${user?.grade.split("")[1]}`
            : ""}
        </p>
      </header>

      {/* Show class selection for teachers */}
      {user?.role === "teacher" && !selectedClass ? (
        renderClassSelection()
      ) : loading ? (
        <div className="flex justify-center p-4">Loading messages....</div>
      ) : (
        <ScrollArea className="flex-1">
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
                <ClassMessageList
                  key={message.id}
                  user={user}
                  message={message}
                />
              ))
            )}
          </div>
          <div ref={messageEndRef} />
        </ScrollArea>
      )}

      {className && (
        <MessageInput
          sender={user}
          sendClassChatMessage={sendClassChatMessage}
        />
      )}
    </div>
  );
};

export default ClassChatPage;
