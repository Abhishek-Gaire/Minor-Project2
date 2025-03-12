import { useAuth } from "@/contexts/useAuth";
import { cn } from "@/lib/utils";

const Message = ({ message }) => {
  const { user } = useAuth();

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",

      hour12: true,
    });
  };
  return (
    <div
      key={message.id}
      className={cn(
        "flex",
        user.name === message.sender ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-3/4 p-3 shadow-sm",
          user.name === message.sender
            ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
            : "bg-white rounded-r-lg rounded-tl-lg border"
        )}
      >
        {user.name !== message.sender && (
          <div className="font-medium text-xs mb-1">{message.sender}</div>
        )}
        <div className="space-y-1">
          <div>{message.content}</div>
          <div
            className={cn(
              "text-xs text-right",
              user.name === message.sender ? "text-blue-100" : "text-gray-500"
            )}
          >
            {formatTime(message.timeStamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
