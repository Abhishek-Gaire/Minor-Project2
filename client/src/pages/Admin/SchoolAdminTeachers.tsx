import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";

import { Input } from "@/components/ui/input.tsx";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import TeacherHeader from "@/components/Admin/Teachers/TeacherHEader";
import TeacherDetailsCard from "@/components/Admin/Teachers/TeacherDetailsCard";
import {
  allSubjects,
  statusMap,
  employmentTypeMap,
} from "@/constants/constants";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

const TeachersManagementPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await fetch(`${BACKEND_URI}/api/v1/admin/teacher`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        toast.error("Error While Fetching the Teachers");
      }
      const resData = await response.json();
      setTeachers(resData.data);
    };
    fetchTeachers();
  }, []);

  // Add form using React Hook Form
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: addErrors },
    setValue: setAddValue,
    watch: watchAdd,
    reset: resetAddForm,
  } = useForm({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subjects: [],
      status: "ACTIVE",
      grade: "",
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
    },
  });

  // Edit form using React Hook Form
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: editErrors },
    setValue: setEditValue,
    watch: watchEdit,
    reset: resetEditForm,
  } = useForm({
    resolver: zodResolver(teacherSchema),
  });

  // Watch for subject changes in both forms
  const addSubjects = watchAdd("subjects") || [];
  const editSubjects = watchEdit("subjects") || [];

  // Initialize edit form when opening edit dialog
  const openEditDialog = (teacher) => {
    setCurrentTeacher(teacher);
    setIsEditDialogOpen(true);

    // Reset form with current teacher values
    Object.keys(teacher).forEach((key) => {
      setEditValue(key, teacher[key]);
    });
  };

  // Submit handler for adding a new teacher
  const onAddSubmit = (data) => {
    const nextId = `T-${1000 + teachers.length + 1}`;
    const teacherToAdd = { ...data, id: nextId };
    setTeachers([...teachers, teacherToAdd]);
    setIsAddDialogOpen(false);
    resetAddForm();
  };

  // Submit handler for updating a teacher
  const onEditSubmit = (data) => {
    setTeachers(
      teachers.map((teacher) =>
        teacher.id === currentTeacher.id
          ? { ...data, id: currentTeacher.id }
          : teacher
      )
    );
    setIsEditDialogOpen(false);
  };

  // Handler for subject checkbox in add form
  const handleAddSubjectToggle = (subject) => {
    const currentSubjects = watchAdd("subjects") || [];
    if (currentSubjects.includes(subject)) {
      setAddValue(
        "subjects",
        currentSubjects.filter((s) => s !== subject)
      );
    } else {
      setAddValue("subjects", [...currentSubjects, subject]);
    }
  };

  // Handler for subject checkbox in edit form
  const handleEditSubjectToggle = (subject) => {
    const currentSubjects = watchEdit("subjects") || [];
    if (currentSubjects.includes(subject)) {
      setEditValue(
        "subjects",
        currentSubjects.filter((s: string) => s !== subject)
      );
    } else {
      setEditValue("subjects", [...currentSubjects, subject]);
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

  // Reset forms when closing dialogs
  const closeAddDialog = () => {
    setIsAddDialogOpen(false);
    resetAddForm();
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setCurrentTeacher(null);
  };

  return (
    <div className="space-y-6">
      <TeacherHeader
        setIsAddDialogOpen={setIsAddDialogOpen}
        totalTeachersCount={totalTeachersCount}
        fullTimeCount={fullTimeCount}
        partTimeCount={partTimeCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        subjectFilter={subjectFilter}
        setSubjectFilter={setSubjectFilter}
        allSubjects={allSubjects}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <TeacherDetailsCard
        currentTeachers={currentTeachers}
        statusMap={statusMap}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        setIsViewDialogOpen={setIsViewDialogOpen}
        setCurrentTeacher={setCurrentTeacher}
        openEditDialog={openEditDialog}
      />

      {/* Add Teacher Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmitAdd(onAddSubmit)}
            className="grid gap-4 py-4"
          >
            {Object.keys(addErrors).length > 0 && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertDescription>
                  <ul className="list-disc pl-5">
                    {Object.values(addErrors).map((error, index) => (
                      <li key={index}>{error.message}</li>
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
                  {...registerAdd("name")}
                  placeholder="John Doe"
                  className={addErrors.name ? "border-red-500" : ""}
                />
                {addErrors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {addErrors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email" className="text-right">
                  Email*
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...registerAdd("email")}
                  placeholder="john.doe@school.edu"
                  className={addErrors.email ? "border-red-500" : ""}
                />
                {addErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {addErrors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  {...registerAdd("phone")}
                  placeholder="123-456-7890"
                />
              </div>
              <div>
                <Label htmlFor="classes" className="text-right">
                  Number of Classes
                </Label>
                <Input id="classes" type="number" {...registerAdd("classes")} />
              </div>
              <div>
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <select
                  id="status"
                  className="w-full p-2 border rounded-md"
                  {...registerAdd("status")}
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
                  {...registerAdd("employmentType")}
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
                      checked={addSubjects.includes(subject)}
                      onCheckedChange={() => handleAddSubjectToggle(subject)}
                    />
                    <Label htmlFor={`subject-${subject}`} className="text-sm">
                      {subject}
                    </Label>
                  </div>
                ))}
              </div>
              {addErrors.subjects && (
                <p className="text-red-500 text-xs mt-1">
                  {addErrors.subjects.message}
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
                      {...registerAdd("address")}
                      placeholder="123 Main St"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      {...registerAdd("city")}
                      placeholder="Anytown"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      {...registerAdd("state")}
                      placeholder="CA"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      {...registerAdd("zipCode")}
                      placeholder="12345"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      {...registerAdd("dateOfBirth")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="qualification">Qualification</Label>
                    <Input
                      id="qualification"
                      {...registerAdd("qualification")}
                      placeholder="PhD in Mathematics"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      {...registerAdd("experience")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      {...registerAdd("specialization")}
                      placeholder="Advanced Calculus, Data Science"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      {...registerAdd("emergencyContact")}
                      placeholder="Jane Doe: 123-456-7890"
                    />
                  </div>
                  <div>
                    <Label htmlFor="joinDate">Joining Date</Label>
                    <Input
                      id="joinDate"
                      type="date"
                      {...registerAdd("joinDate")}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <textarea
                      id="additionalNotes"
                      className="w-full p-2 border rounded-md h-24"
                      {...registerAdd("additionalNotes")}
                      placeholder="Additional information about the teacher"
                    />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeAddDialog}>
                Cancel
              </Button>
              <Button type="submit">Add Teacher</Button>
            </DialogFooter>
          </form>
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
              {Object.keys(editErrors).length > 0 && (
                <Alert
                  variant="destructive"
                  className="bg-red-50 border-red-200"
                >
                  <AlertDescription>
                    <ul className="list-disc pl-5">
                      {Object.values(editErrors).map((error, index) => (
                        <li key={index}>
                          {typeof error?.message === "string"
                            ? error.message
                            : null}
                        </li>
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
                    {...registerEdit("name")}
                    className={editErrors.name ? "border-red-500" : ""}
                  />
                  {editErrors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {typeof editErrors.name?.message === "string"
                        ? editErrors.name.message
                        : null}
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
                    {...registerEdit("email")}
                    className={editErrors.email ? "border-red-500" : ""}
                  />
                  {editErrors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {typeof editErrors.email?.message === "string"
                        ? editErrors.email.message
                        : null}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="edit-phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="edit-phone" {...registerEdit("phone")} />
                </div>
                <div>
                  <Label htmlFor="edit-classes" className="text-right">
                    Number of Classes
                  </Label>
                  <Input
                    id="edit-classes"
                    type="number"
                    {...registerEdit("classes")}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-status" className="text-right">
                    Status
                  </Label>
                  <select
                    id="edit-status"
                    className="w-full p-2 border rounded-md"
                    {...registerEdit("status")}
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
                    {...registerEdit("employmentType")}
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
                        checked={editSubjects.includes(subject)}
                        onCheckedChange={() => handleEditSubjectToggle(subject)}
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
                {editErrors.subjects && (
                  <p className="text-red-500 text-xs mt-1">
                    {typeof editErrors.subjects?.message === "string"
                      ? editErrors.subjects.message
                      : null}
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
                      <Input id="edit-address" {...registerEdit("address")} />
                    </div>
                    <div>
                      <Label htmlFor="edit-city">City</Label>
                      <Input id="edit-city" {...registerEdit("city")} />
                    </div>
                    <div>
                      <Label htmlFor="edit-state">State</Label>
                      <Input id="edit-state" {...registerEdit("state")} />
                    </div>
                    <div>
                      <Label htmlFor="edit-zipCode">Zip Code</Label>
                      <Input id="edit-zipCode" {...registerEdit("zipCode")} />
                    </div>
                    <div>
                      <Label htmlFor="edit-dateOfBirth">Date of Birth</Label>
                      <Input
                        id="edit-dateOfBirth"
                        type="date"
                        {...registerEdit("dateOfBirth")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-qualification">Qualification</Label>
                      <Input
                        id="edit-qualification"
                        {...registerEdit("qualification")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-experience">
                        Years of Experience
                      </Label>
                      <Input
                        id="edit-experience"
                        type="number"
                        {...registerEdit("experience")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-specialization">
                        Specialization
                      </Label>
                      <Input
                        id="edit-specialization"
                        {...registerEdit("specialization")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-emergencyContact">
                        Emergency Contact
                      </Label>
                      <Input
                        id="edit-emergencyContact"
                        {...registerEdit("emergencyContact")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-joinDate">Joining Date</Label>
                      <Input
                        id="edit-joinDate"
                        type="date"
                        {...registerEdit("joinDate")}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="edit-additionalNotes">
                        Additional Notes
                      </Label>
                      <textarea
                        id="edit-additionalNotes"
                        className="w-full p-2 border rounded-md h-24"
                        {...registerEdit("additionalNotes")}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={closeEditDialog}>
                Cancel
              </Button>
              <Button onClick={handleSubmitEdit(onEditSubmit)}>
                Update Teacher
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TeachersManagementPage;
