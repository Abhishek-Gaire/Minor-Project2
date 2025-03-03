import React, { useState } from "react";
import {
    Search,
    Filter,
    PlusCircle,
    Download,
    MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const StudentsPage = () => {
    const [students, setStudents] = useState([
        { id: 1, name: "Alex Johnson", grade: "10th", status: "active", attendance: "95%", fees: "Paid", enrolledCourses: 4 },
        { id: 2, name: "Samantha Lee", grade: "11th", status: "active", attendance: "92%", fees: "Paid", enrolledCourses: 5 },
        { id: 3, name: "David Martinez", grade: "9th", status: "active", attendance: "87%", fees: "Pending", enrolledCourses: 3 },
        { id: 4, name: "Emily Wilson", grade: "12th", status: "inactive", attendance: "78%", fees: "Overdue", enrolledCourses: 2 },
        { id: 5, name: "Michael Brown", grade: "10th", status: "active", attendance: "91%", fees: "Paid", enrolledCourses: 4 },
        { id: 6, name: "Olivia Davis", grade: "11th", status: "active", attendance: "94%", fees: "Paid", enrolledCourses: 5 },
        { id: 7, name: "John Smith", grade: "9th", status: "inactive", attendance: "65%", fees: "Overdue", enrolledCourses: 3 },
        { id: 8, name: "Emma Thomas", grade: "10th", status: "active", attendance: "89%", fees: "Pending", enrolledCourses: 4 },
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800";
            case "inactive":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
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

    return (
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Students</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <Button size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Student
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">843</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Active Students</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">782</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Average Attendance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">89%</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Payment Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">92% Paid</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search students..." className="pl-8" />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]">Name</TableHead>
                                <TableHead>Grade</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Attendance</TableHead>
                                <TableHead>Fees</TableHead>
                                <TableHead>Courses</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                    <TableCell>{student.grade}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(student.status)} variant="outline">
                                            {student.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{student.attendance}</TableCell>
                                    <TableCell>
                                        <Badge className={getFeesColor(student.fees)} variant="outline">
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
                </div>
            </div>

    );
};

export default StudentsPage;