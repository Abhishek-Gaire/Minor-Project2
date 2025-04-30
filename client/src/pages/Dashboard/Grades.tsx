import React, { useState, useMemo, useEffect } from "react";

import { useAuth } from "@/contexts/useAuth";
import Header from "@/components/Dashboard/GradesPage/Header";
import TeacherStats from "@/components/Dashboard/GradesPage/TeacherStats";
import Filters from "@/components/Dashboard/GradesPage/Filters";
import GradesTable from "@/components/Dashboard/GradesPage/GradesTable";
import Pagination from "@/components/Dashboard/GradesPage/Pagination";
import FeedbackModal from "@/components/Dashboard/GradesPage/FeedbackModal";
import axios from "axios";
import { Assignment, StudentGrade, Submission } from "@/utils/types";

const Grades: React.FC = () => {
  const { user } = useAuth();
  const isTeacher = user.role === "teacher";
  const [grades, setGrades] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(
    null
  );
  const [feedbackModal, setFeedbackModal] = useState(null);

  const courses = useMemo(() => {
    return Array.from(
      new Set(
        grades
          .map((grade) =>
            isTeacher ? grade.subject : grade.assignment?.subject
          )
          .filter(Boolean) // 👈 filter out undefined/null just in case
      )
    );
  }, [grades, isTeacher]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/assignments/grades/${user.id}`
        );
        setGrades(response.data.data);
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    };
    fetchGrades();
  }, []);

  // Get a list of assignments based on selected course
  const assignments = useMemo(() => {
    let filtered = [];

    if (!grades || grades.length === 0) {
      return [];
    }

    // Type guards
    function isTeacherGrade(grade: any): boolean {
      return grade.submission !== undefined;
    }

    function isStudentGrade(grade: any): boolean {
      return grade.assignment !== undefined;
    }

    // Filter by selected course if any
    filtered = grades.filter((grade) => {
      if (!selectedCourse) return true;

      // Get the subject based on whether this is a teacher or student grade
      const subject = isTeacherGrade(grade)
        ? grade.subject
        : grade.assignment?.subject;

      return subject === selectedCourse;
    });

    // Map to get unique assignments
    const uniqueAssignments = Array.from(
      new Set(
        filtered
          .map((grade) => {
            if (isTeacherGrade(grade)) {
              // For teacher: return assignment title or ID depending on your data structure
              return grade.assignmentTitle || grade.assignmentId;
            } else if (isStudentGrade(grade)) {
              // For student: return assignment title or ID from the assignment object
              return grade.assignment?.title || grade.assignment?.id;
            }
            return null; // Fallback
          })
          .filter(Boolean) // Remove any null values
      )
    );

    return uniqueAssignments;
  }, [grades, selectedCourse, isTeacher]); // Added isTeacher dependency

  const filteredGrades = useMemo(() => {
    // console.log(grades);
    if (isTeacher) {
      return (grades as Assignment[])
        .flatMap((assignment) =>
          (assignment.submissions || []).map((submission) => ({
            assignmentTitle: assignment.title,
            subject: assignment.subject,
            grade: assignment.grade,
            studentName: submission.studentName,
            studentId: submission.studentId,
            submission,
            pointsPossible: assignment.pointsPossible,
          }))
        )
        .filter(
          (item) =>
            (item.studentName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
              item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.assignmentTitle
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) &&
            (!selectedCourse || item.subject === selectedCourse) &&
            (!selectedAssignment || item.assignmentTitle === selectedAssignment)
        );
    } else {
      return (grades as StudentGrade[]).filter(
        (grade) =>
          (grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            grade.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            grade.assignment.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
          (!selectedCourse || grade.assignment.subject === selectedCourse) &&
          (!selectedAssignment || grade.assignment.title === selectedAssignment)
      );
    }
  }, [grades, isTeacher, searchTerm, selectedCourse, selectedAssignment]);

  const stats = useMemo(() => {
    if (isTeacher) {
      const courseData = (filteredGrades as {
        assignmentTitle: string;
        subject: string;
        studentName: string;
        studentId: string;
        submission: Submission;
        pointsPossible: number;
      }[]).filter(
        (g) =>
          (!selectedCourse || g.subject === selectedCourse) &&
          (!selectedAssignment || g.assignmentTitle === selectedAssignment)
      );
  
      if (courseData.length === 0) return null;
  
      const totalStudents = courseData.length;
      const avgGrade =
        courseData.reduce((sum, g) => sum + (g.submission.grade || 0), 0) /
        totalStudents;
      const excellent = courseData.filter((g) => g.submission.grade >= 90).length;
      const failed = courseData.filter((g) => g.submission.grade < 50).length;
  
      return {
        totalStudents,
        avgGrade: avgGrade.toFixed(1),
        excellent,
        excellentPercent: ((excellent / totalStudents) * 100).toFixed(0),
        failed,
        failedPercent: ((failed / totalStudents) * 100).toFixed(0),
      };
    }
  }, [filteredGrades, isTeacher, selectedCourse, selectedAssignment]);
  

  const getStatusColor = (grade: number) => {
    let status: string;

    if (grade >= 90) {
      status = "Excellent";
      return "bg-green-100 text-green-800";
    } else if (grade >= 80) {
      status = "Good";
      return "bg-blue-100 text-blue-800";
    } else if (grade >= 70) {
      status = "Average";
      return "bg-yellow-100 text-yellow-800";
    } else if (grade >= 60) {
      status = "Needs Improvement";
      return "bg-orange-100 text-orange-800";
    } else {
      status = "Failed";
      return "bg-red-100 text-red-800";
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600";
    if (grade >= 80) return "text-blue-600";
    if (grade >= 70) return "text-yellow-600";
    if (grade >= 60) return "text-orange-600";
    return "text-red-600";
  };

  // Calculate the user's average grade (for student view)
  const averageGrade = useMemo(() => {
    if (isTeacher) return null;

    const userGrades = grades.map((g) => g.grade);
    if (userGrades.length === 0) return 0;

    return (
      userGrades.reduce((sum, grade) => sum + grade, 0) / userGrades.length
    ).toFixed(1) as unknown as number;
  }, [isTeacher, grades]);

  return (
    <div className={"min-h-screen bg-background"}>
      <div className="container mx-auto px-4 py-8">
        <Header isTeacher={isTeacher} averageGrade={averageGrade} />

        {isTeacher && stats && (
          <TeacherStats stats={stats} getGradeColor={getGradeColor} />
        )}

        <div className="bg-card rounded-lg shadow mb-6 border border-border">
          <Filters
            isTeacher={isTeacher}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            selectedCourse={selectedCourse}
            setSelectedAssignment={setSelectedAssignment}
            setSelectedCourse={setSelectedCourse}
            courses={courses}
            selectedAssignment={selectedAssignment}
            assignments={assignments}
          />
        </div>

        <div className="bg-card rounded-lg shadow overflow-hidden border border-border mb-6">
          <GradesTable
            isTeacher={isTeacher}
            filteredGrades={filteredGrades}
            setFeedbackModal={setFeedbackModal}
            getGradeColor={getGradeColor}
            getStatusColor={getStatusColor}
          />
          <Pagination filteredGrades={filteredGrades} allGrades={grades} />
        </div>

        {/* Feedback Modal */}
        {feedbackModal && (
          <FeedbackModal
            feedbackModal={feedbackModal}
            getGradeColor={getGradeColor}
            setFeedbackModal={setFeedbackModal}
          />
        )}
      </div>
    </div>
  );
};

export default Grades;
