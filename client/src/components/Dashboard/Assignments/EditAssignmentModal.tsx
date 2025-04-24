// src/components/Dashboard/Assignments/EditAssignmentModal.tsx
import React, { useState } from "react";
import { X } from "lucide-react";
import { Assignment, assignmentService } from "@/services/assignmentService";
import { toast } from "react-toastify";

interface EditAssignmentModalProps {
  assignment: Assignment;
  onClose: () => void;
  onSave: (updatedAssignment: Assignment) => void;
}

const EditAssignmentModal: React.FC<EditAssignmentModalProps> = ({ 
  assignment, 
  onClose, 
  onSave 
}) => {
  const [updatedAssignment, setUpdatedAssignment] = useState<Assignment>({...assignment});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setUpdatedAssignment(prev => ({
      ...prev,
      [name]: name === "grade" || name === "pointsPossible" ? parseInt(value) : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!updatedAssignment.title || !updatedAssignment.subject || !updatedAssignment.dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      setIsSubmitting(true);
      await assignmentService.updateAssignment(assignment.id, updatedAssignment);
      onSave(updatedAssignment);
    } catch (err) {
      toast.error("Failed to update assignment");
      console.error("Error updating assignment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Format date for datetime-local input
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Format: "YYYY-MM-DDThh:mm"
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Assignment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={updatedAssignment.title}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={updatedAssignment.subject}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Grade Level</label>
              <select
                name="grade"
                value={updatedAssignment.grade}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                {[6, 7, 8, 9, 10, 11, 12].map((grade) => (
                  <option key={grade} value={grade}>
                    Grade {grade}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={updatedAssignment.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                rows={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="datetime-local"
                name="dueDate"
                value={formatDateForInput(updatedAssignment.dueDate)}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Points Possible</label>
              <input
                type="number"
                name="pointsPossible"
                value={updatedAssignment.pointsPossible}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={updatedAssignment.status}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Grading">Grading</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAssignmentModal;