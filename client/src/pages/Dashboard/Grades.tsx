// pages/Grades.tsx
import React, { useState, useMemo } from "react";

import { useAuth } from "@/contexts/useAuth";
import Header from "@/components/Dashboard/GradesPage/Header";
import TeacherStats from "@/components/Dashboard/GradesPage/TeacherStats";
import Filters from "@/components/Dashboard/GradesPage/Filters";
import GradesTable from "@/components/Dashboard/GradesPage/GradesTable";
import Pagination from "@/components/Dashboard/GradesPage/Pagination";
import FeedbackModal from "@/components/Dashboard/GradesPage/FeedbackModal";

interface GradeEntry {
  id: number;
  studentName: string;
  studentId: string;
  course: string;
  classGrade: number; // Grade level (5-10)
  assignment: string;
  grade: number;
  maxGrade: number;
  submissionDate: string;
  gradedBy: string;
  feedback: string;
  status: "Excellent" | "Good" | "Average" | "Needs Improvement" | "Failed";
}

// Mock data for grades
const gradesData: GradeEntry[] = [
  {
    id: 1,
    studentName: "Emily Johnson",
    studentId: "STU-0001",
    course: "Math 7A",
    classGrade: 7,
    assignment: "Fractions and Decimals Quiz",
    grade: 95,
    maxGrade: 100,
    submissionDate: "2024-02-10",
    gradedBy: "Ms. Rebecca Adams",
    feedback: "Excellent work! Your solutions were clear and methodical.",
    status: "Excellent",
  },
  {
    id: 2,
    studentName: "Michael Smith",
    studentId: "STU-0002",
    course: "Math 7A",
    classGrade: 7,
    assignment: "Fractions and Decimals Quiz",
    grade: 88,
    maxGrade: 100,
    submissionDate: "2024-02-09",
    gradedBy: "Ms. Rebecca Adams",
    feedback: "Good effort! Watch your work on problem #4.",
    status: "Good",
  },
  {
    id: 3,
    studentName: "Sophia Chen",
    studentId: "STU-0003",
    course: "Science 7B",
    classGrade: 7,
    assignment: "Ecosystems Project",
    grade: 92,
    maxGrade: 100,
    submissionDate: "2024-02-12",
    gradedBy: "Mr. James Wilson",
    feedback: "Outstanding research and presentation!",
    status: "Excellent",
  },
  {
    id: 4,
    studentName: "Daniel Rodriguez",
    studentId: "STU-0004",
    course: "English 7C",
    classGrade: 7,
    assignment: "Book Report - Charlotte's Web",
    grade: 75,
    maxGrade: 100,
    submissionDate: "2024-02-08",
    gradedBy: "Mrs. Sarah Thompson",
    feedback: "Good ideas but work on paragraph structure.",
    status: "Average",
  },
  {
    id: 5,
    studentName: "Jessica Williams",
    studentId: "STU-0005",
    course: "Science 7B",
    classGrade: 7,
    assignment: "Ecosystems Project",
    grade: 65,
    maxGrade: 100,
    submissionDate: "2024-02-11",
    gradedBy: "Mr. James Wilson",
    feedback: "Missing key components of the assignment. Please see me.",
    status: "Needs Improvement",
  },
  {
    id: 6,
    studentName: "Ryan Thompson",
    studentId: "STU-0006",
    course: "Math 7A",
    classGrade: 7,
    assignment: "Fractions and Decimals Quiz",
    grade: 42,
    maxGrade: 100,
    submissionDate: "2024-02-08",
    gradedBy: "Ms. Rebecca Adams",
    feedback: "Please schedule tutoring session to review concepts.",
    status: "Failed",
  },
];

// Mock data for student-specific view
const studentGradesData: GradeEntry[] = [
  {
    id: 1,
    studentName: "Demo User",
    studentId: "USR-001",
    course: "Math 7A",
    classGrade: 7,
    assignment: "Fractions and Decimals Quiz",
    grade: 88,
    maxGrade: 100,
    submissionDate: "2024-02-09",
    gradedBy: "Ms. Rebecca Adams",
    feedback: "Good effort! Watch your work on problem #4.",
    status: "Good",
  },
  {
    id: 2,
    studentName: "Demo User",
    studentId: "USR-001",
    course: "Science 7B",
    classGrade: 7,
    assignment: "Ecosystems Project",
    grade: 92,
    maxGrade: 100,
    submissionDate: "2024-02-12",
    gradedBy: "Mr. James Wilson",
    feedback: "Outstanding research and presentation!",
    status: "Excellent",
  },
  {
    id: 3,
    studentName: "Demo User",
    studentId: "USR-001",
    course: "English 7C",
    classGrade: 7,
    assignment: "Book Report - Charlotte's Web",
    grade: 75,
    maxGrade: 100,
    submissionDate: "2024-02-08",
    gradedBy: "Mrs. Sarah Thompson",
    feedback: "Good ideas but work on paragraph structure.",
    status: "Average",
  },
];

