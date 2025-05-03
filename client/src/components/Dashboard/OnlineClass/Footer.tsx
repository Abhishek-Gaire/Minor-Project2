import { formatTimeToHoursMinutes } from "@/lib/utils";
import {
  AudioLinesIcon,
  Camera,
  CameraOff,
  MessageSquare,
  Mic,
  MicOff,
  Share,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useAVToggle } from "@100mslive/react-sdk";
import { useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import { selectIsLocalScreenShared, selectRoom } from "@100mslive/react-sdk";
import { selectIsLocalAudioPluginPresent } from "@100mslive/react-sdk";

import { HMSKrispPlugin } from "@100mslive/hms-noise-cancellation";

const plugin = new HMSKrispPlugin();

const Footer = ({
  showChat,
  setShowChat,
  handleLeaveClass,
  participants,
  isTeacher,
}) => {

  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);
  const actions = useHMSActions();
  const room = useHMSStore(selectRoom);
  const isAudioPluginAdded = useHMSStore(
    selectIsLocalAudioPluginPresent(plugin.getName())
  );
  const [isPluginActive, setIsPluginActive] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  const toggleParticipantsList = () => {
    setShowParticipants(!showParticipants);
  };
  return (
    <footer className="bg-primary-background p-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-primary">
          <span>{formatTimeToHoursMinutes(new Date())}</span>
        </div>

        <>
          <div className="flex space-x-4">
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-full ${
                isLocalAudioEnabled
                  ? "bg-primary-foreground"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {isLocalAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
            </button>

            <button
              onClick={toggleVideo}
              className={`p-2 rounded-full ${
                isLocalVideoEnabled
                  ? "bg-primary-foreground"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {isLocalVideoEnabled ? (
                <Camera size={20} />
              ) : (
                <CameraOff size={20} />
              )}
            </button>
            {isTeacher && (
              <button
                title="Screenshare"
                className={`btn-control ${amIScreenSharing ? "" : "highlight"}`}
                onClick={() => actions.setScreenShareEnabled(!amIScreenSharing)}
              >
                <Share />
              </button>
            )}
            {room.isNoiseCancellationEnabled ? (
              <button
                title="Noise cancellation"
                className={`btn-control ${isPluginActive ? "" : "highlight"}`}
                onClick={async () => {
                  if (isAudioPluginAdded) {
                    plugin.toggle();
                    setIsPluginActive((prev) => !prev);
                  } else {
                    await actions.addPluginToAudioTrack(plugin);
                    setIsPluginActive(true);
                  }
                }}
              >
                <AudioLinesIcon />
              </button>
            ) : null}
            <button
              onClick={() => setShowChat(!showChat)}
              className={`p-2 rounded-full bg-primary-foreground ${
                showChat ? "text-blue-400" : ""
              }`}
            >
              <MessageSquare size={20} />
            </button>
            <button
              onClick={toggleParticipantsList}
              className={`p-2 rounded-full bg-primary-foreground  ${
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
      </div>

      {showParticipants && (
        <div className="absolute bottom-16 right-16 bg-primary border border-primary rounded-md p-4 w-64 shadow-lg">
          <h3 className="text-lg font-medium mb-2 text-primary-foreground">
            Participants ({participants.length})
          </h3>
          <ul className="space-y-2">
            {participants.map((participant) => (
              <li key={participant.id} className="flex justify-between">
                <span className="text-primary-foreground">
                  {participant.name}
                </span>
                <span className="text-xs text-primary-foreground">
                  {participant.roleName === "broadcaster" && "Teacher"}
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
