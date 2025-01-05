import { customAlphabet } from "nanoid";

interface MeetingLinkProps {
  hostName: string;
  meetingName: string;
}
// Create a custom nanoid with a specific alphabet for readable IDs
const generateID = customAlphabet("23456789ABCDEFGHIJKLMNPQRSTUVWXYZ", 21);

export function generateMeetingLink({
  hostName,
  meetingName,
}: MeetingLinkProps): string {
  const meetingId = generateID();

  // Using window.location.origin ensures the link works in any environment
  return `${
    window.location.origin
  }/meeting/${meetingId}?host=${encodeURIComponent(
    hostName
  )}&meeting=${encodeURIComponent(meetingName)}`;
}
