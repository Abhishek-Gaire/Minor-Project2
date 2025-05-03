import { ClassSession } from "@/utils/types";
import { Calendar, LogIn, Trash2, Video } from "lucide-react";

interface FilteredClassesProps {
  cls: ClassSession;
  userRole: string;
  handleJoinClass: (id: string) => void;
  handleCreateRoom: (roomId: string) => void;
  handleStartClass: (id: string) => void;
  handleEndClass: (id: string) => void;
  handleDeleteClass: (id: string) => void;
}

const FilteredClasses = ({
  cls,
  userRole,
  handleJoinClass,
  handleCreateRoom,
  handleStartClass,
  handleEndClass,
  handleDeleteClass,
}: FilteredClassesProps) => {
  // console.log(cls)
  // Convert string dates to Date objects
  const startDateTime = new Date(cls.startTime);
  const endDateTime = new Date(cls.endTime);

  return (
    <div key={cls.id} className="bg-secondary rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{cls.subject}</h3>
        <p className="text-secondary-foreground text-sm mb-3">
          {cls.description}
        </p>

        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-secondary-foreground">
            Instructor: {cls.teacherName}
          </span>
          <span className="bg-secondary px-2 py-1 rounded">
            {cls.status === "ongoing" && (
              <span className="flex items-center text-green-400">
                <span className="h-2 w-2 bg-green-400 rounded-full mr-2"></span>
                Live
              </span>
            )}
            {cls.status === "upcoming" && (
              <span className="text-blue-400">Upcoming</span>
            )}
            {cls.status === "finished" && (
              <span className="text-secondary-foreground">Completed</span>
            )}
          </span>
        </div>

        <div className="flex items-center text-sm text-secondary-foreground mb-4">
          <Calendar size={14} className="mr-2" />
          <span>
            {startDateTime.toLocaleDateString()},{" "}
            {startDateTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            -
            {endDateTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div className="flex justify-between">
          {userRole === "student" && cls.status === "ongoing" && (
            <button
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
              onClick={() => handleJoinClass(cls.id)}
            >
              <LogIn size={16} className="mr-2" />
              Join Class
            </button>
          )}

          {userRole === "teacher" && cls.status === "upcoming" && (
            <button
              className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
              onClick={() => handleCreateRoom(cls.id)}
            >
              <Video size={16} className="mr-2" />
              Start Class
            </button>
          )}

          {userRole === "teacher" && cls.status === "ongoing" && (
            <button
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
              onClick={() => handleJoinClass(cls.id)}
            >
              <LogIn size={16} className="mr-2" />
              Continue Class
            </button>
          )}

          {userRole === "teacher" && cls.status === "ongoing" && (
            <button
              className="flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg"
              onClick={() => handleEndClass(cls.id)}
            >
              <LogIn size={16} className="mr-2" />
              Finish Class
            </button>
          )}

          {userRole === "teacher" && cls.status === "finished" && (
            <button
              className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
              onClick={() => handleDeleteClass(cls.id)}
            >
              <Trash2 size={16} className="mr-2" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilteredClasses;
