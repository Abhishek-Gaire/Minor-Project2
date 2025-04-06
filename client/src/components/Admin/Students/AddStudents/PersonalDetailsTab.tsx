import { TabsContent } from "@/components/ui/tabs.tsx";
import { User } from "lucide-react";

import { Input } from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Label} from "@/components/ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import {Button} from "@/components/ui/button.tsx";

const PersonalDetailsTab = ({form,moveToNextTab}) => {
  return (
    <TabsContent value="personal" className="space-y-4">
      <h3 className="text-lg font-medium flex items-center">
        <User className="h-5 w-5 mr-2 text-blue-600" />
        Personal Details
      </h3>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            {...form.register("firstName")}
            placeholder="John"
          />
          {form.formState.errors.firstName && (
            <p className="text-sm text-red-500">
              {form.formState.errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="middleName">Middle Name</Label>
          <Input
            id="middleName"
            {...form.register("middleName")}
            placeholder="David"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            {...form.register("lastName")}
            placeholder="Smith"
          />
          {form.formState.errors.lastName && (
            <p className="text-sm text-red-500">
              {form.formState.errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="gender">
            Gender <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            defaultValue="male"
            {...form.register("gender")}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">
            Date of Birth <span className="text-red-500">*</span>
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            {...form.register("dateOfBirth")}
          />
          {form.formState.errors.dateOfBirth && (
            <p className="text-sm text-red-500">
              {form.formState.errors.dateOfBirth.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="button" onClick={moveToNextTab}>
          Next: Academic Details
        </Button>
      </div>
    </TabsContent>
  );
};

export default PersonalDetailsTab;
