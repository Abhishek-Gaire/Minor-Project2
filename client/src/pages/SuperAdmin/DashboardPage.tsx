import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  Users,
  GraduationCap,
  Calendar,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Overview } from "@/components/SuperAdmin/Dashboard/overview";
import { RecentActivities } from "@/components/SuperAdmin/Dashboard/recentActivities";

import { overviewData, recentActivitiesData } from "./mockedData";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="flex items-center pt-1">
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-xs text-green-500">+{trend}%</span>
            <span className="text-xs text-muted-foreground ml-1">
              from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DashboardPage: React.FC = () => {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md flex items-center text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />7 action items require
            attention
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value="12,453"
          description="Across all schools and classes"
          icon={<Users className="h-4 w-4" />}
          trend={4.5}
        />
        <StatsCard
          title="Total Classes"
          value="587"
          description="Active across the platform"
          icon={<GraduationCap className="h-4 w-4" />}
          trend={2.1}
        />
        <StatsCard
          title="Active Users"
          value="2,345"
          description="Users logged in today"
          icon={<Activity className="h-4 w-4" />}
          trend={8.3}
        />
        <StatsCard
          title="Upcoming Events"
          value="24"
          description="Scheduled in next 7 days"
          icon={<Calendar className="h-4 w-4" />}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Platform Activity Overview</CardTitle>
            <CardDescription>
              Usage trends over the past 30 days
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview
              totalUsers={overviewData.totalUsers}
              activeUsers={overviewData.activeUsers}
              totalCourses={overviewData.totalCourses}
              completionRate={overviewData.completionRate}
              avgTimeSpent={overviewData.avgTimeSpent}
            />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest actions across the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivities activities={recentActivitiesData} />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Schools Performance</CardTitle>
            <CardDescription>Academic metrics by school</CardDescription>
          </CardHeader>
          <CardContent>
            {/* School performance component would go here */}
            <p className="text-sm text-muted-foreground">
              School performance chart component
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Server status and performance</CardDescription>
          </CardHeader>
          <CardContent>
            {/* System health component would go here */}
            <p className="text-sm text-muted-foreground">
              System health monitoring component
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
