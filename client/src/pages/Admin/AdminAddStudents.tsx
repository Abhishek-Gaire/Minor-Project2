import React, { useState, useEffect } from "react";
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

import { toast } from "react-toastify";
import TabsListComponents from "@/components/Admin/Students/AddStudents/TabsList.tsx";
import PersonalDetailsTab from "@/components/Admin/Students/AddStudents/PersonalDetailsTab.tsx";
import AcademicDetailsTab from "@/components/Admin/Students/AddStudents/AcademicDetailsTab.tsx";
import ContactInformationTab from "@/components/Admin/Students/AddStudents/ContactInformationTab.tsx";
import GuardianInformationTab from "@/components/Admin/Students/AddStudents/GuardianInformationTab.tsx";
import AdditionalInformationTab from "@/components/Admin/Students/AddStudents/AdditionalInformationTab.tsx";
import { studentFormSchema } from "@/constants/types";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

type FormValues = z.infer<typeof studentFormSchema>;

// Map of field names to their respective tabs
const fieldToTabMapping = {
  // Personal tab fields
  firstName: "personal",
  middleName: "personal",
  lastName: "personal",
  gender: "personal",
  dateOfBirth: "personal",

  // Academic tab fields
  grade: "academic",
  section: "academic",
  rollNumber: "academic",
  previousSchool: "academic",
  academicYear: "academic",

  // Contact tab fields
  email: "contact",
  phone: "contact",
  alternatePhone: "contact",
  address: "contact",
  city: "contact",
  state: "contact",
  zipCode: "contact",

  // Parent/Guardian tab fields
  parentName: "parent",
  relationship: "parent",
  parentPhone: "parent",
  parentEmail: "parent",

  // Additional tab fields
  bloodGroup: "additional",
  medicalInformation: "additional",
  hobbies: "additional",
  extraCurricular: "additional",
  additionalNotes: "additional",
};

const AddStudentForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isFormValid, setIsFormValid] = useState(false);
  const [tabsWithErrors, setTabsWithErrors] = useState<Record<string, boolean>>(
    {
      personal: false,
      academic: false,
      contact: false,
      parent: false,
      additional: false,
    }
  );

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
    mode: "onChange", // This will trigger validation on each field change
  });

  const { formState } = form;
  const { errors, isValid } = formState;

  // Update form validity and track which tabs have errors
  useEffect(() => {
    setIsFormValid(isValid);

    // Check for errors in each tab
    const newTabsWithErrors = {
      personal: false,
      academic: false,
      contact: false,
      parent: false,
      additional: false,
    };

    Object.keys(errors).forEach((fieldName) => {
      const fieldTab =
        fieldToTabMapping[fieldName as keyof typeof fieldToTabMapping];
      if (fieldTab) {
        newTabsWithErrors[fieldTab] = true;
      }
    });

    setTabsWithErrors(newTabsWithErrors);
  }, [errors, isValid]);

  const onSubmit = async (data: FormValues) => {
    try {
      // Make the API call to add a new student
      const response = await fetch(`${BACKEND_URI}/api/v1/admin/student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add student");
      }

      toast.success(
        `Student ${data.firstName} ${data.lastName} added successfully`
      );
      // Optionally reset the form after successful submission
      form.reset();
      setActiveTab("personal");
    } catch (error: any) {
      console.error("Error adding student:", error);
      toast.error(error.message || "Failed to add student");
    }
  };

  // This function will be called if the form submission fails due to validation errors
  const onError = (errors: any) => {
    console.log("Form validation failed", errors);

    // Find the first tab with errors and navigate to it
    for (const tab of [
      "personal",
      "academic",
      "contact",
      "parent",
      "additional",
    ]) {
      if (tabsWithErrors[tab]) {
        setActiveTab(tab);
        toast.error("Please fix the errors in the form");
        break;
      }
    }
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

  // Modified TabsListComponents to show error indicators
  const ModifiedTabsList = () => (
    <TabsListComponents tabsWithErrors={tabsWithErrors} />
  );

  return (
    <div className="mx-auto py-10 px-4">
      <Card className="w-full h-full">
        <CardHeader className="bg-slate-50 border-b">
          <div className="flex items-center">
            <UserPlus className="h-6 w-6 mr-2 text-blue-600" />
            <CardTitle>Add New Student</CardTitle>
          </div>
          <CardDescription>Enter student details</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <ModifiedTabsList />

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
                isSubmitDisabled={!isFormValid}
              />
            </Tabs>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddStudentForm;
