import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";

import { toast } from "@/hooks/use-toast";
import TabsListComponents from "@/components/Admin/Students/AddStudents/TabsList.tsx";
import PersonalDetailsTab from "@/components/Admin/Students/AddStudents/PersonalDetailsTab.tsx";
import AcademicDetailsTab from "@/components/Admin/Students/AddStudents/AcademicDetailsTab.tsx";
import ContactInformationTab from "@/components/Admin/Students/AddStudents/ContactInformationTab.tsx";
import GuardianInformationTab from "@/components/Admin/Students/AddStudents/GuardianInformationTab.tsx";
import AdditionalInformationTab from "@/components/Admin/Students/AddStudents/AdditionalInformationTab.tsx";
import { studentFormSchema } from "@/constants/types";

type FormValues = z.infer<typeof studentFormSchema>;

const AddStudentForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const form = useForm<FormValues>({
    resolver: zodResolver(studentFormSchema),
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
              <TabsListComponents />

              {/* Personal Details Tab */}
              <PersonalDetailsTab form={form} moveToNextTab={moveToNextTab} />

              {/* Academic Details Tab */}
              <AcademicDetailsTab
                form={form}
                moveToPreviousTab={moveToPreviousTab}
                moveToNextTab={moveToNextTab}
              />

              {/* Contact Information Tab */}
              <ContactInformationTab
                form={form}
                moveToNextTab={moveToNextTab}
                moveToPreviousTab={moveToPreviousTab}
              />

              {/* Parent/Guardian Information Tab */}
              <GuardianInformationTab
                form={form}
                moveToNextTab={moveToNextTab}
                moveToPreviousTab={moveToNextTab}
              />

              {/* Additional Information Tab */}
              <AdditionalInformationTab
                form={form}
                moveToPreviousTab={moveToPreviousTab}
              />
            </Tabs>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddStudentForm;
