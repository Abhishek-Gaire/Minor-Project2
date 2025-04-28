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
import materialService from "@/services/studyMaterials";

const StudyMaterialsPage = () => {
  const { user } = useAuth();
  const userRole = user?.role;
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const [editingMaterial, setEditingMaterial] = useState(null);

  // Form state for adding new material
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    description: "",
    subject: "",
    type: "reading",
    file: null,
  });

  // Filter state for materials
  const [materialFilter, setMaterialFilter] = useState("all");
  
  // Setup view modal functions
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
    fetchMaterials();
  }, []);

  // Fetch materials from the API
  const fetchMaterials = async () => {
    setIsLoading(true);
    try {
      const response = await materialService.getMaterials();
      setMaterials(response.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to load study materials");
      toast({
        title: "Error",
        description: "Failed to load study materials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setNewMaterial((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  // Handle form submission for adding a new material
  const handleAddMaterial = async () => {

    if (
      !newMaterial.title ||
      !newMaterial.subject ||
      !newMaterial.type ||
      !newMaterial.file
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await materialService.createMaterial({
        ...newMaterial,
        uploadedBy: user?.name || "Unknown User"
      });

      toast({
        title: "Material Added",
        description: `"${newMaterial.title}" has been added successfully.`,
      });

      // Refresh the materials list
      fetchMaterials();

      // Reset form
      setNewMaterial({
        title: "",
        description: "",
        subject: "",
        type: "reading",
        file: null,
      });

    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to add material",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle material deletion
  const handleDeleteMaterial = async (id) => {
    try {
      await materialService.deleteMaterial(id);
      
      // Update the local state to remove the deleted material
      setMaterials(materials.filter(material => material.id !== id));
      
      toast({
        title: "Material Deleted",
        description: "The study material has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the material. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle viewing material
  const handleViewMaterial = async (material) => {
    try {
      const viewInfo = await materialService.viewMaterial(material);
      
      if (viewInfo.viewType === 'pdf' || viewInfo.viewType === 'video') {
        // Create modal for PDF or video
        const modal = document.createElement("div");
        modal.className = "file-viewer-modal";
        
        let contentHtml = '';
        if (viewInfo.viewType === 'pdf') {
          contentHtml = `<iframe src="${viewInfo.url}" width="100%" height="100%" frameborder="0"></iframe>`;
        } else if (viewInfo.viewType === 'video') {
          contentHtml = `
            <video controls width="100%" height="auto">
              <source src="${viewInfo.url}" type="${material.fileType}">
              Your browser does not support the video tag.
            </video>
          `;
        }
        
        modal.innerHTML = `
          <div class="modal-content">
            <div class="modal-header">
              <h2>${viewInfo.title}</h2>
              <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
              ${contentHtml}
            </div>
          </div>
        `;

        document.body.appendChild(modal);
        setupModalListeners(modal);
      } else {
        // For other types, open in new tab
        window.open(viewInfo.url, "_blank");
      }
      
      toast({
        title: "Viewing Material",
        description: "Opening material viewer...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to view this material.",
        variant: "destructive",
      });
    }
  };

  // Handle downloading material
  const handleDownloadMaterial = async (material) => {
    try {
      await materialService.downloadMaterial(material);
      
      toast({
        title: "Download Started",
        description: "Your download has started.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download the material.",
        variant: "destructive",
      });
    }
  };

  // Handle editing material
  const handleEditMaterial = (material) => {
    setEditingMaterial(material);
    // You would typically open a modal or navigate to an edit page here
    // For now, we'll just log
    console.log("Editing material:", material);
    // This would be implemented with a modal similar to AddNewMaterials
  };

  // Filter materials based on selected type
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
                      api={{
                        downloadMaterial: handleDownloadMaterial,
                        viewMaterial: handleViewMaterial,
                        deleteMaterial: handleDeleteMaterial,
                      }}
                      onEdit={handleEditMaterial}
                      userRole={user.role}
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