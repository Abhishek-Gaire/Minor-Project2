import {
  Book,
  Calendar,
  CheckCircle,
  FileText,
  MoreVertical,
} from "lucide-react";

const AssignementCard = ({
  assignment,
  getStatusIcon,
  setShowSubmissionModal,
  getStatusColor,
  user,
  handleViewAssignmentDetails,
}) => {
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

export default AssignementCard;
import React from "react";
import { Assignment } from "@/services/assignmentService";

interface AssignmentCardProps {
  user: any; // Replace with proper user type from your auth context
  assignment: Assignment;
  getStatusIcon: (status: Assignment["status"]) => JSX.Element | null;
  getStatusColor: (status: Assignment["status"]) => string;
  setShowSubmissionModal: React.Dispatch<React.SetStateAction<Assignment | null>>;
  handleViewAssignmentDetails: (assignment: Assignment) => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  user,
  assignment,
  getStatusIcon,
  getStatusColor,
  setShowSubmissionModal,
  handleViewAssignmentDetails,
}) => {
  // Calculate submission stats
  const submissionCount = assignment.submissions?.length || 0;
  const totalStudents = assignment.totalStudents || 0;
  const submissionPercentage = totalStudents > 0 
    ? Math.round((submissionCount / totalStudents) * 100) 
    : 0;

  // Format due date
  const formattedDueDate = new Date(assignment.dueDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Check if current user (student) has submitted
  const hasSubmitted = user.role === "student" && assignment.submissions?.some(
    sub => sub.studentId === user.id
  );

  return (
    <div className="bg-[hsl(var(--card))] p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{assignment.title}</h3>
        <div
          className={`flex items-center px-3 py-1 rounded-full text-xs ${getStatusColor(
            assignment.status
          )}`}
        >
          {getStatusIcon(assignment.status)}
          {assignment.status}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
        <div>Subject: {assignment.subject}</div>
        <div>Grade: {assignment.grade}</div>
        <div>Due: {formattedDueDate}</div>
        <div>Points: {assignment.pointsPossible}</div>
      </div>

      {assignment.description && (
        <p className="mb-4 text-sm">{assignment.description}</p>
      )}

      {user.role === "teacher" && (
        <div className="mb-4">
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full"
              style={{ width: `${submissionPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>
              {submissionCount} / {totalStudents} submissions
            </span>
            <span>{submissionPercentage}%</span>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          className="bg-blue-100 text-blue-800 px-4 py-1 rounded-lg mr-2"
          onClick={() => handleViewAssignmentDetails(assignment)}
        >
          View Details
        </button>

        {user.role === "student" && assignment.status === "Open" && !hasSubmitted && (
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded-lg"
            onClick={() => setShowSubmissionModal(assignment)}
          >
            Submit
          </button>
        )}

        {user.role === "student" && hasSubmitted && (
          <span className="text-green-600 px-4 py-1">✓ Submitted</span>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;