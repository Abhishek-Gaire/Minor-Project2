import {
  BookOpen,
  FileText,
  Layers,
  BookMarked,
  Video,
  FileSpreadsheet,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const StudyMaterialsPage = () => {
  // Mock data for courses and study materials
  const courses = [
    {
      id: 1,
      name: "Mathematics",
      instructor: "Dr. Smith",
      progress: 65,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Physics",
      instructor: "Prof. Johnson",
      progress: 42,
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Computer Science",
      instructor: "Dr. Lee",
      progress: 78,
      color: "bg-purple-500",
    },
    {
      id: 4,
      name: "Literature",
      instructor: "Prof. Williams",
      progress: 30,
      color: "bg-amber-500",
    },
  ];

  const studyMaterials = [
    {
      id: 1,
      title: "Calculus Textbook Ch. 5-7",
      course: "Mathematics",
      type: "reading",
      icon: BookMarked,
    },
    {
      id: 2,
      title: "Physics Formula Sheet",
      course: "Physics",
      type: "reference",
      icon: FileSpreadsheet,
    },
    {
      id: 3,
      title: "Data Structures Tutorial",
      course: "Computer Science",
      type: "video",
      icon: Video,
    },
    {
      id: 4,
      title: "Literary Analysis Guide",
      course: "Literature",
      type: "guide",
      icon: FileText,
    },
    {
      id: 5,
      title: "Differential Equations Notes",
      course: "Mathematics",
      type: "notes",
      icon: FileText,
    },
    {
      id: 6,
      title: "Quantum Physics Video Lecture",
      course: "Physics",
      type: "video",
      icon: Video,
    },
  ];

  const assignments = [
    {
      id: 1,
      title: "Calculus Problem Set",
      course: "Mathematics",
      dueDate: "Mar 18, 2025",
      status: "pending",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      course: "Physics",
      dueDate: "Mar 20, 2025",
      status: "pending",
    },
    {
      id: 3,
      title: "Algorithm Analysis",
      course: "Computer Science",
      dueDate: "Mar 15, 2025",
      status: "completed",
    },
    {
      id: 4,
      title: "Essay on Modernism",
      course: "Literature",
      dueDate: "Mar 22, 2025",
      status: "pending",
    },
  ];

  const getStatusBadge = (status) => {
    if (status === "completed") {
      return <Badge className="bg-green-500">Completed</Badge>;
    } else {
      return <Badge className="bg-amber-500">Pending</Badge>;
    }
  };

  const getMaterialIcon = (MaterialIcon) => {
    return <MaterialIcon className="h-5 w-5 text-gray-600" />;
  };

  return (
    <div className="flex flex-col w-full bg-[hsl(var(--card))] p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[hsl(var(--card-foreground))]">
          Study Materials
        </h1>
        <div>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Add New Material
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Progress */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>Track your ongoing courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-6 mr-3 rounded-full ${course.color}`}
                      ></div>
                      <span className="font-medium">{course.name}</span>
                    </div>
                    <span className="text-sm text-[hsl(var(--card-foreground))]">
                      {course.progress}%
                    </span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <BookOpen className="h-4 w-4 mr-2" />
                View All Courses
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Main content area - Materials and Assignments */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="materials" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="materials">Study Materials</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
            </TabsList>

            <TabsContent value="materials" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    All
                  </Button>
                  <Button variant="outline" size="sm">
                    Reading
                  </Button>
                  <Button variant="outline" size="sm">
                    Video
                  </Button>
                  <Button variant="outline" size="sm">
                    Reference
                  </Button>
                </div>
                <div>
                  <Button variant="ghost" size="sm">
                    Sort by: Recent
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studyMaterials.map((material) => (
                  <Card
                    key={material.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        {getMaterialIcon(material.icon)}
                        <CardTitle className="text-lg ml-2">
                          {material.title}
                        </CardTitle>
                      </div>
                      <CardDescription>{material.course}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <Badge variant="outline">{material.type}</Badge>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                      <Button size="sm">View</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="w-full">
                <Layers className="h-4 w-4 mr-2" />
                Load More Materials
              </Button>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-4 mt-4">
              {assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">
                        {assignment.title}
                      </CardTitle>
                      {getStatusBadge(assignment.status)}
                    </div>
                    <CardDescription>
                      {assignment.course} • Due: {assignment.dueDate}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-end pt-0">
                    {assignment.status === "pending" ? (
                      <Button size="sm">Submit Assignment</Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        View Feedback
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}

              <Button variant="outline" className="w-full">
                View All Assignments
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialsPage;
