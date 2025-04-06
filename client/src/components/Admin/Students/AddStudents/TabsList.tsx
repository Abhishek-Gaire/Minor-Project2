import { TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Book, FileText, Phone, User, Users } from "lucide-react";

const TabsListComponents = () => {
  return (
    <>
      <TabsList className="grid grid-cols-5 mb-6">
        <TabsTrigger value="personal" className="flex items-center">
          <User className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Personal</span>
        </TabsTrigger>
        <TabsTrigger value="academic" className="flex items-center">
          <Book className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Academic</span>
        </TabsTrigger>
        <TabsTrigger value="contact" className="flex items-center">
          <Phone className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Contact</span>
        </TabsTrigger>
        <TabsTrigger value="parent" className="flex items-center">
          <Users className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Parent</span>
        </TabsTrigger>
        <TabsTrigger value="additional" className="flex items-center">
          <FileText className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Additional</span>
        </TabsTrigger>
      </TabsList>
    </>
  );
};

export default TabsListComponents;
