import { Download } from "lucide-react";

interface HeaderProps {
  isTeacher: boolean;
  averageGrade: number;
}
const Header = ({ isTeacher, averageGrade }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">
          {isTeacher ? "Student Grades" : "My Grades"}
        </h1>
        <p className="text-[hsl(var(--muted-foreground))]">
          {isTeacher
            ? "View and manage grades for your students"
            : `Your current average: ${averageGrade}%`}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        {isTeacher && (
          <button className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-lg flex items-center">
            <Download size={18} className="mr-2" />
            Export Grades
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
