import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Download, Printer, Eye, Filter } from "lucide-react";

interface AttendanceData {
  id: string;
  name: string;
  email: string;
  attendanceRate: number;
  sessionsAttended: number;
  totalSessions: number;
  lastAttended: string;
  course: string;
}

interface AttendanceReportsProps {
  data: AttendanceData[];
  courses: string[];
}

export const AttendanceReports: React.FC<AttendanceReportsProps> = ({
  data = [],
  courses = [],
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [view, setView] = useState<string>("summary");

  const filteredData =
    selectedCourse === "all"
      ? data
      : data.filter((item) => item.course === selectedCourse);

  const getAttendanceStatusBadge = (rate: number) => {
    if (rate >= 90) {
      return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    } else if (rate >= 75) {
      return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    } else if (rate >= 60) {
      return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Poor</Badge>;
    }
  };

  const calculateAverageAttendance = () => {
    if (filteredData.length === 0) return 0;
    const sum = filteredData.reduce(
      (acc, curr) => acc + curr.attendanceRate,
      0
    );
    return Math.round(sum / filteredData.length);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">
              Attendance Reports
            </CardTitle>
            <CardDescription>
              Track student attendance across courses
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <Tabs
            defaultValue="summary"
            className="w-fit"
            onValueChange={setView}
          >
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="summary" className="mt-0">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Average Attendance</CardDescription>
                <CardTitle className="text-2xl">
                  {calculateAverageAttendance()}%
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Students</CardDescription>
                <CardTitle className="text-2xl">
                  {filteredData.length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Students Below 60%</CardDescription>
                <CardTitle className="text-2xl">
                  {
                    filteredData.filter((item) => item.attendanceRate < 60)
                      .length
                  }
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Attendance Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Attended</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.course}</TableCell>
                  <TableCell>{item.attendanceRate}%</TableCell>
                  <TableCell>
                    {getAttendanceStatusBadge(item.attendanceRate)}
                  </TableCell>
                  <TableCell>
                    {new Date(item.lastAttended).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="detailed" className="mt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Sessions Attended</TableHead>
                <TableHead>Total Sessions</TableHead>
                <TableHead>Attendance Rate</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.course}</TableCell>
                  <TableCell>{item.sessionsAttended}</TableCell>
                  <TableCell>{item.totalSessions}</TableCell>
                  <TableCell>{item.attendanceRate}%</TableCell>
                  <TableCell>
                    {getAttendanceStatusBadge(item.attendanceRate)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          Last updated: {new Date().toLocaleDateString()}
        </div>
        <Button size="sm">Generate Report</Button>
      </CardFooter>
    </Card>
  );
};

export default AttendanceReports;
