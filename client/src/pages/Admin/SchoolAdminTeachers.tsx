import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

export const TeachersManagementPage = () => {

    return (
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
    );
};