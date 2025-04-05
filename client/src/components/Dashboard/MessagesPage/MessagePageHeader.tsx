import { Input } from "@/components/ui/input.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";

import { MessageSquare, Search } from "lucide-react";

const MessagePageHeader = ({
  searchQuery,
  setSearchQuery,
  onSearchFocus,
  onSearchBlur,
}) => {
  return (
    <>
      <header className="bg-card shadow p-4">
        <div className="flex items-center">
          <MessageSquare className="text-blue-500 mr-2" />
          <h1 className="text-xl font-semibold">Messages</h1>
        </div>
      </header>

      <div className="p-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search students..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={onSearchFocus}
            onBlur={onSearchBlur}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="p-4">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="flagged">Flagged</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export default MessagePageHeader;
