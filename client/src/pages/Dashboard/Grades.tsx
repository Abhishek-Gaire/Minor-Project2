// pages/Grades.tsx
import React, { useState } from "react";
import {
  Filter,
  Download,
  Search,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";

interface GradeEntry {
  id: number;
  studentName: string;
  studentId: string;
  course: string;
  assignment: string;
  grade: number;
  maxGrade: number;
  submissionDate: string;
  gradedBy: string;
  status: "Excellent" | "Good" | "Average" | "Needs Improvement" | "Failed";
}

const gradesData: GradeEntry[] = [
  {
    id: 1,
    studentName: "Emily Johnson",
    studentId: "STU-0001",
    course: "Introduction to Programming",
    assignment: "Variables and Data Types",
    grade: 95,
    maxGrade: 100,
    submissionDate: "2024-02-10",
    gradedBy: "Dr. James Wilson",
    status: "Excellent",
  },
  {
    id: 2,
    studentName: "Michael Smith",
    studentId: "STU-0002",
    course: "Introduction to Programming",
    assignment: "Variables and Data Types",
    grade: 88,
    maxGrade: 100,
    submissionDate: "2024-02-09",
    gradedBy: "Dr. James Wilson",
    status: "Good",
  },
  {
    id: 3,
    studentName: "Sophia Chen",
    studentId: "STU-0003",
    course: "Advanced Data Structures",
    assignment: "Linked Lists Implementation",
    grade: 92,
    maxGrade: 100,
    submissionDate: "2024-02-12",
    gradedBy: "Prof. Sarah Johnson",
    status: "Excellent",
  },
  {
    id: 4,
    studentName: "Daniel Rodriguez",
    studentId: "STU-0004",
    course: "Database Management",
    assignment: "SQL Queries",
    grade: 75,
    maxGrade: 100,
    submissionDate: "2024-02-08",
    gradedBy: "Dr. Michael Chen",
    status: "Average",
  },
  {
    id: 5,
    studentName: "Jessica Williams",
    studentId: "STU-0005",
    course: "Web Development Bootcamp",
    assignment: "HTML/CSS Basics",
    grade: 65,
    maxGrade: 100,
    submissionDate: "2024-02-11",
    gradedBy: "Alex Rodriguez",
    status: "Needs Improvement",
  },
  {
    id: 6,
    studentName: "Ryan Thompson",
    studentId: "STU-0006",
    course: "Database Management",
    assignment: "SQL Queries",
    grade: 42,
    maxGrade: 100,
    submissionDate: "2024-02-08",
    gradedBy: "Dr. Michael Chen",
    status: "Failed",
  },
];

const Grades: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [grades] = useState<GradeEntry[]>(gradesData);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const filteredGrades = grades.filter(
    (grade) =>
      (grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.assignment.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedCourse || grade.course === selectedCourse)
  );

  const courses = Array.from(new Set(grades.map((grade) => grade.course)));

  const getStatusColor = (status: GradeEntry["status"]) => {
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
        return "bg-gray-100 text-[hsl(var(--muted-foreground))]800";
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600";
    if (grade >= 80) return "text-blue-600";
    if (grade >= 70) return "text-yellow-600";
    if (grade >= 60) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Grades</h1>
          <p className="text-[hsl(var(--muted-foreground))]600">
            View and manage student grades
          </p>
        </div>
        <button className="bg-blue-600 text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-lg flex items-center">
          <Download size={18} className="mr-2" />
          Export Grades
        </button>
      </header>

      <div className="bg-[hsl(var(--card))] rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
            />
            <input
              type="text"
              placeholder="Search by student name or ID..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none pl-4 pr-10 py-2 border rounded-lg bg-[hsl(var(--card))]"
              value={selectedCourse || ""}
              onChange={(e) => setSelectedCourse(e.target.value || null)}
            >
              <option value="">All Courses</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--muted-foreground))]400 pointer-events-none"
            />
          </div>
          <button className="px-4 py-2 border rounded-lg flex items-center">
            <Filter size={18} className="mr-2" />
            More Filters
          </button>
        </div>
      </div>

      <div className="bg-[hsl(var(--card))] rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[hsl(var(--muted))]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))]500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    Student
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))]500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    Course
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))]500 uppercase tracking-wider"
                >
                  Assignment
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-[hsl(var(--muted-foreground))]500 uppercase tracking-wider"
                >
                  <div className="flex items-center justify-center">
                    Grade
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))]500 uppercase tracking-wider"
                >
                  Submission Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))]500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-[hsl(var(--card))] divide-y divide-gray-200">
              {filteredGrades.map((entry) => (
                <tr key={entry.id} className="hover:bg-[hsl(var(--muted))]">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-800 font-medium">
                          {entry.studentName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[hsl(var(--muted-foreground))]900">
                          {entry.studentName}
                        </div>
                        <div className="text-sm text-[hsl(var(--muted-foreground))]500">
                          {entry.studentId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[hsl(var(--muted-foreground))]900">
                      {entry.course}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[hsl(var(--muted-foreground))]900">
                      {entry.assignment}
                    </div>
                    <div className="text-sm text-[hsl(var(--muted-foreground))]500">
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
                    <div className="text-sm text-[hsl(var(--muted-foreground))]500">
                      {((entry.grade / entry.maxGrade) * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[hsl(var(--muted-foreground))]900">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-[hsl(var(--muted-foreground))]500">
            Showing <span className="font-medium">{filteredGrades.length}</span>{" "}
            of <span className="font-medium">{grades.length}</span> grades
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded text-sm">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-[hsl(var(--primary-foreground))] rounded text-sm">
              1
            </button>
            <button className="px-3 py-1 border rounded text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grades;
