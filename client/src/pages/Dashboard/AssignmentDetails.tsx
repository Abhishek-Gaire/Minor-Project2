// src/pages/AssignmentDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Clock, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft, 
  Edit, 
  Trash, 
} from "lucide-react";
import { useAuth } from "@/contexts/useAuth";
import { assignmentService, Assignment, SubmissionData } from "@/services/assignmentService";
import SubmissionsList from "@/components/Dashboard/Assignments/SubmissionsList";
import StudentSubmissionView from "@/components/Dashboard/Assignments/StudentSubmissionView";
import GradingModal from "@/components/Dashboard/Assignments/GradingModal";
import EditAssignmentModal from "@/components/Dashboard/Assignments/EditAssignmentModal";
import ConfirmationModal from "@/components/Dashboard/Assignments/ConfirmationModal";
import { toast } from "react-toastify";

const AssignmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modals state
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showGradingModal, setShowGradingModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionData | null>(null);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const response = await assignmentService.getAssignmentById(parseInt(id));
        setAssignment(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load assignment details. Please try again later.");
        console.error("Error fetching assignment details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignmentDetails();
  }, [id]);

  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      case "Open":
        return "bg-green-100 text-green-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      case "Grading":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: Assignment["status"]) => {
    switch (status) {
      case "Upcoming":
        return <Calendar size={18} className="mr-2" />;
      case "Open":
        return <Clock size={18} className="mr-2" />;
      case "Closed":
        return <CheckCircle size={18} className="mr-2" />;
      case "Grading":
        return <AlertCircle size={18} className="mr-2" />;
      default:
        return null;
    }
  };

  const refreshSubmissions = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const submissionsResponse = await assignmentService.getSubmissions(parseInt(id));
      
      // Update assignment with new submissions data
      if (assignment) {
        setAssignment({
          ...assignment,
          submissions: submissionsResponse.data
        });
      }
      toast.success("Submissions refreshed successfully");
    } catch (err) {
      toast.error("Failed to refresh submissions");
      console.error("Error refreshing submissions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (updatedAssignment: Assignment) => {
    setAssignment(updatedAssignment);
    setShowEditModal(false);
    toast.success("Assignment updated successfully");
  };

  const handleDelete = async () => {
    if (!assignment) return;
    
    try {
      setIsLoading(true);
      await assignmentService.deleteAssignment(assignment.id);
      toast.success("Assignment deleted successfully");
      navigate("/dashboard/teacher/assignments");
    } catch (err) {
      toast.error("Failed to delete assignment");
      console.error("Error deleting assignment:", err);
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handleGradeSubmission = (studentSubmission: SubmissionData) => {
    setSelectedSubmission(studentSubmission);
    setShowGradingModal(true);
  };

  const handleGradeSubmit = async (grade: number, feedback: string) => {
    if (!assignment || !selectedSubmission) return;
    
    try {
      await assignmentService.gradeSubmission(
        assignment.id,
        selectedSubmission.studentId,
        grade,
        feedback
      );
      
      // Refresh assignment data to get updated grades
      const updatedAssignment = await assignmentService.getAssignmentById(assignment.id);
      setAssignment(updatedAssignment.data);
      
      setShowGradingModal(false);
      setSelectedSubmission(null);
      toast.success("Submission graded successfully");
    } catch (err) {
      toast.error("Failed to grade submission");
      console.error("Error grading submission:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg">Loading assignment details...</p>
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg text-red-500 mb-4">{error || "Assignment not found"}</p>
        <button 
          onClick={() => navigate( `/dashboard/${user.role}/assignments`)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Assignments
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back button */}
      <button 
        onClick={() => navigate(`/dashboard/${user.role}/assignments`)}
        className="flex items-center mb-6 text-blue-600 hover:underline"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Assignments
      </button>
      
      {/* Assignment header */}
      <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{assignment.title}</h1>
            <div className="flex items-center mb-2">
              <span className="text-gray-500 mr-4">Subject: {assignment.subject}</span>
              <span className="text-gray-500">Grade {assignment.grade}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className={`px-3 py-1 rounded-full text-sm flex items-center ${getStatusColor(assignment.status)}`}>
              {getStatusIcon(assignment.status)}
              {assignment.status}
            </span>
            
            {user.role === "teacher" && (
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="flex items-center px-3 py-1 bg-blue-600 text-white rounded"
                >
                  <Edit size={16} className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center px-3 py-1 bg-red-600 text-white rounded"
                >
                  <Trash size={16} className="mr-1" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="font-medium mb-2">Description</h3>
          <p className="whitespace-pre-line">{assignment.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-1">Due Date</h3>
            <p>{new Date(assignment.dueDate).toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-1">Points Possible</h3>
            <p>{assignment.pointsPossible}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-1">Submitted Students</h3>
            <p>{assignment.totalStudents || 0}</p>
          </div>
        </div>
      </div>
      
      {/* Teacher view - Submissions list */}
      {user.role === "teacher" && (
        <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Submissions</h2>
            <button 
              onClick={refreshSubmissions}
              className="text-blue-600 hover:underline"
            >
              Refresh Submissions
            </button>
          </div>
          
          <SubmissionsList 
            submissions={assignment.submissions || []}
            onGradeClick={handleGradeSubmission}
          />
        </div>
      )}
      
      {/* Student view - Submit assignment */}
      {user.role === "student" && (
        <StudentSubmissionView 
          assignment={assignment}
          userId={user.id as unknown as number}
        />
      )}
      
      {/* Modals */}
      {showEditModal && (
        <EditAssignmentModal
          assignment={assignment}
          onClose={() => setShowEditModal(false)}
          onSave={handleEdit}
        />
      )}
      
      {showDeleteModal && (
        <ConfirmationModal 
          title="Delete Assignment"
          message="Are you sure you want to delete this assignment? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          isDestructive={true}
        />
      )}
      
      {showGradingModal && selectedSubmission && (
        <GradingModal 
          studentName={selectedSubmission.studentName}
          onClose={() => {
            setShowGradingModal(false);
            setSelectedSubmission(null);
          }}
          onSubmit={handleGradeSubmit}
          assignmentPoints={assignment.pointsPossible}
        />
      )}
    </div>
  );
};

export default AssignmentDetails;