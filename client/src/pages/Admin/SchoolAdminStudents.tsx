import { useState, useEffect } from "react";
import { debounce } from "lodash-es";
import { useNavigate } from "react-router-dom";

import { Search, PlusCircle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StudentsPage = () => {
  const [originalStudents] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      grade: "10th",
      status: "active",
      attendance: "95%",
      fees: "Paid",
      enrolledCourses: 4,
    },
    {
      id: 2,
      name: "Samantha Lee",
      grade: "11th",
      status: "active",
      attendance: "92%",
      fees: "Paid",
      enrolledCourses: 5,
    },
    {
      id: 3,
      name: "David Martinez",
      grade: "9th",
      status: "active",
      attendance: "87%",
      fees: "Pending",
      enrolledCourses: 3,
    },
    {
      id: 4,
      name: "Emily Wilson",
      grade: "12th",
      status: "inactive",
      attendance: "78%",
      fees: "Overdue",
      enrolledCourses: 2,
    },
    {
      id: 5,
      name: "Michael Brown",
      grade: "10th",
      status: "active",
      attendance: "91%",
      fees: "Paid",
      enrolledCourses: 4,
    },
    {
      id: 6,
      name: "Olivia Davis",
      grade: "11th",
      status: "active",
      attendance: "94%",
      fees: "Paid",
      enrolledCourses: 5,
    },
    {
      id: 7,
      name: "John Smith",
      grade: "9th",
      status: "inactive",
      attendance: "65%",
      fees: "Overdue",
      enrolledCourses: 3,
    },
    {
      id: 8,
      name: "Emma Thomas",
      grade: "10th",
      status: "active",
      attendance: "89%",
      fees: "Pending",
      enrolledCourses: 4,
    },
  ]);
  const [filteredStudents, setFilteredStudents] = useState(originalStudents);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    grade: "",
    fees: "",
  });

  const navigate = useNavigate();
  // Pagination calculations
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedData = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Debounced search handler
  const handleSearch = debounce((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, 300);

  // Filter and search logic
  useEffect(() => {
    let result = originalStudents.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.grade.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters =
        (!filters.status || student.status === filters.status) &&
        (!filters.grade || student.grade === filters.grade) &&
        (!filters.fees || student.fees === filters.fees);

      return matchesSearch && matchesFilters;
    });

    setFilteredStudents(result);
  }, [searchTerm, filters, originalStudents]);

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

  const handleAddStudent = () => {
    navigate("/admin/students/addStudent");
  };

  return (
    <div className="p-6">
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

      {/* Enhanced Filters */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-8"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select
              onValueChange={(v) => setFilters((p) => ({ ...p, grade: v }))}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Enhanced Table with Selection */}
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
        {/* Pagination Controls */}
        <div className="p-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} -
              {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of{" "}
              {filteredStudents.length} students
            </span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(v) => setItemsPerPage(Number(v))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
        ;
      </div>
    </div>
  );
};

export default StudentsPage;
