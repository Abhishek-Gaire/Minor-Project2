import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const AddTeacherPage = () => {
  const navigate = useNavigate();
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);

  // Add form using React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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
      classes: Number(0),
      address: "",
      city: "",
      state: "",
      zipCode: "",
      dateOfBirth: "",
      qualification: "",
      experience: Number(0),
      specialization: "",
      emergencyContact: "",
      joinDate: "",
      additionalNotes: "",
    },
  });

  // Watch for subject changes
  const subjects = watch("subjects") || [];

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
      // API call to add teacher
      const response = await fetch(`${BACKEND_URI}/api/v1/admin/teacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add teacher");
      }

      toast.success("Teacher added successfully");
      navigate("/admin/teachers");
    } catch (error) {
      toast.error(error.message || "Error adding teacher");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Teacher</h1>
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
              <Input id="classes" type="number" {...register("classes", { valueAsNumber: true })} />
              {errors.classes && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.classes.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="grade" className="text-right">
                Grades
              </Label>
              <Input id="grade" {...register("grade")} />
              {errors.grade && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.grade.message}
                </p>
              )}
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
              {errors.status && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.status.message}
                </p>
              )}
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
              {errors.employmentType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.employmentType.message}
                </p>
              )}
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
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register("city")}
                    placeholder="Anytown"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" {...register("state")} placeholder="CA" />
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    {...register("zipCode")}
                    placeholder="12345"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    {...register("dateOfBirth")}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input
                    id="qualification"
                    {...register("qualification")}
                    placeholder="PhD in Mathematics"
                  />
                  {errors.qualification && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.qualification.message}
                    </p>
                  )}
                      </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    {...register("experience", { valueAsNumber: true })}
                  />
                  {errors.experience && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.experience.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    {...register("specialization")}
                    placeholder="Advanced Calculus, Data Science"
                  />
                  {errors.specialization && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.specialization.message}
                    </p>
                  )}
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

export default AddTeacherPage;
