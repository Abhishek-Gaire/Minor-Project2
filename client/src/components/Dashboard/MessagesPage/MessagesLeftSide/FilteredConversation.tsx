import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useAuth } from "@/contexts/useAuth";
import { getInitials, getTimeDifference } from "@/lib/utils";

const FilteredConversations = ({
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
  const getAvatarColor = (type) => {
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
      className={`p-3 cursor-pointer hover:bg-gray-100 flex items-start gap-3 border-b ${
        activeConversation === conversation.id ? "bg-gray-100" : ""
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
      {conversation.unread > 0 && (
        <Badge className="rounded-full bg-blue-500">
          {conversation.unread}
        </Badge>
      )}
    </div>
  );
};

export default FilteredConversations;
