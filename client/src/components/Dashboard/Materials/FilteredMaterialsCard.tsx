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
import { BookMarked, FileSpreadsheet, FileText, Video } from "lucide-react";
type MaterialType = "reading" | "video" | "reference" | "guide" | "notes";

const FilteredMaterialsCard = ({ material, api }) => {
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
  return (
    <Card key={material.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <span className="mr-2">{getIconForType(material.type)}</span>
          <CardTitle className="text-lg ml-2">{material.title}</CardTitle>
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
  );
};

export default FilteredMaterialsCard;
