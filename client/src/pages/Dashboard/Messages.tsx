import React, { useEffect, useRef, useState } from "react";

import { supabase } from "@/lib/supabase-config";
import { RealtimeChannel } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/useAuth";
import { Message } from "@/constants/types";

import StudentsList from "@/components/Dashboard/MessagesPage/MessagesLeftSide/StudentsList";
import MessageInput from "@/components/Dashboard/MessagesPage/MessageInput";
import MessagesList from "@/components/Dashboard/MessagesPage/MessageList";
import ChatHeader from "@/components/Dashboard/MessagesPage/ChatHeader";
import FilteredConversations from "@/components/Dashboard/MessagesPage/MessagesLeftSide/FilteredConversation";
import MessagePageHeader from "@/components/Dashboard/MessagesPage/MessagePageHeader";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

const MessagesPage: React.FC = () => {
  // use context here
  const { user } = useAuth();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Alex Johnson",
      receiver: "You",
      content: "Hello! I wanted to ask about the upcoming math test.",
      timestamp: "10:30 AM",
      delivered: true,
      isSelf: false,
    },
    {
      id: 2,
      sender: "You",
      receiver: "Alex Johnson",
      content: "Hi Alex, of course. What would you like to know?",
      timestamp: "10:32 AM",
      delivered: true,
      isSelf: true,
    },
    {
      id: 3,
      sender: "Alex Johnson",
      receiver: "You",
      content: "Is it going to cover the recent chapters on calculus?",
      timestamp: "10:35 AM",
      delivered: true,
      isSelf: false,
    },
    {
      id: 4,
      sender: "You",
      receiver: "Alex Johnson",
      content:
        "Yes, it will cover chapters 5-7 on differential calculus. Make sure to review the practice problems we did last week.",
      timestamp: "10:40 AM",
      delivered: true,
      isSelf: true,
    },
    {
      id: 5,
      sender: "Alex Johnson",
      receiver: "You",
      content:
        "When is the next math test? I want to make sure I have enough time to prepare.",
      timestamp: "10:45 AM",
      delivered: true,
      isSelf: false,
    },
    {
      id: 6,
      sender: "Alex Johnson",
      receiver: "You",
      content: "Also, will there be any extra credit opportunities?",
      timestamp: "10:46 AM",
      delivered: true,
      isSelf: false,
    },
  ]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const channelName = `private_chat_${user.name}_${selectedUser}`;
  const channel = supabase.channel(channelName);

  useEffect(() => {
    fetchAllConversations();
  }, [user]);

  useEffect(() => {
    if (selectedUser) {
      // Only fetch when a user is selected
      fetchPrivateMessages();
    }
  }, [selectedUser]);

  const fetchAllConversations = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URI}/api/v1/messages/${user.name}`
      );
      const responseData = await response.json();
      setConversations(responseData.data.recentMessages);
      setStudents(responseData.data.students);
    } catch (error) {
      console.error("Error While Fetching all conversations");
    }
  };

  const fetchPrivateMessages = async () => {
    setLoadingMessages(true);
    try {
      const response = await fetch(
        `${BACKEND_URI}/api/v1/messages?sender=${user.name}&receiver=${selectedUser}`
      );
      const responseData = await response.json();
      console.log(responseData);
      setMessages(responseData.data);

      // Mark messages as delivered when user comes online
      await fetch(`${BACKEND_URI}/api/v1/messages/deliver`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiver: user, sender: selectedUser }),
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    const channel = supabase
      .channel(`private_chat_${user.name}_${selectedUser}`)
      .on(
        "broadcast",
        { event: "new-message" },
        (payload: { message: Message }) => {
          if (
            payload.message.sender === selectedUser ||
            payload.message.receiver === selectedUser
          ) {
            setMessages((prevMessages) => [...prevMessages, payload.message]);
          }

          // Mark message as delivered
          fetch("http://localhost:5000/messages/deliver", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ receiver: user, sender: selectedUser }),
          });
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // const conversations = [
  //   {
  //     id: 1,
  //     name: "Alex Johnson",
  //     avatar: "AJ",
  //     lastMessage: "When is the next math test?",
  //     time: "10:45 AM",
  //     unread: 2,
  //     type: "student",
  //   },
  //   {
  //     id: 2,
  //     name: "Mr. Williams",
  //     avatar: "WL",
  //     lastMessage: "Please share the exam schedule",
  //     time: "Yesterday",
  //     unread: 0,
  //     type: "teacher",
  //   },
  //   {
  //     id: 3,
  //     name: "Mrs. Davis",
  //     avatar: "DV",
  //     lastMessage: "Conference schedule has been updated",
  //     time: "Yesterday",
  //     unread: 1,
  //     type: "teacher",
  //   },
  //   {
  //     id: 4,
  //     name: "Olivia Wilson",
  //     avatar: "OW",
  //     lastMessage: "I need information about the field trip",
  //     time: "Mar 1",
  //     unread: 0,
  //     type: "student",
  //   },
  //   {
  //     id: 5,
  //     name: "Math Department",
  //     avatar: "MD",
  //     lastMessage: "New curriculum resources available",
  //     time: "Feb 28",
  //     unread: 0,
  //     type: "group",
  //   },
  //   {
  //     id: 6,
  //     name: "Emily Parker",
  //     avatar: "EP",
  //     lastMessage: "Submitted my assignment",
  //     time: "Feb 28",
  //     unread: 0,
  //     type: "student",
  //   },
  //   {
  //     id: 7,
  //     name: "Parent Council",
  //     avatar: "PC",
  //     lastMessage: "Meeting rescheduled to next week",
  //     time: "Feb 27",
  //     unread: 0,
  //     type: "group",
  //   },
  //   {
  //     id: 8,
  //     name: "James Rodriguez",
  //     avatar: "JR",
  //     lastMessage: "Request for leave application form",
  //     time: "Feb 26",
  //     unread: 0,
  //     type: "student",
  //   },
  // ];

  // const filteredConversations = conversations.filter((conversation) =>
  //   conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div className="flex h-screen overflow-hidden">
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

          <MessagesList
            loading={loadingMessages}
            messages={messages}
            selectedUser={selectedUser}
          />

          {/* Message input */}
          <MessageInput
            recipientId={selectedUser}
            senderId={user.name}
            channel={channel}
            setMessages={setMessages}
          />
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
