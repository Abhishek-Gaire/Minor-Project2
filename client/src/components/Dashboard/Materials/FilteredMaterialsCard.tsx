import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookMarked, FileSpreadsheet, FileText, Video, Pencil, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type MaterialType = "reading" | "video" | "reference" | "guide" | "notes";

interface MaterialProps {
  id: number;
  title: string;
  subject: string;
  type: MaterialType;
  uploadedDate: string;
  uploadedBy: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  description?: string;
}

interface FilteredMaterialsCardProps {
  material: MaterialProps;
  api: {
    downloadMaterial: (material: MaterialProps) => void;
    viewMaterial: (material: MaterialProps) => void;
    deleteMaterial?: (id: number) => Promise<void>;
  };
  onEdit?: (material: MaterialProps) => void;
  userRole?: string;
}

const FilteredMaterialsCard = ({ 
  material, 
  api, 
  onEdit,
  userRole = "student" 
}: FilteredMaterialsCardProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const uploadedDate = new Date(material.uploadedDate).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  const getIconForType = (type: MaterialType): React.ReactNode => {
    switch (type) {
      case "reading":
        return <BookMarked />;
      case "video":
        return <Video />;
      case "reference":
        return <FileSpreadsheet />;
      case "guide":
      case "notes":
        return <FileText />;
      default:
        return <FileText />;
    }
  };

  const handleDelete = async () => {
    if (!api.deleteMaterial) return;
    
    try {
      setIsDeleting(true);
      await api.deleteMaterial(material.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete material:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(material);
    }
  };

  const isTeacher = userRole === "teacher";

  return (
    <>
      <Card key={material.id} className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">{getIconForType(material.type)}</span>
              <CardTitle className="text-lg ml-2">{material.title}</CardTitle>
            </div>
            
            {isTeacher && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleEdit}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <CardDescription>
            {material.subject} • Added: {uploadedDate}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex justify-between items-center">
            <Badge variant="outline">{material.type}</Badge>
            <span className="text-xs text-gray-500">
              By: {material.uploadedBy}
            </span>
          </div>
          {material.description && (
            <p className="text-sm mt-2 text-gray-600 line-clamp-2">
              {material.description}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => api.downloadMaterial(material)}
          >
            Download
          </Button>
          <Button size="sm" onClick={() => api.viewMaterial(material)}>
            View
          </Button>
        </CardFooter>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{material.title}" study material.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FilteredMaterialsCard;