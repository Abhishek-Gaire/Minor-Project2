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
}

const ParticipantVideos = ({ participant, users }: Props) => {
  const { videoRef } = useVideo({
    trackId: participant.videoTrack,
  });

  const isPeerAudioEnabled = useHMSStore(
    selectIsPeerAudioEnabled(participant.id)
  );
  const isPeerVideoEnabled = useHMSStore(
    selectIsPeerVideoEnabled(participant.id)
  );

  return (
    <div className="bg-secondary rounded-lg relative overflow-hidden h-full">
      {!isPeerAudioEnabled && (
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: "100",
            backgroundColor: "#293042",
            padding: "0.5rem",
            borderRadius: "0.75rem",
            height: "2rem",
            width: "2rem",
          }}
        >
          <MicOff height={16} width={16} />
        </div>
      )}

      {isPeerVideoEnabled && participant.videoTrack ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Camera size={24} className="text-secondary-foreground" />
        </div>
      )}

      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
        <span className="text-xs bg-primary-foreground bg-opacity-50 px-2 py-1 rounded">
          {users.find((u) => u.id === participant.id)?.name || "User"}
        </span>
        {!isPeerAudioEnabled && <MicOff size={14} className="text-red-500" />}
      </div>
    </div>
  );
};

export default ParticipantVideos;
