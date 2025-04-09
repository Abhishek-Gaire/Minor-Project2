import { useState } from "react";
import { z } from "zod";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { teacherSchema } from "@/constants/types";

// Status and employment type mappings for UI display and schema compatibility
const statusMap = {
  Active: "ACTIVE",
  "On Leave": "ONLEAVE",
  Inactive: "INACTIVE",
  Terminated: "TERMINATED",
  // Reverse mapping
  ACTIVE: "Active",
  ONLEAVE: "On Leave",
  INACTIVE: "Inactive",
  TERMINATED: "Terminated",
};

const employmentTypeMap = {
  "Full-time": "FULLTIME",
  "Part-time": "PARTTIME",
  Contract: "CONTRACT",
  Temporary: "TEMPORARY",
  // Reverse mapping
  FULLTIME: "Full-time",
  PARTTIME: "Part-time",
  CONTRACT: "Contract",
  TEMPORARY: "Temporary",
};

export const TeachersManagementPage = () => {
  const initialTeachers = [
    {
      name: "Sarah Johnson",
      id: "T-1001",
      subjects: ["Algebra", "Calculus", "Statistics"],
      email: "sjohnson@school.edu",
      phone: "123-456-7890",
      classes: 5,
      status: "ACTIVE",
      employmentType: "FULLTIME",
      password: "password123", // In a real app, we would never store plain text passwords
    },
    {
      name: "Michael Chen",
      id: "T-1002",
      subjects: ["Physics", "Chemistry"],
      email: "mchen@school.edu",
      phone: "123-456-7891",
      classes: 4,
      status: "ACTIVE",
      employmentType: "FULLTIME",
      password: "password123",
    },
    {
      name: "David Wilson",
      id: "T-1003",
      subjects: ["World History", "American History"],
      email: "dwilson@school.edu",
      phone: "123-456-7892",
      classes: 3,
      status: "ACTIVE",
      employmentType: "FULLTIME",
      password: "password123",
    },
    {
      name: "Elena Rodriguez",
      id: "T-1004",
      subjects: ["Spanish", "French", "ESL"],
      email: "erodriguez@school.edu",
      phone: "123-456-7893",
      classes: 6,
      status: "ONLEAVE",
      employmentType: "FULLTIME",
      password: "password123",
    },
    {
      name: "James Taylor",
      id: "T-1005",
      subjects: ["Physical Education", "Health"],
      email: "jtaylor@school.edu",
      phone: "123-456-7894",
      classes: 8,
      status: "ACTIVE",
      employmentType: "PARTTIME",
      password: "password123",
    },
    {
      name: "Lisa Wong",
      id: "T-1006",
      subjects: ["Art", "Design"],
      email: "lwong@school.edu",
      phone: "123-456-7895",
      classes: 4,
      status: "ACTIVE",
      employmentType: "PARTTIME",
      password: "password123",
    },
    {
      name: "Robert Smith",
      id: "T-1007",
      subjects: ["Music Theory", "Band"],
      email: "rsmith@school.edu",
      phone: "123-456-7896",
      classes: 5,
      status: "ACTIVE",
      employmentType: "FULLTIME",
      password: "password123",
    },
    {
      name: "Emily Davis",
      id: "T-1008",
      subjects: ["Biology", "Environmental Science"],
      email: "edavis@school.edu",
      phone: "123-456-7897",
      classes: 6,
      status: "ACTIVE",
      employmentType: "FULLTIME",
      password: "password123",
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
  const [formErrors, setFormErrors] = useState({});
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    subjects: [],
    status: "ACTIVE",
    employmentType: "FULLTIME",
    classes: 0,
    address: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    qualification: "",
    experience: 0,
    specialization: "",
    emergencyContact: "",
    joinDate: "",
    additionalNotes: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);
  const itemsPerPage = 5;

  // Validate teacher data using Zod schema
  const validateTeacher = (teacherData) => {
    try {
      teacherSchema.parse(teacherData);
      return { valid: true, errors: {} };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap = {};
        error.errors.forEach((err) => {
          errorMap[err.path.join(".")] = err.message;
        });
        return { valid: false, errors: errorMap };
      }
      return { valid: false, errors: { general: "Validation failed" } };
    }
  };

  // Handler for adding a new teacher
  const handleAddTeacher = () => {
    // Validate the new teacher data
    const { valid, errors } = validateTeacher(newTeacher);

    if (!valid) {
      setFormErrors(errors);
      return;
    }

    const nextId = `T-${1000 + teachers.length + 1}`;
    const teacherToAdd = { ...newTeacher, id: nextId };
    setTeachers([...teachers, teacherToAdd]);
    setIsAddDialogOpen(false);
    setFormErrors({});
    setNewTeacher({
      name: "",
      email: "",
      phone: "",
      password: "",
      subjects: [],
      status: "ACTIVE",
      employmentType: "FULLTIME",
      classes: 0,
      address: "",
      city: "",
      state: "",
      zipCode: "",
      dateOfBirth: "",
      qualification: "",
      experience: 0,
      specialization: "",
      emergencyContact: "",
      joinDate: "",
      additionalNotes: "",
    });
  };

  // Handler for updating a teacher
  const handleUpdateTeacher = () => {
    // Validate the updated teacher data
    const { valid, errors } = validateTeacher(currentTeacher);

    if (!valid) {
      setFormErrors(errors);
      return;
    }

    setTeachers(
      teachers.map((teacher) =>
        teacher.id === currentTeacher.id ? currentTeacher : teacher
      )
    );
    setIsEditDialogOpen(false);
    setFormErrors({});
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
      statusFilter === "All Statuses" ||
      statusMap[teacher.status] === statusFilter ||
      teacher.status === statusFilter;

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
    (t) => t.employmentType === "FULLTIME"
  ).length;
  const partTimeCount = teachers.filter(
    (t) => t.employmentType === "PARTTIME"
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
          <option>Inactive</option>
          <option>Terminated</option>
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
                        teacher.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : teacher.status === "ONLEAVE"
                          ? "bg-yellow-100 text-yellow-800"
                          : teacher.status === "INACTIVE"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {statusMap[teacher.status] || teacher.status}
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
                        setFormErrors({});
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
            {Object.keys(formErrors).length > 0 && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertDescription>
                  <ul className="list-disc pl-5">
                    {Object.values(formErrors).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-right">
                  Full Name*
                </Label>
                <Input
                  id="name"
                  value={newTeacher.name}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, name: e.target.value })
                  }
                  placeholder="John Doe"
                  className={formErrors.name ? "border-red-500" : ""}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email" className="text-right">
                  Email*
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newTeacher.email}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, email: e.target.value })
                  }
                  placeholder="john.doe@school.edu"
                  className={formErrors.email ? "border-red-500" : ""}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="password" className="text-right">
                  Password*
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={newTeacher.password}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, password: e.target.value })
                  }
                  placeholder="******"
                  className={formErrors.password ? "border-red-500" : ""}
                />
                {formErrors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.password}
                  </p>
                )}
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
                  <option value="ACTIVE">Active</option>
                  <option value="ONLEAVE">On Leave</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="TERMINATED">Terminated</option>
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
                  <option value="FULLTIME">Full-time</option>
                  <option value="PARTTIME">Part-time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="TEMPORARY">Temporary</option>
                </select>
              </div>
            </div>

            <div>
              <Label className="block mb-2">Subjects*</Label>
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
              {formErrors.subjects && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.subjects}
                </p>
              )}
            </div>

            <div className="border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAdvancedFields(!showAdvancedFields)}
                className="mb-4"
              >
                {showAdvancedFields ? "Hide" : "Show"} Advanced Fields
              </Button>

              {showAdvancedFields && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={newTeacher.address}
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          address: e.target.value,
                        })
                      }
                      placeholder="123 Main St"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={newTeacher.city}
                      onChange={(e) =>
                        setNewTeacher({ ...newTeacher, city: e.target.value })
                      }
                      placeholder="Anytown"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={newTeacher.state}
                      onChange={(e) =>
                        setNewTeacher({ ...newTeacher, state: e.target.value })
                      }
                      placeholder="CA"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      value={newTeacher.zipCode}
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          zipCode: e.target.value,
                        })
                      }
                      placeholder="12345"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={newTeacher.dateOfBirth}
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          dateOfBirth: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="qualification">Qualification</Label>
                    <Input
                      id="qualification"
                      value={newTeacher.qualification}
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          qualification: e.target.value,
                        })
                      }
                      placeholder="PhD in Mathematics"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={newTeacher.experience}
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          experience: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      value={newTeacher.specialization}
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          specialization: e.target.value,
                        })
                      }
                      placeholder="Advanced Calculus, Data Science"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={newTeacher.emergencyContact}
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          emergencyContact: e.target.value,
                        })
                      }
                      placeholder="Jane Doe: 123-456-7890"
                    />
                  </div>
                  <div>
                    <Label htmlFor="joinDate">Joining Date</Label>
                    <Input
                      id="joinDate"
                      type="date"
                      value={newTeacher.joinDate}
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          joinDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <textarea
                      id="additionalNotes"
                      className="w-full p-2 border rounded-md h-24"
                      value={newTeacher.additionalNotes}
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          additionalNotes: e.target.value,
                        })
                      }
                      placeholder="Additional information about the teacher"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                setFormErrors({});
              }}
            >
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
                <div className="font-semibold">Name:</div>
                <div className="col-span-2">{currentTeacher.name}</div>

                <div className="font-semibold">ID:</div>
                <div className="col-span-2">{currentTeacher.id}</div>

                <div className="font-semibold">Email:</div>
                <div className="col-span-2">{currentTeacher.email}</div>

                <div className="font-semibold">Phone:</div>
                <div className="col-span-2">
                  {currentTeacher.phone || "N/A"}
                </div>

                <div className="font-semibold">Classes:</div>
                <div className="col-span-2">{currentTeacher.classes}</div>

                <div className="font-semibold">Status:</div>
                <div className="col-span-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      currentTeacher.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : currentTeacher.status === "ONLEAVE"
                        ? "bg-yellow-100 text-yellow-800"
                        : currentTeacher.status === "INACTIVE"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {statusMap[currentTeacher.status] || currentTeacher.status}
                  </span>
                </div>

                <div className="font-semibold">Employment:</div>
                <div className="col-span-2">
                  {employmentTypeMap[currentTeacher.employmentType] ||
                    currentTeacher.employmentType}
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-semibold">Subjects:</div>
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

              {currentTeacher.address && (
                <div className="space-y-2">
                  <div className="font-semibold">Address:</div>
                  <div>
                    {currentTeacher.address}
                    {currentTeacher.city && `, ${currentTeacher.city}`}
                    {currentTeacher.state && `, ${currentTeacher.state}`}
                    {currentTeacher.zipCode && ` ${currentTeacher.zipCode}`}
                  </div>
                </div>
              )}

              {currentTeacher.dateOfBirth && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-semibold">Date of Birth:</div>
                  <div className="col-span-2">{currentTeacher.dateOfBirth}</div>
                </div>
              )}

              {currentTeacher.qualification && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-semibold">Qualification:</div>
                  <div className="col-span-2">
                    {currentTeacher.qualification}
                  </div>
                </div>
              )}

              {currentTeacher.experience > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-semibold">Experience:</div>
                  <div className="col-span-2">
                    {currentTeacher.experience} years
                  </div>
                </div>
              )}

              {currentTeacher.specialization && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-semibold">Specialization:</div>
                  <div className="col-span-2">
                    {currentTeacher.specialization}
                  </div>
                </div>
              )}

              {currentTeacher.emergencyContact && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-semibold">Emergency:</div>
                  <div className="col-span-2">
                    {currentTeacher.emergencyContact}
                  </div>
                </div>
              )}

              {currentTeacher.joinDate && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-semibold">Joined:</div>
                  <div className="col-span-2">{currentTeacher.joinDate}</div>
                </div>
              )}

              {currentTeacher.additionalNotes && (
                <div className="space-y-2">
                  <div className="font-semibold">Notes:</div>
                  <div className="text-sm bg-gray-50 p-2 rounded">
                    {currentTeacher.additionalNotes}
                  </div>
                </div>
              )}
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
              <DialogTitle>Edit Teacher</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {Object.keys(formErrors).length > 0 && (
                <Alert
                  variant="destructive"
                  className="bg-red-50 border-red-200"
                >
                  <AlertDescription>
                    <ul className="list-disc pl-5">
                      {Object.values(formErrors).map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name" className="text-right">
                    Full Name*
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
                    className={formErrors.name ? "border-red-500" : ""}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="edit-email" className="text-right">
                    Email*
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
                    className={formErrors.email ? "border-red-500" : ""}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.email}
                    </p>
                  )}
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
                    <option value="ACTIVE">Active</option>
                    <option value="ONLEAVE">On Leave</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="TERMINATED">Terminated</option>
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
                    <option value="FULLTIME">Full-time</option>
                    <option value="PARTTIME">Part-time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="TEMPORARY">Temporary</option>
                  </select>
                </div>
              </div>

              <div>
                <Label className="block mb-2">Subjects*</Label>
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
                {formErrors.subjects && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.subjects}
                  </p>
                )}
              </div>

              <div className="border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAdvancedFields(!showAdvancedFields)}
                  className="mb-4"
                >
                  {showAdvancedFields ? "Hide" : "Show"} Advanced Fields
                </Button>

                {showAdvancedFields && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="edit-address">Address</Label>
                      <Input
                        id="edit-address"
                        value={currentTeacher.address || ""}
                        onChange={(e) =>
                          setCurrentTeacher({
                            ...currentTeacher,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-city">City</Label>
                      <Input
                        id="edit-city"
                        value={currentTeacher.city || ""}
                        onChange={(e) =>
                          setCurrentTeacher({
                            ...currentTeacher,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-state">State</Label>
                      <Input
                        id="edit-state"
                        value={currentTeacher.state || ""}
                        onChange={(e) =>
                          setCurrentTeacher({
                            ...currentTeacher,
                            state: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-zipCode">Zip Code</Label>
                      <Input
                        id="edit-zipCode"
                        value={currentTeacher.zipCode || ""}
                        onChange={(e) =>
                          setCurrentTeacher({
                            ...currentTeacher,
                            zipCode: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-dateOfBirth">Date of Birth</Label>
                      <Input
                        id="edit-dateOfBirth"
                        type="date"
                        value={currentTeacher.dateOfBirth || ""}
                        onChange={(e) =>
                          setCurrentTeacher({
                            ...currentTeacher,
                            dateOfBirth: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-qualification">Qualification</Label>
                      <Input
                        id="edit-qualification"
                        value={currentTeacher.qualification || ""}
                        onChange={(e) =>
                          setCurrentTeacher({
                            ...currentTeacher,
                            qualification: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-experience">
                        Years of Experience
                      </Label>
                      <Input
                        id="edit-experience"
                        type="number"
                        value={currentTeacher.experience || 0}
                        onChange={(e) =>
                          setCurrentTeacher({
                            ...currentTeacher,
                            experience: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-specialization">
                        Specialization
                      </Label>
                      <Input
                        id="edit-specialization"
                        value={currentTeacher.specialization || ""}
                        onChange={(e) =>
                          setCurrentTeacher({
                            ...currentTeacher,
                            specialization: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-emergencyContact">
                        Emergency Contact
                      </Label>
                      <Input
                        id="edit-emergencyContact"
                        value={currentTeacher.emergencyContact || ""}
                        onChange={(e) =>
                          setCurrentTeacher({
                            ...currentTeacher,
                            emergencyContact: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-joinDate">Joining Date</Label>
                      <Input
                        id="edit-joinDate"
                        type="date"
                        value={currentTeacher.joinDate || ""}
                        onChange={(e) =>
                          setCurrentTeacher({
                            ...currentTeacher,
                            joinDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="edit-additionalNotes">
                        Additional Notes
                      </Label>
                      <textarea
                        id="edit-additionalNotes"
                        className="w-full p-2 border rounded-md h-24"
                        value={currentTeacher.additionalNotes || ""}
                        onChange={(e) =>
                          setCurrentTeacher({
                            ...currentTeacher,
                            additionalNotes: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setFormErrors({});
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateTeacher}>Update Teacher</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
