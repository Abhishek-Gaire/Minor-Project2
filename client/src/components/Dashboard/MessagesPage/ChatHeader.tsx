import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
// import { Button } from "@/components/ui/button.tsx";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu.tsx";
import { getAvatarColor, getInitials } from "@/lib/utils";

// import { Clock, MoreHorizontal } from "lucide-react";

const ChatHeader = ({ selectedUser ,isOnline=false}) => {
  return (
    <div className=" bg-card p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className={getAvatarColor("student")}>
          <AvatarFallback>{getInitials(selectedUser)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{selectedUser}</div>
          <div className="text-xs text-gray-500 flex items-center">
            {isOnline ? (
              <div className="bg-green-500 h-2 w-2 rounded-full mr-1"></div>
            ) : (
              <div className="bg-gray-500 h-2 w-2 rounded-full mr-1"></div>
            )}
            {isOnline ? "Online" : "Offline"}
          </div>
        </div>
      </div>
      {/* <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <Clock className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Mark as Unread</DropdownMenuItem>
            <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
            <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
    </div>
  );
};
export default ChatHeader;
