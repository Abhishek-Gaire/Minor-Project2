import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {AlertCircle, BarChart, BookOpen, CalendarDays, TrendingUp, Users} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";

const AdminDashboard = () => {
    return (
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
    );
};

export default AdminDashboard;