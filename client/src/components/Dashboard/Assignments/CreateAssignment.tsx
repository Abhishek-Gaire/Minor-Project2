const CreateAssignment = ({
  showCreateAssignmentModal,
  newAssignmentForm,
  setNewAssignmentForm,
  setShowCreateAssignmentModal,
  handleCreateAssignment,
}) => {
  if (!showCreateAssignmentModal) return null;

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-card p-6 rounded-lg w-full max-w-md animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          Create New Assignment
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-foreground">Title</label>
            <input
              type="text"
              className="w-full border border-input rounded-md p-2 bg-input text-foreground"
              value={newAssignmentForm.title}
              onChange={(e) =>
                setNewAssignmentForm({
                  ...newAssignmentForm,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 text-foreground">Subject</label>
            <input
              type="text"
              className="w-full border border-input rounded-md p-2 bg-input text-foreground"
              value={newAssignmentForm.subject}
              onChange={(e) =>
                setNewAssignmentForm({
                  ...newAssignmentForm,
                  subject: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 text-foreground">Grade Level</label>
            <select
              className="w-full border border-input rounded-md p-2 bg-input text-foreground"
              value={newAssignmentForm.grade}
              onChange={(e) =>
                setNewAssignmentForm({
                  ...newAssignmentForm,
                  grade: parseInt(e.target.value),
                })
              }
            >
              {[5, 6, 7, 8, 9, 10].map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-foreground">Description</label>
            <textarea
              className="w-full border border-input rounded-md p-2 bg-input text-foreground"
              rows={4}
              value={newAssignmentForm.description}
              onChange={(e) =>
                setNewAssignmentForm({
                  ...newAssignmentForm,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 text-foreground">Due Date</label>
            <input
              type="datetime-local"
              className="w-full border border-input rounded-md p-2 bg-input text-foreground"
              value={newAssignmentForm.dueDate}
              onChange={(e) =>
                setNewAssignmentForm({
                  ...newAssignmentForm,
                  dueDate: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 text-foreground">
              Points Possible
            </label>
            <input
              type="number"
              className="w-full border border-input rounded-md p-2 bg-input text-foreground"
              value={newAssignmentForm.pointsPossible}
              onChange={(e) =>
                setNewAssignmentForm({
                  ...newAssignmentForm,
                  pointsPossible: parseInt(e.target.value),
                })
              }
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            className="px-4 m-2 py-3 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
            onClick={() => setShowCreateAssignmentModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 m-2 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            onClick={handleCreateAssignment}
          >
            Create Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;
import React from "react";
import { CreateAssignmentForm } from "@/services/assignmentService";

interface CreateAssignmentProps {
  showCreateAssignmentModal: boolean;
  newAssignmentForm: CreateAssignmentForm;
  setNewAssignmentForm: React.Dispatch<React.SetStateAction<CreateAssignmentForm>>;
  setShowCreateAssignmentModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateAssignment: () => void;
}

const CreateAssignment: React.FC<CreateAssignmentProps> = ({
  showCreateAssignmentModal,
  newAssignmentForm,
  setNewAssignmentForm,
  setShowCreateAssignmentModal,
  handleCreateAssignment,
}) => {
  // Helper function to handle form changes
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewAssignmentForm({
      ...newAssignmentForm,
      [name]: name === "grade" || name === "pointsPossible" ? Number(value) : value,
    });
  };

  if (!showCreateAssignmentModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[hsl(var(--card))] p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">Create New Assignment</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={newAssignmentForm.title}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={newAssignmentForm.subject}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Grade Level <span className="text-red-500">*</span>
            </label>
            <select
              name="grade"
              value={newAssignmentForm.grade}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-md"
              required
            >
              {[5, 6, 7, 8, 9, 10].map((grade) => (
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
              value={newAssignmentForm.description}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-md"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="dueDate"
              value={newAssignmentForm.dueDate}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Points Possible <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="pointsPossible"
              value={newAssignmentForm.pointsPossible}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-md"
              min={1}
              max={1000}
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            className="px-4 py-2 bg-muted rounded-lg"
            onClick={() => setShowCreateAssignmentModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={handleCreateAssignment}
          >
            Create Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;