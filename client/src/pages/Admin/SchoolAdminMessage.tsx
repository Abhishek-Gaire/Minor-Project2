import React, { useState } from "react";
import {
    Search,
    Send,
    PaperclipIcon,
    MoreHorizontal,
    Clock, Activity, GraduationCap, UserCircle, BookOpen, DollarSign, MessageSquare, Settings,
} from "lucide-react";
import  Layout  from "@/components/Admin/AdminLayout.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";


const MessagesPage = () => {
    const [activeConversation, setActiveConversation] = useState(1);
    const [messageInput, setMessageInput] = useState("");

    const conversations = [
        { id: 1, name: "Alex Johnson", avatar: "AJ", lastMessage: "When is the next math test?", time: "10:45 AM", unread: 2, type: "student" },
        { id: 2, name: "Mr. Williams", avatar: "WL", lastMessage: "Please share the exam schedule", time: "Yesterday", unread: 0, type: "teacher" },
        { id: 3, name: "Mrs. Davis", avatar: "DV", lastMessage: "Conference schedule has been updated", time: "Yesterday", unread: 1, type: "teacher" },
        { id: 4, name: "Olivia Wilson", avatar: "OW", lastMessage: "I need information about the field trip", time: "Mar 1", unread: 0, type: "student" },
        { id: 5, name: "Math Department", avatar: "MD", lastMessage: "New curriculum resources available", time: "Feb 28", unread: 0, type: "group" },
        { id: 6, name: "Emily Parker", avatar: "EP", lastMessage: "Submitted my assignment", time: "Feb 28", unread: 0, type: "student" },
        { id: 7, name: "Parent Council", avatar: "PC", lastMessage: "Meeting rescheduled to next week", time: "Feb 27", unread: 0, type: "group" },
        { id: 8, name: "James Rodriguez", avatar: "JR", lastMessage: "Request for leave application form", time: "Feb 26", unread: 0, type: "student" },
    ];

    const messages = [
        { id: 1, sender: "Alex Johnson", time: "10:30 AM", content: "Hello! I wanted to ask about the upcoming math test.", isSelf: false },
        { id: 2, sender: "You", time: "10:32 AM", content: "Hi Alex, of course. What would you like to know?", isSelf: true },
        { id: 3, sender: "Alex Johnson", time: "10:35 AM", content: "Is it going to cover the recent chapters on calculus?", isSelf: false },
        { id: 4, sender: "You", time: "10:40 AM", content: "Yes, it will cover chapters 5-7 on differential calculus. Make sure to review the practice problems we did last week.", isSelf: true },
        { id: 5, sender: "Alex Johnson", time: "10:45 AM", content: "When is the next math test? I want to make sure I have enough time to prepare.", isSelf: false },
        { id: 6, sender: "Alex Johnson", time: "10:46 AM", content: "Also, will there be any extra credit opportunities?", isSelf: false },
    ];

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("");
    };

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

    const handleSendMessage = () => {
        if (messageInput.trim() !== "") {
            // In a real application, you would add the message to the state
            console.log("Sending message:", messageInput);
            setMessageInput("");
        }
    };
    const adminSidebarItems = [
        {
            name: "Dashboard",
            href: "/admin",
            icon: <Activity size={20} />,
            active: false,
        },
        {
            name: "Students",
            href: "/admin/students",
            icon: <GraduationCap size={20} />,
            active: false,
        },
        {
            name: "Teachers",
            href: "/admin/teachers",
            icon: <UserCircle size={20} />,
            active: true,
        },
        {
            name: "Classes",
            href: "/admin/classes",
            icon: <BookOpen size={20} />,
            active: false,
        },
        {
            name: "Attendance",
            href: "/admin/attendance",
            icon: <Clock size={20} />,
            active: false,
        },
        {
            name: "Payments",
            href: "/admin/payments",
            icon: <DollarSign size={20} />,
            active: false,
        },
        {
            name: "Messages",
            href: "/admin/messages",
            icon: <MessageSquare size={20} />,
            active: false,
        },
        {
            name: "Settings",
            href: "/admin/settings",
            icon: <Settings size={20} />,
            active: false,
        },
    ];

    return (
        <Layout role="admin" sidebarItems={adminSidebarItems}>
            <div className="flex h-screen overflow-hidden">
                {/* Conversations sidebar */}
                <div className="w-80 border-r bg-white flex flex-col">
                    <div className="p-4 border-b">
                        <h1 className="text-xl font-bold mb-4">Messages</h1>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search messages..." className="pl-8" />
                        </div>
                    </div>
                    <Tabs defaultValue="all" className="p-4">
                        <TabsList className="grid grid-cols-3 mb-4">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="unread">Unread</TabsTrigger>
                            <TabsTrigger value="flagged">Flagged</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="overflow-y-auto flex-1">
                        {conversations.map((conversation) => (
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
                                        <div className="font-medium truncate">{conversation.name}</div>
                                        <div className="text-xs text-gray-500">{conversation.time}</div>
                                    </div>
                                    <div className="text-sm truncate text-gray-500">{conversation.lastMessage}</div>
                                </div>
                                {conversation.unread > 0 && (
                                    <Badge className="rounded-full bg-blue-500">{conversation.unread}</Badge>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message content */}
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
                                className={`flex ${message.isSelf ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-3/4 ${
                                        message.isSelf
                                            ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
                                            : "bg-white rounded-r-lg rounded-tl-lg border"
                                    } p-3 shadow-sm`}
                                >
                                    {!message.isSelf && (
                                        <div className="font-medium text-xs mb-1">{message.sender}</div>
                                    )}
                                    <div className="space-y-1">
                                        <div>{message.content}</div>
                                        <div className={`text-xs text-right ${message.isSelf ? "text-blue-100" : "text-gray-500"}`}>
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
            </div>
        </Layout>
    );
};

export default MessagesPage;