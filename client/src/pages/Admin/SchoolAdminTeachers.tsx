import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";

export const TeachersManagementPage = () => {
  // Mock data for teachers
  const initialTeachers = [
    {
      name: "Sarah Johnson",
      id: "T-1001",
      subjects: ["Algebra", "Calculus", "Statistics"],
      email: "sjohnson@school.edu",
      phone: "123-456-7890",
      classes: 5,
      status: "Active",
      employmentType: "Full-time",
    },
    {
      name: "Michael Chen",
      id: "T-1002",
      subjects: ["Physics", "Chemistry"],
      email: "mchen@school.edu",
      phone: "123-456-7891",
      classes: 4,
      status: "Active",
      employmentType: "Full-time",
    },
    {
      name: "David Wilson",
      id: "T-1003",
      subjects: ["World History", "American History"],
      email: "dwilson@school.edu",
      phone: "123-456-7892",
      classes: 3,
      status: "Active",
      employmentType: "Full-time",
    },
    {
      name: "Elena Rodriguez",
      id: "T-1004",
      subjects: ["Spanish", "French", "ESL"],
      email: "erodriguez@school.edu",
      phone: "123-456-7893",
      classes: 6,
      status: "On Leave",
      employmentType: "Full-time",
    },
    {
      name: "James Taylor",
      id: "T-1005",
      subjects: ["Physical Education", "Health"],
      email: "jtaylor@school.edu",
      phone: "123-456-7894",
      classes: 8,
      status: "Active",
      employmentType: "Part-time",
    },
    {
      name: "Lisa Wong",
      id: "T-1006",
      subjects: ["Art", "Design"],
      email: "lwong@school.edu",
      phone: "123-456-7895",
      classes: 4,
      status: "Active",
      employmentType: "Part-time",
    },
    {
      name: "Robert Smith",
      id: "T-1007",
      subjects: ["Music Theory", "Band"],
      email: "rsmith@school.edu",
      phone: "123-456-7896",
      classes: 5,
      status: "Active",
      employmentType: "Full-time",
    },
    {
      name: "Emily Davis",
      id: "T-1008",
      subjects: ["Biology", "Environmental Science"],
      email: "edavis@school.edu",
      phone: "123-456-7897",
      classes: 6,
      status: "Active",
      employmentType: "Full-time",
    },
  ];

  // List of all available subjects
  const allSubjects = [
    "Algebra",
    "Calculus",
    "Statistics",
    "Geometry",
    "Physics",
    "Chemistry",
    "Biology",
    "Environmental Science",
    "World History",
    "American History",
    "Geography",
    "Civics",
    "English Literature",
    "Creative Writing",
    "Grammar",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "ESL",
    "Physical Education",
    "Health",
    "Art",
    "Design",
    "Music Theory",
    "Band",
    "Orchestra",
    "Drama",
    "Computer Science",
    "Economics",
    "Psychology",
    "Sociology",
  ];

  // State variables
  const [teachers, setTeachers] = useState(initialTeachers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    subjects: [],
    status: "Active",
    employmentType: "Full-time",
    classes: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handler for adding a new teacher
  const handleAddTeacher = () => {
    const nextId = `T-${1000 + teachers.length + 1}`;
    const teacherToAdd = { ...newTeacher, id: nextId };
    setTeachers([...teachers, teacherToAdd]);
    setIsAddDialogOpen(false);
    setNewTeacher({
      name: "",
      email: "",
      phone: "",
      subjects: [],
      status: "Active",
      employmentType: "Full-time",
      classes: 0,
    });
  };

  // Handler for updating a teacher
  const handleUpdateTeacher = () => {
    setTeachers(
      teachers.map((teacher) =>
        teacher.id === currentTeacher.id ? currentTeacher : teacher
      )
    );
    setIsEditDialogOpen(false);
  };

  // Handler for subject checkbox in add/edit forms
  const handleSubjectToggle = (subject, isAdd = true) => {
    if (isAdd) {
      if (newTeacher.subjects.includes(subject)) {
        setNewTeacher({
          ...newTeacher,
          subjects: newTeacher.subjects.filter((s) => s !== subject),
        });
      } else {
        setNewTeacher({
          ...newTeacher,
          subjects: [...newTeacher.subjects, subject],
        });
      }
    } else {
      if (currentTeacher.subjects.includes(subject)) {
        setCurrentTeacher({
          ...currentTeacher,
          subjects: currentTeacher.subjects.filter((s) => s !== subject),
        });
      } else {
        setCurrentTeacher({
          ...currentTeacher,
          subjects: [...currentTeacher.subjects, subject],
        });
      }
    }
  };

  // Filter teachers based on search and filters
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject =
      subjectFilter === "All Subjects" ||
      teacher.subjects.includes(subjectFilter);

    const matchesStatus =
      statusFilter === "All Statuses" || teacher.status === statusFilter;

    return matchesSearch && matchesSubject && matchesStatus;
  });

  // Get current teachers to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTeachers = filteredTeachers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

  // Counts for summary cards
  const totalTeachersCount = teachers.length;
  const fullTimeCount = teachers.filter(
    (t) => t.employmentType === "Full-time"
  ).length;
  const partTimeCount = teachers.filter(
    (t) => t.employmentType === "Part-time"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Teachers Management
        </h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          + Add New Teacher
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Teachers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalTeachersCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Full-time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{fullTimeCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Part-time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{partTimeCount}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <Input
          placeholder="Search teachers..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded-md"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option>All Subjects</option>
          {allSubjects.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
        <select
          className="p-2 border rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Statuses</option>
          <option>Active</option>
          <option>On Leave</option>
        </select>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.slice(0, 2).map((subject) => (
                        <span
                          key={subject}
                          className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                        >
                          {subject}
                        </span>
                      ))}
                      {teacher.subjects.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          +{teacher.subjects.length - 2}
                        </span>
                      )}
                    </div>
                  </TableCell>
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentTeacher(teacher);
                        setIsViewDialogOpen(true);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCurrentTeacher(teacher);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {currentTeachers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No teachers found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </CardFooter>
      </Card>

      {/* Add Teacher Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={newTeacher.name}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, name: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newTeacher.email}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, email: e.target.value })
                  }
                  placeholder="john.doe@school.edu"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={newTeacher.phone}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, phone: e.target.value })
                  }
                  placeholder="123-456-7890"
                />
              </div>
              <div>
                <Label htmlFor="classes" className="text-right">
                  Number of Classes
                </Label>
                <Input
                  id="classes"
                  type="number"
                  value={newTeacher.classes}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      classes: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <select
                  id="status"
                  className="w-full p-2 border rounded-md"
                  value={newTeacher.status}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, status: e.target.value })
                  }
                >
                  <option>Active</option>
                  <option>On Leave</option>
                </select>
              </div>
              <div>
                <Label htmlFor="employmentType" className="text-right">
                  Employment Type
                </Label>
                <select
                  id="employmentType"
                  className="w-full p-2 border rounded-md"
                  value={newTeacher.employmentType}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      employmentType: e.target.value,
                    })
                  }
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                </select>
              </div>
            </div>
            <div>
              <Label className="block mb-2">Subjects</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto p-2 border rounded-md">
                {allSubjects.map((subject) => (
                  <div key={subject} className="flex items-center space-x-2">
                    <Checkbox
                      id={`subject-${subject}`}
                      checked={newTeacher.subjects.includes(subject)}
                      onCheckedChange={() => handleSubjectToggle(subject)}
                    />
                    <Label htmlFor={`subject-${subject}`} className="text-sm">
                      {subject}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTeacher}>Add Teacher</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Teacher Dialog */}
      {currentTeacher && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Teacher Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Name:</div>
                <div className="col-span-2">{currentTeacher.name}</div>

                <div className="font-medium">ID:</div>
                <div className="col-span-2">{currentTeacher.id}</div>

                <div className="font-medium">Email:</div>
                <div className="col-span-2">{currentTeacher.email}</div>

                <div className="font-medium">Phone:</div>
                <div className="col-span-2">{currentTeacher.phone}</div>

                <div className="font-medium">Status:</div>
                <div className="col-span-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      currentTeacher.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {currentTeacher.status}
                  </span>
                </div>

                <div className="font-medium">Employment:</div>
                <div className="col-span-2">
                  {currentTeacher.employmentType}
                </div>

                <div className="font-medium">Classes:</div>
                <div className="col-span-2">{currentTeacher.classes}</div>

                <div className="font-medium">Subjects:</div>
                <div className="col-span-2">
                  <div className="flex flex-wrap gap-1">
                    {currentTeacher.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Teacher Dialog */}
      {currentTeacher && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Teacher: {currentTeacher.name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={currentTeacher.name}
                    onChange={(e) =>
                      setCurrentTeacher({
                        ...currentTeacher,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={currentTeacher.email}
                    onChange={(e) =>
                      setCurrentTeacher({
                        ...currentTeacher,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="edit-phone"
                    value={currentTeacher.phone}
                    onChange={(e) =>
                      setCurrentTeacher({
                        ...currentTeacher,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-classes" className="text-right">
                    Number of Classes
                  </Label>
                  <Input
                    id="edit-classes"
                    type="number"
                    value={currentTeacher.classes}
                    onChange={(e) =>
                      setCurrentTeacher({
                        ...currentTeacher,
                        classes: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-status" className="text-right">
                    Status
                  </Label>
                  <select
                    id="edit-status"
                    className="w-full p-2 border rounded-md"
                    value={currentTeacher.status}
                    onChange={(e) =>
                      setCurrentTeacher({
                        ...currentTeacher,
                        status: e.target.value,
                      })
                    }
                  >
                    <option>Active</option>
                    <option>On Leave</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="edit-employmentType" className="text-right">
                    Employment Type
                  </Label>
                  <select
                    id="edit-employmentType"
                    className="w-full p-2 border rounded-md"
                    value={currentTeacher.employmentType}
                    onChange={(e) =>
                      setCurrentTeacher({
                        ...currentTeacher,
                        employmentType: e.target.value,
                      })
                    }
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                  </select>
                </div>
              </div>
              <div>
                <Label className="block mb-2">Subjects</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto p-2 border rounded-md">
                  {allSubjects.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-subject-${subject}`}
                        checked={currentTeacher.subjects.includes(subject)}
                        onCheckedChange={() =>
                          handleSubjectToggle(subject, false)
                        }
                      />
                      <Label
                        htmlFor={`edit-subject-${subject}`}
                        className="text-sm"
                      >
                        {subject}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateTeacher}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
