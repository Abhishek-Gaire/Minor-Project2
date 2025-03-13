import React, { useEffect, useRef, useState } from "react";

import { supabase } from "@/lib/supabase-config";
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
  // use context here
  const { user } = useAuth();
  const [activeConversation, setActiveConversation] = useState(null);

  const [selectedUser, setSelectedUser] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  // const filteredConversations = conversations.filter((conversation) =>
  //   conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

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
        />
        <div className="flex-1 overflow-y-auto">
          {conversations.length !== 0
            ? conversations.map((conversation) => (
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
                  setActiveConversation={setActiveConversation}
                  setSelectedUser={setSelectedUser}
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
