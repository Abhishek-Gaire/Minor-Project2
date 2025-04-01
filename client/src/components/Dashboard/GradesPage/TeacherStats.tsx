interface Stats {
  totalStudents: number;
  avgGrade: string;
  excellent: number;
  excellentPercent: string;
  failed: number;
  failedPercent: string;
}

interface TeacherStatsProps {
  stats: Stats;
  isDarkMode: boolean;
  getGradeColor: (grade: number) => void;
}

const TeacherStats = ({
  stats,
  isDarkMode,
  getGradeColor,
}: TeacherStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-card rounded-lg shadow p-4 border border-border">
        <p className="text-muted-foreground text-sm">Total Students</p>
        <p className="text-2xl font-bold text-card-foreground">
          {stats.totalStudents}
        </p>
      </div>
      <div className="bg-card rounded-lg shadow p-4 border border-border">
        <p className="text-muted-foreground text-sm">Class Average</p>
        <p
          className={`text-2xl font-bold ${getGradeColor(
            parseFloat(stats.avgGrade)
          )}`}
        >
          {stats.avgGrade}%
        </p>
      </div>
      <div className="bg-card rounded-lg shadow p-4 border border-border">
        <p className="text-muted-foreground text-sm">Excellent Performance</p>
        <p
          className={`text-2xl font-bold ${
            isDarkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          {stats.excellent}{" "}
          <span className="text-sm">({stats.excellentPercent}%)</span>
        </p>
      </div>
      <div className="bg-card rounded-lg shadow p-4 border border-border">
        <p className="text-muted-foreground text-sm">Need Support</p>
        <p
          className={`text-2xl font-bold ${
            isDarkMode ? "text-red-400" : "text-red-600"
          }`}
        >
          {stats.failed}{" "}
          <span className="text-sm">({stats.failedPercent}%)</span>
        </p>
      </div>
    </div>
  );
};

export default TeacherStats;
