import { Users } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import { TabsContent } from "@/components/ui/tabs.tsx";
import { forwardRef } from "react";

interface GuardianInformationTabProps {
  form: any;
  moveToPreviousTab: () => void;
  moveToNextTab: () => void;
}

const GuardianInformationTab = forwardRef<
  HTMLDivElement,
  GuardianInformationTabProps
>(({ form, moveToPreviousTab, moveToNextTab }, ref) => {
  return (
    <TabsContent ref={ref} value="parent" className="space-y-4">
      <h3 className="text-lg font-medium flex items-center">
        <Users className="h-5 w-5 mr-2 text-blue-600" />
        Parent/Guardian Information
      </h3>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="parentName">
            Parent/Guardian Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="parentName"
            {...form.register("parentName")}
            placeholder="John Smith"
          />
          {form.formState.errors.parentName && (
            <p className="text-sm text-red-500">
              {form.formState.errors.parentName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="relationship">
            Relationship <span className="text-red-500">*</span>
          </Label>
          <Select defaultValue="parent" {...form.register("relationship")}>
            <SelectTrigger>
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mother">Mother</SelectItem>
              <SelectItem value="father">Father</SelectItem>
              <SelectItem value="guardian">Guardian</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="parentPhone">
            Parent Phone <span className="text-red-500">*</span>
          </Label>
          <Input
            id="parentPhone"
            {...form.register("parentPhone")}
            placeholder="e.g., 1234567890"
          />
          {form.formState.errors.parentPhone && (
            <p className="text-sm text-red-500">
              {form.formState.errors.parentPhone.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="parentEmail">
            Parent Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="parentEmail"
            type="email"
            {...form.register("parentEmail")}
            placeholder="parent@example.com"
          />
          {form.formState.errors.parentEmail && (
            <p className="text-sm text-red-500">
              {form.formState.errors.parentEmail.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={moveToPreviousTab}>
          Previous
        </Button>
        <Button type="button" onClick={moveToNextTab}>
          Next: Additional Info
        </Button>
      </div>
    </TabsContent>
  );
});

export default GuardianInformationTab;
