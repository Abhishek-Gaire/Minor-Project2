import React, { useState } from "react";
import { X } from "lucide-react";

interface GradingModalProps {
  studentName: string;
  onClose: () => void;
  onSubmit: (grade: number, feedback: string) => void;
  assignmentPoints: number;
}

const GradingModal: React.FC<GradingModalProps> = ({ 
  studentName, 
  onClose, 
  onSubmit,
  assignmentPoints 
}) => {
  const [grade, setGrade] = useState<number>(null);
  const [feedback, setFeedback] = useState<string>("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(grade, feedback);
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[500px] max-w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Grade Submission for {studentName}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Points (out of {assignmentPoints})
            </label>
            <input
              type="number"
              min="0"
              max={assignmentPoints}
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">0</span>
              <span className="text-xs text-gray-500">{assignmentPoints}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Feedback (Optional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              rows={5}
              placeholder="Provide feedback on the submission..."
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Submit Grade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GradingModal;