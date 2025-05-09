import { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Edit,
} from "lucide-react";

const TeacherAttendancePage = () => {
  // Sample class data
  const [classes, setClasses] = useState([
    { id: 1, name: "Mathematics 101", grade: "9th Grade", room: "A-201" },
    { id: 2, name: "Algebra II", grade: "10th Grade", room: "B-105" },
    { id: 3, name: "Calculus", grade: "12th Grade", room: "C-302" },
  ]);

  // Sample student data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Emma Thompson",
      avatar: "/api/placeholder/32/32",
      email: "emma.t@school.edu",
    },
    {
      id: 2,
      name: "Michael Johnson",
      avatar: "/api/placeholder/32/32",
      email: "michael.j@school.edu",
    },
    {
      id: 3,
      name: "Sophia Williams",
      avatar: "/api/placeholder/32/32",
      email: "sophia.w@school.edu",
    },
    {
      id: 4,
      name: "Daniel Brown",
      avatar: "/api/placeholder/32/32",
      email: "daniel.b@school.edu",
    },
    {
      id: 5,
      name: "Olivia Davis",
      avatar: "/api/placeholder/32/32",
      email: "olivia.d@school.edu",
    },
    {
      id: 6,
      name: "James Miller",
      avatar: "/api/placeholder/32/32",
      email: "james.m@school.edu",
    },
    {
      id: 7,
      name: "Ava Wilson",
      avatar: "/api/placeholder/32/32",
      email: "ava.w@school.edu",
    },
    {
      id: 8,
      name: "Alexander Moore",
      avatar: "/api/placeholder/32/32",
      email: "alex.m@school.edu",
    },
    {
      id: 9,
      name: "Mia Taylor",
      avatar: "/api/placeholder/32/32",
      email: "mia.t@school.edu",
    },
    {
      id: 10,
      name: "Ethan Anderson",
      avatar: "/api/placeholder/32/32",
      email: "ethan.a@school.edu",
    },
  ]);

  // Sample attendance data for current day
  const [attendanceData, setAttendanceData] = useState({
    date: new Date().toISOString().split("T")[0],
    records: {
      1: "present",
      2: "present",
      3: "absent",
      4: "late",
      5: "present",
      6: "present",
      7: "excused",
      8: "present",
      9: "absent",
      10: "present",
    },
  });

  // UI State
  const [selectedClass, setSelectedClass] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceFilter, setAttendanceFilter] = useState("all");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Stats calculation
  const calculateStats = () => {
    const total = students.length;
    const present = Object.values(attendanceData.records).filter(
      (status) => status === "present"
    ).length;
    const absent = Object.values(attendanceData.records).filter(
      (status) => status === "absent"
    ).length;
    const late = Object.values(attendanceData.records).filter(
      (status) => status === "late"
    ).length;
    const excused = Object.values(attendanceData.records).filter(
      (status) => status === "excused"
    ).length;

    return {
      present,
      absent,
      late,
      excused,
      presentPercentage: Math.round((present / total) * 100),
      absentPercentage: Math.round((absent / total) * 100),
      latePercentage: Math.round((late / total) * 100),
      excusedPercentage: Math.round((excused / total) * 100),
    };
  };

  const stats = calculateStats();

  // Handle attendance change
  const updateAttendance = (studentId, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      records: {
        ...prev.records,
        [studentId]: status,
      },
    }));
  };

  // Filter students based on search and attendance filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const status = attendanceData.records[student.id];

    if (attendanceFilter === "all") return matchesSearch;
    if (attendanceFilter === "present")
      return matchesSearch && status === "present";
    if (attendanceFilter === "absent")
      return matchesSearch && status === "absent";
    if (attendanceFilter === "late") return matchesSearch && status === "late";
    if (attendanceFilter === "excused")
      return matchesSearch && status === "excused";

    return matchesSearch;
  });

  // Date navigation
  const goToPreviousDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setCurrentDate(prevDay);
    setSelectedDate(prevDay.toISOString().split("T")[0]);
  };

  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
    setSelectedDate(nextDay.toISOString().split("T")[0]);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date().toISOString().split("T")[0]);
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "absent":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "late":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "excused":
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  // Selected class details
  const currentClass = classes.find((c) => c.id === selectedClass);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Attendance Management</h1>
        <div className="flex items-center gap-2">
          <button
            className="bg-blue-600 text-primary px-4 py-2 rounded-md flex items-center"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditMode ? "Save Changes" : "Edit Attendance"}
          </button>
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Class Selection */}
        <div className="md:col-span-1 bg-background rounded-lg border-border shadow p-4">
          <h2 className="text-lg font-semibold mb-4">My Classes</h2>
          <div className="space-y-2">
            {classes.map((cls) => (
              <button
                key={cls.id}
                className={`w-full text-left p-3 rounded-md ${
                  selectedClass === cls.id
                    ? "bg-accent border-l-4 border-blue-500"
                    : "hover:bg-accent"
                }`}
                onClick={() => setSelectedClass(cls.id)}
              >
                <div className="font-medium">{cls.name}</div>
                <div className="text-sm text-accent-foreground">
                  {cls.grade} • Room {cls.room}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Date Navigation */}
          <div className="bg-background rounded-lg shadow p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  className="p-2 rounded-full hover:bg-accent"
                  onClick={goToPreviousDay}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="font-medium">{formatDate(currentDate)}</span>
                </div>
                <button
                  className="p-2 rounded-full hover:bg-accent"
                  onClick={goToNextDay}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <button
                className="px-3 py-1 text-sm bg-secondary hover:bg-primary-foreground rounded-md"
                onClick={goToToday}
              >
                Today
              </button>
            </div>
          </div>

          {/* Attendance Stats */}
          <div className="bg-primary-foreground rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">
              {currentClass?.name} Attendance Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-800 font-medium">Present</p>
                    <h3 className="text-2xl font-bold text-green-600">
                      {stats.present}
                    </h3>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <div className="mt-2 text-sm text-green-800">
                  {stats.presentPercentage}% of class
                </div>
              </div>

              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-800 font-medium">Absent</p>
                    <h3 className="text-2xl font-bold text-red-600">
                      {stats.absent}
                    </h3>
                  </div>
                  <XCircle className="h-8 w-8 text-red-500" />
                </div>
                <div className="mt-2 text-sm text-red-800">
                  {stats.absentPercentage}% of class
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-800 font-medium">Late</p>
                    <h3 className="text-2xl font-bold text-yellow-600">
                      {stats.late}
                    </h3>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="mt-2 text-sm text-yellow-800">
                  {stats.latePercentage}% of class
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-800 font-medium">Excused</p>
                    <h3 className="text-2xl font-bold text-blue-600">
                      {stats.excused}
                    </h3>
                  </div>
                  <AlertCircle className="h-8 w-8 text-blue-500" />
                </div>
                <div className="mt-2 text-sm text-blue-800">
                  {stats.excusedPercentage}% of class
                </div>
              </div>
            </div>
          </div>

          {/* Student List */}
          <div className="bg-card rounded-lg shadow overflow-hidden">
            <div className="p-4 ">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-foreground" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="pl-10 pr-4 py-2 w-full border rounded-md text-foreground bg-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="p-2 border rounded-md bg-card"
                  value={attendanceFilter}
                  onChange={(e) => setAttendanceFilter(e.target.value)}
                >
                  <option value="all">All Students</option>
                  <option value="present">Present Only</option>
                  <option value="absent">Absent Only</option>
                  <option value="late">Late Only</option>
                  <option value="excused">Excused Only</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-accent-foreground">
                <thead className="bg-card">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider"
                    >
                      Student
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider"
                    >
                      Email
                    </th>
                    {isEditMode && (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-accent-foreground">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <img
                                className="h-8 w-8 rounded-full"
                                src={student.avatar}
                                alt={student.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-foreground">
                                {student.name}
                              </div>
                              <div className="text-sm text-foreground">
                                ID: {student.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(attendanceData.records[student.id])}
                            <span className="ml-2 text-sm text-foreground capitalize">
                              {attendanceData.records[student.id]}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                          {student.email}
                        </td>
                        {isEditMode && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                className={`px-2 py-1 rounded-md ${
                                  attendanceData.records[student.id] ===
                                  "present"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                                onClick={() =>
                                  updateAttendance(student.id, "present")
                                }
                              >
                                Present
                              </button>
                              <button
                                className={`px-2 py-1 rounded-md ${
                                  attendanceData.records[student.id] ===
                                  "absent"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                                onClick={() =>
                                  updateAttendance(student.id, "absent")
                                }
                              >
                                Absent
                              </button>
                              <button
                                className={`px-2 py-1 rounded-md ${
                                  attendanceData.records[student.id] === "late"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                                onClick={() =>
                                  updateAttendance(student.id, "late")
                                }
                              >
                                Late
                              </button>
                              <button
                                className={`px-2 py-1 rounded-md ${
                                  attendanceData.records[student.id] ===
                                  "excused"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                                onClick={() =>
                                  updateAttendance(student.id, "excused")
                                }
                              >
                                Excused
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={isEditMode ? 4 : 3}
                        className="px-6 py-4 text-center text-foreground"
                      >
                        No students found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-3 border-t flex items-center justify-between">
              <div className="text-sm text-foreground">
                Showing{" "}
                <span className="font-medium">{filteredStudents.length}</span>{" "}
                of <span className="font-medium">{students.length}</span>{" "}
                students
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded-md bg-primary text-primary-foreground disabled:opacity-50">
                  Previous
                </button>
                <button className="px-3 py-1 rounded-md bg-primary text-primary-foreground disabled:opacity-50">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-card rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">
              Notes for {formatDate(currentDate)}
            </h2>
            <textarea
              className="w-full p-3 border-input bg-input text-foreground rounded-md"
              rows={3}
              placeholder="Add any notes about today's attendance..."
            />
            <div className="mt-2 flex justify-end">
              <button className="px-4 py-2 bg-primary-foreground text-foreground rounded-md">
                Save Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendancePage;
