import React, { useState } from 'react';
import { Video, Mic, MicOff, Camera, CameraOff, Users, MessageSquare, Share, MoreVertical } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  isSpeaking: boolean;
  videoEnabled: boolean;
  audioEnabled: boolean;
  isScreenSharing: boolean;
}

const OnlineClassPage: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'Dr. Johnson (Host)', isSpeaking: true, videoEnabled: true, audioEnabled: true, isScreenSharing: true },
    { id: '2', name: 'You', isSpeaking: false, videoEnabled: true, audioEnabled: true, isScreenSharing: false },
    { id: '3', name: 'Alex Smith', isSpeaking: false, videoEnabled: true, audioEnabled: false, isScreenSharing: false },
    { id: '4', name: 'Jamie Williams', isSpeaking: false, videoEnabled: false, audioEnabled: true, isScreenSharing: false },
    { id: '5', name: 'Taylor Brown', isSpeaking: false, videoEnabled: true, audioEnabled: true, isScreenSharing: false },
  ]);

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [showChat, setShowChat] = useState(false);
  
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    updateUserState({ audioEnabled: !audioEnabled });
  };
  
  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    updateUserState({ videoEnabled: !videoEnabled });
  };
  
  const updateUserState = (updates: Partial<Participant>) => {
    setParticipants(participants.map(p => 
      p.name === 'You' ? { ...p, ...updates } : p
    ));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Video className="text-blue-400 mr-2" />
            <h1 className="text-xl font-semibold">Physics 101 - Live Class</h1>
          </div>
          <div className="text-red-400 font-medium">
            <span>● LIVE</span>
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        <div className={`flex-1 p-4 flex flex-col ${showChat ? 'w-2/3' : 'w-full'}`}>
          {/* Main screen - Teacher's screen share or video */}
          <div className="bg-black rounded-lg flex-1 relative mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              {participants[0].isScreenSharing ? (
                <div className="w-full h-full p-4">
                  <div className="bg-white text-black h-full rounded-lg flex items-center justify-center">
                    <div className="text-center p-4">
                      <h2 className="text-xl font-bold mb-2">Quantum Mechanics: Wave Functions</h2>
                      <p className="text-gray-700">Presentation Slide - Schrödinger Equation</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Video size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Dr. Johnson's camera is off</p>
                </div>
              )}
            </div>
            
            <div className="absolute bottom-4 left-4 bg-blue-500 px-2 py-1 rounded text-sm flex items-center">
              <span className="mr-1">Dr. Johnson</span>
              {participants[0].isSpeaking && <span className="animate-pulse">●</span>}
            </div>
          </div>
          
          {/* Participant videos */}
          <div className="grid grid-cols-4 gap-2 h-32">
            {participants.slice(1).map((participant) => (
              <div key={participant.id} className="bg-gray-800 rounded-lg relative overflow-hidden">
                {participant.videoEnabled ? (
                  <div className="w-full h-full bg-gray-700"></div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera size={24} className="text-gray-500" />
                  </div>
                )}
                
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                  <span className="text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                    {participant.name}
                  </span>
                  {!participant.audioEnabled && <MicOff size={14} className="text-red-500" />}
                </div>
                
                {participant.isSpeaking && (
                  <div className="absolute inset-0 border-2 border-green-500 rounded-lg pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {showChat && (
          <div className="w-1/3 bg-gray-800 p-4 flex flex-col border-l border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">Class Chat</h2>
              <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white">
                <span>×</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto mb-4">
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-1">Dr. Johnson</div>
                <div className="bg-gray-700 rounded-lg p-2">
                  Please type your questions here. I'll pause for Q&A in 5 minutes.
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-1">Jamie Williams</div>
                <div className="bg-gray-700 rounded-lg p-2">
                  Could you explain the relationship between wavelength and energy again?
                </div>
              </div>
            </div>
            
            <div>
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>
      
      <footer className="bg-gray-800 p-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            <span>1:15:27</span>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-full ${audioEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'}`}
            >
              {audioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
            
            <button
              onClick={toggleVideo}
              className={`p-2 rounded-full ${videoEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'}`}
            >
              {videoEnabled ? <Camera size={20} /> : <CameraOff size={20} />}
            </button>
            
            <button
              onClick={() => setShowChat(!showChat)}
              className={`p-2 rounded-full bg-gray-700 hover:bg-gray-600 ${showChat ? 'text-blue-400' : ''}`}
            >
              <MessageSquare size={20} />
            </button>
            
            <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
              <Share size={20} />
            </button>
            
            <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
              <Users size={20} />
            </button>
          </div>
          
          <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium">
            Leave Class
          </button>
        </div>
      </footer>
    </div>
  );
};

export default OnlineClassPage;