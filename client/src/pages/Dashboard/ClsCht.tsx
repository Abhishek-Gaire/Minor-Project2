import React, { useState } from 'react';
import { MessageCircle, Send, User } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

const ClassChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Teacher',
      content: 'Welcome to today\'s class discussion! Please share your thoughts on the reading assignment.',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      sender: 'Alex',
      content: 'I found the chapter on quantum mechanics particularly interesting, especially the part about wave-particle duality.',
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: '3',
      sender: 'Jamie',
      content: 'I had a question about the Schrödinger equation explanation. Could we go over that again?',
      timestamp: new Date(Date.now() - 900000),
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: newMessage,
      timestamp: new Date(),
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 ml-10 mt-5">
      <header className="bg-white shadow p-4">
        <div className="flex items-center">
          <MessageCircle className="text-blue-500 mr-2" />
          <h1 className="text-xl font-semibold">Class Chat</h1>
        </div>
        <p className="text-gray-500 text-sm mt-1">Physics 101 - Quantum Mechanics</p>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${
              message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-white border'
            }`}>
              <div className="flex items-center mb-1">
                <span className="font-medium text-sm">{message.sender}</span>
                <span className="text-xs ml-2 opacity-75">{formatTime(message.timestamp)}</span>
              </div>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t bg-white p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message here..."
            className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassChatPage;