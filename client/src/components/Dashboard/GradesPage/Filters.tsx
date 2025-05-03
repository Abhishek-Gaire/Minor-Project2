import { ChevronDown, Filter, Search } from "lucide-react";

const Filters = ({
  isTeacher,
  setSearchTerm,
  searchTerm,
  selectedCourse,
  setSelectedCourse,
  setSelectedAssignment,
  courses,
  selectedAssignment,
  assignments,
}) => {
  return (
    <div className="p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <div className="relative flex-grow">
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder={
            isTeacher
              ? "Search by student name or ID..."
              : "Search assignments..."
          }
          className="pl-10 pr-4 py-2 border border-input rounded-lg w-full bg-input text-foreground"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="relative">
        <select
          className="appearance-none pl-4 pr-10 py-2 border border-input rounded-lg bg-card text-foreground]"
          value={selectedCourse || ""}
          onChange={(e) => {
            setSelectedCourse(e.target.value || null);
            setSelectedAssignment(null); // Reset assignment when course changes
          }}
        >
          <option value="">All Courses</option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
      </div>
      {/* 
      <div className="relative">
        <select
          className="appearance-none pl-4 pr-10 py-2 border border-input rounded-lg bg-card text-foreground]"
          value={selectedAssignment || ""}
          onChange={(e) => setSelectedAssignment(e.target.value || null)}
          disabled={!selectedCourse}
        >
          <option value="">All Assignments</option>
          {assignments.map((assignment) => (
            <option key={assignment.title} value={assignment.title}>
              {assignment.title}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
      </div> */}
      {/* 
      {isTeacher && (
        <button className="px-4 py-2 border border-input rounded-lg flex items-center bg-[hsl(var(--background))] text-foreground]">
          <Filter size={18} className="mr-2" />
          More Filters
        </button>
      )} */}
    </div>
  );
};

export default Filters;
