import {Button} from "@/components/ui/button.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

export const ClassManagementPage = () => {
    return (
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
    );
};