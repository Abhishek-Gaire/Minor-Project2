const FeedbackModal = ({ feedbackModal, getGradeColor, setFeedbackModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md p-6 border border-border">
        <h3 className="text-lg font-bold mb-4 text-card-foreground">
          Assignment Feedback
        </h3>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Assignment</p>
            <p className="font-medium text-card-foreground">
              {feedbackModal.assignment}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Course</p>
            <p className="font-medium text-card-foreground">
              {feedbackModal.course}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Grade</p>
            <p className={`font-bold ${getGradeColor(feedbackModal.grade)}`}>
              {feedbackModal.grade}/{feedbackModal.maxGrade} (
              {((feedbackModal.grade / feedbackModal.maxGrade) * 100).toFixed(
                1
              )}
              %)
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Teacher Feedback</p>
            <p className="bg-accent p-3 rounded text-foreground">
              {feedbackModal.feedback}
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <button
              className="bg-primary text-primary-foreground px-4 py-2 rounded"
              onClick={() => setFeedbackModal(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
