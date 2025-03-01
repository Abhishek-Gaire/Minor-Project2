// pages/ClassChat.tsx
import React, { useState } from 'react';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Search, 
  Info,
  Users,
  Pin
} from 'lucide-react';

interface Message {
  id: number;
  sender: {
    name: string;
    role: 'instructor' | 'student' | 'system';
    avatar?: string;
  };
  content: string;
  timestamp: string;
  isPinned?: boolean;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: {
      name: 'Dr. James Wilson',
      role: 'instructor',
    },
    content: 'Welcome to the Introduction to Programming class chat! This is where we can discuss course material, assignments, and any questions you might have.',
    timestamp: '2024-02-15T09:00:00',
    isPinned: true
  },
  {
    id: 2,
    sender: {
      name: 'System',
      role: 'system',
    },
    content: 'Dr. James Wilson pinned a message',
    timestamp: '2024-02-15T09:01:00'
  },
  {
    id: 3,
    sender: {
      name: 'Alex Johnson',
      role: 'student',
    },
    content: 'Thanks for setting this up, Dr. Wilson! Quick question - for the first assignment, do we need to implement all the data types covered in the lecture or just the ones mentioned in the assignment description?',
    timestamp: '2024-02-15T10:15:00'
  },
  {
    id: 4,
    sender: {
      name: 'Dr. James Wilson',
      role: 'instructor',
    },
    content: 'Great question, Alex! You only need to implement the data types specified in the assignment description (integers, floats, strings, and booleans). However, if you want to challenge yourself, feel free to include more!',
    timestamp: '2024-02-15T10:20:00'
  },
  {
    id: 5,
    sender: {
      name: 'Samantha Lee',
      role: 'student',
    },
    content: 'Is anyone having issues with the development environment? I\'m getting an error when I try to run my script.',
    timestamp: '2024-02-15T11:30:00'
  },
  {
    id: 6,
    sender: {
      name: 'Michael Chen',
      role: 'student',
    },
    content: '@Samantha What\'s the error message you\'re seeing? I might be able to help - I had some issues yesterday but managed to fix them.',
    timestamp: '2024-02-15T11:35:00'
  },
  {
    id: 7,
    sender: {
      name: 'Samantha Lee',
      role: 'student',
    },
    content: 'It says "ModuleNotFoundError: No module named \'numpy\'". I thought we didn\'t need any external libraries for this assignment?',
    timestamp: '2024-02-15T11:40:00'
  },
  {
    id: 8,
    sender: {
      name: 'Dr. James Wilson',
      role: 'instructor',
    },
    content: 'Samantha, you\'re correct - the first assignment doesn\'t require any external libraries. It seems like you might have a reference to numpy somewhere in your code. Make sure you\'re only using Python\'s built-in data types and functions for this assignment.',
    timestamp: '2024-02-15T11:45:00'
  },
  {
    id: 9,
    sender: {
      name: 'Samantha Lee',
      role: 'student',
    },
    content: 'You\'re right! I had an import statement at the top of my file from a previous project. Thanks for the help!',
    timestamp: '2024-02-15T11:50:00'
  },
  {
    id: 10,
    sender: {
      name: 'Dr. James Wilson',
      role: 'instructor',
    },
    content: 'Don\'t forget that your first assignment is due this Friday at 11:59 PM. Please submit it through the assignment portal on the dashboard.',
    timestamp: '2024-02-27T09:00:00'
  }
];

const ClassChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = searchTerm 
    ? messages.filter(msg => 
        msg.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.sender.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : messages;

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg: Message = {
      id: messages.length + 1,
      sender: {
        name: 'Dr. James Wilson',
        role: 'instructor',
      },
      content: newMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Introduction to Programming - Class Chat</h1>
          <p className="text-gray-600">Discuss course material and assignments with your class</p>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 border rounded-lg flex items-center">
            <Users size={18} className="mr-2" />
            32 Students
          </button>
          <button className="px-4 py-2 border rounded-lg flex items-center">
            <Info size={18} className="mr-2" />
            Chat Info
          </button>
        </div>
      </header>

      <div className="flex-grow flex flex-col bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search in chat history..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {filteredMessages.map(message => {
            const isInstructor = message.sender.role === 'instructor';
            const isSystem = message.sender.role === 'system';
            
            if (isSystem) {
              return (
                <div key={message.id} className="flex justify-center">
                  <div className="bg-gray-100 text-gray-600 text-sm px-3 py