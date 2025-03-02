import Layout from "@/components/Admin/AdminLayout";
import {
  Users,
  School,
  Notebook,
  Calendar,
  Settings,
  FileText,
  Bell,
  User,
  GraduationCap,
  BookOpen,
  UserCircle,
  Clock,
  DollarSign,
  MessageSquare,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarDays, AlertCircle, TrendingUp, BarChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Teachers Management Page
export const TeachersManagementPage = () => {
  const adminSidebarItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <Activity size={20} />,
      active: false,
    },
    {
      name: "Students",
      href: "/admin/students",
      icon: <GraduationCap size={20} />,
      active: false,
    },
    {
      name: "Teachers",
      href: "/admin/teachers",
      icon: <UserCircle size={20} />,
      active: true,
    },
    {
      name: "Classes",
      href: "/admin/classes",
      icon: <BookOpen size={20} />,
      active: false,
    },
    {
      name: "Attendance",
      href: "/admin/attendance",
      icon: <Clock size={20} />,
      active: false,
    },
    {
      name: "Payments",
      href: "/admin/payments",
      icon: <DollarSign size={20} />,
      active: false,
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: <MessageSquare size={20} />,
      active: false,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings size={20} />,
      active: false,
    },
  ];

  return (
    <Layout role="admin" sidebarItems={adminSidebarItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Teachers Management
          </h1>
          <Button>+ Add New Teacher</Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Teachers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">42</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Full-time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">36</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Part-time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">6</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 items-center">
          <Input placeholder="Search teachers..." className="max-w-sm" />
          <select className="p-2 border rounded-md">
            <option>All Departments</option>
            <option>Mathematics</option>
            <option>Science</option>
            <option>Languages</option>
            <option>Arts</option>
          </select>
          <Button variant="outline">Filters</Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Classes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "Sarah Johnson",
                    id: "T-1001",
                    dept: "Mathematics",
                    email: "sjohnson@school.edu",
                    classes: 5,
                    status: "Active",
                  },
                  {
                    name: "Michael Chen",
                    id: "T-1002",
                    dept: "Science",
                    email: "mchen@school.edu",
                    classes: 4,
                    status: "Active",
                  },
                  {
                    name: "David Wilson",
                    id: "T-1003",
                    dept: "History",
                    email: "dwilson@school.edu",
                    classes: 3,
                    status: "Active",
                  },
                  {
                    name: "Elena Rodriguez",
                    id: "T-1004",
                    dept: "Languages",
                    email: "erodriguez@school.edu",
                    classes: 6,
                    status: "On Leave",
                  },
                  {
                    name: "James Taylor",
                    id: "T-1005",
                    dept: "Physical Education",
                    email: "jtaylor@school.edu",
                    classes: 8,
                    status: "Active",
                  },
                ].map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">
                      {teacher.name}
                    </TableCell>
                    <TableCell>{teacher.id}</TableCell>
                    <TableCell>{teacher.dept}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.classes}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          teacher.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {teacher.status}
                      </span>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
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
    </Layout>
  );
};

