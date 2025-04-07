import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { MoreHorizontal } from "lucide-react";
import { Progress } from "@/components/ui/progress.tsx";

const getFeesColor = (fees) => {
  switch (fees) {
    case "Paid":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Overdue":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Enhanced Attendance Visualization
const AttendanceBar = ({ percentage }: { percentage: string }) => {
  const numericValue = parseFloat(percentage);
  return (
    <div className="flex items-center gap-2">
      <Progress value={numericValue} className="h-2 w-20" />
      <span
        className={`text-sm ${
          numericValue < 75
            ? "text-red-600"
            : numericValue < 90
            ? "text-yellow-600"
            : "text-green-600"
        }`}
      >
        {percentage}
      </span>
    </div>
  );
};

const TableSelection = ({ paginatedData }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Name</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Attendance</TableHead>
          <TableHead>Fees</TableHead>
          <TableHead>Courses</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedData.map((student) => (
          <TableRow
            key={student.id}
            className="cursor-pointer hover:bg-gray-50"
          >
            <TableCell className="font-medium">{student.name}</TableCell>
            <TableCell>{student.grade}</TableCell>

            <TableCell>
              <AttendanceBar percentage={student.attendance} />
            </TableCell>
            <TableCell>
              <Badge className={getFeesColor(student.fees)}>
                {student.fees}
              </Badge>
            </TableCell>
            <TableCell>{student.enrolledCourses}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Student</DropdownMenuItem>
                  <DropdownMenuItem>Contact Student</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSelection;
