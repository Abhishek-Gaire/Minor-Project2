import { ArrowUpDown, Eye } from "lucide-react";
import { TeacherGrade, StudentGrade } from "@/utils/types"; 

type GradesTableProps = {
  isTeacher: boolean;
  filteredGrades: (TeacherGrade | StudentGrade)[];
  setFeedbackModal: (grade: any) => void;
  getGradeColor: (grade: number) => string;
  getStatusColor: (grade: number) => string;
};

const GradesTable: React.FC<GradesTableProps> = ({
  isTeacher,
  filteredGrades,
  setFeedbackModal,
  getGradeColor,
  getStatusColor,
}) => {
  function isTeacherGrade(
    entry: TeacherGrade | StudentGrade
  ): entry is TeacherGrade {
    return (entry as TeacherGrade).submission !== undefined;
  }

  function isStudentGrade(
    entry: TeacherGrade | StudentGrade
  ): entry is StudentGrade {
    return (entry as StudentGrade).assignment !== undefined;
  }

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
                Marks
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
          {filteredGrades.length === 0 ? (
            <tr>
              <td colSpan={isTeacher ? 7 : 6} className="px-6 py-8 text-center text-muted-foreground">
                No grades found. Check back later.
              </td>
            </tr>
          ) : (
            filteredGrades.map((entry) => {
            const isTeacherEntry = isTeacherGrade(entry);
            const isStudentEntry = isStudentGrade(entry);

            // Extract values based on entry type
            let key: number;
            let grade: number;
            let submissionDate: string;
            let subject: string;
            let assignmentTitle: string;
            let teacherName: string | null = null;
            let pointsPossible: number | null = null;
            let feedback: string | null = null;
            let submissionUrl: string | null = null;
            let studentName: string;
            let studentId: string;

            if (isTeacherEntry) {
              key = entry.submission.id;
              grade = entry.submission.grade;
              submissionDate = entry.submission.submissionDate;
              subject = entry.subject;
              assignmentTitle = entry.assignmentTitle;
              feedback = entry.submission.feedback;
              submissionUrl = entry.submission.submissionUrl;
              studentName = entry.studentName;
              studentId = entry.studentId;
              pointsPossible = entry.pointsPossible;
            } else if (isStudentEntry) {
              key = entry.id;
              grade = entry.grade;
              submissionDate = entry.submissionDate;
              subject = entry.assignment.subject;
              assignmentTitle = entry.assignment.title;
              teacherName = entry.assignment.teacherName;
              pointsPossible = entry.assignment.pointsPossible;
              feedback = entry.feedback;
              submissionUrl = "";
              studentName = entry.studentName;
              studentId = entry.studentId;
            } else {
              // Handle unexpected case to satisfy TypeScript
              return null;
            }

            return (
              <tr key={key} className="hover:bg-accent">
                {isTeacherEntry && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-foreground bg-opacity-10 flex items-center justify-center">
                        <span className={`text-blue-800 font-medium`}>
                          {studentName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-foreground">
                          {studentName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {studentId}
                        </div>
                      </div>
                    </div>
                  </td>
                )}

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{subject}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">
                    {assignmentTitle}
                  </div>
                  {isStudentEntry && (
                    <div className="text-sm text-muted-foreground">
                      Graded by: {teacherName}
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className={`text-lg font-bold ${getGradeColor(grade)}`}>
                    {`${grade}${pointsPossible ? `/${pointsPossible}` : ""}`}
                  </div>
                  {isStudentEntry && pointsPossible && (
                    <div className="text-sm text-muted-foreground">
                      {((grade / pointsPossible) * 100).toFixed(1)}%
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">
                    {new Date(submissionDate).toLocaleDateString()}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      grade
                    )}`}
                  >
                    {(() => {
                      if (grade >= 90) return "Excellent";
                      if (grade >= 80) return "Good";
                      if (grade >= 70) return "Average";
                      if (grade >= 60) return "Needs Improvement";
                      return "Failed";
                    })()}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    className="text-blue-600 hover:text-blue-800 mr-3"
                    onClick={() =>
                      setFeedbackModal({
                        title: assignmentTitle,
                        subject: subject,
                        grade,
                        pointsPossible,
                        feedback
                      })
                    }
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            );
          }))}
        </tbody>
      </table>
    </div>
  );
};

export default GradesTable;