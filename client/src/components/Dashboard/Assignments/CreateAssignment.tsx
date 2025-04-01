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
