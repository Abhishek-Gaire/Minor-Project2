import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { cn } from "@/lib/utils";

const StudentsList = ({
  student,
  userName,
  setActiveConversation,
  activeConversation,
  setSelectedUser,
}) => {
  const name = student.name;
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const handleStudentClick = (student) => {
    setActiveConversation(student.id);
    setSelectedUser(student.name);
  };

  return (
    name !== userName && (
      <div
        key={student.id}
        className={cn(
          "p-3 cursor-pointer hover:bg-gray-100 flex items-start gap-3 border-b",
          activeConversation === student.id ? "bg-gray-100" : ""
        )}
        onClick={() => handleStudentClick(student)}
      >
        <Avatar className="bg-blue-500">
          <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
        </Avatar>
        <div className="flex items-center text-center justify-center">
          <div className="text-lg font-medium">{student.name}</div>
        </div>
      </div>
    )
  );
};

export default StudentsList;
