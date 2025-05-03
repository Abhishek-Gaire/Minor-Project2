import { useHMSStore, useVideo } from "@100mslive/react-sdk";
import { selectScreenShareByPeerID } from "@100mslive/react-sdk";
import { Video } from "lucide-react";

const Presenters = ({ peer }: { peer: any }) => {
  if (!peer) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Video size={48} className="mx-auto mb-2 opacity-50" />
        <p className="text-center text-primary">Screen is off</p>
      </div>
    );
  }
  const screenshareVideoTrack = useHMSStore(selectScreenShareByPeerID(peer.id));
  const { videoRef } = useVideo({
    trackId: screenshareVideoTrack.id,
  });
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Presenters;
