import { formatTimeToHoursMinutes } from "@/lib/utils";
import {
  Camera,
  CameraOff,
  MessageSquare,
  Mic,
  MicOff,
  Share,
  Users,
} from "lucide-react";
import { useState } from "react";

const Footer = ({
  inClass,
  toggleAudio,
  audioEnabled,
  toggleVideo,
  videoEnabled,
  showChat,
  setShowChat,
  handleLeaveClass,
  participants,
}) => {
  const [showParticipants, setShowParticipants] = useState(false);

  const toggleParticipantsList = () => {
    setShowParticipants(!showParticipants);
  };
  return (
    <footer className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          <span>{formatTimeToHoursMinutes(new Date())}</span>
        </div>

        {inClass && (
          <>
            <div className="flex space-x-4">
              <button
                onClick={toggleAudio}
                className={`p-2 rounded-full ${
                  audioEnabled
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {audioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
              </button>

              <button
                onClick={toggleVideo}
                className={`p-2 rounded-full ${
                  videoEnabled
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {videoEnabled ? <Camera size={20} /> : <CameraOff size={20} />}
              </button>

              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-2 rounded-full bg-gray-700 hover:bg-gray-600 ${
                  showChat ? "text-blue-400" : ""
                }`}
              >
                <MessageSquare size={20} />
              </button>

              <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                <Share size={20} />
              </button>

              <button
                onClick={toggleParticipantsList}
                className={`p-2 rounded-full bg-gray-700 hover:bg-gray-600 ${
                  showParticipants ? "text-blue-400" : ""
                }`}
              >
                <Users />
              </button>
            </div>

            <button
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium"
              onClick={handleLeaveClass}
            >
              Leave Class
            </button>
          </>
        )}
      </div>

      {showParticipants && (
        <div className="absolute bottom-16 right-16 bg-gray-800 border border-gray-700 rounded-md p-4 w-64 shadow-lg">
          <h3 className="text-lg font-medium mb-2">
            Participants ({participants.length})
          </h3>
          <ul className="space-y-2">
            {participants.map((participant) => (
              <li key={participant.id} className="flex justify-between">
                <span>{participant.name}</span>
                <span className="text-xs text-gray-400">
                  {participant.isTeacher && "Teacher"}
                  {!participant.audioEnabled && ".Muted"}
                  {participant.isSpeaking && ".Speaking"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </footer>
  );
};

export default Footer;
