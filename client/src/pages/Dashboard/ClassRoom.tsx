import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";
import Footer from "@/components/Dashboard/OnlineClass/Footer";
import ClassRoomUI from "@/components/Dashboard/OnlineClass/ClassRoom";
import { User } from "@/constants/classRoom";
import { toast } from "react-toastify";
import {
  useHMSActions,
  useHMSStore,
  selectPeers,
  selectPeersScreenSharing,
  HMSMessage,
} from "@100mslive/react-sdk";
import { v4 as uuidv4 } from "uuid";

const ClassRoom = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const hmsActions = useHMSActions();
  const peers = useHMSStore(selectPeers);
  const presenters = useHMSStore(selectPeersScreenSharing);

  const [messages, setMessages] = useState<HMSMessage[]>([]);

  const userRole = user.role;
  const userName = user.name;
  const isTeacher = userRole === "teacher";

  const [users, setUsers] = useState<User[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    window.onbeforeunload = () => {
      hmsActions.leave();
    };
  }, [hmsActions]);

  useEffect(() => {
    setUsers(
      peers.map((peer) => ({
        id: peer.id,
        name: peer.name || "User",
        role: peer.roleName === "broadcaster" ? "teacher" : "student",
      }))
    );
  }, [peers]);

  useEffect(() => {
    const teacherPeer = peers.find((peer) => peer.roleName === "broadcaster");
    if (!teacherPeer && peers.length > 0 && !isTeacher) {
      toast.error("Teacher has left the classroom");
      hmsActions.leave();
      navigate(`/dashboard/${userRole}/live-classes`);
    }
  }, [peers, isTeacher, hmsActions, navigate, userRole]);

  const sendLiveMessage = () => {
    if (!messageInput.trim()) return;
  
    hmsActions.sendBroadcastMessage(messageInput);
  
    const newMessage: HMSMessage = {
      id: uuidv4(), // Must be unique
      sender: undefined, // or provide HMSPeerID if available
      senderName: userName,
      senderUserId: user.id, // if available, otherwise omit or set undefined
      senderRole: userRole,
      recipientPeer: undefined,
      recipientRoles: undefined,
      time: new Date(),
      read: true,
      type: "chat", // or another type if you're using custom types
      message: messageInput,
      ignored: false,
    };
  
    setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");
  };
  

  const handleLeaveClass = () => {
    hmsActions.leave();
    navigate(`/dashboard/${userRole}/live-classes`);
  };

  return (
    <div className="flex flex-col h-[87vh] bg-primary-foreground text-primary-background">
      <ClassRoomUI
        users={users}
        sendLiveMessage={sendLiveMessage}
        messages={messages}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        showChat={showChat}
        setShowChat={setShowChat}
        peers={peers}
        presenters={presenters}
      />

      <Footer
        showChat={showChat}
        setShowChat={setShowChat}
        handleLeaveClass={handleLeaveClass}
        participants={peers}
        isTeacher={isTeacher}
      />
    </div>
  );
};

export default ClassRoom;
