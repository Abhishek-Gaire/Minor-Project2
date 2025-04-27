import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
// import { Badge } from "@/components/ui/badge.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { MoreHorizontal, Mail, Eye, Pencil, Trash } from "lucide-react";
// import { Progress } from "@/components/ui/progress.tsx";
import { useState } from "react";
import { toast } from "react-toastify"; // Or your toast library
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog.tsx";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form.tsx";
// import { Input } from "@/components/ui/input.tsx";
// import { Textarea } from "@/components/ui/textarea.tsx";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// // Contact form schema
// const contactFormSchema = z.object({
//   subject: z.string().min(1, "Subject is required"),
//   message: z.string().min(10, "Message must be at least 10 characters"),
// });

// // Contact Form Component
// const ContactForm = ({ student, onClose }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const form = useForm({
//     resolver: zodResolver(contactFormSchema),
//     defaultValues: {
//       subject: "",
//       message: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/v1/communications/contact-student`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             studentId: student.id,
//             subject: data.subject,
//             message: data.message,
//           }),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to send message");
//       }

//       toast.success(`Message sent to ${student.name}`);
//       onClose();
//     } catch (error) {
//       console.error("Error sending message:", error);
//       toast.error(error.message || "Failed to send message");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <FormField
//           control={form.control}
//           name="subject"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Subject</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter the subject" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="message"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Message</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Enter your message"
//                   className="min-h-32"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <DialogFooter>
//           <Button type="button" variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? "Sending..." : "Send Message"}
//           </Button>
//         </DialogFooter>
//       </form>
//     </Form>
//   );
// };

// Student Details Component

const StudentDetails = ({ student }: { student: any }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium text-sm text-gray-500">
            Personal Information
          </h3>
          <div className="mt-2 space-y-2">
            <p>
              <span className="font-medium">Full Name:</span> {student.name}
            </p>
            <p>
              <span className="font-medium">Grade:</span> {student.grade}
            </p>
            <p>
              <span className="font-medium">ID:</span> {student.id}
            </p>
            {student.studentDetails?.gender && (
              <p>
                <span className="font-medium">Gender:</span>{" "}
                {student.studentDetails.gender}
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-sm text-gray-500">
            Academic Information
          </h3>
          <div className="mt-2 space-y-2">
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {student.studentDetails?.phone}
            </p>
            <p>
              <span className="font-medium">Section:</span>{" "}
              {student.studentDetails?.section}
            </p>
            <p>
              <span className="font-medium">Academic Year:</span>{" "}
              {student.studentDetails?.academicYear}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

const TableSelection = ({ paginatedData, onStudentDeleted, onEditStudent }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [dialogType, setDialogType] = useState(null); // 'contact' or 'details'

  const handleCloseDialog = () => {
    setDialogType(null);
    setSelectedStudent(null);
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setIsDeleting(true);
      try {
        const response = await fetch(
          `${BACKEND_URI}/api/v1/admin/student/${studentId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete student");
        }

        toast.success("Student deleted successfully");

        if (onStudentDeleted) {
          onStudentDeleted(studentId);
        }
      } catch (error) {
        console.error("Error deleting student:", error);
        toast.error(error.message || "Failed to delete student");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setDialogType("details");
  };

  // const handleContactStudent = (student) => {
  //   setSelectedStudent(student);
  //   setDialogType("contact");
  // };

  const handleEditStudent = (student) => {
    if (onEditStudent) {
      onEditStudent(student);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Academic Year</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>{student.studentDetails.phone}</TableCell>
              <TableCell>{student.studentDetails.section}</TableCell>
              <TableCell>{student.studentDetails.academicYear}</TableCell>
              <TableCell>{student.studentDetails.gender}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleViewDetails(student)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleEditStudent(student)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Student
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Student
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Student Details Dialog */}
      <Dialog open={dialogType === "details"} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>
              Comprehensive information about {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && <StudentDetails student={selectedStudent} />}

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Close
            </Button>
            {/* <Button
              variant="outline"
              onClick={() => {
                handleCloseDialog();
                handleContactStudent(selectedStudent);
              }}
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </Button> */}
            <Button
              onClick={() => {
                handleCloseDialog();
                handleEditStudent(selectedStudent);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Student Dialog */}
      {/* <Dialog open={dialogType === "contact"} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Contact {selectedStudent?.name}</DialogTitle>
            <DialogDescription>
              Send a message to the student or their guardian
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <ContactForm
              student={selectedStudent}
              onClose={handleCloseDialog}
            />
          )}
        </DialogContent>
      </Dialog> */}
    </>
  );
};

export default TableSelection;
