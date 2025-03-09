import React, { useEffect, useRef, useState } from "react";

import { supabase } from "@/lib/supabase-config";
import { RealtimeChannel } from "@supabase/supabase-js";
import MessageInput from "@/components/Messages/MessageInput";
import MessagesList from "@/components/Messages/MessageList";
import ChatHeader from "@/components/Messages/ChatHeader";
import FilteredConversations from "@/components/Messages/FilteredConversation";
import MessagePageHeader from "@/components/Messages/MessagePageHeader";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/useAuth";

export interface Message {
  id: number;
  sender: string;
  receiver: string;
  content: string;
  timestamp: string;
  delivered: boolean;
  isSelf: boolean;
}
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

const MessagesPage: React.FC = () => {
  // use context here
  const { user } = useAuth();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [selectedUser, setSelectedUser] = useState("Abhishek");
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
    fetchPrivateMessages();
  }, [selectedUser]);

  const fetchAllConversations = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URI}/api/v1/messages/${user.name}`
      );
      const responseData = await response.json();
      console.log(responseData);
      // setActiveConversation(responseData.data);
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
      const data = await response.json();
      // setMessages(data);

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

  const conversations = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "AJ",
      lastMessage: "When is the next math test?",
      time: "10:45 AM",
      unread: 2,
      type: "student",
    },
    {
      id: 2,
      name: "Mr. Williams",
      avatar: "WL",
      lastMessage: "Please share the exam schedule",
      time: "Yesterday",
      unread: 0,
      type: "teacher",
    },
    {
      id: 3,
      name: "Mrs. Davis",
      avatar: "DV",
      lastMessage: "Conference schedule has been updated",
      time: "Yesterday",
      unread: 1,
      type: "teacher",
    },
    {
      id: 4,
      name: "Olivia Wilson",
      avatar: "OW",
      lastMessage: "I need information about the field trip",
      time: "Mar 1",
      unread: 0,
      type: "student",
    },
    {
      id: 5,
      name: "Math Department",
      avatar: "MD",
      lastMessage: "New curriculum resources available",
      time: "Feb 28",
      unread: 0,
      type: "group",
    },
    {
      id: 6,
      name: "Emily Parker",
      avatar: "EP",
      lastMessage: "Submitted my assignment",
      time: "Feb 28",
      unread: 0,
      type: "student",
    },
    {
      id: 7,
      name: "Parent Council",
      avatar: "PC",
      lastMessage: "Meeting rescheduled to next week",
      time: "Feb 27",
      unread: 0,
      type: "group",
    },
    {
      id: 8,
      name: "James Rodriguez",
      avatar: "JR",
      lastMessage: "Request for leave application form",
      time: "Feb 26",
      unread: 0,
      type: "student",
    },
  ];

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const dayDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (dayDiff === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (dayDiff === 1) {
      return "Yesterday";
    } else if (dayDiff < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {filteredConversations.map((conversation) => (
            <FilteredConversations
              key={conversation.id}
              conversation={conversation}
              setActiveConversation={setActiveConversation}
              setSelectedUser={setSelectedUser}
              activeConversation={activeConversation}
            />
          ))}
        </div>
      </div>

      {activeConversation !== null && (
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Chat header */}
          <ChatHeader />

          <MessagesList loading={loadingMessages} messages={messages} />

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
