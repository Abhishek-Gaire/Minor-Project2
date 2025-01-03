import { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { MeetingControls } from "./MeetingControls";
// import { useMeetingState } from "../../hooks/useMeetingState";

import { Users } from "lucide-react";

export function MeetingRoom() {
  const { meetingId } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const query = new URLSearchParams(useLocation().search);
  const hostName = query.get("host");
  const meetingName = query.get("meeting");

  useEffect(() => {
    // Initialize video stream
    async function setupStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    }

    setupStream();
  }, []);

  const handleVideoToggle = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn; // Toggle video track
      }
    }
    setIsVideoOn(!isVideoOn);
  };

  const handleAudioToggle = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioOn; // Toggle audio track
      }
    }
    setIsAudioOn(!isAudioOn);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Meeting header */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-white font-semibold">Meeting: {meetingName}</h1>
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-gray-300">
            <Users className="h-5 w-5" />
            {/* <span className="ml-1">{participants.length}</span> */}
          </button>
        </div>
      </div>

      {/* Video grid */}
      <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 text-white text-sm">
            You {hostName}
            {/* {isHost ? "(Host)" : ""} */}
          </div>
        </div>
        {/* Participant videos will be added here */}
      </div>

      {/* Meeting controls */}
      <MeetingControls
        isVideoOn={isVideoOn}
        isAudioOn={isAudioOn}
        onVideoToggle={handleVideoToggle}
        onAudioToggle={handleAudioToggle}
        onLeave={() => window.close()}
      />
    </div>
  );
}
