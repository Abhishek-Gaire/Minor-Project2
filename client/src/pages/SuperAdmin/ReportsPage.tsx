import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Download, Filter, FileText } from "lucide-react";

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            <span>Filter</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
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
                <CardTitle className="text-sm font-medium">
                  Total Schools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">237</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Schools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">215</div>
                <p className="text-xs text-muted-foreground mt-1">
                  90.7% of total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  New Schools
                </CardTitle>
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
              <CardDescription>
                Latest performance metrics across all schools
              </CardDescription>
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
                  <div
                    key={index}
                    className="grid grid-cols-4 p-4 border-b last:border-0"
                  >
                    <div>School {index}</div>
                    <div>{Math.floor(Math.random() * 500) + 500}</div>
                    <div className="flex items-center">
                      <div
                        className={`h-2 rounded-full w-24 ${
                          index % 3 === 0
                            ? "bg-green-500"
                            : index % 3 === 1
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }`}
                      ></div>
                      <span className="ml-2">{75 + index * 2}%</span>
                    </div>
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                      >
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
              <CardDescription>
                Enrollment statistics across all schools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Student enrollment reports and statistics will be displayed
                here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>
                Revenue and expense reports across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Financial reports and statistics will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
