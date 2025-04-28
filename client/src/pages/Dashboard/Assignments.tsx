import React, { useState, useEffect } from "react";
import { Plus, Calendar, Clock, CheckCircle, AlertCircle} from "lucide-react";
import { useAuth } from "@/contexts/useAuth";
import CreateAssignment from "@/components/Dashboard/Assignments/CreateAssignment";
import AssignementCard from "@/components/Dashboard/Assignments/AssignemntCard";
import Filters from "@/components/Dashboard/Assignments/Filters";
import {
  assignmentService,
  Assignment,
  CreateAssignmentForm,
} from "@/services/assignmentService";
import { toast } from "react-toastify";

const Assignments: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create assignment state
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] = useState(false);
  const [newAssignmentForm, setNewAssignmentForm] = useState<CreateAssignmentForm>({
    title: "",
    subject: "",
    grade: 7,
    description: "",
    dueDate: "",
    pointsPossible: 100,
  });

  // Fetch assignments when component mounts or when search/filters change
  useEffect(() => {
    fetchAssignments();
  }, [searchTerm, selectedStatus]);

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

      const response = await assignmentService.getAssignments(filters);
      setAssignments(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load assignments. Please try again later.");
      console.error("Error fetching assignments:", err);
    } finally {
      setIsLoading(false);
    }
  };

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
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      const teacherName = user.name as unknown as string;
      const newAssignment = await assignmentService.createAssignment(
        newAssignmentForm,
        teacherName
      );

      // Add to local state to avoid refetching
      setAssignments((prev) => [...prev, newAssignment]);

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
      toast.success("Assignment created successfully!");
    } catch (err) {
      toast.error("Failed to create assignment. Please try again.");
      console.error("Error creating assignment:", err);
    } finally {
      setIsLoading(false);
    }
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

      {showCreateAssignmentModal && (
        <CreateAssignment
          showCreateAssignmentModal={showCreateAssignmentModal}
          newAssignmentForm={newAssignmentForm}
          setNewAssignmentForm={setNewAssignmentForm}
          setShowCreateAssignmentModal={setShowCreateAssignmentModal}
          handleCreateAssignment={handleCreateAssignment}
        />
      )}
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
            getStatusColor={getStatusColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Assignments;