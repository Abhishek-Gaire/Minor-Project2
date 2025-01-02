import { User } from "lucide-react";

interface Participant {
  id: string;
  name: string;
  isHost: boolean;
}

interface ParticipantsListProps {
  participants: Participant[];
}

export function ParticipantsList({ participants }: ParticipantsListProps) {
  return (
    <div className="bg-white">
      <div className="p-4bg-gray-50border-b">
        <h3 className="text-lgfont-medium">
          Participants ({participants.length})
        </h3>
      </div>
      <ul className="divide-ydivide-gray-200">
        {participants.map((participant) => (
          <li key={participant.id} className="p-4 flex items-center">
            <User className="h-5 w-5 text-gray-400 mr-3" />
            <span className="flex-1">{participant.name}</span>
            {participant.isHost && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                Host
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
