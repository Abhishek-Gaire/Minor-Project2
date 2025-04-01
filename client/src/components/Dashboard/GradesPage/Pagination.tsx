const Pagination = ({ filteredGrades, allGrades }) => {
  return (
    <div className="px-6 py-4 border-t border-border flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{filteredGrades.length}</span> of{" "}
        <span className="font-medium">{allGrades.length}</span> grades
      </div>
      <div className="flex space-x-2">
        <button className="px-3 py-1 border border-input rounded text-sm bg-card text-foreground">
          Previous
        </button>
        <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">
          1
        </button>
        <button className="px-3 py-1 border border-input rounded text-sm bg-card text-foreground">
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
