import { useSupabaseQuery } from "../../hooks/useSupabaseQuery";
import { supabase } from "../../lib/supabase-config";

import { formatDistanceToNow } from "date-fns";

interface MessageListProps {
  recipientId: string;
  currentUserId: string;
}

export function MessageList({ recipientId, currentUserId }: MessageListProps) {
  // call supabases realtime database for messsages stored

  const loading = true;

  const messages = [
    {
      id: 1,
      sender_id: 2,
      content: "hi",
      created_at: "date",
    },
  ];
  if (loading) {
    return <div className="flex justify-center p-4 ">Loading messages....</div>;
  }

  return (
    <div>
      {messages?.map((message) => {
        <div
          key={message.id}
          className={`flex ${
            message.sender_id === currentUserId
              ? "justify-end"
              : "jusstify-start"
          }`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.sender_id === currentUserId
                ? "bg-indigo-100 text-indigo-900"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <span className="text-xs text-gray-500 mt-1">
              {formatDistanceToNow(new Date(message.created_at), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>;
      })}
    </div>
  );
}
