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

const MessagesPage: React.FC = () => {
  // use context here
  const { user } = useAuth();
  const [activeConversation, setActiveConversation] = useState(null);

  const [selectedUser, setSelectedUser] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { privateMessages, students, conversations, loading } = useMessages(
    selectedUser,
    activeConversation
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
    // Add a small delay to ensure click events on students are registered first
    setTimeout(() => {
      setSearchQuery("");
      setIsSearchFocused(false);
    }, 200);
  };

  return (
    <div className="flex h-[90vh] overflow-hidden">
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
          <MessageInput recipientId={selectedUser} senderId={user.name} />
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
