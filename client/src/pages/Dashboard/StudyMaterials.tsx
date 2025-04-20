import { useState, useEffect } from "react";
import {
  BookOpen,
  FileText,
  Layers,
  BookMarked,
  Video,
  FileSpreadsheet,
  Upload,
  AlertCircle
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const StudyMaterialsPage = () => {
  // User role state (teacher or student)
  const [userRole, setUserRole] = useState("student");
  const [materials, setMaterials] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  // Form state for adding new material
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    course: "",
    type: "reading",
    file: null,
  });

  // Mock API functions
  const api = {
    // Fetch study materials
    fetchMaterials: async () => {
      // Simulate API call
      setIsLoading(true);
      try {
        // In a real app, this would be an actual fetch request
        // await fetch('/api/materials')
        setTimeout(() => {
          setMaterials(mockMaterials);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to load study materials");
        setIsLoading(false);
      }
    },

    // Fetch courses data
    fetchCourses: async () => {
      setIsLoading(true);
      try {
        setTimeout(() => {
          setCourses(mockCourses);
          setIsLoading(false);
        }, 600);
      } catch (err) {
        setError("Failed to load courses");
        setIsLoading(false);
      }
    },

    // Fetch assignments data
    fetchAssignments: async () => {
      setIsLoading(true);
      try {
        setTimeout(() => {
          setAssignments(mockAssignments);
          setIsLoading(false);
        }, 700);
      } catch (err) {
        setError("Failed to load assignments");
        setIsLoading(false);
      }
    },

    // Add new material (teachers only)
    addMaterial: async (materialData) => {
      if (userRole !== "teacher") {
        throw new Error("Unauthorized: Only teachers can add materials");
      }

      setIsLoading(true);
      try {
        // In a real app, this would be a POST request
        // await fetch('/api/materials', {
        //   method: 'POST',
        //   body: formData
        // })
        
        setTimeout(() => {
          // Create new material with mock ID
          const newMaterialWithId = {
            ...materialData,
            id: Math.floor(Math.random() * 1000) + 10,
            icon: getIconForType(materialData.type),
          };
          
          setMaterials(prev => [...prev, newMaterialWithId]);
          setIsLoading(false);
          
          toast({
            title: "Material Added",
            description: `"${materialData.title}" has been added successfully.`,
          });
          
          return newMaterialWithId;
        }, 1000);
      } catch (err) {
        setError("Failed to add material");
        setIsLoading(false);
        throw err;
      }
    },

    // Download material
    downloadMaterial: async (id) => {
      try {
        // In a real app, this would be a GET request to download the file
        // window.location.href = `/api/materials/${id}/download`
        toast({
          title: "Download Started",
          description: "Your download will begin shortly.",
        });
      } catch (err) {
        toast({
          title: "Download Failed",
          description: "Unable to download the material.",
          variant: "destructive",
        });
      }
    },

    // View material
    viewMaterial: async (id) => {
      try {
        // In a real app, this would redirect to a viewer or open the file
        // window.location.href = `/materials/${id}/view`
        toast({
          title: "Viewing Material",
          description: "Opening material viewer...",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "Unable to view this material.",
          variant: "destructive",
        });
      }
    }
  };

  // Mock data for courses and study materials
  const mockCourses = [
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

  const mockMaterials = [
    {
      id: 1,
      title: "Calculus Textbook Ch. 5-7",
      course: "Mathematics",
      type: "reading",
      icon: BookMarked,
      uploadedBy: "Dr. Smith",
      uploadDate: "Mar 10, 2025",
    },
    {
      id: 2,
      title: "Physics Formula Sheet",
      course: "Physics",
      type: "reference",
      icon: FileSpreadsheet,
      uploadedBy: "Prof. Johnson",
      uploadDate: "Mar 12, 2025",
    },
    {
      id: 3,
      title: "Data Structures Tutorial",
      course: "Computer Science",
      type: "video",
      icon: Video,
      uploadedBy: "Dr. Lee",
      uploadDate: "Mar 8, 2025",
    },
    {
      id: 4,
      title: "Literary Analysis Guide",
      course: "Literature",
      type: "guide",
      icon: FileText,
      uploadedBy: "Prof. Williams",
      uploadDate: "Mar 15, 2025",
    },
    {
      id: 5,
      title: "Differential Equations Notes",
      course: "Mathematics",
      type: "notes",
      icon: FileText,
      uploadedBy: "Dr. Smith",
      uploadDate: "Mar 14, 2025",
    },
    {
      id: 6,
      title: "Quantum Physics Video Lecture",
      course: "Physics",
      type: "video",
      icon: Video,
      uploadedBy: "Prof. Johnson",
      uploadDate: "Mar 12, 2025",
    },
  ];

  const mockAssignments = [
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

  // Helper function to get icon based on material type
  const getIconForType = (type) => {
    switch (type) {
      case "reading":
        return BookMarked;
      case "video":
        return Video;
      case "reference":
        return FileSpreadsheet;
      case "guide":
      case "notes":
        return FileText;
      default:
        return FileText;
    }
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        api.fetchMaterials(),
        api.fetchCourses(),
        api.fetchAssignments()
      ]);
    };
    
    loadData();
    
    // For demo purposes, you can toggle between roles
    // In a real app, this would come from authentication
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    if (role === 'teacher') {
      setUserRole("teacher");
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial(prev => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setNewMaterial(prev => ({ ...prev, file: e.target.files[0] }));
  };

  // Handle form submission
  const handleAddMaterial = async (e) => {
    e.preventDefault();
    
    if (!newMaterial.title || !newMaterial.course || !newMaterial.file) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await api.addMaterial({
        ...newMaterial,
        uploadedBy: userRole === "teacher" ? "Current Teacher" : "Unknown",
        uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      });
      
      // Reset form
      setNewMaterial({
        title: "",
        course: "",
        type: "reading",
        file: null,
      });
      
      // Close dialog (you would need to handle this through a ref or state)
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to add material",
        variant: "destructive",
      });
    }
  };

  // Helper components and functions
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

  // Filter state for materials
  const [materialFilter, setMaterialFilter] = useState("all");
  
  const filteredMaterials = materials.filter(material => {
    if (materialFilter === "all") return true;
    return material.type === materialFilter;
  });

  return (
    <div className="flex flex-col w-full bg-[hsl(var(--card))] p-4">
      {/* Role switcher for demo purposes */}
      <div className="mb-4 flex items-center justify-end">
        <Select 
          value={userRole} 
          onValueChange={setUserRole}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="teacher">Teacher</SelectItem>
          </SelectContent>
        </Select>
        <Badge className="ml-2">{userRole === "teacher" ? "Teacher View" : "Student View"}</Badge>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[hsl(var(--card-foreground))]">
          Study Materials
        </h1>
        {userRole === "teacher" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Add New Material
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Study Material</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddMaterial}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={newMaterial.title}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="course" className="text-right">
                      Course
                    </Label>
                    <Select 
                      name="course" 
                      value={newMaterial.course}
                      onValueChange={(value) => setNewMaterial(prev => ({ ...prev, course: value }))}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map(course => (
                          <SelectItem key={course.id} value={course.name}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select 
                      name="type" 
                      value={newMaterial.type}
                      onValueChange={(value) => setNewMaterial(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reading">Reading</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="reference">Reference</SelectItem>
                        <SelectItem value="guide">Guide</SelectItem>
                        <SelectItem value="notes">Notes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="file" className="text-right">
                      File
                    </Label>
                    <div className="col-span-3">
                      <Input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Material"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

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
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  <Button 
                    variant={materialFilter === "all" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setMaterialFilter("all")}
                  >
                    All
                  </Button>
                  <Button 
                    variant={materialFilter === "reading" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setMaterialFilter("reading")}
                  >
                    Reading
                  </Button>
                  <Button 
                    variant={materialFilter === "video" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setMaterialFilter("video")}
                  >
                    Video
                  </Button>
                  <Button 
                    variant={materialFilter === "reference" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setMaterialFilter("reference")}
                  >
                    Reference
                  </Button>
                </div>
                <div>
                  <Button variant="ghost" size="sm">
                    Sort by: Recent
                  </Button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredMaterials.map((material) => (
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
                        <CardDescription>
                          {material.course} • Added: {material.uploadDate}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">{material.type}</Badge>
                          <span className="text-xs text-gray-500">
                            By: {material.uploadedBy}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-0">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => api.downloadMaterial(material.id)}
                        >
                          Download
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => api.viewMaterial(material.id)}
                        >
                          View
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}

              {filteredMaterials.length > 0 && (
                <Button variant="outline" className="w-full">
                  <Layers className="h-4 w-4 mr-2" />
                  Load More Materials
                </Button>
              )}

              {filteredMaterials.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium">No materials found</h3>
                  <p className="text-gray-500">
                    {materialFilter !== "all" 
                      ? `No ${materialFilter} materials are available.` 
                      : "No study materials have been added yet."}
                  </p>
                  {userRole === "teacher" && (
                    <Button className="mt-4">
                      <Upload className="h-4 w-4 mr-2" />
                      Add Your First Material
                    </Button>
                  )}
                </div>
              )}
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