import React, { useState } from "react";
import { Plus, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/useAuth";
import CreateAssignment from "@/components/Dashboard/Assignments/CreateAssignment";
import AssignementCard from "@/components/Dashboard/Assignments/AssignemntCard";
import Filters from "@/components/Dashboard/Assignments/Filters";

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
  user.role = "teacher";
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
      <CreateAssignment
        showCreateAssignmentModal={showCreateAssignmentModal}
        newAssignmentForm={newAssignmentForm}
        setNewAssignmentForm={setNewAssignmentForm}
        setShowCreateAssignmentModal={setShowCreateAssignmentModal}
        handleCreateAssignment={handleCreateAssignment}
      />
      {renderAssignmentDetailsModal()}

      <div className="bg-card rounded-lg shadow mb-6">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </div>

      <div className="space-y-6">
        {filteredAssignments.map((assignment) => (
          <AssignementCard
            user={user}
            assignment={assignment}
            getStatusIcon={getStatusIcon}
            setShowSubmissionModal={setShowSubmissionModal}
            getStatusColor={getStatusColor}
            handleViewAssignmentDetails={handleViewAssignmentDetails}
          />
        ))}
      </div>

      {/* Assignment Submission Modal */}
      {showSubmissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-card p-6 rounded-lg w-96">
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
                className="px-4 py-2 bg-muted rounded-lg"
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
