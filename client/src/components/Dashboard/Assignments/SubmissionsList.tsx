// src/components/Dashboard/Assignments/SubmissionsList.tsx
import React from "react";
import { Download, CheckCircle, XCircle } from "lucide-react";
import { SubmissionData } from "@/services/assignmentService";

interface SubmissionsListProps {
  submissions: SubmissionData[];
  onGradeClick: (submission: SubmissionData) => void;
}

const SubmissionsList: React.FC<SubmissionsListProps> = ({ submissions, onGradeClick }) => {
  if (submissions.length === 0) {
    return <p className="text-center py-4">No submissions yet.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Submission Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grade
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {submissions.map((submission) => (
            <tr key={submission.studentId}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{submission.studentName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {submission.submissionDate 
                    ? new Date(submission.submissionDate).toLocaleString() 
                    : "Not submitted"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="flex items-center">
                  {submission.submissionDate ? (
                    <>
                      <CheckCircle size={16} className="text-green-500 mr-1" />
                      <span className="text-sm text-green-500">Submitted</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={16} className="text-red-500 mr-1" />
                      <span className="text-sm text-red-500">Missing</span>
                    </>
                  )}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {submission.grade === null || submission.grade === undefined
                    ? "Not graded"
                    : `${submission.grade}/100`}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex space-x-2">
                  {submission.submissionUrl && (
                    <a
                      href={submission.submissionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Download size={16} className="mr-1" />
                      Download
                    </a>
                  )}
                  
                  {submission.submissionDate && submission.grade === null && (
                    <button
                      onClick={() => onGradeClick(submission)}
                      className="text-green-600 hover:text-green-800"
                    >
                      Grade
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionsList;