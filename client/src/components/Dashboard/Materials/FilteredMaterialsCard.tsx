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

const FilteredMaterialsCard = ({ material,api }) => {
  const getMaterialIcon = (MaterialIcon) => {
    return <MaterialIcon className="h-5 w-5 text-gray-600" />;
  };
  return (
    <Card key={material.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          {getMaterialIcon(material.icon)}
          <CardTitle className="text-lg ml-2">{material.title}</CardTitle>
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
        <Button size="sm" onClick={() => api.viewMaterial(material.id)}>
          View
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FilteredMaterialsCard;
