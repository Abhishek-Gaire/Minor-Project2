import { ClassMessage } from "@/constants/types";
import { getTimeDifference } from "@/lib/utils";
import { User } from "@/utils/types";

interface ClassMessageListProps {
  message: ClassMessage;
  user: User;
}

const MessageBubble = ({
  message,
  isCurrentUser,
}: {
  message: ClassMessage;
  isCurrentUser: boolean;
}) => {
  return (
    <div
      className={`max-w-xs md:max-w-md rounded-lg p-3 ${
        isCurrentUser ? "bg-blue-500 text-white" : "bg-background "
      }`}
    >
      <div className="flex items-center mb-1">
        <span className="font-medium text-sm">
          {isCurrentUser ? "YOU" : message.sender}
        </span>
        <span className="text-xs ml-2 opacity-75">
          {getTimeDifference(message.timestamp)}
        </span>
      </div>
      <p>{message.content}</p>
    </div>
  );
};

const ClassMessageList = ({ message, user }: ClassMessageListProps) => {
  const isCurrentUser = message.sender === user.name;

  return (
    <div
      key={message.id}
      className={`mb-4 flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
    >
      <MessageBubble
        message={message}
        isCurrentUser={isCurrentUser}
        key={message.id}
      />
    </div>
  );
};

export default ClassMessageList;
