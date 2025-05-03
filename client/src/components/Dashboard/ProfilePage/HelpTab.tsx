import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

const HelpTab = ({ role = "teacher" }) => {
  // State for tracking which FAQ is open
  const [openFAQ, setOpenFAQ] = useState(null);

  // Role-specific FAQ data
  const faqData = {
    teacher: [
      {
        question: "How do I upload assignments?",
        answer:
          "Navigate to your class page, select the 'Assignments' tab, and click 'Create New Assignment'. You can upload files, add instructions, set due dates, and assign points. Don't forget to click 'Publish' when you're ready for students to see it.",
      },
      {
        question: "How do I grade submitted assignments?",
        answer:
          "From your Dashboard, go to 'Assignments' and select 'Submissions'. You'll see all student submissions organized by assignment. Click on any submission to view, add comments, and assign a grade. Students will be notified when their work is graded.",
      },
      {
        question: "How do I start an online class session?",
        answer:
          "Go to your class page and click 'Start Live Session' in the Online Class tab. You can choose to enable video, share your screen, and use the interactive whiteboard. Students will receive a notification that class is starting.",
      },
      // {
      //   question: "How do I message students privately?",
      //   answer:
      //     "Use the 'Messages' section to start a private conversation with any student in your classes. You can also select multiple students to create a group chat for project teams or study groups.",
      // },
    ],
    student: [
      {
        question: "How do I submit my assignments?",
        answer:
          "Go to the 'Assignments' tab in your class, select the assignment you want to submit, and click 'Submit Work'. You can upload files or type your answers directly. Make sure to submit before the due date to avoid late penalties.",
      },
      {
        question: "How do I check my grades?",
        answer:
          "Visit the 'Grades' section to see all your assignments and their scores. You can filter by class or time period. Click on any graded assignment to see teacher feedback and comments.",
      },
      {
        question: "How do I join an online class?",
        answer:
          "When your teacher starts an online class, you'll receive a notification. Click 'Join Now' to enter the virtual classroom. Make sure your camera and microphone are working if you need to participate.",
      },
      {
        question: "How do I message my teacher or classmates?",
        answer:
          "Use the 'Messages' section to contact your teacher privately with questions. You can also participate in class discussions in the public chat area for each of your classes.",
      },
    ],
  };

  // // Role-specific documentation data
  // const documentationData = {
  //   teacher: [
  //     {
  //       title: "Getting Started for Teachers",
  //       description:
  //         "Learn how to set up your classes, invite students, and organize your teaching materials.",
  //     },
  //     {
  //       title: "Assignment Management",
  //       description:
  //         "Create effective assignments, track submissions, and provide timely feedback.",
  //     },
  //     {
  //       title: "Virtual Classroom Tips",
  //       description:
  //         "Best practices for engaging students in online classes for grades 5-10.",
  //     },
  //     {
  //       title: "Grading Tools & Rubrics",
  //       description:
  //         "Learn to use the grading system efficiently and create custom rubrics.",
  //     },
  //   ],
  //   student: [
  //     {
  //       title: "Getting Started for Students",
  //       description:
  //         "Learn how to join classes, organize your assignments, and communicate with teachers.",
  //     },
  //     {
  //       title: "Study Tools & Resources",
  //       description:
  //         "Discover built-in tools to help with homework, studying, and group projects.",
  //     },
  //     {
  //       title: "Virtual Classroom Participation",
  //       description:
  //         "How to make the most of online classes and interactive features.",
  //     },
  //     {
  //       title: "Assignment Submission Guide",
  //       description:
  //         "Tips for submitting your best work and tracking due dates.",
  //     },
  //   ],
  // };

  // Handle FAQ toggle
  const toggleFAQ = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null);
    } else {
      setOpenFAQ(index);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Help & Support {role === "teacher" ? "for Teachers" : "for Students"}
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqData[role].map((faq, index) => (
              <div key={index} className="border rounded-md overflow-hidden">
                <button
                  className="flex items-center justify-between w-full p-4 text-left bg-[hsl(var(--accent))] hover:bg-[hsl(var(--muted))]"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="p-4 bg-[hsl(var(--muted))]">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* <div>
          <h3 className="text-lg font-medium mb-3">Contact Support</h3>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-1">
                Subject
              </label>
              <select className="w-full p-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))]">
                {role === "teacher" ? (
                  <>
                    <option>Technical Issue</option>
                    <option>Class Management</option>
                    <option>Assignment Problems</option>
                    <option>Student Access</option>
                    <option>Grading System</option>
                    <option>Other</option>
                  </>
                ) : (
                  <>
                    <option>Technical Issue</option>
                    <option>Assignment Help</option>
                    <option>Access Problems</option>
                    <option>Missing Materials</option>
                    <option>Other</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-1">
                Message
              </label>
              <textarea
                className="w-full p-2 border border-[hsl(var(--border))] bg-[hsl(var(--accent))] rounded-md h-32"
                placeholder={
                  role === "teacher"
                    ? "Describe your issue or question regarding your class management..."
                    : "Describe your issue or question about your classes..."
                }
              />
            </div>
          </div>

          <button className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-md flex items-center mt-4">
            Send Message
          </button>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">
            Documentation & Tutorials
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentationData[role].map((doc, index) => (
              <div
                key={index}
                className="border rounded-md p-4 hover:bg-[hsl(var(--muted))] cursor-pointer"
              >
                <h4 className="font-medium mb-1">{doc.title}</h4>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">
                  {doc.description}
                </p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HelpTab;
