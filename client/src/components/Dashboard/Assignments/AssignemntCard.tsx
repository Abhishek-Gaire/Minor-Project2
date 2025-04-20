
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