import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/useAuth";
import io, { Socket } from "socket.io-client";

import StudentsList from "@/components/Dashboard/MessagesPage/MessagesLeftSide/StudentsList";
import MessageInput from "@/components/Dashboard/MessagesPage/MessageInput";
import MessagesList from "@/components/Dashboard/MessagesPage/MessageList";
import ChatHeader from "@/components/Dashboard/MessagesPage/ChatHeader";
import FilteredConversations from "@/components/Dashboard/MessagesPage/MessagesLeftSide/FilteredConversation";
import MessagePageHeader from "@/components/Dashboard/MessagesPage/MessagePageHeader";
import { Conversation, Message, Student } from "@/constants/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null
  );
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [privateMessages, setPrivateMessages] = useState<Message[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [isLoadingRecentMessages, setIsLoadingRecentMessages] =
    useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  // New state for sidebar visibility
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const selectedUserRef = useRef(selectedUser);

  // Update ref when selectedUser changes
  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(BACKEND_URI);
    setSocket(newSocket);
    const userName = user.name;

    // Socket event handlers
    const handlePrivateMessageHistory = ({
      messages,
      conversationId,
    }: {
      messages: Message[];
      conversationId: string;
    }) => {
      setPrivateMessages(messages);
      setConversationId(conversationId);
      setIsLoadingMessages(false);
    };

    const handleReceivePrivateMessage = (message: Message) => {
      if (
        (message.sender === selectedUserRef.current &&
          message.receiver === userName) ||
        (message.sender === userName &&
          message.receiver === selectedUserRef.current)
      ) {
        setPrivateMessages((prevMessages) => [...prevMessages, message]);
      } else {
        console.log("Message filtered out: not part of active conversation");
      }
    };

    const handleError = (error: { message: string }) => {
      console.error("Socket error:", error.message);
    };

    // Register socket events
    newSocket.on("privateMessageHistory", handlePrivateMessageHistory);
    newSocket.on("receivePrivateMessage", handleReceivePrivateMessage);
    newSocket.on("error", handleError);

    // Cleanup
    return () => {
      newSocket.off("privateMessageHistory", handlePrivateMessageHistory);
      newSocket.off("receivePrivateMessage", handleReceivePrivateMessage);
      newSocket.off("error", handleError);
      newSocket.disconnect();
    };
  }, [user.id, user.name]);

  // Join room when conversationId changes
  useEffect(() => {
    if (socket && conversationId) {
      socket.emit("joinRoom", { userName: user.name, conversationId });
    }
  }, [socket, conversationId, user.name]);

  // Fetch private message history when selectedUser changes
  useEffect(() => {
    if (socket && selectedUser) {
      setIsLoadingMessages(true);
      socket.emit("getPrivateHistory", {
        currentUser: user.name,
        otherUser: selectedUser,
      });
    }
  }, [socket, selectedUser, user.name]);

  // Send private message
  const sendPrivateMessage = (messageData: {
    sender: string;
    receiver: string;
    content: string;
  }) => {
    if (messageData && selectedUser && socket) {
      const delivered = isOnline ? true : false;
      socket.emit("sendPrivateMessage", {
        from: messageData.sender,
        to: messageData.receiver,
        msg: messageData.content,
        conversationId,
        delivered,
      });
    }
  };

  useEffect(() => {
    if (!socket) return;
    setIsLoadingRecentMessages(true);
    const handleRecentMessages = (data: {
      filteredMessages: Conversation[];
      students: Student[];
    }) => {
      setConversations(data.filteredMessages);
      setStudents(data.students);
      setIsLoadingRecentMessages(false);
    };

    const userId = user.id;
    socket.emit("getAllRecentMessages", userId);
    socket.on("recentMessages", handleRecentMessages);

    return () => {
      socket.off("recentMessages", handleRecentMessages);
    };
  }, [socket, user.id, activeConversation, privateMessages]);

  useEffect(() => {
    if (!socket) {
      setIsOnline(false);
      return;
    }
    socket.emit("checkOnlineStatus", {
      username: selectedUserRef.current,
      conversationId: conversationId,
    });
    socket.on("onlineStatus", ({ isOnline }) => setIsOnline(isOnline));

    return () => {
      socket.off("onlineStatus");
    };
  }, [socket, conversationId, privateMessages]);

  // Filter students and conversations
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredConversations = conversations.filter((conversation) =>
    conversation.receiver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search focus/blur
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      if (!searchContainerRef.current?.contains(document.activeElement)) {
        setSearchQuery("");
        setIsSearchFocused(false);
      }
    }, 100);
  };

  // Unified display items
  const displayItems = isSearchFocused
    ? filteredStudents
    : filteredConversations.length > 0
    ? filteredConversations
    : students;

  return (
    <div className="flex h-[87vh] overflow-hidden relative">
      {/* Messages sidebar with conditional width based on visibility */}
      <div
        className={cn(
          "bg-background flex flex-col transition-all duration-300 ease-in-out",
          activeConversation == null
            ? "w-full"
            : isSidebarVisible
            ? "w-80"
            : "w-0"
        )}
      >
        {isSidebarVisible && (
          <>
            <div ref={searchContainerRef}>
              <MessagePageHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearchFocus={handleSearchFocus}
                onSearchBlur={handleSearchBlur}
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {isLoadingRecentMessages ? (
                <div className="p-4 flex justify-center items-center">
                  <div
                    className="spinner"
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "4px solid rgba(0, 0, 0, 0.1)",
                      borderLeftColor: "#3498db",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                  <style>{`
                      @keyframes spin {
                        0% {
                          transform: rotate(0deg);
                        }
                        100% {
                          transform: rotate(360deg);
                        }
                      }
                    `}</style>
                </div>
              ) : displayItems.length === 0 ? (
                <div className="p-4">No results found</div>
              ) : (
                displayItems.map((item) =>
                  "receiver" in item ? (
                    <FilteredConversations
                      key={item.id}
                      conversation={item}
                      setActiveConversation={setActiveConversation}
                      setSelectedUser={setSelectedUser}
                      activeConversation={activeConversation}
                    />
                  ) : (
                    <StudentsList
                      key={item.id}
                      student={item}
                      userName={user.name}
                      activeConversation={activeConversation}
                      setActiveConversation={() =>
                        setActiveConversation(item.id)
                      }
                      setSelectedUser={setSelectedUser}
                    />
                  )
                )
              )}
            </div>
          </>
        )}
      </div>

      {/* Toggle button for sidebar - only shows when conversation is active */}
      {activeConversation !== null && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-0 z-10 bg-primary text-primary-foreground w-6 h-16 flex items-center justify-center rounded-r-md shadow-md hover:bg-primary/90 transition-all"
        >
          {isSidebarVisible ? (
            <ChevronLeft size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>
      )}

      {/* Chat area */}
      {activeConversation !== null && (
        <div
          className={cn(
            "flex-1 flex flex-col bg-muted transition-all duration-300 ease-in-out",
            !isSidebarVisible && "pl-2" // Add padding when sidebar is collapsed
          )}
        >
          <ChatHeader selectedUser={selectedUser} isOnline={isOnline} />
          <MessagesList
            loading={isLoadingMessages}
            messages={privateMessages}
          />
          <MessageInput
            recipientId={selectedUser}
            senderId={user.name}
            sendPrivateMessage={sendPrivateMessage}
          />
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
