// src/services/assignmentService.ts

import axios from 'axios';

// Define base URL for API calls
const API_BASE_URL = import.meta.env.VITE_BACKEND_URI!;

// Types
export interface Assignment {
  id: number;
  title: string;
  subject: string;
  grade: number;
  description: string;
  dueDate: string;
  pointsPossible: number;
  status: "Upcoming" | "Open" | "Closed" | "Grading";
  submissions?: SubmissionData[];
  teacherId: number;
  totalStudents?: number;
}

export interface SubmissionData {
  studentId: number;
  studentName: string;
  submissionDate?: string;
  grade?: number;
  submissionFile?: string;
  submissionUrl?: string;
}

export interface CreateAssignmentForm {
  title: string;
  subject: string;
  grade: number;
  description: string;
  dueDate: string;
  pointsPossible: number;
}

export interface SubmissionForm {
  assignmentId: number;
  studentId: number;
  comments?: string;
}

// API Functions
export const assignmentService = {
  // Get all assignments (with filtering capability)
  async getAssignments(filters?: { status?: string; searchTerm?: string }) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/assignments/get`, { 
        params: filters 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching assignments:', error);
      throw error;
    }
  },

  // Get a single assignment by ID
  async getAssignmentById(id: number) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/assignments/get/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching assignment with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new assignment (teachers only)
  async createAssignment(assignmentData: CreateAssignmentForm, teacherName: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/assignments/create`, {
        ...assignmentData,
        teacherName,
        status: 'Upcoming',
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating assignment:', error);
      throw error;
    }
  },

  // Update an existing assignment (teachers only)
  async updateAssignment(id: number, assignmentData: Partial<Assignment>) {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/v1/assignments/update/${id}`, assignmentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating assignment with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete an assignment (teachers only)
  async deleteAssignment(id: number) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/v1/assignments/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting assignment with ID ${id}:`, error);
      throw error;
    }
  },

  // Submit an assignment (students only)
  async submitAssignment(submissionData: SubmissionForm, file: File) {
    try {
      // Create FormData object to handle file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('assignmentId', submissionData.assignmentId.toString());
      formData.append('studentId', submissionData.studentId.toString());
      
      if (submissionData.comments) {
        formData.append('comments', submissionData.comments);
      }
      
      const response = await axios.post(`${API_BASE_URL}/api/v1/assignments/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting assignment:', error);
      throw error;
    }
  },

  // Get all submissions for an assignment (teachers only)
  async getSubmissions(assignmentId: number) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/assignments/submissions/${assignmentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching submissions for assignment ${assignmentId}:`, error);
      throw error;
    }
  },

  // Grade a submission (teachers only)
  async gradeSubmission(assignmentId: number, studentId: number, grade: number, feedback?: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/assignments/grade/${assignmentId}`, {
        studentId,
        grade,
        feedback,
        gradedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error grading submission:', error);
      throw error;
    }
  }
};

export default assignmentService;