const Grades: React.FC = () => {
  const { user } = useAuth();
  const isTeacher = user.role === "teacher";
  const [isDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(
    null
  );
  const [feedbackModal, setFeedbackModal] = useState<GradeEntry | null>(null);

  // Based on role, determine which grades to show
  const allGrades = isTeacher ? gradesData : studentGradesData;

  // Get a list of courses based on user role
  const courses = useMemo(
    () => Array.from(new Set(allGrades.map((grade) => grade.course))),
    [allGrades]
  );

  // Get a list of assignments based on selected course
  const assignments = useMemo(() => {
    const filtered = allGrades.filter(
      (grade) => !selectedCourse || grade.course === selectedCourse
    );
    return Array.from(new Set(filtered.map((grade) => grade.assignment)));
  }, [allGrades, selectedCourse]);

  // Apply filters based on search and selections
  const filteredGrades = allGrades.filter(
    (grade) =>
      (grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.assignment.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedCourse || grade.course === selectedCourse) &&
      (!selectedAssignment || grade.assignment === selectedAssignment)
  );

  // Calculate stats for teacher view
  const stats = useMemo(() => {
    if (!isTeacher) return null;

    const courseData = filteredGrades.filter(
      (g) =>
        (!selectedCourse || g.course === selectedCourse) &&
        (!selectedAssignment || g.assignment === selectedAssignment)
    );

    if (courseData.length === 0) return null;

    const totalStudents = courseData.length;
    const avgGrade =
      courseData.reduce((sum, g) => sum + g.grade, 0) / totalStudents;
    const excellent = courseData.filter((g) => g.status === "Excellent").length;
    const failed = courseData.filter((g) => g.status === "Failed").length;

    return {
      totalStudents,
      avgGrade: avgGrade.toFixed(1),
      excellent,
      excellentPercent: ((excellent / totalStudents) * 100).toFixed(0),
      failed,
      failedPercent: ((failed / totalStudents) * 100).toFixed(0),
    };
  }, [filteredGrades, isTeacher, selectedCourse, selectedAssignment]);

  const getStatusColor = (status: GradeEntry["status"]) => {
    if (isDarkMode) {
      switch (status) {
        case "Excellent":
          return "bg-green-900 text-green-100";
        case "Good":
          return "bg-blue-900 text-blue-100";
        case "Average":
          return "bg-yellow-900 text-yellow-100";
        case "Needs Improvement":
          return "bg-orange-900 text-orange-100";
        case "Failed":
          return "bg-red-900 text-red-100";
        default:
          return "bg-gray-800 text-gray-100";
      }
    } else {
      switch (status) {
        case "Excellent":
          return "bg-green-100 text-green-800";
        case "Good":
          return "bg-blue-100 text-blue-800";
        case "Average":
          return "bg-yellow-100 text-yellow-800";
        case "Needs Improvement":
          return "bg-orange-100 text-orange-800";
        case "Failed":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  const getGradeColor = (grade: number) => {
    if (isDarkMode) {
      if (grade >= 90) return "text-green-400";
      if (grade >= 80) return "text-blue-400";
      if (grade >= 70) return "text-yellow-400";
      if (grade >= 60) return "text-orange-400";
      return "text-red-400";
    } else {
      if (grade >= 90) return "text-green-600";
      if (grade >= 80) return "text-blue-600";
      if (grade >= 70) return "text-yellow-600";
      if (grade >= 60) return "text-orange-600";
      return "text-red-600";
    }
  };

  // Calculate the user's average grade (for student view)
  const averageGrade = useMemo(() => {
    if (isTeacher) return null;

    const userGrades = studentGradesData.map((g) => g.grade);
    if (userGrades.length === 0) return 0;

    return (
      userGrades.reduce((sum, grade) => sum + grade, 0) / userGrades.length
    ).toFixed(1) as unknown as number;
  }, [isTeacher]);

  return (
    <div className={"min-h-screen bg-background"}>
      <div className="container mx-auto px-4 py-8">
        <Header isTeacher={isTeacher} averageGrade={averageGrade} />

        {isTeacher && stats && (
          <TeacherStats
            stats={stats}
            isDarkMode={isDarkMode}
            getGradeColor={getGradeColor}
          />
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

        <div className="bg-[hsl(var(--card))] rounded-lg shadow overflow-hidden border border-[hsl(var(--border))]">
          <GradesTable
            isTeacher={isTeacher}
            filteredGrades={filteredGrades}
            isDarkMode={isDarkMode}
            setFeedbackModal={setFeedbackModal}
            getGradeColor={getGradeColor}
            getStatusColor={getStatusColor}
          />
          <Pagination filteredGrades={filteredGrades} allGrades={allGrades} />
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
