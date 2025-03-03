import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Calendar, TrendingUp, Clock, BarChart2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UsageData {
  daily: Array<{
    date: string;
    sessions: number;
    users: number;
    duration: number;
  }>;
  weekly: Array<{
    week: string;
    sessions: number;
    users: number;
    duration: number;
  }>;
  monthly: Array<{
    month: string;
    sessions: number;
    users: number;
    duration: number;
  }>;
}

interface PlatformData {
  courseViews: number;
  lessonCompletions: number;
  quizAttempts: number;
  assignmentSubmissions: number;
  certificatesIssued: number;
  timeSpent: {
    hours: number;
    minutes: number;
  };
}

interface UsageStatisticsProps {
  usageData: UsageData;
  platformData: PlatformData;
}

export const UsageStatistics: React.FC<UsageStatisticsProps> = ({
  usageData = { daily: [], weekly: [], monthly: [] },
  platformData = {
    courseViews: 0,
    lessonCompletions: 0,
    quizAttempts: 0,
    assignmentSubmissions: 0,
    certificatesIssued: 0,
    timeSpent: { hours: 0, minutes: 0 },
  },
}) => {
  const [timeRange, setTimeRange] = React.useState("7d");
  const [chartView, setChartView] = React.useState("sessions");

  const getChartData = () => {
    switch (timeRange) {
      case "24h":
      case "7d":
        return usageData.daily.slice(-7);
      case "30d":
        return usageData.daily.slice(-30);
      case "3m":
        return usageData.weekly.slice(-12);
      case "1y":
        return usageData.monthly.slice(-12);
      default:
        return usageData.daily.slice(-7);
    }
  };

  const chartData = getChartData();

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">
              Usage Statistics
            </CardTitle>
            <CardDescription>
              Platform usage metrics and analytics
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card className="md:col-span-1">
            <CardHeader className="p-4">
              <CardDescription>Course Views</CardDescription>
              <CardTitle className="text-2xl">
                {platformData.courseViews.toLocaleString()}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="md:col-span-1">
            <CardHeader className="p-4">
              <CardDescription>Lesson Completions</CardDescription>
              <CardTitle className="text-2xl">
                {platformData.lessonCompletions.toLocaleString()}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="md:col-span-1">
            <CardHeader className="p-4">
              <CardDescription>Quiz Attempts</CardDescription>
              <CardTitle className="text-2xl">
                {platformData.quizAttempts.toLocaleString()}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="md:col-span-1">
            <CardHeader className="p-4">
              <CardDescription>Assignments</CardDescription>
              <CardTitle className="text-2xl">
                {platformData.assignmentSubmissions.toLocaleString()}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="md:col-span-1">
            <CardHeader className="p-4">
              <CardDescription>Total Time Spent</CardDescription>
              <CardTitle className="text-xl">{`${platformData.timeSpent.hours}h ${platformData.timeSpent.minutes}m`}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Tabs
              defaultValue="sessions"
              className="w-fit"
              onValueChange={setChartView}
            >
              <TabsList>
                <TabsTrigger value="sessions" className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Sessions
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="duration" className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Time Spent
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="sessions" className="mt-0">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey={
                      timeRange === "1y"
                        ? "month"
                        : timeRange === "3m"
                        ? "week"
                        : "date"
                    }
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${value} sessions`, "Sessions"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="sessions"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-0">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey={
                      timeRange === "1y"
                        ? "month"
                        : timeRange === "3m"
                        ? "week"
                        : "date"
                    }
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${value} users`, "Active Users"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#6366f1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="duration" className="mt-0">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey={
                      timeRange === "1y"
                        ? "month"
                        : timeRange === "3m"
                        ? "week"
                        : "date"
                    }
                  />
                  <YAxis
                    tickFormatter={(value) => `${Math.floor(value / 60)}h`}
                  />
                  <Tooltip
                    formatter={(value) => [
                      formatDuration(Number(value)),
                      "Time Spent",
                    ]}
                  />
                  <Bar dataKey="duration" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </div>

        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-base">Peak Usage</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Day of Week</p>
                <p className="text-base font-medium">Wednesday</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time of Day</p>
                <p className="text-base font-medium">2:00 PM - 4:00 PM</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Most Active Course
                </p>
                <p className="text-base font-medium">
                  Introduction to Data Science
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Most Active Device
                </p>
                <p className="text-base font-medium">Desktop (67%)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default UsageStatistics;
