import React, { useState, useEffect } from "react";
import { Plus, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/useAuth";
import CreateAssignment from "@/components/Dashboard/Assignments/CreateAssignment";
import AssignementCard from "@/components/Dashboard/Assignments/AssignemntCard";
import Filters from "@/components/Dashboard/Assignments/Filters";
import { assignmentService, Assignment, CreateAssignmentForm } from "@/services/assignmentService";

const Assignments: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] = useState(false);
  const [newAssignmentForm, setNewAssignmentForm] = useState<CreateAssignmentForm>({
    title: "",
    subject: "",
    grade: 7,
    description: "",
    dueDate: "",
    pointsPossible: 100,
  });
  const [showSubmissionModal, setShowSubmissionModal] = useState<Assignment | null>(null);
  const [selectedAssignmentDetails, setSelectedAssignmentDetails] = useState<Assignment | null>(null);
  const [submissionFile, setSubmissionFile] = useState<File | null>(null);
  const [submissionComment, setSubmissionComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch assignments when component mounts or when search/filters change
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setIsLoading(true);
        const filters: { status?: string; searchTerm?: string } = {};
        
        if (selectedStatus) {
          filters.status = selectedStatus;
        }
        
        if (searchTerm) {
          filters.searchTerm = searchTerm;
        }
        
        const data = await assignmentService.getAssignments(filters);
        setAssignments(data);
        setError(null);
      } catch (err) {
        setError("Failed to load assignments. Please try again later.");
        console.error("Error fetching assignments:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAssignments();
  }, [searchTerm, selectedStatus]);

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
        return <Calendar size={16} className="mr-1" />;
      case "Open":
        return <Clock size={16} className="mr-1" />;
      case "Closed":
        return <CheckCircle size={16} className="mr-1" />;
      case "Grading":
        return <AlertCircle size={16} className="mr-1" />;
      default:
        return null;
    }
  };

  // Create Assignment Function
  const handleCreateAssignment = async () => {
    // Validate form
    if (!newAssignmentForm.title || !newAssignmentForm.subject || !newAssignmentForm.dueDate) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      const teacherId = user.id as unknown as number;
      const newAssignment = await assignmentService.createAssignment(newAssignmentForm, teacherId);
      
      // Add to local state to avoid refetching
      setAssignments(prev => [...prev, newAssignment]);
      
      // Reset form and close modal
      setNewAssignmentForm({
        title: "",
        subject: "",
        grade: 7,
        description: "",
        dueDate: "",
        pointsPossible: 100,
      });
      setShowCreateAssignmentModal(false);
    } catch (err) {
      alert("Failed to create assignment. Please try again.");
      console.error("Error creating assignment:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Assignment Function
  const handleSubmitAssignment = async () => {
    if (!showSubmissionModal || !submissionFile) {
      alert("Please select a file to submit");
      return;
    }

    try {
      setIsSubmitting(true);
      const submissionData = {
        assignmentId: showSubmissionModal.id,
        studentId: user.id as unknown as number,
        comments: submissionComment || undefined
      };

      await assignmentService.submitAssignment(submissionData, submissionFile);
      
      // Refresh assignments after submission
      const updatedAssignments = await assignmentService.getAssignments();
      setAssignments(updatedAssignments);
      
      // Reset state and close modal
      setSubmissionFile(null);
      setSubmissionComment("");
      setShowSubmissionModal(null);
      alert("Assignment submitted successfully!");
    } catch (err) {
      alert("Failed to submit assignment. Please try again.");
      console.error("Error submitting assignment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // View Assignment Details Function
  const handleViewAssignmentDetails = async (assignment: Assignment) => {
    try {
      // Get updated assignment details including all submissions
      const details = await assignmentService.getAssignmentById(assignment.id);
      setSelectedAssignmentDetails(details);
    } catch (err) {
      console.error("Error fetching assignment details:", err);
      // Fallback to using the passed assignment if API call fails
      setSelectedAssignmentDetails(assignment);
    }
  };

  // Render Assignment Details Modal
  const renderAssignmentDetailsModal = () => {
    if (!selectedAssignmentDetails) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-[hsl(var(--card))] p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {selectedAssignmentDetails.title}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                selectedAssignmentDetails.status
              )}`}
            >
              {selectedAssignmentDetails.status}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <strong>Subject:</strong> {selectedAssignmentDetails.subject}
            </div>
            <div>
              <strong>Grade Level:</strong> {selectedAssignmentDetails.grade}
            </div>
            <div>
              <strong>Description:</strong>{" "}
              {selectedAssignmentDetails.description}
            </div>
            <div>
              <strong>Due Date:</strong>{" "}
              {new Date(selectedAssignmentDetails.dueDate).toLocaleString()}
            </div>
            <div>
              <strong>Points:</strong>{" "}
              {selectedAssignmentDetails.pointsPossible}
            </div>

            {user.role === "teacher" && (
              <div>
                <h3 className="text-lg font-semibold mt-4">Submissions</h3>
                {selectedAssignmentDetails.submissions &&
                selectedAssignmentDetails.submissions.length > 0 ? (
                  <table className="w-full border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">Student</th>
                        <th className="p-2 border">Submission Date</th>
                        <th className="p-2 border">Grade</th>
                        <th className="p-2 border">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedAssignmentDetails.submissions.map(
                        (submission) => (
                          <tr key={submission.studentId}>
                            <td className="p-2 border">
                              {submission.studentName}
                            </td>
                            <td className="p-2 border">
                              {submission.submissionDate
                                ? new Date(
                                    submission.submissionDate
                                  ).toLocaleString()
                                : "Not submitted"}
                            </td>
                            <td className="p-2 border">
                              {submission.grade ?? "Not graded"}
                            </td>
                            <td className="p-2 border">
                              {submission.submissionUrl && (
                                <a 
                                  href={submission.submissionUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  View Submission
                                </a>
                              )}
                              {!submission.grade && submission.submissionDate && (
                                <button 
                                  className="ml-2 text-green-600 hover:underline"
                                  onClick={() => handleGradeSubmission(submission.studentId)}
                                >
                                  Grade
                                </button>
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                ) : (
                  <p>No submissions yet</p>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => setSelectedAssignmentDetails(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Grade Submission Function (placeholder)
  const handleGradeSubmission = (studentId: number) => {
    // This would open a grading modal or redirect to a grading page
    alert(`Grading student ${studentId}`);
    // Implementation would depend on your UI design for grading
  };

  // Assignment Submission Modal
  const renderSubmissionModal = () => {
    if (!showSubmissionModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-card p-6 rounded-lg w-96">
          <h2 className="text-xl font-semibold mb-4">
            Submit Assignment: {showSubmissionModal.title}
          </h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Upload File</label>
            <input
              type="file"
              className="w-full"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setSubmissionFile(e.target.files[0]);
                }
              }}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Comments (Optional)</label>
            <textarea
              className="w-full border rounded-md p-2"
              value={submissionComment}
              onChange={(e) => setSubmissionComment(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-muted rounded-lg"
              onClick={() => {
                setShowSubmissionModal(null);
                setSubmissionFile(null);
                setSubmissionComment("");
              }}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={handleSubmitAssignment}
              disabled={!submissionFile || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Assignments</h1>
          <p className="">
            {user.role === "teacher"
              ? "Manage Assignments"
              : "Student Assignments"}
          </p>
        </div>
        {user.role === "teacher" && (
          <button
            className="bg-blue-600 text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-lg flex items-center"
            onClick={() => setShowCreateAssignmentModal(true)}
          >
            <Plus size={18} className="mr-2" />
            Create Assignment
          </button>
        )}
      </header>

      <CreateAssignment
        showCreateAssignmentModal={showCreateAssignmentModal}
        newAssignmentForm={newAssignmentForm}
        setNewAssignmentForm={setNewAssignmentForm}
        setShowCreateAssignmentModal={setShowCreateAssignmentModal}
        handleCreateAssignment={handleCreateAssignment}
      />
      {renderAssignmentDetailsModal()}
      {renderSubmissionModal()}

      <div className="bg-card rounded-lg shadow mb-6">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <p>Loading assignments...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && assignments.length === 0 && (
        <div className="text-center py-8">
          <p>No assignments found.</p>
        </div>
      )}

      <div className="space-y-6">
        {assignments.map((assignment) => (
          <AssignementCard
            key={assignment.id}
            user={user}
            assignment={assignment}
            getStatusIcon={getStatusIcon}
            setShowSubmissionModal={setShowSubmissionModal}
            getStatusColor={getStatusColor}
            handleViewAssignmentDetails={handleViewAssignmentDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default Assignments;