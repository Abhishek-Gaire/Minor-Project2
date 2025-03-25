import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Book,
  MoreVertical,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/contexts/useAuth";

interface Assignment {
  id: number;
  title: string;
  subject: string;
  grade: number;
  description: string;
  dueDate: string;
  pointsPossible: number;
  status: "Upcoming" | "Open" | "Closed" | "Grading";
  submissions?: {
    studentId: number;
    studentName: string;
    submissionDate?: string;
    grade?: number;
    submissionFile?: string;
  }[];
  teacherId: number;
  totalStudents?: number;
}
// Add to existing interfaces
interface CreateAssignmentForm {
  title: string;
  subject: string;
  grade: number;
  description: string;
  dueDate: string;
  pointsPossible: number;
}

const assignmentsData: Assignment[] = [
  {
    id: 1,
    title: "Algebraic Equations Worksheet",
    subject: "Mathematics",
    grade: 7,
    description:
      "Solve a set of algebraic equations demonstrating understanding of linear equations.",
    dueDate: "2024-03-20T23:59:59",
    pointsPossible: 100,
    status: "Open",
    teacherId: 101,
    totalStudents: 32,
    submissions: [
      {
        studentId: 1001,
        studentName: "Emma Johnson",
        submissionDate: "2024-03-18T22:45:00",
        grade: 85,
      },
      {
        studentId: 1002,
        studentName: "Michael Chen",
        submissionDate: "2024-03-19T20:30:00",
      },
    ],
  },
  {
    id: 2,
    title: "Ecosystem Project",
    subject: "Science",
    grade: 6,
    description:
      "Create a detailed model or presentation about a specific ecosystem and its interactions.",
    dueDate: "2024-04-05T23:59:59",
    pointsPossible: 100,
    status: "Upcoming",
    teacherId: 102,
    totalStudents: 28,
    submissions: [],
  },
  {
    id: 3,
    title: "Historical Biography Research",
    subject: "History",
    grade: 8,
    description:
      "Write a comprehensive research paper on a significant historical figure from the 20th century.",
    dueDate: "2024-03-25T23:59:59",
    pointsPossible: 100,
    status: "Open",
    teacherId: 103,
    totalStudents: 30,
    submissions: [
      {
        studentId: 1003,
        studentName: "Sophia Rodriguez",
        submissionDate: "2024-03-20T21:15:00",
      },
    ],
  },
];

