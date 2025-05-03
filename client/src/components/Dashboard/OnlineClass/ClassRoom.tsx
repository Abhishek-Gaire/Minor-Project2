import ParticipantVideos from "./ParticipantVideos";
import ShowOnlineClassChat from "./ShowOnlineClassChat";
import { User } from "@/constants/classRoom";
import { HMSPeer } from "@100mslive/react-sdk";
import Presenters from "./Presenters";

interface ClassRoomProps {
  users: User[];
  userName: string;
  sendLiveMessage: () => void;
  messages: any[];
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  showChat: boolean;
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
  peers: HMSPeer[];
  presenters: HMSPeer[];
}

const ClassRoomUI = ({
  users,
  userName,
  sendLiveMessage,
  messages,
  messageInput,
  setMessageInput,
  showChat,
  setShowChat,
  peers,
  presenters,
}: ClassRoomProps) => {
  return (
    <div className="flex-1 flex overflow-hidden">
      <div
        className={`flex-1 p-4 flex flex-col ${showChat ? "w-2/3" : "w-full"}`}
      >
        <div className="bg-primary-background rounded-lg flex-1 relative mb-4">
          <Presenters peer={presenters[0]} />

          <div className="absolute bottom-4 left-4 bg-primary-background px-2 py-1 rounded text-sm flex items-center">
            <span className="mr-1">{userName}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 h-32">
          {peers.map((p) => (
            <ParticipantVideos key={p.id} participant={p} users={users} />
          ))}
        </div>
      </div>

      {showChat && (
        <ShowOnlineClassChat
          setShowChat={setShowChat}
          sendLiveMessage={sendLiveMessage}
          messages={messages}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
        />
      )}
    </div>
  );
};

export default ClassRoomUI;
