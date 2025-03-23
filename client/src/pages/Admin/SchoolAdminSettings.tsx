import React from "react";
import {
    User,
    Lock,
    Bell,
    Globe,
    CreditCard,

    Shield,
    Save
} from "lucide-react";
import  Layout  from "@/components/Admin/AdminLayout.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SettingsPage = () => {

    return (

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Settings</h1>
                </div>

                <Tabs defaultValue="profile" className="space-y-8">
                    <TabsList className="grid grid-cols-5 w-full max-w-3xl">
                        <TabsTrigger value="profile" className="flex items-center gap-4">
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                        </TabsTrigger>
                        <TabsTrigger value="security" className="flex items-center gap-4">
                            <Shield className="h-4 w-4" />
                            <span>Security</span>
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="flex items-center gap-4">
                            <Bell className="h-4 w-4" />
                            <span>Notifications</span>
                        </TabsTrigger>
                        <TabsTrigger value="display" className="flex items-center gap-4">
                            <Globe className="h-4 w-4" />
                            <span>Display</span>
                        </TabsTrigger>
                        <TabsTrigger value="billing" className="flex items-center gap-4">
                            <CreditCard className="h-4 w-4" />
                            <span>Billing</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <div className="grid gap-6 max-w-3xl">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Personal Information</CardTitle>
                                    <CardDescription>
                                        Update your personal details and public profile.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" defaultValue="Admin" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" defaultValue="User" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" defaultValue="admin@school.edu" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="role">Role</Label>
                                        <Input id="role" defaultValue="School Administrator" disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea
                                            id="bio"
                                            defaultValue="School administrator with 10+ years of experience in education management."
                                            rows={4}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Changes
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="security">
                        <div className="grid gap-6 max-w-3xl">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Password</CardTitle>
                                    <CardDescription>
                                        Change your password or enable two-factor authentication.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="currentPassword">Current Password</Label>
                                        <Input id="currentPassword" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input id="newPassword" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input id="confirmPassword" type="password" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>
                                        <Lock className="h-4 w-4 mr-2" />
                                        Update Password
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Two-Factor Authentication</CardTitle>
                                    <CardDescription>
                                        Add an extra layer of security to your account.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="2fa">Two-factor authentication</Label>
                                            <div className="text-sm text-muted-foreground">
                                                Secure your account with two-factor authentication.
                                            </div>
                                        </div>
                                        <Switch id="2fa" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="notifications">
                        <div className="grid gap-6 max-w-3xl">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Notification Preferences</CardTitle>
                                    <CardDescription>
                                        Choose how you want to be notified.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Email Notifications</Label>
                                            <div className="text-sm text-muted-foreground">
                                                Receive email notifications for important updates.
                                            </div>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Student Updates</Label>
                                            <div className="text-sm text-muted-foreground">
                                                Get notified about student registrations and status changes.
                                            </div>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Payment Alerts</Label>
                                            <div className="text-sm text-muted-foreground">
                                                Receive notifications for payment events and due dates.
                                            </div>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>System Announcements</Label>
                                            <div className="text-sm text-muted-foreground">
                                                Important announcements about the system and maintenance.
                                            </div>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Preferences
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="display">
                        <div className="grid gap-6 max-w-3xl">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Display Settings</CardTitle>
                                    <CardDescription>
                                        Customize how the application looks and feels.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="theme">Theme</Label>
                                        <Select defaultValue="light">
                                            <SelectTrigger id="theme">
                                                <SelectValue placeholder="Select theme" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">Light</SelectItem>
                                                <SelectItem value="dark">Dark</SelectItem>
                                                <SelectItem value="system">System</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="language">Language</Label>
                                        <Select defaultValue="en">
                                            <SelectTrigger id="language">
                                                <SelectValue placeholder="Select language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="en">English</SelectItem>
                                                <SelectItem value="es">Spanish</SelectItem>
                                                <SelectItem value="fr">French</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="timezone">Timezone</Label>
                                        <Select defaultValue="utc-8">
                                            <SelectTrigger id="timezone">
                                                <SelectValue placeholder="Select timezone" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                                                <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                                                <SelectItem value="utc+0">UTC</SelectItem>
                                                <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Compact Mode</Label>
                                            <div className="text-sm text-muted-foreground">
                                                Display more information with a compact layout.
                                            </div>
                                        </div>
                                        <Switch />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Settings
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="billing">
                        <div className="grid gap-6 max-w-3xl">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Billing Information</CardTitle>
                                    <CardDescription>
                                        Manage your subscription and payment methods.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-4 border rounded-lg bg-gray-50">
                                        <div className="font-semibold">Current Plan: Education Premium</div>
                                        <div className="text-sm text-muted-foreground mt-1">Your subscription renews on April 1, 2025</div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Payment Method</Label>
                                        <div className="flex items-center space-x-4 p-4 border rounded-lg">
                                            <CreditCard className="h-5 w-5" />
                                            <div>
                                                <div className="font-medium">Visa ending in 4242</div>
                                                <div className="text-sm text-muted-foreground">Expires 12/26</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline">View Invoices</Button>
                                    <Button>Update Payment Method</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

    );
};

export default SettingsPage;