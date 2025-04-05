import { useAuth } from "@/contexts/useAuth";
import { cn, getTimeDifference } from "@/lib/utils";

const Message = ({ message }) => {
  const { user } = useAuth();

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
            ? "bg-blue-500 text-primary-foreground rounded-l-lg rounded-tr-lg"
            : "bg-background rounded-r-lg rounded-tl-lg border"
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
              user.name === message.sender
                ? "text-blue-100"
                : "text-muted-foreground"
            )}
          >
            {getTimeDifference(message.timeStamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
