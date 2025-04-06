import { BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { TabsContent } from "@/components/ui/tabs.tsx";

const AcademicDetailsTab = ({ form, moveToNextTab, moveToPreviousTab }) => {
  return (
    <TabsContent value="academic" className="space-y-4">
      <h3 className="text-lg font-medium flex items-center">
        <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
        Academic Details
      </h3>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="grade">
            Grade <span className="text-red-500">*</span>
          </Label>
          <Select defaultValue="5" {...form.register("grade")}>
            <SelectTrigger>
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">Grade 5</SelectItem>
              <SelectItem value="6">Grade 6</SelectItem>
              <SelectItem value="7">Grade 7</SelectItem>
              <SelectItem value="8">Grade 8</SelectItem>
              <SelectItem value="9">Grade 9</SelectItem>
              <SelectItem value="10">Grade 10</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="section">
            Section <span className="text-red-500">*</span>
          </Label>
          <Input id="section" {...form.register("section")} placeholder="A" />
          {form.formState.errors.section && (
            <p className="text-sm text-red-500">
              {form.formState.errors.section.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rollNumber">Roll Number</Label>
          <Input
            id="rollNumber"
            {...form.register("rollNumber")}
            placeholder="e.g., 2025001"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="academicYear">
            Academic Year <span className="text-red-500">*</span>
          </Label>
          <Input
            id="academicYear"
            {...form.register("academicYear")}
            placeholder="2024-2025"
          />
          {form.formState.errors.academicYear && (
            <p className="text-sm text-red-500">
              {form.formState.errors.academicYear.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="previousSchool">Previous School (if any)</Label>
        <Input
          id="previousSchool"
          {...form.register("previousSchool")}
          placeholder="Previous school name"
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={moveToPreviousTab}>
          Previous
        </Button>
        <Button type="button" onClick={moveToNextTab}>
          Next: Contact Details
        </Button>
      </div>
    </TabsContent>
  );
};

export default AcademicDetailsTab;
