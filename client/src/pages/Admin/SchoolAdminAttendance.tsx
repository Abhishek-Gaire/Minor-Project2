import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

export const AttendanceManagementPage = () => {
    return (

        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">
                    Attendance Management
                </h1>
                <Button>Generate Report</Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Today's Attendance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">92%</p>
                        <p className="text-xs text-gray-500">48 absent of 602 students</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Weekly Average
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">94%</p>
                        <p className="text-xs text-gray-500">↑ 2% from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Monthly Average
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">91%</p>
                        <p className="text-xs text-gray-500">↓ 1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Lowest Class
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">83%</p>
                        <p className="text-xs text-gray-500">Grade 11, Physics</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex gap-4 items-center mb-6">
                <div className="flex items-center gap-2">
                    <label className="text-sm">Date:</label>
                    <Input type="date" className="w-40" defaultValue="2025-03-02" />
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm">Class:</label>
                    <select className="p-2 border rounded-md w-48">
                        <option>All Classes</option>
                        <option>Advanced Mathematics</option>
                        <option>Biology</option>
                        <option>World History</option>
                        <option>Spanish II</option>
                        <option>Physical Education</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm">Grade:</label>
                    <select className="p-2 border rounded-md w-32">
                        <option>All Grades</option>
                        <option>Grade 9</option>
                        <option>Grade 10</option>
                        <option>Grade 11</option>
                        <option>Grade 12</option>
                    </select>
                </div>
                <Button variant="outline">Apply Filters</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Today's Attendance (March 2, 2025)</CardTitle>
                    <CardDescription>Click on a status to change it</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>Grade</TableHead>
                                <TableHead>Class</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Marked By</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                {
                                    name: "Emily Martinez",
                                    id: "S-4201",
                                    grade: "10",
                                    class: "Advanced Mathematics",
                                    status: "Present",
                                    teacher: "Sarah Johnson",
                                    time: "09:05 AM",
                                },
                                {
                                    name: "Alex Johnson",
                                    id: "S-4202",
                                    grade: "10",
                                    class: "Advanced Mathematics",
                                    status: "Late",
                                    teacher: "Sarah Johnson",
                                    time: "09:20 AM",
                                },
                                {
                                    name: "Ryan Kim",
                                    id: "S-4203",
                                    grade: "10",
                                    class: "Advanced Mathematics",
                                    status: "Absent",
                                    teacher: "Sarah Johnson",
                                    time: "09:05 AM",
                                },
                                {
                                    name: "Maria Garcia",
                                    id: "S-4204",
                                    grade: "10",
                                    class: "Advanced Mathematics",
                                    status: "Present",
                                    teacher: "Sarah Johnson",
                                    time: "09:05 AM",
                                },
                                {
                                    name: "Sophia Ahmed",
                                    id: "S-4205",
                                    grade: "10",
                                    class: "Advanced Mathematics",
                                    status: "Present",
                                    teacher: "Sarah Johnson",
                                    time: "09:05 AM",
                                },
                            ].map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium">
                                        {student.name}
                                    </TableCell>
                                    <TableCell>{student.id}</TableCell>
                                    <TableCell>Grade {student.grade}</TableCell>
                                    <TableCell>{student.class}</TableCell>
                                    <TableCell>
                                        <select
                                            className={`px-2 py-1 rounded text-xs border ${
                                                student.status === "Present"
                                                    ? "bg-green-100 text-green-800 border-green-200"
                                                    : student.status === "Late"
                                                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                        : "bg-red-100 text-red-800 border-red-200"
                                            }`}
                                        >
                                            <option selected={student.status === "Present"}>
                                                Present
                                            </option>
                                            <option selected={student.status === "Late"}>
                                                Late
                                            </option>
                                            <option selected={student.status === "Absent"}>
                                                Absent
                                            </option>
                                        </select>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="text-xs">{student.teacher}</div>
                                            <div className="text-xs text-gray-500">
                                                {student.time}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm">
                                            Notes
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            1
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            2
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            3
                        </Button>
                    </div>
                    <Button variant="outline" size="sm">
                        Next
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};