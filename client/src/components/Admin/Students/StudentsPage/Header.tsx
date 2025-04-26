import { Button } from "@/components/ui/button.tsx";
import { PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

interface HeaderProps {
  handleAddStudent: () => void;
  originalStudents: { id: string; name: string; grade: string }[]; // minimal typing
}

const Header = ({ handleAddStudent, originalStudents }: HeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students</h1>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleAddStudent}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{originalStudents.length}</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Header;
