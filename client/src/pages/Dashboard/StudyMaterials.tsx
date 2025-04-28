import { useState, useEffect } from "react";
import {
  FileText,
  Layers,
  BookMarked,
  Video,
  FileSpreadsheet,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/useAuth";
import AddNewMaterials from "@/components/Dashboard/Materials/AddNewMaterials";
import MaterialFilters from "@/components/Dashboard/Materials/MaterialFilters";
import FilteredMaterialsCard from "@/components/Dashboard/Materials/FilteredMaterialsCard";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;
const StudyMaterialsPage = () => {
  const { user } = useAuth();
  const userRole = user?.role;
  const [materials, setMaterials] = useState([]);
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

  // API functions
  const api = {
    // Fetch study materials
    fetchMaterials: async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BACKEND_URI}/api/v1/teacher/materials`);
        if (!response.ok) {
          throw new Error('Failed to fetch materials');
        }
        const data = await response.json();
        setMaterials(data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load study materials");
        setIsLoading(false);
      }
    },
    // Add new material (teachers only)
    addMaterial: async (materialData) => {
      if (userRole !== "teacher") {
        throw new Error("Unauthorized: Only teachers can add materials");
      }
    
      if (!materialData.file) {
        throw new Error("File is required for adding materials");
      }
    
      setIsLoading(true);
      try {
        // Create FormData for the file upload
        const formData = new FormData();
        
        // Add the file
        formData.append('file', materialData.file);
        
        // Add other material data as separate fields or as JSON
        const metadataFields = { ...materialData };
        delete metadataFields.file; // Remove file from metadata
        
        // You can either append each field individually:
        Object.keys(metadataFields).forEach(key => {
          formData.append(key, metadataFields[key]);
        });
        
        // Make actual API call
        const response = await fetch(`${BACKEND_URI}/api/v1/teacher/materials`, {
          method: 'POST',
          body: formData,
          // No Content-Type header - browser will set it with boundary parameter
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to add material');
        }
        
        // Get the newly created material with server-generated ID
        const newMaterialWithId = await response.json();
        
        // Update local state with the new material
        setMaterials((prev) => [...prev, {
          ...newMaterialWithId,
          icon: getIconForType(newMaterialWithId.type),
        }]);
        
        toast({
          title: "Material Added",
          description: `"${materialData.title}" has been added successfully.`,
        });
        
        return newMaterialWithId;
      } catch (err) {
        setError(err.message || "Failed to add material");
        toast({
          title: "Error",
          description: err.message || "Failed to add material",
          variant: "destructive",
        });
        throw err;
      } finally {
        setIsLoading(false);
      }
    },

    // Download material
    downloadMaterial: async (id) => {
      try {
        setIsLoading(true);
        // Make an API call to get the Supabase publicURL
        const response = await fetch(
          `${BACKEND_URI}/api/v1/teacher/materials/${id}/download`
        );

        if (!response.ok) {
          throw new Error("Failed to download material");
        }

        const data = await response.json();

        if (data.publicURL) {
          // Open the Supabase public URL in a new tab
          window.open(data.publicURL, "_blank");

          // Alternatively, if you want to force download instead of opening in browser:
          // const a = document.createElement('a');
          // a.href = data.publicURL;
          // a.download = data.filename || 'material';
          // document.body.appendChild(a);
          // a.click();
          // document.body.removeChild(a);
        } else {
          throw new Error("No publicURL returned from server");
        }

        toast({
          title: "Download Started",
          description: "Your download has started.",
        });
      } catch (err) {
        toast({
          title: "Download Failed",
          description: err.message || "Unable to download the material.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },

    // View material
    viewMaterial: async (id) => {
      try {
        setIsLoading(true);
        // Make an API call to get the view URL or material content
        const response = await fetch(
          `${BACKEND_URI}/api/v1/teacher/materials/${id}/view`
        );

        if (!response.ok) {
          throw new Error("Failed to view material");
        }

        const data = await response.json();

        if (data.viewUrl) {
          // Open the view URL in a new tab or modal
          window.open(data.viewUrl, "_blank");
        }

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
      } finally {
        setIsLoading(false);
      }
    },
  };

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
      await Promise.all([api.fetchMaterials()]);
    };

    loadData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setNewMaterial((prev) => ({ ...prev, file: e.target.files[0] }));
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
        uploadedBy: user?.name || `Teacher Of Grade ${user.grade}`,
        uploadDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
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

  // Filter state for materials
  const [materialFilter, setMaterialFilter] = useState("all");

  const filteredMaterials = materials.filter((material) => {
    if (materialFilter === "all") return true;
    return material.type === materialFilter;
  });

  return (
    <div className="flex flex-col w-full bg-[hsl(var(--card))] p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[hsl(var(--card-foreground))]">
          {userRole === "student" ? "Study Materials" : "Study Resources"}
        </h1>
        {userRole === "teacher" && (
          <AddNewMaterials
            newMaterial={newMaterial}
            setNewMaterial={setNewMaterial}
            handleAddMaterial={handleAddMaterial}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            isLoading={isLoading}
            user={user}
          />
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="materials" className="w-full">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="materials">
                {userRole === "student" ? "Study Materials" : "Study Resources"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="materials" className="space-y-4 mt-4">
              <MaterialFilters
                materialFilter={materialFilter}
                setMaterialFilter={setMaterialFilter}
              />

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMaterials.map((material) => (
                    <FilteredMaterialsCard
                      key={material.id}
                      material={material}
                      api={api}
                    />
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
                  <p className="text-gray-500 mb-4">
                    {materialFilter !== "all"
                      ? `No ${materialFilter} materials are available.`
                      : "No study materials have been added yet."}
                  </p>
                  {userRole === "teacher" && (
                    <AddNewMaterials
                      newMaterial={newMaterial}
                      setNewMaterial={setNewMaterial}
                      handleAddMaterial={handleAddMaterial}
                      handleInputChange={handleInputChange}
                      handleFileChange={handleFileChange}
                      isLoading={isLoading}
                      user={user}
                    />
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialsPage;
