import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserPlus,
  Book,
  Phone,
  User,
  Users,
  FileText,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

// Define form schema using Zod
const formSchema = z.object({
  // Personal Details
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string(),

  // Academic Details
  grade: z.enum(["5", "6", "7", "8", "9", "10"]),
  section: z.string().min(1, "Section is required"),
  rollNumber: z.string().optional(),
  previousSchool: z.string().optional(),
  academicYear: z.string().min(4, "Please enter a valid academic year"),

  // Contact Information
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  alternatePhone: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters"),

  // Parent/Guardian Information
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  relationship: z.enum(["mother", "father", "guardian", "other"]),
  parentPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  parentEmail: z.string().email("Please enter a valid email address"),

  // Additional Information
  bloodGroup: z.string().optional(),
  medicalInformation: z.string().optional(),
  hobbies: z.string().optional(),
  extraCurricular: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AddStudentForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "male",
      dateOfBirth: "",
      grade: "5",
      section: "",
      rollNumber: "",
      previousSchool: "",
      academicYear: new Date().getFullYear().toString(),
      email: "",
      phone: "",
      alternatePhone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      parentName: "",
      relationship: "guardian",
      parentPhone: "",
      parentEmail: "",
      bloodGroup: "",
      medicalInformation: "",
      hobbies: "",
      extraCurricular: "",
      additionalNotes: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast({
      title: "Student Added Successfully",
      description: `${data.firstName} ${data.lastName} has been added to grade ${data.grade}.`,
    });
    // Here you would typically send the data to your API
  };

  const moveToNextTab = () => {
    if (activeTab === "personal") setActiveTab("academic");
    else if (activeTab === "academic") setActiveTab("contact");
    else if (activeTab === "contact") setActiveTab("parent");
    else if (activeTab === "parent") setActiveTab("additional");
  };

  const moveToPreviousTab = () => {
    if (activeTab === "additional") setActiveTab("parent");
    else if (activeTab === "parent") setActiveTab("contact");
    else if (activeTab === "contact") setActiveTab("academic");
    else if (activeTab === "academic") setActiveTab("personal");
  };

  return (
    <div className=" mx-auto py-10 px-4 ">
      <Card className="w-full h-full">
        <CardHeader className="bg-slate-50 border-b">
          <div className="flex items-center">
            <UserPlus className="h-6 w-6 mr-2 text-blue-600" />
            <CardTitle>Add New Student</CardTitle>
          </div>
          <CardDescription>Enter student details</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="personal" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Personal</span>
                </TabsTrigger>
                <TabsTrigger value="academic" className="flex items-center">
                  <Book className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Academic</span>
                </TabsTrigger>
                <TabsTrigger value="contact" className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Contact</span>
                </TabsTrigger>
                <TabsTrigger value="parent" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Parent</span>
                </TabsTrigger>
                <TabsTrigger value="additional" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Additional</span>
                </TabsTrigger>
              </TabsList>

              {/* Personal Details Tab */}
              <TabsContent value="personal" className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Personal Details
                </h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      {...form.register("firstName")}
                      placeholder="John"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input
                      id="middleName"
                      {...form.register("middleName")}
                      placeholder="David"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      {...form.register("lastName")}
                      placeholder="Smith"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">
                      Gender <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                      defaultValue="male"
                      {...form.register("gender")}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">
                      Date of Birth <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      {...form.register("dateOfBirth")}
                    />
                    {form.formState.errors.dateOfBirth && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={moveToNextTab}>
                    Next: Academic Details
                  </Button>
                </div>
              </TabsContent>

              {/* Academic Details Tab */}
              <TabsContent value="academic" className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                  Academic Details
                </h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade">
                      Grade <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="5" {...form.register("grade")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Grade 5</SelectItem>
                        <SelectItem value="6">Grade 6</SelectItem>
                        <SelectItem value="7">Grade 7</SelectItem>
                        <SelectItem value="8">Grade 8</SelectItem>
                        <SelectItem value="9">Grade 9</SelectItem>
                        <SelectItem value="10">Grade 10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="section">
                      Section <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="section"
                      {...form.register("section")}
                      placeholder="A"
                    />
                    {form.formState.errors.section && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.section.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rollNumber">Roll Number</Label>
                    <Input
                      id="rollNumber"
                      {...form.register("rollNumber")}
                      placeholder="e.g., 2025001"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="academicYear">
                      Academic Year <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="academicYear"
                      {...form.register("academicYear")}
                      placeholder="2024-2025"
                    />
                    {form.formState.errors.academicYear && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.academicYear.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="previousSchool">
                    Previous School (if any)
                  </Label>
                  <Input
                    id="previousSchool"
                    {...form.register("previousSchool")}
                    placeholder="Previous school name"
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={moveToPreviousTab}
                  >
                    Previous
                  </Button>
                  <Button type="button" onClick={moveToNextTab}>
                    Next: Contact Details
                  </Button>
                </div>
              </TabsContent>

              {/* Contact Information Tab */}
              <TabsContent value="contact" className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-blue-600" />
                  Contact Information
                </h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder="student@example.com"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      {...form.register("phone")}
                      placeholder="e.g., 1234567890"
                    />
                    {form.formState.errors.phone && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Phone Number</Label>
                  <Input
                    id="alternatePhone"
                    {...form.register("alternatePhone")}
                    placeholder="e.g., 0987654321"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="address"
                    {...form.register("address")}
                    placeholder="123 Main St, Apt 4B"
                    rows={2}
                  />
                  {form.formState.errors.address && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="city"
                      {...form.register("city")}
                      placeholder="New York"
                    />
                    {form.formState.errors.city && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">
                      State <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="state"
                      {...form.register("state")}
                      placeholder="NY"
                    />
                    {form.formState.errors.state && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.state.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">
                      Zip Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="zipCode"
                      {...form.register("zipCode")}
                      placeholder="10001"
                    />
                    {form.formState.errors.zipCode && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.zipCode.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={moveToPreviousTab}
                  >
                    Previous
                  </Button>
                  <Button type="button" onClick={moveToNextTab}>
                    Next: Parent Details
                  </Button>
                </div>
              </TabsContent>

              {/* Parent/Guardian Information Tab */}
              <TabsContent value="parent" className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Parent/Guardian Information
                </h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">
                      Parent/Guardian Name{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="parentName"
                      {...form.register("parentName")}
                      placeholder="John Smith"
                    />
                    {form.formState.errors.parentName && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.parentName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="relationship">
                      Relationship <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      defaultValue="parent"
                      {...form.register("relationship")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mother">Mother</SelectItem>
                        <SelectItem value="father">Father</SelectItem>
                        <SelectItem value="guardian">Guardian</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">
                      Parent Phone <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="parentPhone"
                      {...form.register("parentPhone")}
                      placeholder="e.g., 1234567890"
                    />
                    {form.formState.errors.parentPhone && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.parentPhone.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">
                      Parent Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      {...form.register("parentEmail")}
                      placeholder="parent@example.com"
                    />
                    {form.formState.errors.parentEmail && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.parentEmail.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={moveToPreviousTab}
                  >
                    Previous
                  </Button>
                  <Button type="button" onClick={moveToNextTab}>
                    Next: Additional Info
                  </Button>
                </div>
              </TabsContent>

              {/* Additional Information Tab */}
              <TabsContent value="additional" className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Additional Information
                </h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select {...form.register("bloodGroup")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalInformation">
                      Medical Information
                    </Label>
                    <Textarea
                      id="medicalInformation"
                      {...form.register("medicalInformation")}
                      placeholder="Any allergies or medical conditions"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hobbies">Hobbies & Interests</Label>
                    <Input
                      id="hobbies"
                      {...form.register("hobbies")}
                      placeholder="e.g., Reading, Sports, Music"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="extraCurricular">
                      Extra-Curricular Activities
                    </Label>
                    <Input
                      id="extraCurricular"
                      {...form.register("extraCurricular")}
                      placeholder="e.g., Chess club, Soccer team"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    {...form.register("additionalNotes")}
                    placeholder="Any other information about the student"
                    rows={3}
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={moveToPreviousTab}
                  >
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Submit Student Information
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddStudentForm;