// Class Management Page
export const ClassManagementPage = () => {
  const adminSidebarItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <Activity size={20} />,
      active: false,
    },
    {
      name: "Students",
      href: "/admin/students",
      icon: <GraduationCap size={20} />,
      active: false,
    },
    {
      name: "Teachers",
      href: "/admin/teachers",
      icon: <UserCircle size={20} />,
      active: false,
    },
    {
      name: "Classes",
      href: "/admin/classes",
      icon: <BookOpen size={20} />,
      active: true,
    },
    {
      name: "Attendance",
      href: "/admin/attendance",
      icon: <Clock size={20} />,
      active: false,
    },
    {
      name: "Payments",
      href: "/admin/payments",
      icon: <DollarSign size={20} />,
      active: false,
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: <MessageSquare size={20} />,
      active: false,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings size={20} />,
      active: false,
    },
  ];

  return (
    <Layout role="admin" sidebarItems={adminSidebarItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Class Management
          </h1>
          <Button>+ Add New Class</Button>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Classes</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  id: "C-101",
                  name: "Advanced Mathematics",
                  grade: "Grade 10",
                  teacher: "Sarah Johnson",
                  students: 28,
                  room: "Room 201",
                  time: "Mon, Wed, Fri 09:00-10:30",
                },
                {
                  id: "C-102",
                  name: "Biology",
                  grade: "Grade 9",
                  teacher: "Michael Chen",
                  students: 32,
                  room: "Lab 3",
                  time: "Tue, Thu 11:00-13:00",
                },
                {
                  id: "C-103",
                  name: "World History",
                  grade: "Grade 11",
                  teacher: "David Wilson",
                  students: 25,
                  room: "Room 105",
                  time: "Mon, Wed 13:30-15:00",
                },
                {
                  id: "C-104",
                  name: "Spanish II",
                  grade: "Grade 10",
                  teacher: "Elena Rodriguez",
                  students: 22,
                  room: "Room 303",
                  time: "Tue, Thu 09:00-10:30",
                },
                {
                  id: "C-105",
                  name: "Physical Education",
                  grade: "Grade 9",
                  teacher: "James Taylor",
                  students: 35,
                  room: "Gymnasium",
                  time: "Fri 13:30-15:30",
                },
                {
                  id: "C-106",
                  name: "Chemistry Lab",
                  grade: "Grade 11",
                  teacher: "Michael Chen",
                  students: 24,
                  room: "Lab 2",
                  time: "Wed 15:30-17:30",
                },
              ].map((cls) => (
                <Card key={cls.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{cls.name}</CardTitle>
                      <Badge variant="outline">{cls.grade}</Badge>
                    </div>
                    <CardDescription>ID: {cls.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Teacher:</span>
                        <span className="text-sm font-medium">
                          {cls.teacher}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Students:</span>
                        <span className="text-sm font-medium">
                          {cls.students}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Location:</span>
                        <span className="text-sm font-medium">{cls.room}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Schedule:</span>
                        <span className="text-sm font-medium">{cls.time}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Attendance
                    </Button>
                    <Button size="sm">Manage</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="pt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-4">
                  <p className="text-gray-500">
                    No upcoming classes scheduled for the next semester yet.
                  </p>
                  <Button variant="outline" className="mt-4">
                    Schedule New Class
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archived" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Archived Classes</CardTitle>
                <CardDescription>Previous semester classes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class Name</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Term</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Physics 101</TableCell>
                      <TableCell>C-089</TableCell>
                      <TableCell>Grade 11</TableCell>
                      <TableCell>Fall 2024</TableCell>
                      <TableCell>26</TableCell>
                      <TableCell className="space-x-2">
                        <Button variant="outline" size="sm">
                          View Records
                        </Button>
                        <Button variant="ghost" size="sm">
                          Restore
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        English Literature
                      </TableCell>
                      <TableCell>C-091</TableCell>
                      <TableCell>Grade 10</TableCell>
                      <TableCell>Fall 2024</TableCell>
                      <TableCell>28</TableCell>
                      <TableCell className="space-x-2">
                        <Button variant="outline" size="sm">
                          View Records
                        </Button>
                        <Button variant="ghost" size="sm">
                          Restore
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Attendance Management Page
export const AttendanceManagementPage = () => {
  const adminSidebarItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <Activity size={20} />,
      active: false,
    },
    {
      name: "Students",
      href: "/admin/students",
      icon: <GraduationCap size={20} />,
      active: false,
    },
    {
      name: "Teachers",
      href: "/admin/teachers",
      icon: <UserCircle size={20} />,
      active: false,
    },
    {
      name: "Classes",
      href: "/admin/classes",
      icon: <BookOpen size={20} />,
      active: false,
    },
    {
      name: "Attendance",
      href: "/admin/attendance",
      icon: <Clock size={20} />,
      active: true,
    },
    {
      name: "Payments",
      href: "/admin/payments",
      icon: <DollarSign size={20} />,
      active: false,
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: <MessageSquare size={20} />,
      active: false,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings size={20} />,
      active: false,
    },
  ];

  return (
    <Layout role="admin" sidebarItems={adminSidebarItems}>
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
    </Layout>
  );
};

const AdminDashboard = () => {
  const adminSidebarItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <Activity size={20} />,
      active: false,
    },
    {
      name: "Students",
      href: "/admin/students",
      icon: <GraduationCap size={20} />,
      active: false,
    },
    {
      name: "Teachers",
      href: "/admin/teachers",
      icon: <UserCircle size={20} />,
      active: true,
    },
    {
      name: "Classes",
      href: "/admin/classes",
      icon: <BookOpen size={20} />,
      active: false,
    },
    {
      name: "Attendance",
      href: "/admin/attendance",
      icon: <Clock size={20} />,
      active: false,
    },
    {
      name: "Payments",
      href: "/admin/payments",
      icon: <DollarSign size={20} />,
      active: false,
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: <MessageSquare size={20} />,
      active: false,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings size={20} />,
      active: false,
    },
  ];
  return (
    <Layout role="admin" sidebarItems={adminSidebarItems}>
      <div className="grid gap-4 md:gap-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, Admin
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Teachers
              </CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">86</div>
              <p className="text-xs text-muted-foreground">
                +3 since last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">Spring semester</p>
            </CardContent>
          </Card>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important Notice</AlertTitle>
          <AlertDescription>
            End of term exams start next week. Please ensure all grades are
            submitted by Friday.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                <BarChart className="h-10 w-10 text-gray-400" />
                <span className="ml-2 text-gray-500">Attendance Chart</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <div>
                    <p className="text-sm font-medium">Staff Meeting</p>
                    <p className="text-xs text-gray-500">Today, 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <div>
                    <p className="text-sm font-medium">
                      Parent-Teacher Conference
                    </p>
                    <p className="text-xs text-gray-500">Mar 3, 4:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <div>
                    <p className="text-sm font-medium">Science Fair</p>
                    <p className="text-xs text-gray-500">Mar 10, 9:00 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="students">Recent Students</TabsTrigger>
            <TabsTrigger value="activities">Recent Activities</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          <TabsContent value="students" className="border rounded-md p-4 mt-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-xs font-medium">JS</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">John Smith</p>
                    <p className="text-xs text-gray-500">Grade 10</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">Enrolled: Feb 25</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <span className="text-xs font-medium">AJ</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Amelia Johnson</p>
                    <p className="text-xs text-gray-500">Grade 8</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">Enrolled: Feb 22</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <span className="text-xs font-medium">RW</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Robert Williams</p>
                    <p className="text-xs text-gray-500">Grade 9</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">Enrolled: Feb 20</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="activities"
            className="border rounded-md p-4 mt-2"
          >
            <div className="space-y-4">
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm">New timetable for Grade 9 published</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm">Attendance reports generated</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>

              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm">New course materials uploaded</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="border rounded-md p-4 mt-2">
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium">
                    Sarah Parker (Science Teacher)
                  </p>
                  <span className="text-xs text-gray-500">10:25 AM</span>
                </div>
                <p className="text-sm mt-1">
                  Could we discuss the upcoming science fair arrangements?
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium">Michael Brown (Parent)</p>
                  <span className="text-xs text-gray-500">Yesterday</span>
                </div>
                <p className="text-sm mt-1">
                  Thanks for the update on Emma's progress. We'd like to
                  schedule a meeting.
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium">Tech Support</p>
                  <span className="text-xs text-gray-500">Feb 27</span>
                </div>
                <p className="text-sm mt-1">
                  Your request for additional tablets has been approved.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
