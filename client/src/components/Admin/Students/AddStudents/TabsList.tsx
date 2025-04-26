import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserCircle,
  GraduationCap,
  Phone,
  Users,
  FileText,
} from "lucide-react";

interface TabsListComponentsProps {
  tabsWithErrors?: Record<string, boolean>;
}

const TabsListComponents: React.FC<TabsListComponentsProps> = ({
  tabsWithErrors = {},
}) => {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-white rounded-none border-b mb-4">
      <TabsTrigger
        value="personal"
        className="relative font-medium text-sm py-2"
      >
        <div className="flex items-center">
          <UserCircle className="h-4 w-4 mr-2" />
          <span>Personal</span>
          {tabsWithErrors.personal && (
            <span className="absolute top-0 right-0 mt-1 mr-1 h-2 w-2 bg-red-500 rounded-full" />
          )}
        </div>
      </TabsTrigger>

      <TabsTrigger
        value="academic"
        className="relative font-medium text-sm py-2"
      >
        <div className="flex items-center">
          <GraduationCap className="h-4 w-4 mr-2" />
          <span>Academic</span>
          {tabsWithErrors.academic && (
            <span className="absolute top-0 right-0 mt-1 mr-1 h-2 w-2 bg-red-500 rounded-full" />
          )}
        </div>
      </TabsTrigger>

      <TabsTrigger
        value="contact"
        className="relative font-medium text-sm py-2"
      >
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2" />
          <span>Contact</span>
          {tabsWithErrors.contact && (
            <span className="absolute top-0 right-0 mt-1 mr-1 h-2 w-2 bg-red-500 rounded-full" />
          )}
        </div>
      </TabsTrigger>

      <TabsTrigger value="parent" className="relative font-medium text-sm py-2">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2" />
          <span>Guardian</span>
          {tabsWithErrors.parent && (
            <span className="absolute top-0 right-0 mt-1 mr-1 h-2 w-2 bg-red-500 rounded-full" />
          )}
        </div>
      </TabsTrigger>

      <TabsTrigger
        value="additional"
        className="relative font-medium text-sm py-2"
      >
        <div className="flex items-center">
          <FileText className="h-4 w-4 mr-2" />
          <span>Additional</span>
          {tabsWithErrors.additional && (
            <span className="absolute top-0 right-0 mt-1 mr-1 h-2 w-2 bg-red-500 rounded-full" />
          )}
        </div>
      </TabsTrigger>
    </TabsList>
  );
};

export default TabsListComponents;
