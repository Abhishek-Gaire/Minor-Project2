import { Camera, CameraOff, Mic, MicOff, PhoneOff } from "lucide-react";

interface MeetingControlProps {
  isVideoOn: boolean;
  isAudioOn: boolean;
  onVideoToggle: () => void;
  onAudioToggle: () => void;
  onLeave: () => void;
}

export function MeetingControls({
  isVideoOn,
  isAudioOn,
  onVideoToggle,
  onAudioToggle,
  onLeave,
}: MeetingControlProps) {
  return (
    <div className="bg-gray-800 p-4">
      <div className="max-w-3xl mx-auto flex justify-center space-x-4">
        <button
          onClick={onVideoToggle}
          className={`p-3 rounded-full ${
            isVideoOn
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-red-600 hover:bg-red-500"
          }`}
        >
          {isVideoOn ? (
            <Camera className="h-6 w-6 text-white" />
          ) : (
            <CameraOff className="h-6 w-6 text-white" />
          )}
        </button>
        <button
          onClick={onAudioToggle}
          className={`p-3 rounded-full ${
            isAudioOn
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-red-600 hover:bg-red-500"
          }`}
        >
          {isAudioOn ? (
            <Mic className="h-6 w-6 text-white" />
          ) : (
            <MicOff className="h-6 w-6 text-white" />
          )}
        </button>
        <button
          onClick={onLeave}
          className="p-3 rounded-full bg-red-600 hover:bg-red-500"
        >
          <PhoneOff className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
}
