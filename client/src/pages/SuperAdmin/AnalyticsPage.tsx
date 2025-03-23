import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  LineChart,
  PieChart,
  Download,
  Share2,
  Filter,
} from "lucide-react";
import { DateRangePicker } from "@/components/SuperAdmin/dateRangePicker";
import { EngagementChart } from "@/components/SuperAdmin/engagementChart";
import { PerformanceMetrics } from "@/components/SuperAdmin/performanceMetrices";
import { AttendanceReports } from "@/components/SuperAdmin/attendanceReport";
import { UsageStatistics } from "@/components/SuperAdmin/usageStatistics";

import { attendanceData, coursesList, usageStatisticsData } from "./mockedData";

const AnalyticsPage: React.FC = () => {
  const [selectedView, setSelectedView] = useState("engagement");
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [schoolFilter, setSchoolFilter] = useState("all");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <DateRangePicker />
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-center gap-4">
          <Select value={schoolFilter} onValueChange={setSchoolFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by School" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Schools</SelectItem>
              <SelectItem value="north">North Academy</SelectItem>
              <SelectItem value="west">West High School</SelectItem>
              <SelectItem value="east">East Elementary</SelectItem>
              <SelectItem value="south">South Middle School</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button variant="outline" size="icon">
            <BarChart3 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <LineChart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <PieChart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="engagement"
        value={selectedView}
        onValueChange={setSelectedView}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="usage">Platform Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-4">
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Student Engagement Metrics</CardTitle>
              <CardDescription>
                Analysis of student participation and activity
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <EngagementChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Daily Login
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.8 minutes</div>
                <p className="text-xs text-muted-foreground">
                  +12% from previous period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Task Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">84.6%</div>
                <p className="text-xs text-muted-foreground">
                  -2.4% from previous period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Resource Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9,247</div>
                <p className="text-xs text-muted-foreground">
                  +18.2% from previous period
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance Metrics</CardTitle>
              <CardDescription>
                Insights on student achievements and assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceMetrics />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Reports</CardTitle>
              <CardDescription>
                Student and teacher attendance patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AttendanceReports data={attendanceData} courses={coursesList} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Usage Statistics</CardTitle>
              <CardDescription>
                Analysis of feature usage and system load
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UsageStatistics
                usageData={usageStatisticsData.usageData}
                platformData={usageStatisticsData.platformData}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>
            Actionable intelligence based on current data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h4 className="font-semibold">
                Declining Engagement in Math Courses
              </h4>
              <p className="text-sm text-muted-foreground">
                Math courses show 14% lower engagement compared to other
                subjects. Consider reviewing content delivery methods and
                interactive elements.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h4 className="font-semibold">
                High Adoption of New Quiz Feature
              </h4>
              <p className="text-sm text-muted-foreground">
                The new interactive quiz feature has seen 78% adoption among
                teachers, resulting in 18% higher student content retention.
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <h4 className="font-semibold">Attendance Patterns</h4>
              <p className="text-sm text-muted-foreground">
                Monday absences are 23% higher than other weekdays. Consider
                implementing Monday-specific engagement strategies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
