import {Phone} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {TabsContent} from "@/components/ui/tabs.tsx";
import React from "react";

const ContactInformationTab = ({form,moveToPreviousTab,moveToNextTab}) => {
    return (
        <TabsContent value="contact" className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-600" />
                Contact Information
            </h3>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        placeholder="student@example.com"
                    />
                    {form.formState.errors.email && (
                        <p className="text-sm text-red-500">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="phone"
                        {...form.register("phone")}
                        placeholder="e.g., 1234567890"
                    />
                    {form.formState.errors.phone && (
                        <p className="text-sm text-red-500">
                            {form.formState.errors.phone.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="alternatePhone">Alternate Phone Number</Label>
                <Input
                    id="alternatePhone"
                    {...form.register("alternatePhone")}
                    placeholder="e.g., 0987654321"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="address">
                    Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                    id="address"
                    {...form.register("address")}
                    placeholder="123 Main St, Apt 4B"
                    rows={2}
                />
                {form.formState.errors.address && (
                    <p className="text-sm text-red-500">
                        {form.formState.errors.address.message}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="city">
                        City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="city"
                        {...form.register("city")}
                        placeholder="New York"
                    />
                    {form.formState.errors.city && (
                        <p className="text-sm text-red-500">
                            {form.formState.errors.city.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="state">
                        State <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="state"
                        {...form.register("state")}
                        placeholder="NY"
                    />
                    {form.formState.errors.state && (
                        <p className="text-sm text-red-500">
                            {form.formState.errors.state.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="zipCode">
                        Zip Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="zipCode"
                        {...form.register("zipCode")}
                        placeholder="10001"
                    />
                    {form.formState.errors.zipCode && (
                        <p className="text-sm text-red-500">
                            {form.formState.errors.zipCode.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex justify-between">
                <Button
                    type="button"
                    variant="outline"
                    onClick={moveToPreviousTab}
                >
                    Previous
                </Button>
                <Button type="button" onClick={moveToNextTab}>
                    Next: Parent Details
                </Button>
            </div>
        </TabsContent>
    )
}

export default ContactInformationTab