const Assignments: React.FC = () => {
  const { user } = useAuth();
  // user.role = "teacher";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>(assignmentsData);
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] =
    useState(false);
  const [newAssignmentForm, setNewAssignmentForm] =
    useState<CreateAssignmentForm>({
      title: "",
      subject: "",
      grade: 7,
      description: "",
      dueDate: "",
      pointsPossible: 100,
    });
  const [showSubmissionModal, setShowSubmissionModal] =
    useState<Assignment | null>(null);

  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      case "Open":
        return "bg-green-100 text-green-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      case "Grading":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: Assignment["status"]) => {
    switch (status) {
      case "Upcoming":
        return <Calendar size={16} className="mr-1" />;
      case "Open":
        return <Clock size={16} className="mr-1" />;
      case "Closed":
        return <CheckCircle size={16} className="mr-1" />;
      case "Grading":
        return <AlertCircle size={16} className="mr-1" />;
      default:
        return null;
    }
  };

  const formatTimeRemaining = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due.getTime() - now.getTime();

    if (diff <= 0) return "Past due";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} remaining`;
    }
    return `${hours} hour${hours > 1 ? "s" : ""} remaining`;
  };

  // Placeholder for hardcoded filtering logic
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      !selectedStatus || assignment.status === selectedStatus;

    // Hardcoded filtering for grades 5-10
    const isValidGrade = assignment.grade >= 5 && assignment.grade <= 10;

    return matchesSearch && matchesStatus && isValidGrade;
  });

  const handleSubmitAssignment = (assignment: Assignment, file: File) => {
    // Simulated assignment submission
    const updatedAssignments = assignments.map((a) =>
      a.id === assignment.id
        ? {
            ...a,
            submissions: [
              ...(a.submissions || []),
              {
                studentId: 1, // Placeholder student ID
                studentName: "Student", // Placeholder student name
                submissionDate: new Date().toISOString(),
                submissionFile: file.name,
              },
            ],
          }
        : a
    );
    setAssignments(updatedAssignments);
    setShowSubmissionModal(null);
  };

  // New state for view details modal
  const [selectedAssignmentDetails, setSelectedAssignmentDetails] =
    useState<Assignment | null>(null);

  // Create Assignment Function
  const handleCreateAssignment = () => {
    // Validate form
    if (
      !newAssignmentForm.title ||
      !newAssignmentForm.subject ||
      !newAssignmentForm.dueDate
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Create new assignment
    const newAssignment: Assignment = {
      ...newAssignmentForm,
      id: assignments.length + 1,
      status: "Upcoming",
      teacherId: user.id as unknown as number,
      submissions: [],
      totalStudents: 0,
    };

    // Add to assignments
    setAssignments([...assignments, newAssignment]);

    // Reset form and close modal
    setNewAssignmentForm({
      title: "",
      subject: "",
      grade: 7,
      description: "",
      dueDate: "",
      pointsPossible: 100,
    });
    setShowCreateAssignmentModal(false);
  };

  // View Assignment Details Function
  const handleViewAssignmentDetails = (assignment: Assignment) => {
    setSelectedAssignmentDetails(assignment);
  };

  // Render Create Assignment Modal
  const renderCreateAssignmentModal = () => {
    if (!showCreateAssignmentModal) return null;

    return (
      <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-[hsl(var(--card))] p-6 rounded-lg w-[500px]">
          <h2 className="text-xl font-semibold mb-4">Create New Assignment</h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={newAssignmentForm.title}
                onChange={(e) =>
                  setNewAssignmentForm({
                    ...newAssignmentForm,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2">Subject</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={newAssignmentForm.subject}
                onChange={(e) =>
                  setNewAssignmentForm({
                    ...newAssignmentForm,
                    subject: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2">Grade Level</label>
              <select
                className="w-full border rounded-lg p-2"
                value={newAssignmentForm.grade}
                onChange={(e) =>
                  setNewAssignmentForm({
                    ...newAssignmentForm,
                    grade: parseInt(e.target.value),
                  })
                }
              >
                {[5, 6, 7, 8, 9, 10].map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2">Description</label>
              <textarea
                className="w-full border rounded-lg p-2"
                rows={4}
                value={newAssignmentForm.description}
                onChange={(e) =>
                  setNewAssignmentForm({
                    ...newAssignmentForm,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2">Due Date</label>
              <input
                type="datetime-local"
                className="w-full border rounded-lg p-2"
                value={newAssignmentForm.dueDate}
                onChange={(e) =>
                  setNewAssignmentForm({
                    ...newAssignmentForm,
                    dueDate: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2">Points Possible</label>
              <input
                type="number"
                className="w-full border rounded-lg p-2"
                value={newAssignmentForm.pointsPossible}
                onChange={(e) =>
                  setNewAssignmentForm({
                    ...newAssignmentForm,
                    pointsPossible: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg"
              onClick={() => setShowCreateAssignmentModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={handleCreateAssignment}
            >
              Create Assignment
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render Assignment Details Modal
  const renderAssignmentDetailsModal = () => {
    if (!selectedAssignmentDetails) return null;

    return (
      <div className="fixed inset-0 z-50  bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-[hsl(var(--card))] p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {selectedAssignmentDetails.title}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                selectedAssignmentDetails.status
              )}`}
            >
              {selectedAssignmentDetails.status}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <strong>Subject:</strong> {selectedAssignmentDetails.subject}
            </div>
            <div>
              <strong>Grade Level:</strong> {selectedAssignmentDetails.grade}
            </div>
            <div>
              <strong>Description:</strong>{" "}
              {selectedAssignmentDetails.description}
            </div>
            <div>
              <strong>Due Date:</strong>{" "}
              {new Date(selectedAssignmentDetails.dueDate).toLocaleString()}
            </div>
            <div>
              <strong>Points:</strong>{" "}
              {selectedAssignmentDetails.pointsPossible}
            </div>

            {user.role === "teacher" && (
              <div>
                <h3 className="text-lg font-semibold mt-4">Submissions</h3>
                {selectedAssignmentDetails.submissions &&
                selectedAssignmentDetails.submissions.length > 0 ? (
                  <table className="w-full border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">Student</th>
                        <th className="p-2 border">Submission Date</th>
                        <th className="p-2 border">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedAssignmentDetails.submissions.map(
                        (submission) => (
                          <tr key={submission.studentId}>
                            <td className="p-2 border">
                              {submission.studentName}
                            </td>
                            <td className="p-2 border">
                              {submission.submissionDate
                                ? new Date(
                                    submission.submissionDate
                                  ).toLocaleString()
                                : "Not submitted"}
                            </td>
                            <td className="p-2 border">
                              {submission.grade ?? "Not graded"}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                ) : (
                  <p>No submissions yet</p>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => setSelectedAssignmentDetails(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderAssignmentCard = (assignment: Assignment) => {
    return (
      <div
        key={assignment.id}
        className="bg-[hsl(var(--card))] rounded-lg shadow overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between">
            <div>
              <div className="flex items-center">
                <h2 className="text-xl font-semibold">{assignment.title}</h2>
                <span
                  className={`ml-3 px-2 py-1 text-xs rounded-full flex items-center ${getStatusColor(
                    assignment.status
                  )}`}
                >
                  {getStatusIcon(assignment.status)}
                  {assignment.status}
                </span>
              </div>
              <div className="flex items-center mt-1 text-[hsl(var(--muted-foreground))]">
                <Book size={16} className="mr-1" />
                <span>
                  {assignment.subject} - Grade {assignment.grade}
                </span>
              </div>
            </div>
            <button className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--muted-foreground))]">
              <MoreVertical size={20} />
            </button>
          </div>

          <p className="mt-4 text-[hsl(var(--muted-foreground))]">
            {assignment.description}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Calendar size={20} className="text-blue-600 mr-2" />
              <div>
                <p className="text-sm font-medium">Due Date</p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {new Date(assignment.dueDate).toLocaleDateString()} at{" "}
                  {new Date(assignment.dueDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                {assignment.status === "Open" && (
                  <p className="text-sm text-orange-500 font-medium">
                    {formatTimeRemaining(assignment.dueDate)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <FileText size={20} className="text-blue-600 mr-2" />
              <div>
                <p className="text-sm font-medium">Points</p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {assignment.pointsPossible} possible points
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <CheckCircle size={20} className="text-blue-600 mr-2" />
              <div>
                <p className="text-sm font-medium">Submissions</p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {assignment.submissions?.length || 0} /{" "}
                  {assignment.totalStudents || 0} students
                  {(assignment.submissions?.length || 0) > 0 && (
                    <span className="ml-1">
                      (
                      {Math.round(
                        ((assignment.submissions?.length || 0) /
                          (assignment.totalStudents || 1)) *
                          100
                      )}
                      %)
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            {user.role === "teacher" && assignment.status === "Grading" && (
              <button className="px-4 py-2 bg-yellow-600 text-[hsl(var(--primary-foreground))] rounded-lg hover:bg-yellow-700">
                Grade Submissions
              </button>
            )}
            {user.role === "student" && (
              <button
                className="px-4 py-2 bg-blue-600 text-[hsl(var(--primary-foreground))] rounded-lg hover:bg-blue-700"
                onClick={() => setShowSubmissionModal(assignment)}
              >
                Submit Assignment
              </button>
            )}
            <button
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              onClick={() => handleViewAssignmentDetails(assignment)}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Assignments</h1>
          <p className="">
            {user.role === "teacher"
              ? "Manage Assignments"
              : "Student Assignments"}
          </p>
        </div>
        {user.role === "teacher" && (
          <button
            className="bg-blue-600 text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-lg flex items-center"
            onClick={() => setShowCreateAssignmentModal(true)}
          >
            <Plus size={18} className="mr-2" />
            Create Assignment
          </button>
        )}
      </header>

      {/* Rest of the existing component */}
      {renderCreateAssignmentModal()}
      {renderAssignmentDetailsModal()}

      <div className="bg-[hsl(var(--card))] rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
            />
            <input
              type="text"
              placeholder="Search assignments..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none pl-4 pr-10 py-2 border rounded-lg bg-[hsl(var(--card))]"
              value={selectedStatus || ""}
              onChange={(e) => setSelectedStatus(e.target.value || null)}
            >
              <option value="">All Statuses</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Open">Open</option>
              <option value="Grading">Grading</option>
              <option value="Closed">Closed</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--muted-foreground))] pointer-events-none"
            />
          </div>
          <button className="px-4 py-2 border rounded-lg flex items-center">
            <Filter size={18} className="mr-2" />
            More Filters
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {filteredAssignments.map(renderAssignmentCard)}
      </div>

      {/* Assignment Submission Modal */}
      {showSubmissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[hsl(var(--card))] p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              Submit Assignment: {showSubmissionModal.title}
            </h2>
            <input
              type="file"
              className="mb-4 w-full"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleSubmitAssignment(
                    showSubmissionModal,
                    e.target.files[0]
                  );
                }
              }}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-[hsl(var(--muted))] rounded-lg"
                onClick={() => setShowSubmissionModal(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;
