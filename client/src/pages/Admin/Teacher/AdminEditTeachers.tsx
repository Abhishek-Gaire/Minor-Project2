import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { teacherSchema } from "@/constants/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { allSubjects } from "@/constants/constants";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const EditTeacherPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(!location.state?.teacher);
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);

  // Form setup with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
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

  // Watch for subject changes
  const subjects = watch("subjects") || [];
  const allowedFields = [
    "name",
    "email",
    "phone",
    "status",
    "grade",
    "employmentType",
    "classes",
    "address",
    "city",
    "state",
    "zipCode",
    "dateOfBirth",
    "qualification",
    "experience",
    "specialization",
  ] as const;

  type FieldType = (typeof allowedFields)[number];

  function isValidField(field: string): field is FieldType {
    return allowedFields.includes(field as FieldType);
  }
  useEffect(() => {
    // If teacher data was passed through location state, use it
    if (location.state?.teacher) {
      const teacher = location.state.teacher;

      Object.keys(teacher).forEach((key) => {
        if (isValidField(key)) {
          setValue(key, teacher[key]);
        } else {
          console.error("Invalid field key:", key);
        }
      });

      // Check if there are advanced fields with data to display the section
      const hasAdvancedData =
        teacher.address ||
        teacher.city ||
        teacher.state ||
        teacher.zipCode ||
        teacher.dateOfBirth ||
        teacher.qualification ||
        teacher.experience > 0 ||
        teacher.specialization ||
        teacher.emergencyContact ||
        teacher.joinDate ||
        teacher.additionalNotes;

      setShowAdvancedFields(hasAdvancedData);
    } else {
      // Fetch teacher data if not provided in location state
      const fetchTeacher = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${BACKEND_URI}/api/v1/admin/teacher/${id}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch teacher details");
          }

          const data = await response.json();
          const teacher = data.data;

          Object.keys(teacher).forEach(key => {
            if (isValidField(key)) {
              setValue(key, teacher[key]);
            } else {
              console.error("Invalid field key:", key);
            }
          });
          

          // Check if there are advanced fields with data
          const hasAdvancedData =
            teacher.address ||
            teacher.city ||
            teacher.state ||
            teacher.zipCode ||
            teacher.dateOfBirth ||
            teacher.qualification ||
            teacher.experience > 0 ||
            teacher.specialization ||
            teacher.emergencyContact ||
            teacher.joinDate ||
            teacher.additionalNotes;

          setShowAdvancedFields(hasAdvancedData);
        } catch (error) {
          toast.error(error.message || "Error fetching teacher details");
          navigate("/admin/teachers");
        } finally {
          setIsLoading(false);
        }
      };

      fetchTeacher();
    }
  }, [id, location.state, setValue, navigate]);

  // Handler for subject checkbox
  const handleSubjectToggle = (subject) => {
    const currentSubjects = watch("subjects") || [];
    if (currentSubjects.includes(subject)) {
      setValue(
        "subjects",
        currentSubjects.filter((s) => s !== subject)
      );
    } else {
      setValue("subjects", [...currentSubjects, subject]);
    }
  };

  // Submit handler
  const onSubmit = async (data) => {
    try {
      // API call to update teacher
      const response = await fetch(
        `${BACKEND_URI}/api/v1/admin/teacher/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update teacher");
      }

      toast.success("Teacher updated successfully");
      navigate(`/admin/teachers/view/${id}`, { state: { teacher: data } });
    } catch (error) {
      toast.error(error.message || "Error updating teacher");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Teacher</h1>
        <Button onClick={() => navigate("/admin/teachers")}>
          Back to List
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {Object.keys(errors).length > 0 && (
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertDescription>
                <ul className="list-disc pl-5">
                  {Object.values(errors).map((error, index) => (
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
                {...register("name")}
                placeholder="John Doe"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
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
                {...register("email")}
                placeholder="john.doe@school.edu"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="123-456-7890"
              />
            </div>
            <div>
              <Label htmlFor="classes" className="text-right">
                Number of Classes
              </Label>
              <Input id="classes" type="number" {...register("classes")} />
            </div>
            <div>
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <select
                id="status"
                className="w-full p-2 border rounded-md"
                {...register("status")}
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
                {...register("employmentType")}
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
                    checked={subjects.includes(subject)}
                    onCheckedChange={() => handleSubjectToggle(subject)}
                  />
                  <Label htmlFor={`subject-${subject}`} className="text-sm">
                    {subject}
                  </Label>
                </div>
              ))}
            </div>
            {errors.subjects && (
              <p className="text-red-500 text-xs mt-1">
                {errors.subjects.message}
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
                    {...register("address")}
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register("city")}
                    placeholder="Anytown"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" {...register("state")} placeholder="CA" />
                </div>
                <div>
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    {...register("zipCode")}
                    placeholder="12345"
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    {...register("dateOfBirth")}
                  />
                </div>
                <div>
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input
                    id="qualification"
                    {...register("qualification")}
                    placeholder="PhD in Mathematics"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    {...register("experience")}
                  />
                </div>
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    {...register("specialization")}
                    placeholder="Advanced Calculus, Data Science"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    {...register("emergencyContact")}
                    placeholder="Jane Doe: 123-456-7890"
                  />
                </div>
                <div>
                  <Label htmlFor="joinDate">Joining Date</Label>
                  <Input id="joinDate" type="date" {...register("joinDate")} />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <textarea
                    id="additionalNotes"
                    className="w-full p-2 border rounded-md h-24"
                    {...register("additionalNotes")}
                    placeholder="Additional information about the teacher"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/teachers")}
            >
              Cancel
            </Button>
            <Button type="submit">Add Teacher</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeacherPage;