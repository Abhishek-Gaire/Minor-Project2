import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/useAuth";

import StudentsList from "@/components/Dashboard/MessagesPage/MessagesLeftSide/StudentsList";
import MessageInput from "@/components/Dashboard/MessagesPage/MessageInput";
import MessagesList from "@/components/Dashboard/MessagesPage/MessageList";
import ChatHeader from "@/components/Dashboard/MessagesPage/ChatHeader";
import FilteredConversations from "@/components/Dashboard/MessagesPage/MessagesLeftSide/FilteredConversation";
import MessagePageHeader from "@/components/Dashboard/MessagesPage/MessagePageHeader";

import { useMessages } from "@/hooks/useMessage";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null
  );
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Fetch conversationId when user is selected
  useEffect(() => {
    const fetchConversationId = async () => {
      if (!selectedUser || !user?.name) {
        setConversationId(null);
        return;
      }

      try {
        const response = await fetch(
          `${BACKEND_URI}/api/v1/messages/conversations?participant1=${user.name}&participant2=${selectedUser}`
        );
        const data = await response.json();

        if (data.success) {
          setConversationId(data.conversationId);
          setActiveConversation(data.conversationId);
        }
      } catch (error) {
        console.error("Error fetching conversation ID:", error);
        setConversationId(null);
      }
    };

    fetchConversationId();
  }, [selectedUser, user?.name]);

  // Only use useMessages when we have a conversationId
  const { privateMessages, students, conversations, loading } = useMessages(
    selectedUser,
    activeConversation,
    conversationId
  );

  // const conversations = [
  //   {
  //     id: 1,
  //     name: "Alex Johnson",
  //     avatar: "AJ",
  //     lastMessage: "When is the next math test?",
  //     time: "10:45 AM",
  //     unread: 2,
  //     type: "student",
  //   }
  // ];
  // filter students based on search query
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // filter conversations based on search query
  const filteredConversations = conversations.filter((conversation) =>
    conversation.receiver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search field focus
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  // Handle search field blur
  const handleSearchBlur = () => {
    // Only clear search and unfocus if no student was clicked
    const handleClick = () => {
      setSearchQuery("");
      setIsSearchFocused(false);
      document.removeEventListener("click", handleClick);
    };

    // Add a small delay to allow click events to register
    setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, 200);
  };

  return (
    <div className="flex h-[87vh] overflow-hidden">
      <div
        className={cn(
          "border-r bg-white flex flex-col",
          activeConversation == null ? "w-full" : "w-80"
        )}
      >
        <MessagePageHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchFocus={handleSearchFocus}
          onSearchBlur={handleSearchBlur}
        />
        <div className="flex-1 overflow-y-auto">
          {isSearchFocused
            ? filteredStudents.map((student) => (
                <StudentsList
                  key={student.id}
                  student={student}
                  userName={user.name}
                  activeConversation={activeConversation}
                  setActiveConversation={() =>
                    setActiveConversation(student.id)
                  }
                  setSelectedUser={() => setSelectedUser(student.name)}
                />
              ))
            : filteredConversations.length !== 0
            ? filteredConversations.map((conversation) => (
                <FilteredConversations
                  key={conversation.id}
                  conversation={conversation}
                  setActiveConversation={setActiveConversation}
                  setSelectedUser={setSelectedUser}
                  activeConversation={activeConversation}
                />
              ))
            : students.map((student) => (
                <StudentsList
                  key={student.id}
                  student={student}
                  userName={user.name}
                  activeConversation={activeConversation}
                  setActiveConversation={() =>
                    setActiveConversation(student.id)
                  }
                  setSelectedUser={() => setSelectedUser(student.name)}
                />
              ))}
        </div>
      </div>

      {activeConversation !== null && (
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Chat header */}
          <ChatHeader selectedUser={selectedUser} />

          <MessagesList loading={loading} messages={privateMessages} />

          {/* Message input */}
          <MessageInput
            recipientId={selectedUser}
            senderId={user.name}
            setConversationId={setConversationId}
          />
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
