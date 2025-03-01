import React, { useState } from 'react';
import { MessageSquare, Search, ChevronRight } from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
}

const MessagesPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Dr. Johnson',
      lastMessage: 'Please submit your assignment by Friday',
      timestamp: new Date(Date.now() - 3600000),
      unread: 2,
    },
    {
      id: '2',
      name: 'Physics 101 Group',
      lastMessage: 'Alex: I shared the study notes for the upcoming exam',
      timestamp: new Date(Date.now() - 86400000),
      unread: 0,
    },
    {
      id: '3',
      name: 'Academic Advisor',
      lastMessage: 'Your schedule for next semester looks good',
      timestamp: new Date(Date.now() - 259200000),
      unread: 0,
    },
    {
      id: '4',
      name: 'Chemistry Lab Partners',
      lastMessage: 'Jamie: Who is bringing the lab report tomorrow?',
      timestamp: new Date(Date.now() - 172800000),
      unread: 5,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const dayDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (dayDiff === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (dayDiff === 1) {
      return 'Yesterday';
    } else if (dayDiff < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const filteredConversations = conversations.filter(conversation => 
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <div className="flex items-center">
          <MessageSquare className="text-blue-500 mr-2" />
          <h1 className="text-xl font-semibold">Messages</h1>
        </div>
      </header>
      
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search conversations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <div 
            key={conversation.id}
            className="border-b hover:bg-gray-100 cursor-pointer"
          >
            <div className="p-4 flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${conversation.unread > 0 ? 'text-black' : 'text-gray-700'}`}>
                    {conversation.name}
                  </h3>
                  <span className="text-xs text-gray-500">{formatDate(conversation.timestamp)}</span>
                </div>
                <p className={`text-sm mt-1 truncate ${conversation.unread > 0 ? 'font-medium text-gray-800' : 'text-gray-500'}`}>
                  {conversation.lastMessage}
                </p>
              </div>
              <div className="flex items-center ml-4">
                {conversation.unread > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">
                    {conversation.unread}
                  </span>
                )}
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;