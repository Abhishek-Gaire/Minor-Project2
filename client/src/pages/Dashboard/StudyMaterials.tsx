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
        const response = await fetch(
          `${BACKEND_URI}/api/v1/teacher/materials`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch materials");
        }
        const data = await response.json();
        setMaterials(data.data);
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
        formData.append("file", materialData.file);

        // Add other material data as separate fields or as JSON
        const metadataFields = { ...materialData };
        delete metadataFields.file; // Remove file from metadata
        console.log(materialData);
        // You can either append each field individually:
        Object.keys(metadataFields).forEach((key) => {
          formData.append(key, metadataFields[key]);
        });

        // Make actual API call
        const response = await fetch(
          `${BACKEND_URI}/api/v1/teacher/materials`,
          {
            method: "POST",
            body: formData,
            // No Content-Type header - browser will set it with boundary parameter
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to add material");
        }

        // Get the newly created material with server-generated ID
        const resData = await response.json();

        // Update local state with the new material
        setMaterials((prev) => [
          ...prev,
          {
            ...resData.data,
            icon: getIconForType(resData.data.type),
          },
        ]);

        toast({
          title: "Material Added",
          description: `"${materialData.title}" has been added successfully.`,
        });

        return resData.data;
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
    downloadMaterial: async (data) => {
      try {
        if (data.fileUrl) {
          // Open the Supabase public URL in a new tab
          window.open(data.fileUrl, "_blank");
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
      }
    },

    viewMaterial: async (data) => {
      try {
        // Check the file type and use appropriate viewer
        if (data.fileUrl) {
          if (data.fileType === "application/pdf") {
            // For PDFs - browser can handle these natively
            const viewerUrl = data.fileUrl;
            window.open(viewerUrl, "_blank");
          } else if (data.fileType.includes("video/")) {
            // For videos - create a modal with video player
            const modal = document.createElement("div");
            modal.className = "file-viewer-modal";
            modal.innerHTML = `
              <div class="modal-content">
                <div class="modal-header">
                  <h2>${data.fileName}</h2>
                  <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                  <video controls width="100%" height="auto">
                    <source src="${data.fileUrl}" type="${data.fileType}">
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            `;

            document.body.appendChild(modal);
            setupModalListeners(modal);
          } else if (data.fileType.includes("word")) {
            // For Word documents - use Office Online viewer
            const viewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
              data.fileUrl
            )}`;
            window.open(viewerUrl, "_blank");
          } else {
            // Default case - try to open in new tab, may download if not viewable
            window.open(data.fileUrl, "_blank");
          }

          toast({
            title: "Viewing Material",
            description: "Opening material viewer...",
          });
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "Unable to view this material.",
          variant: "destructive",
        });
        console.error(err);
      }
    },
  };
  // Helper function to set up modal event listeners
  function setupModalListeners(modal) {
    // Add event listener to close button
    modal.querySelector(".close-btn").addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    // Close when clicking outside the content
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });

    // Add CSS for modal if not already added
    if (!document.getElementById("viewer-modal-style")) {
      const style = document.createElement("style");
      style.id = "viewer-modal-style";
      style.textContent = `
      .file-viewer-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      .modal-content {
        background: white;
        width: 80%;
        height: 80%;
        border-radius: 8px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .modal-header {
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
      }
      .modal-body {
        flex: 1;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .close-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
      }
    `;
      document.head.appendChild(style);
    }
  }
  // // Helper function to get icon based on material type
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
