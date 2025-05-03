export interface User {
  id: string;
  name: string;
  role: "teacher" | "student";
}

export interface Message {
  id: string;
  senderName: string;
  message: string;
  timestamp: number;
}

export interface PeerConnection {
  userId: string;
  peer: any; // HMSPeer from @100mslive/react-sdk
  track?: any; // HMSTrack for video
}