// src/components/Dashboard/Assignments/StudentSubmissionView.tsx
import React, { useState } from "react";
import { Upload, FileText, Check, Clock } from "lucide-react";
import { Assignment, assignmentService } from "@/services/assignmentService";
import { toast } from "react-toastify";

interface StudentSubmissionViewProps {
  assignment: Assignment;
  userId: number;
}

const StudentSubmissionView: React.FC<StudentSubmissionViewProps> = ({
  assignment,
  userId,
}) => {
  const [submissionFile, setSubmissionFile] = useState<File | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find user's submission if it exists
  const userSubmission = assignment.submissions?.find(
    (sub) => sub.studentId === userId
  );
  const hasSubmitted = !!userSubmission?.submissionDate;

  // Check if assignment is still open for submission
  const isOpen = assignment.status === "Open";
  const isPastDue = new Date(assignment.dueDate) < new Date();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!submissionFile) {
      toast.error("Please select a file to submit");
      return;
    }

    try {
      setIsSubmitting(true);

      const submissionData = {
        assignmentId: assignment.id,
        studentId: userId,
        comments: comment || undefined,
      };

      await assignmentService.submitAssignment(submissionData, submissionFile);

      toast.success("Assignment submitted successfully!");

      // Force page reload to show updated submission status
      window.location.reload();
    } catch (err) {
      toast.error("Failed to submit assignment. Please try again.");
      console.error("Error submitting assignment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSubmissionStatus = () => {
    if (hasSubmitted) {
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <Check size={20} className="text-green-500 mr-2" />
            <h3 className="text-lg font-medium text-green-700">
              Assignment Submitted
            </h3>
          </div>
          <p className="text-green-600 mb-2">
            Submitted on{" "}
            {new Date(userSubmission!.submissionDate!).toLocaleString()}
          </p>

          {userSubmission?.grade !== undefined && (
            <div className="mt-4 pt-4 border-t border-green-200">
              <h4 className="font-medium text-green-700 mb-1">Grade</h4>
              <p className="text-xl font-bold">
                {userSubmission.grade === null ||
                userSubmission.grade === undefined
                  ? "Not graded"
                  : `${userSubmission.grade}/100`}
              </p>
            </div>
          )}
        </div>
      );
    }

    if (!isOpen || isPastDue) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <Clock size={20} className="text-red-500 mr-2" />
            <h3 className="text-lg font-medium text-red-700">
              Submission Closed
            </h3>
          </div>
          <p className="text-red-600">
            {isPastDue
              ? "The due date for this assignment has passed."
              : "This assignment is no longer accepting submissions."}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Your Submission</h2>

      {renderSubmissionStatus()}

      {isOpen && !hasSubmitted && !isPastDue && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Upload File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center">
              <FileText size={40} className="text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-4">
                Upload your assignment file (PDF, DOC, DOCX, etc.)
              </p>
              <input
                type="file"
                onChange={(e) =>
                  e.target.files?.[0] && setSubmissionFile(e.target.files[0])
                }
                className="w-full"
              />
            </div>
            {submissionFile && (
              <p className="mt-2 text-sm text-green-600">
                Selected file: {submissionFile.name}
              </p>
            )}
          </div>

          {/* <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Comments (Optional)
            </label>
            <textarea
              className="w-full border rounded-md p-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Add any comments about your submission..."
            /> */}
          {/* </div> */}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!submissionFile || isSubmitting}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-blue-300"
            >
              <Upload size={16} className="mr-2" />
              {isSubmitting ? "Submitting..." : "Submit Assignment"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default StudentSubmissionView;
