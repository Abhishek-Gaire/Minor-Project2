import { FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { TabsContent } from "@/components/ui/tabs.tsx";
import { forwardRef } from "react";

interface AdditionalInformationTabProps {
  form: any; 
  moveToPreviousTab: () => void;
  isSubmitDisabled: boolean;
}

const AdditionalInformationTab = forwardRef<HTMLDivElement,AdditionalInformationTabProps>(
  ({ form, moveToPreviousTab, isSubmitDisabled }, ref) => {
  return (
    <TabsContent ref={ref} value="additional" className="space-y-4">
      <h3 className="text-lg font-medium flex items-center">
        <FileText className="h-5 w-5 mr-2 text-blue-600" />
        Additional Information
      </h3>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bloodGroup">Blood Group</Label>
          <Select {...form.register("bloodGroup")}>
            <SelectTrigger>
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="medicalInformation">Medical Information</Label>
          <Textarea
            id="medicalInformation"
            {...form.register("medicalInformation")}
            placeholder="Any allergies or medical conditions"
            rows={2}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="hobbies">Hobbies & Interests</Label>
          <Input
            id="hobbies"
            {...form.register("hobbies")}
            placeholder="e.g., Reading, Sports, Music"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="extraCurricular">Extra-Curricular Activities</Label>
          <Input
            id="extraCurricular"
            {...form.register("extraCurricular")}
            placeholder="e.g., Chess club, Soccer team"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalNotes">Additional Notes</Label>
        <Textarea
          id="additionalNotes"
          {...form.register("additionalNotes")}
          placeholder="Any other information about the student"
          rows={3}
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={moveToPreviousTab}>
          Previous
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isSubmitDisabled}>
          Submit Student Information
        </Button>
      </div>
    </TabsContent>
  );
});

export default AdditionalInformationTab;
