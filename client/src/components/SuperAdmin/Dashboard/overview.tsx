import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Users, Calendar, BarChart3, Clock } from "lucide-react";

interface OverviewProps {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  completionRate: number;
  avgTimeSpent: string;
}

export const Overview: React.FC<OverviewProps> = ({
  totalUsers = 0,
  activeUsers = 0,
  totalCourses = 0,
  completionRate = 0,
  avgTimeSpent = "0h 0m",
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Overview</CardTitle>
        <CardDescription>Your platform at a glance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Users</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    {totalUsers.toLocaleString()}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Active Users</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    {activeUsers.toLocaleString()}
                    <span className="text-sm text-green-500 ml-2 flex items-center">
                      {Math.round((activeUsers / totalUsers) * 100)}%
                      <ArrowUpRight className="h-3 w-3 ml-1" />
                    </span>
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="courses" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Courses</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    {totalCourses.toLocaleString()}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Completion Rate</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2 text-muted-foreground" />
                    {completionRate}%
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="engagement" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Average Time Spent</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    {avgTimeSpent}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          View Full Analytics
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Overview;
