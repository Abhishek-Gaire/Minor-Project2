import { Camera, MicOff } from "lucide-react";
import { User } from "@/constants/classRoom";
import { useHMSStore, useVideo } from "@100mslive/react-sdk";
import {
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
} from "@100mslive/react-sdk";
import { HMSPeer } from "@100mslive/react-sdk";

interface Props {
  participant: HMSPeer;
  users: User[];
  fullView?: boolean; // Added fullView prop
}

const ParticipantVideos = ({ participant, users, fullView = false }: Props) => {
  const { videoRef } = useVideo({
    trackId: participant.videoTrack,
  });

  const isPeerAudioEnabled = useHMSStore(
    selectIsPeerAudioEnabled(participant.id)
  );
  const isPeerVideoEnabled = useHMSStore(
    selectIsPeerVideoEnabled(participant.id)
  );

  // Find user details
  const user = users.find((u) => u.id === participant.id);
  const userName = user?.name || "User";
  const isTeacher = user?.role === "teacher";

  // Adjust classes based on fullView prop
  const containerClasses = `bg-secondary rounded-lg relative overflow-hidden h-full aspect-video`;

  // Adjust video size for better view in fullView mode
  const videoClasses = `w-full h-full ${
    fullView ? "object-contain" : "object-cover"
  }`;

  // Enhanced name label for fullView
  const nameLabelClasses = `text-xs bg-primary-foreground bg-opacity-50 px-2 py-1 rounded ${
    fullView && isTeacher ? "font-medium" : ""
  }`;

  // Adjust mic icon size and position based on fullView
  const micIconSize = fullView ? 20 : 16;
  const micIconPosition = "absolute top-2 right-2 text-red-500 z-10";

  return (
    <div className={containerClasses}>
      {/* Audio mute indicator - now visible in both normal and fullView modes */}
      {!isPeerAudioEnabled && (
        <div className={micIconPosition}>
          <MicOff height={micIconSize} width={micIconSize} />
        </div>
      )}

      {isPeerVideoEnabled && participant.videoTrack ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={videoClasses}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <div className="flex flex-col items-center">
            <Camera
              size={fullView ? 48 : 24}
              className="text-secondary-foreground mb-2"
            />
            {fullView && (
              <span className="text-sm text-gray-300">{userName}</span>
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
        <span className={nameLabelClasses}>
          {userName}
          {isTeacher && (fullView ? " (Teacher)" : "")}
        </span>
      </div>
    </div>
  );
};

export default ParticipantVideos;