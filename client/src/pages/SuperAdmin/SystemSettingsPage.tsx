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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SystemSettingsPage = () => {
  return (
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
                    <TableCell className="font-medium">Microsoft 365</TableCell>
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
                    Enabling maintenance mode will make the system inaccessible
                    to all users except superadmins.
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
  );
};

export default SystemSettingsPage;
