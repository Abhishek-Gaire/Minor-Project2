import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const SchoolManagementPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">School Management</h1>
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
  );
};

export default SchoolManagementPage;
