import React, { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  Search,
  Clock,
  MoreHorizontal,
  PaperclipIcon,
  Send,
} from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isSelf: boolean;
}

const MessagesPage: React.FC = () => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Alex Johnson",
      time: "10:30 AM",
      content: "Hello! I wanted to ask about the upcoming math test.",
      isSelf: false,
    },
    {
      id: 2,
      sender: "You",
      time: "10:32 AM",
      content: "Hi Alex, of course. What would you like to know?",
      isSelf: true,
    },
    {
      id: 3,
      sender: "Alex Johnson",
      time: "10:35 AM",
      content: "Is it going to cover the recent chapters on calculus?",
      isSelf: false,
    },
    {
      id: 4,
      sender: "You",
      time: "10:40 AM",
      content:
        "Yes, it will cover chapters 5-7 on differential calculus. Make sure to review the practice problems we did last week.",
      isSelf: true,
    },
    {
      id: 5,
      sender: "Alex Johnson",
      time: "10:45 AM",
      content:
        "When is the next math test? I want to make sure I have enough time to prepare.",
      isSelf: false,
    },
    {
      id: 6,
      sender: "Alex Johnson",
      time: "10:46 AM",
      content: "Also, will there be any extra credit opportunities?",
      isSelf: false,
    },
  ]);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      // In a real application, you would add the message to the state
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

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

  const getAvatarColor = (type) => {
    switch (type) {
      case "student":
        return "bg-blue-500";
      case "teacher":
        return "bg-purple-500";
      case "group":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-50 ml-10 mt-5">
        <header className="bg-white shadow p-4">
          <div className="flex items-center">
            <MessageSquare className="text-blue-500 mr-2" />
            <h1 className="text-xl font-semibold">Messages</h1>
          </div>
        </header>

        <div className="p-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search conversations"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="p-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-3 cursor-pointer hover:bg-gray-100 flex items-start gap-3 border-b ${
                activeConversation === conversation.id ? "bg-gray-100" : ""
              }`}
              onClick={() => setActiveConversation(conversation.id)}
            >
              <Avatar className={getAvatarColor(conversation.type)}>
                <AvatarFallback>{conversation.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="font-medium truncate">
                    {conversation.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {conversation.time}
                  </div>
                </div>
                <div className="text-sm truncate text-gray-500">
                  {conversation.lastMessage}
                </div>
              </div>
              {conversation.unread > 0 && (
                <Badge className="rounded-full bg-blue-500">
                  {conversation.unread}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      {activeConversation && (
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Chat header */}
          <div className="bg-white p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className={getAvatarColor("student")}>
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Alex Johnson</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <div className="bg-green-500 h-2 w-2 rounded-full mr-1"></div>
                  Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Clock className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Mark as Unread</DropdownMenuItem>
                  <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                  <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isSelf ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-3/4 ${
                    message.isSelf
                      ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
                      : "bg-white rounded-r-lg rounded-tl-lg border"
                  } p-3 shadow-sm`}
                >
                  {!message.isSelf && (
                    <div className="font-medium text-xs mb-1">
                      {message.sender}
                    </div>
                  )}
                  <div className="space-y-1">
                    <div>{message.content}</div>
                    <div
                      className={`text-xs text-right ${
                        message.isSelf ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {message.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="bg-white p-4 border-t">
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <PaperclipIcon className="h-4 w-4" />
              </Button>
              <Textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="min-h-10 flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessagesPage;
