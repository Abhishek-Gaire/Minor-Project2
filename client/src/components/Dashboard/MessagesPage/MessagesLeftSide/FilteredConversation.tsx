import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Badge } from "@/components/ui/badge.tsx";

const FilteredConversations = ({
  conversation,
  setActiveConversation,
  activeConversation,
  setSelectedUser,
}) => {
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
    setSelectedUser(conversation.name);
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
        <AvatarFallback>{conversation.avatar}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="font-medium truncate">{conversation.name}</div>
          <div className="text-xs text-gray-500">{conversation.time}</div>
        </div>
        <div className="text-sm truncate text-gray-500">
          {conversation.lastMessage}
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
