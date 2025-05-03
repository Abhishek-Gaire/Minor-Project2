import { Button } from "@/components/ui/button";

const MaterialFilters = ({ materialFilter, setMaterialFilter }) => {
  return (
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
    </div>
  );
};

export default MaterialFilters;
