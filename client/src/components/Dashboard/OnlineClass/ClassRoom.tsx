import ParticipantVideos from "./ParticipantVideos";
import ShowOnlineClassChat from "./ShowOnlineClassChat";
import { User } from "@/constants/classRoom";
import { HMSPeer } from "@100mslive/react-sdk";
import Presenters from "./Presenters";

interface ClassRoomProps {
  users: User[];
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
  sendLiveMessage,
  messages,
  messageInput,
  setMessageInput,
  showChat,
  setShowChat,
  peers,
  presenters,
}: ClassRoomProps) => {
  // Check if screen is being shared (presenter exists)
  const isScreenShared = presenters.length > 0;
  
  // Find the teacher from the users array
  const teacher = users.find(user => user.role === "teacher");
  const teacherName = teacher ? teacher.name : "Teacher";

  return (
    <div className="flex-1 flex overflow-hidden">
      <div
        className={`flex-1 p-4 flex flex-col ${showChat ? "w-2/3" : "w-full"}`}
      >
        {isScreenShared ? (
          // When screen is shared, show presenter view with participants below
          <>
            <div className="bg-primary-background rounded-lg flex-1 relative mb-4">
              <Presenters peer={presenters[0]} />
              
              <div className="absolute bottom-4 left-4 bg-primary-background px-2 py-1 rounded text-sm flex items-center">
                <span className="mr-1">{teacherName}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 h-32">
              {peers.map((p) => (
                <ParticipantVideos key={p.id} participant={p} users={users} />
              ))}
            </div>
          </>
        ) : (
          // When no screen is shared, layout depends on number of participants
          <>
            <div className="bg-primary-background rounded-lg flex-1 p-2 h-full flex">
              {peers.length <= 3 ? (
                // For 1-3 participants, use flex layout with equal divisions and center
                <div className="flex justify-center items-center w-full gap-4">
                  {peers.map((p) => (
                    <div 
                      key={p.id} 
                      className={`${
                        peers.length === 1 ? "w-full" : 
                        peers.length === 2 ? "w-1/2" : 
                        "w-1/3"
                      } h-full`}
                    >
                      <ParticipantVideos 
                        participant={p} 
                        users={users} 
                        fullView={true}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                // For more than 3 participants, use a 2-column grid with scroll
                <div className="grid grid-cols-2 gap-4 w-full h-full overflow-y-auto pr-1">
                  {peers.map((p) => (
                    <div key={p.id} className="h-64 mb-4">
                      <ParticipantVideos 
                        participant={p} 
                        users={users} 
                        fullView={true}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
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