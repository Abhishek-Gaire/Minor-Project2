import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { cn, getInitials } from "@/lib/utils";

const StudentsList = ({
  student,
  userName,
  setActiveConversation,
  activeConversation,
  setSelectedUser,
}) => {
  // Ensure student object exists and has a name property
  if (!student || !student.name) {
    return null;
  }

  const name = student.name;

  // Skip rendering if the student name is the same as current user
  if (name === userName) {
    return null;
  }

  const handleStudentClick = () => {
    setActiveConversation();
    setSelectedUser();
  };

  return (
    <div
      key={student.id}
      className={cn(
        "p-3 cursor-pointer hover:bg-gray-100 flex items-start gap-3 border-b",
        activeConversation === student.id ? "bg-gray-100" : ""
      )}
      onClick={() => handleStudentClick()}
    >
      <Avatar className="bg-blue-500">
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div className="flex items-center text-center justify-center">
        <div className="text-lg font-medium">{name}</div>
      </div>
    </div>
  );
};

export default StudentsList;
