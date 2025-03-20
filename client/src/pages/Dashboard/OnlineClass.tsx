import React, { useState, useEffect } from "react";
import { Video, Calendar, Monitor } from "lucide-react";
import { useAuth } from "@/contexts/useAuth";
import Header from "@/components/Dashboard/OnlineClass/Header";
import TabNavigation from "@/components/Dashboard/OnlineClass/TabNavigation";
import FilteredClasses from "@/components/Dashboard/OnlineClass/FilteredClasses";
import { ClassSession } from "@/utils/types";
import AddClassForm from "@/components/Dashboard/OnlineClass/AddClassForm";
import { ClassFormData } from "@/constants/types";
import Footer from "@/components/Dashboard/OnlineClass/Footer";
import ShowOnlineClassChat from "@/components/Dashboard/OnlineClass/ShowOnlineClassChat";
import ParticipantVideos from "@/components/Dashboard/OnlineClass/ParticipantVideos";

// Types
interface Participant {
  id: string | number;
  name: string;
  isSpeaking: boolean;
  videoEnabled: boolean;
  audioEnabled: boolean;
  isScreenSharing?: boolean;
  isTeacher?: boolean;
}

// Main Component
const OnlineClassPage: React.FC = () => {
  const { user } = useAuth();
  // State management
  const userRole = user.role;
  const [inClass, setInClass] = useState<boolean>(false);
  const [showAddClassForm, setShowAddClassForm] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "upcoming" | "ongoing" | "finished"
  >("ongoing");

  // Class sessions data
  const [classSessions, setClassSessions] = useState<ClassSession[]>([
    {
      id: "1",
      title: "Physics 101 - Quantum Mechanics",
      description:
        "Introduction to wave functions and the Schrödinger equation",
      instructor: "Dr. Johnson",
      startTime: new Date(new Date().setHours(new Date().getHours() - 1)),
      endTime: new Date(new Date().setHours(new Date().getHours() + 1)),
      status: "ongoing",
    },
    {
      id: "2",
      title: "Physics 101 - Relativity",
      description: "Special and general relativity principles",
      instructor: "Dr. Johnson",
      startTime: new Date(new Date().setDate(new Date().getDate() + 2)),
      endTime: new Date(new Date().setDate(new Date().getDate() + 2)),
      status: "upcoming",
    },
    {
      id: "3",
      title: "Physics 101 - Classical Mechanics",
      description: "Newton's laws and applications",
      instructor: "Dr. Johnson",
      startTime: new Date(new Date().setDate(new Date().getDate() - 3)),
      endTime: new Date(new Date().setDate(new Date().getDate() - 3)),
      status: "finished",
    },
  ]);

  // Controls for video call
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const isTeacher = userRole === "teacher";

  // Participants state
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 1,
      name: "Dr. Johnson",
      isSpeaking: false,
      videoEnabled: false,
      audioEnabled: true,
      isTeacher: true,
    },
    {
      id: 2,
      name: "Sarah Kim",
      isSpeaking: false,
      videoEnabled: false,
      audioEnabled: true,
    },
    {
      id: 3,
      name: "Alex Chen",
      isSpeaking: true,
      videoEnabled: true,
      audioEnabled: true,
    },
    {
      id: 4,
      name: "Maya Patel",
      isSpeaking: false,
      videoEnabled: false,
      audioEnabled: false,
    },
    {
      id: 5,
      name: "James Wilson",
      isSpeaking: false,
      videoEnabled: true,
      audioEnabled: true,
    },
  ]);

  // Functions for video call controls
  const toggleAudio = () => {
    if (mediaStream) {
      const audioTracks = mediaStream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !audioEnabled;
      });
    }
    setAudioEnabled(!audioEnabled);
  };

  const toggleVideo = () => {
    if (mediaStream) {
      const videoTracks = mediaStream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !videoEnabled;
      });
    }
    setVideoEnabled(!videoEnabled);
  };

  // Clean up screen sharing when component unmounts
  useEffect(() => {
    return () => {
      stopScreenSharing();
    };
  }, []);

  // Function to start screen sharing
  const startScreenSharing = async () => {
    try {
      // Request screen capture permission and get media stream
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      // Save stream to state
      setScreenStream(stream);
      setIsScreenSharing(true);

      // Handle when user stops sharing via browser controls
      stream.getVideoTracks()[0].onended = () => {
        stopScreenSharing();
      };

      console.log("Screen sharing started successfully");
    } catch (error) {
      console.error("Error starting screen share:", error);
      setIsScreenSharing(false);
    }
  };

  // Function to stop screen sharing
  const stopScreenSharing = () => {
    if (screenStream) {
      // Stop all tracks in the stream
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
    }
    setIsScreenSharing(false);
  };

  // Toggle screen sharing
  const toggleScreenShare = () => {
    if (isScreenSharing) {
      stopScreenSharing();
    } else {
      startScreenSharing();
    }
  };

  // Clean up function to stop media tracks when leaving
  const stopMediaDevices = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
    }
  };

  // Functions for class management
  const handleAddClass = (formData: ClassFormData) => {
    const newClass: ClassSession = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      instructor: userRole === "teacher" ? "You" : "Unknown",
      startTime: new Date(formData.startTime),
      endTime: new Date(formData.endTime),
      status: "upcoming",
    };

    setClassSessions([...classSessions, newClass]);
    setShowAddClassForm(false);
  };

  const handleDeleteClass = (id: string) => {
    setClassSessions(classSessions.filter((cls) => cls.id !== id));
  };

  const handleJoinClass = async (id: string) => {
    setInClass(true);
  };

  const handleLeaveClass = () => {
    // Clean up media devices when leaving the class
    stopMediaDevices();
    stopScreenSharing();
    setInClass(false);
  };

  const handleStartClass = async (id: string) => {
    setClassSessions(
      classSessions.map((cls) =>
        cls.id === id ? { ...cls, status: "ongoing" } : cls
      )
    );
    setInClass(true);
  };

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      stopMediaDevices();
      stopScreenSharing();
    };
  }, []);

  // Filter classes based on the active tab
  const filteredClasses = classSessions.filter(
    (cls) => cls.status === activeTab
  );

  // Render dashboard or video call UI based on inClass state
  return (
    <div className="flex flex-col h-[87vh] bg-gray-900 text-white">
      {!inClass ? (
        // Dashboard View
        <div className="flex-1 p-6 overflow-auto">
          <Header
            userRole={userRole}
            setShowAddClassForm={setShowAddClassForm}
          />

          {/* Tab Navigation */}
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Class List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((cls) => (
                <FilteredClasses
                  cls={cls}
                  userRole={userRole}
                  key={cls.id}
                  handleDeleteClass={handleDeleteClass}
                  handleJoinClass={handleJoinClass}
                  handleStartClass={handleStartClass}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-16 text-gray-400">
                <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">No {activeTab} classes found</p>
                {userRole === "teacher" && activeTab === "upcoming" && (
                  <button
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                    onClick={() => setShowAddClassForm(true)}
                  >
                    Add Your First Class
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Add Class Form Modal */}
          {showAddClassForm && (
            <AddClassForm
              onSubmit={handleAddClass}
              onCancel={() => setShowAddClassForm(false)}
            />
          )}
        </div>
      ) : (
        // Video Call View
        <div className="flex-1 flex overflow-hidden">
          <div
            className={`flex-1 p-4 flex flex-col ${
              showChat ? "w-2/3" : "w-full"
            }`}
          >
            {/* Main screen - Teacher's screen share or video */}
            <div className="bg-black rounded-lg flex-1 relative mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                {isScreenSharing && screenStream ? (
                  <div className="w-full h-full">
                    <video
                      ref={(video) => {
                        // Set video source when component mounts or stream changes
                        if (video && screenStream) {
                          video.srcObject = screenStream;
                        }
                      }}
                      autoPlay
                      className="w-full h-full object-contain"
                    />
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
                {participants[0].isSpeaking && (
                  <span className="animate-pulse">●</span>
                )}
              </div>

              {/* Screen sharing toggle button for teacher only */}
              {isTeacher && (
                <div className="absolute top-4 right-4">
                  <button
                    className={`flex items-center px-3 py-2 rounded ${
                      isScreenSharing ? "bg-red-500" : "bg-green-500"
                    }`}
                    onClick={toggleScreenShare}
                  >
                    <Monitor size={18} className="mr-2" />
                    <span>
                      {isScreenSharing ? "Stop Sharing" : "Share Screen"}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Participant videos */}
            <div className="grid grid-cols-4 gap-2 h-32">
              {participants.slice(1).map((participant) => (
                <ParticipantVideos
                  participant={participant}
                  key={participant.id}
                />
              ))}
            </div>
          </div>

          {showChat && <ShowOnlineClassChat setShowChat={setShowChat} />}
        </div>
      )}

      {/* Footer with controls */}
      <Footer
        inClass={inClass}
        toggleAudio={toggleAudio}
        audioEnabled={audioEnabled}
        toggleVideo={toggleVideo}
        videoEnabled={videoEnabled}
        showChat={showChat}
        setShowChat={setShowChat}
        handleLeaveClass={handleLeaveClass}
        participants={participants}
      />
    </div>
  );
};

export default OnlineClassPage;
