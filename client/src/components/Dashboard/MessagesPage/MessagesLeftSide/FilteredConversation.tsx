import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useAuth } from "@/contexts/useAuth";
import { getInitials, getTimeDifference } from "@/lib/utils";
import { Conversation } from "@/constants/types";

interface FilteredConversationsProps {
  conversation,
  setActiveConversation: (id: string) => void;
  setSelectedUser: (user: string) => void;
  activeConversation: string | null;
}

const FilteredConversations: React.FC<FilteredConversationsProps> = ({
  conversation,
  setActiveConversation,
  activeConversation,
  setSelectedUser,
}) => {
  const { user } = useAuth();
  const name =
    user.name === conversation.receiver
      ? conversation.sender
      : conversation.receiver;
  const getAvatarColor = (type: string) => {
    switch (type) {
      case "student":
        return "bg-blue-500";
      case "teacher":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleConversationClick = (conversation) => {
    setActiveConversation(conversation.id);
    setSelectedUser(name);
  };

  return (
    <div
      key={conversation.id}
      className={`p-3 cursor-pointer hover:bg-muted flex items-start gap-3 ${
        activeConversation === conversation.id ? "bg-muted" : ""
      }`}
      onClick={() => handleConversationClick(conversation)}
    >
      <Avatar className={getAvatarColor(conversation.type)}>
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="font-medium truncate">{name}</div>
          <div className="text-xs text-gray-500">
            {getTimeDifference(conversation.timeStamp)}
          </div>
        </div>
        <div className="text-sm truncate text-gray-500">
          {conversation.content}
        </div>
      </div>
      {!conversation.delivered && user.name === conversation.receiver && (
        <Badge className="rounded-full bg-blue-500">1</Badge>
      )}
    </div>
  );
};

export default FilteredConversations;
