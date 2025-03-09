import { cn } from "@/lib/utils";

const Message = ({ message }) => {
  return (
    <div
      key={message.id}
      className={cn("flex", message.isSelf ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-3/4 p-3 shadow-sm",
          message.isSelf
            ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
            : "bg-white rounded-r-lg rounded-tl-lg border"
        )}
      >
        {!message.isSelf && (
          <div className="font-medium text-xs mb-1">{message.sender}</div>
        )}
        <div className="space-y-1">
          <div>{message.content}</div>
          <div
            className={cn(
              "text-xs text-right",
              message.isSelf ? "text-blue-100" : "text-gray-500"
            )}
          >
            {message.timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
