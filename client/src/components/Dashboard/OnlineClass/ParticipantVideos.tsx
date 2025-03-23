import { Camera, MicOff } from "lucide-react";

const ParticipantVideos = ({ participant }) => {
  return (
    <div
      key={participant.id}
      className="bg-gray-800 rounded-lg relative overflow-hidden"
    >
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
        {!participant.audioEnabled && (
          <MicOff size={14} className="text-red-500" />
        )}
      </div>

      {participant.isSpeaking && (
        <div className="absolute inset-0 border-2 border-green-500 rounded-lg pointer-events-none"></div>
      )}
    </div>
  );
};

export default ParticipantVideos;
