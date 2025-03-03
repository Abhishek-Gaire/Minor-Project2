import Layout from "@/components/Admin/AdminLayout";
import {
  Building2,
  Users,
  School,
  Settings,
  BarChart3,
  FileText,
  Bell,
  User,
  Database,
  Globe,
  Shield,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Download, Filter } from 'lucide-react';
// School Management Page for SuperAdmin
export const SchoolManagementPage = () => {
  const superadminSidebarItems = [
    {
      name: "Dashboard",
      href: "/superadmin",
      icon: <BarChart3 size={20} />,
      active: false,
    },
    {
      name: "Schools",
      href: "/superadmin/schools",
      icon: <Building2 size={20} />,
      active: true,
    },
    {
      name: "Admins",
      href: "/superadmin/admins",
      icon: <Shield size={20} />,
      active: false,
    },
    {
      name: "Reports",
      href: "/superadmin/reports",
      icon: <FileText size={20} />,
      active: false,
    },
    {
      name: "Global Settings",
      href: "/superadmin/settings",
      icon: <Globe size={20} />,
      active: false,
    },
    {
      name: "System",
      href: "/superadmin/system",
      icon: <Database size={20} />,
      active: false,
    },
  ];

  return (
    <Layout role="superadmin" sidebarItems={superadminSidebarItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            School Management
          </h1>
          <Button>+ Add New School</Button>
        </div>

        <div className="flex gap-4 items-center">
          <Input placeholder="Search schools..." className="max-w-sm" />
          <Button variant="outline">Filters</Button>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Schools</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>School Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      Springfield High School
                    </TableCell>
                    <TableCell>Springfield, IL</TableCell>
                    <TableCell>John Johnson</TableCell>
                    <TableCell>452</TableCell>
                    <TableCell>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs">
                        Premium
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Active
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="pending" className="pt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">
                  No pending schools at the moment
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inactive" className="pt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">
                  No inactive schools at the moment
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// SuperAdmin Admins Management Page
export const AdminManagementPage = () => {
  const superadminSidebarItems = [
    {
      name: "Dashboard",
      href: "/superadmin",
      icon: <BarChart3 size={20} />,
      active: false,
    },
    {
      name: "Schools",
      href: "/superadmin/schools",
      icon: <Building2 size={20} />,
      active: false,
    },
    {
      name: "Admins",
      href: "/superadmin/admins",
      icon: <Shield size={20} />,
      active: true,
    },
    {
      name: "Reports",
      href: "/superadmin/reports",
      icon: <FileText size={20} />,
      active: false,
    },
    {
      name: "Global Settings",
      href: "/superadmin/settings",
      icon: <Globe size={20} />,
      active: false,
    },
    {
      name: "System",
      href: "/superadmin/system",
      icon: <Database size={20} />,
      active: false,
    },
  ];

  return (
    <Layout role="superadmin" sidebarItems={superadminSidebarItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            School Admins Management
          </h1>
          <Button>+ Add New Admin</Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Admins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">124</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">18</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                New This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">7</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>School Administrators</CardTitle>
            <CardDescription>
              Manage school-level admin accounts and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>jane.smith@school.edu</TableCell>
                    <TableCell>Lincoln High School</TableCell>
                    <TableCell>Today, 9:42 AM</TableCell>
                    <TableCell>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Active
                      </span>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Reset
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

// SuperAdmin System Settings Page
export const SystemSettingsPage = () => {
  const superadminSidebarItems = [
    {
      name: "Dashboard",
      href: "/superadmin",
      icon: <BarChart3 size={20} />,
      active: false,
    },
    {
      name: "Schools",
      href: "/superadmin/schools",
      icon: <Building2 size={20} />,
      active: false,
    },
    {
      name: "Admins",
      href: "/superadmin/admins",
      icon: <Shield size={20} />,
      active: false,
    },
    {
      name: "Reports",
      href: "/superadmin/reports",
      icon: <FileText size={20} />,
      active: false,
    },
    {
      name: "Global Settings",
      href: "/superadmin/settings",
      icon: <Globe size={20} />,
      active: false,
    },
    {
      name: "System",
      href: "/superadmin/system",
      icon: <Database size={20} />,
      active: true,
    },
  ];

  return (
    <Layout role="superadmin" sidebarItems={superadminSidebarItems}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>

        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>
                  View and manage system-wide settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      System Name
                    </label>
                    <Input defaultValue="School Management System" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Domain
                    </label>
                    <Input defaultValue="schoolhub.example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Support Email
                    </label>
                    <Input defaultValue="support@schoolhub.example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Version
                    </label>
                    <Input defaultValue="2.4.1" disabled />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    System Announcement (All Schools)
                  </label>
                  <textarea
                    className="w-full min-h-24 p-2 border rounded-md"
                    placeholder="Enter a system-wide announcement..."
                  ></textarea>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security parameters for the entire system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">
                        Require 2FA for all admin accounts
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="tfa" className="mr-2" />
                      <label htmlFor="tfa">Enable</label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Password Policy</h3>
                      <p className="text-sm text-gray-500">
                        Set minimum password requirements
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Session Timeout</h3>
                      <p className="text-sm text-gray-500">
                        Auto-logout after inactivity
                      </p>
                    </div>
                    <select className="p-2 border rounded">
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>2 hours</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Security Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>System Integrations</CardTitle>
                <CardDescription>
                  Connect with third-party services and APIs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Integration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Synced</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Google Workspace
                      </TableCell>
                      <TableCell>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          Connected
                        </span>
                      </TableCell>
                      <TableCell>Today, 06:30 AM</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Microsoft 365
                      </TableCell>
                      <TableCell>
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                          Not Connected
                        </span>
                      </TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Payment Gateway
                      </TableCell>
                      <TableCell>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          Connected
                        </span>
                      </TableCell>
                      <TableCell>Yesterday, 15:42 PM</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button>+ Add New Integration</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>System Maintenance</CardTitle>
                <CardDescription>
                  Manage system maintenance and backups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <h3 className="font-medium text-yellow-700">
                      Maintenance Mode
                    </h3>
                    <p className="text-sm text-yellow-600 mt-1">
                      Enabling maintenance mode will make the system
                      inaccessible to all users except superadmins.
                    </p>
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        className="bg-yellow-100 border-yellow-300 text-yellow-700"
                      >
                        Enable Maintenance Mode
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium">Database Backup</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Last backup: Yesterday, 02:00 AM
                    </p>
                    <div className="mt-2 space-x-2">
                      <Button variant="outline">Download Latest Backup</Button>
                      <Button>Run Manual Backup</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium">System Logs</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      View and export system activity logs
                    </p>
                    <div className="mt-2">
                      <Button variant="outline">View Logs</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};


export const ReportsPage = () => {
  const superadminSidebarItems = [
    {
      name: "Dashboard",
      href: "/superadmin",
      icon: <BarChart3 size={20} />,
      active: false,
    },
    {
      name: "Schools",
      href: "/superadmin/schools",
      icon: <Building2 size={20} />,
      active: false,
    },
    {
      name: "Admins",
      href: "/superadmin/admins",
      icon: <Shield size={20} />,
      active: false,
    },
    {
      name: "Reports",
      href: "/superadmin/reports",
      icon: <FileText size={20} />,
      active: false,
    },
    {
      name: "Global Settings",
      href: "/superadmin/settings",
      icon: <Globe size={20} />,
      active: false,
    },
    {
      name: "System",
      href: "/superadmin/system",
      icon: <Database size={20} />,
      active: true,
    },
  ];
  return (
      <Layout role="superadmin" sidebarItems={superadminSidebarItems}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter size={16} />
                <span>Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download size={16} />
                <span>Export</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="schools" className="w-full">
            <TabsList className="grid w-full md:w-1/2 grid-cols-3">
              <TabsTrigger value="schools">Schools</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
            </TabsList>

            <TabsContent value="schools" className="space-y-4 mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">237</div>
                    <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Schools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">215</div>
                    <p className="text-xs text-muted-foreground mt-1">90.7% of total</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">New Schools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground mt-1">This month</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>School Performance Reports</CardTitle>
                  <CardDescription>Latest performance metrics across all schools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 p-4 font-medium border-b">
                      <div>School Name</div>
                      <div>Students</div>
                      <div>Performance</div>
                      <div>Actions</div>
                    </div>
                    {[1, 2, 3, 4, 5].map((index) => (
                        <div key={index} className="grid grid-cols-4 p-4 border-b last:border-0">
                          <div>School {index}</div>
                          <div>{Math.floor(Math.random() * 500) + 500}</div>
                          <div className="flex items-center">
                            <div className={`h-2 rounded-full w-24 ${
                                index % 3 === 0 ? "bg-green-500" :
                                    index % 3 === 1 ? "bg-yellow-500" : "bg-blue-500"
                            }`}></div>
                            <span className="ml-2">{75 + index * 2}%</span>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                              <FileText size={14} />
                              <span>View</span>
                            </Button>
                          </div>
                        </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Enrollment Reports</CardTitle>
                  <CardDescription>Enrollment statistics across all schools</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Student enrollment reports and statistics will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="finance" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Reports</CardTitle>
                  <CardDescription>Revenue and expense reports across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Financial reports and statistics will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
  );
};

export const GlobalSettingsPage = () => {
  const superadminSidebarItems = [
    {
      name: "Dashboard",
      href: "/superadmin",
      icon: <BarChart3 size={20} />,
      active: false,
    },
    {
      name: "Schools",
      href: "/superadmin/schools",
      icon: <Building2 size={20} />,
      active: false,
    },
    {
      name: "Admins",
      href: "/superadmin/admins",
      icon: <Shield size={20} />,
      active: false,
    },
    {
      name: "Reports",
      href: "/superadmin/reports",
      icon: <FileText size={20} />,
      active: false,
    },
    {
      name: "Global Settings",
      href: "/superadmin/settings",
      icon: <Globe size={20} />,
      active: false,
    },
    {
      name: "System",
      href: "/superadmin/system",
      icon: <Database size={20} />,
      active: true,
    },
  ];
  return (
      <Layout role="superadmin" sidebarItems={superadminSidebarItems}>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Global Settings</h1>
          <p className="text-muted-foreground">
            Manage platform-wide settings that apply to all schools and users.
          </p>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-1 md:grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Information</CardTitle>
                  <CardDescription>Update general platform settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input id="platform-name" defaultValue="EduManager Pro" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Support Email</Label>
                    <Input id="contact-email" type="email" defaultValue="support@edumanager.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platform-description">Platform Description</Label>
                    <Textarea
                        id="platform-description"
                        rows={4}
                        defaultValue="EduManager Pro is a comprehensive school management system designed to streamline administrative processes and enhance educational outcomes."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                        <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                        <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                        <SelectItem value="ist">IST (Indian Standard Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                  <CardDescription>Enable or disable global features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">School Registration</Label>
                      <p className="text-sm text-muted-foreground">Allow new schools to register</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Put the platform in maintenance mode</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Analytics</Label>
                      <p className="text-sm text-muted-foreground">Collect usage analytics</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">API Access</Label>
                      <p className="text-sm text-muted-foreground">Allow schools to access API</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure platform-wide security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password-policy">Password Policy</Label>
                    <Select defaultValue="strong">
                      <SelectTrigger id="password-policy">
                        <SelectValue placeholder="Select password policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (8+ characters)</SelectItem>
                        <SelectItem value="strong">Strong (8+ chars, 1 number, 1 special)</SelectItem>
                        <SelectItem value="very-strong">Very Strong (12+ chars, mixed case, numbers, specials)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure platform-wide notification settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send important updates via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">System Alerts</Label>
                      <p className="text-sm text-muted-foreground">Send alerts for system issues</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Scheduled Reports</Label>
                      <p className="text-sm text-muted-foreground">Send scheduled reports to school admins</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Permission Settings</CardTitle>
                  <CardDescription>Configure default permissions for different user roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">School Admin Permissions</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-1">Manage all users</Label>
                          <Switch id="perm-1" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-2">Manage billing</Label>
                          <Switch id="perm-2" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-3">Access API</Label>
                          <Switch id="perm-3" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Teacher Permissions</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-4">Manage student records</Label>
                          <Switch id="perm-4" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="perm-5">Access all courses</Label>
                          <Switch id="perm-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
  );
};
