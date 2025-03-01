// pages/Grades.tsx
import React, { useState } from 'react';
import { 
  Filter, 
  Download, 
  Search, 
  ArrowUpDown,
  ChevronDown
} from 'lucide-react';

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
  status: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement' | 'Failed';
}

const gradesData: GradeEntry[] = [
  {
    id: 1,
    studentName: 'Emily Johnson',
    studentId: 'STU-0001',
    course: 'Introduction to Programming',
    assignment: 'Variables and Data Types',
    grade: 95,
    maxGrade: 100,
    submissionDate: '2024-02-10',
    gradedBy: 'Dr. James Wilson',
    status: 'Excellent'
  },
  {
    id: 2,
    studentName: 'Michael Smith',
    studentId: 'STU-0002',
    course: 'Introduction to Programming',
    assignment: 'Variables and Data Types',
    grade: 88,
    maxGrade: 100,
    submissionDate: '2024-02-09',
    gradedBy: 'Dr. James Wilson',
    status: 'Good'
  },
  {
    id: 3,
    studentName: 'Sophia Chen',
    studentId: 'STU-0003',
    course: 'Advanced Data Structures',
    assignment: 'Linked Lists Implementation',
    grade: 92,
    maxGrade: 100,
    submissionDate: '2024-02-12',
    gradedBy: 'Prof. Sarah Johnson',
    status: 'Excellent'
  },
  {
    id: 4,
    studentName: 'Daniel Rodriguez',
    studentId: 'STU-0004',
    course: 'Database Management',
    assignment: 'SQL Queries',
    grade: 75,
    maxGrade: 100,
    submissionDate: '2024-02-08',
    gradedBy: 'Dr. Michael Chen',
    status: 'Average'
  },
  {
    id: 5,