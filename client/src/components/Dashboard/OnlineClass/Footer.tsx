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

const Footer = ({
  inClass,
  toggleAudio,
  audioEnabled,
  toggleVideo,
  videoEnabled,
  showChat,
  setShowChat,
  handleLeaveClass,
}) => {
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

              <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                <Users size={20} />
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
    </footer>
  );
};

export default Footer;
