import { ArrowUpDown, Eye, MessageSquare } from "lucide-react";

const GradesTable = ({
  isTeacher,
  filteredGrades,
  setFeedbackModal,
  getGradeColor,
  getStatusColor,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted">
          <tr>
            {isTeacher && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                <div className="flex items-center">
                  Student
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
            )}
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
            >
              <div className="flex items-center">
                Subject
                <ArrowUpDown size={14} className="ml-1" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
            >
              Assignment
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider"
            >
              <div className="flex items-center justify-center">
                Grade
                <ArrowUpDown size={14} className="ml-1" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
            >
              Submission Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-card divide-y divide-border">
          {filteredGrades.length > 0 ? (
            filteredGrades.map((entry) => (
              <tr key={entry.id} className="hover:bg-accent">
                {isTeacher && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-foreground bg-opacity-10 flex items-center justify-center">
                        <span
                          className={`text-blue-800 font-medium`}
                        >
                          {entry.studentName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-foreground">
                          {entry.studentName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {entry.studentId} • Grade {entry.classGrade}
                        </div>
                      </div>
                    </div>
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{entry.course}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">
                    {entry.assignment}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Graded by: {entry.gradedBy}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div
                    className={`text-lg font-bold ${getGradeColor(
                      entry.grade
                    )}`}
                  >
                    {entry.grade}/{entry.maxGrade}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {((entry.grade / entry.maxGrade) * 100).toFixed(1)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">
                    {new Date(entry.submissionDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      entry.status
                    )}`}
                  >
                    {entry.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    className={`text-blue-600 hover:text-blue-800 mr-3`}
                    onClick={() => setFeedbackModal(entry)}
                  >
                    <Eye size={18} />
                  </button>
                  {isTeacher && (
                    <button
                      className={`text-blue-600 hover:text-blue-800`}
                    >
                      <MessageSquare size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={isTeacher ? 7 : 6}
                className="px-6 py-4 text-center text-muted-foreground"
              >
                No grades found matching the current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GradesTable;
