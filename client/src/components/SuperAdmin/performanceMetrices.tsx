import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Sample data for grades across subjects/schools
const gradeData = [
  {
    name: "Math",
    "Grade A": 20,
    "Grade B": 30,
    "Grade C": 35,
    "Grade D": 10,
    "Grade F": 5,
  },
  {
    name: "Science",
    "Grade A": 25,
    "Grade B": 35,
    "Grade C": 30,
    "Grade D": 8,
    "Grade F": 2,
  },
  {
    name: "English",
    "Grade A": 30,
    "Grade B": 40,
    "Grade C": 20,
    "Grade D": 7,
    "Grade F": 3,
  },
  {
    name: "History",
    "Grade A": 22,
    "Grade B": 32,
    "Grade C": 33,
    "Grade D": 11,
    "Grade F": 2,
  },
  {
    name: "Art",
    "Grade A": 45,
    "Grade B": 30,
    "Grade C": 20,
    "Grade D": 4,
    "Grade F": 1,
  },
  {
    name: "Music",
    "Grade A": 50,
    "Grade B": 25,
    "Grade C": 20,
    "Grade D": 4,
    "Grade F": 1,
  },
  {
    name: "P.E.",
    "Grade A": 40,
    "Grade B": 35,
    "Grade C": 20,
    "Grade D": 3,
    "Grade F": 2,
  },
];

// Sample data for performance over time
const timeData = [
  { name: "Q1", "Average Score": 72, "Pass Rate": 85 },
  { name: "Q2", "Average Score": 75, "Pass Rate": 87 },
  { name: "Q3", "Average Score": 78, "Pass Rate": 90 },
  { name: "Q4", "Average Score": 76, "Pass Rate": 88 },
];

const schoolPerformanceData = [
  {
    name: "North Academy",
    "Average Score": 82,
    "Pass Rate": 94,
    Students: 845,
  },
  {
    name: "West High School",
    "Average Score": 78,
    "Pass Rate": 89,
    Students: 756,
  },
  {
    name: "East Elementary",
    "Average Score": 85,
    "Pass Rate": 96,
    Students: 612,
  },
  {
    name: "South Middle School",
    "Average Score": 76,
    "Pass Rate": 87,
    Students: 524,
  },
  {
    name: "Central Tech College",
    "Average Score": 79,
    "Pass Rate": 91,
    Students: 689,
  },
];

const topPerformers = [
  {
    id: 1,
    school: "East Elementary",
    class: "4A",
    teacher: "Ms. Johnson",
    subject: "Math",
    average: 94.2,
  },
  {
    id: 2,
    school: "North Academy",
    class: "10B",
    teacher: "Mr. Williams",
    subject: "Science",
    average: 92.8,
  },
  {
    id: 3,
    school: "Central Tech",
    class: "CS101",
    teacher: "Dr. Smith",
    subject: "Programming",
    average: 91.5,
  },
  {
    id: 4,
    school: "West High",
    class: "11C",
    teacher: "Mrs. Davis",
    subject: "English Literature",
    average: 90.7,
  },
  {
    id: 5,
    school: "South Middle",
    class: "8A",
    teacher: "Mr. Brown",
    subject: "History",
    average: 90.1,
  },
];

export function PerformanceMetrics() {
  const [view, setView] = React.useState("grades");
  const [filter, setFilter] = React.useState("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Tabs value={view} onValueChange={setView}>
          <TabsList>
            <TabsTrigger value="grades">Grade Distribution</TabsTrigger>
            <TabsTrigger value="trends">Performance Trends</TabsTrigger>
            <TabsTrigger value="schools">School Comparison</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="math">Mathematics</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="history">History</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {view === "grades" && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={gradeData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                label={{
                  value: "Percentage of Students",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="Grade A" stackId="a" fill="#4CAF50" />
              <Bar dataKey="Grade B" stackId="a" fill="#8BC34A" />
              <Bar dataKey="Grade C" stackId="a" fill="#FFC107" />
              <Bar dataKey="Grade D" stackId="a" fill="#FF9800" />
              <Bar dataKey="Grade F" stackId="a" fill="#F44336" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {view === "trends" && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={timeData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Average Score" fill="#8884d8" />
              <Bar dataKey="Pass Rate" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {view === "schools" && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={schoolPerformanceData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Average Score" fill="#8884d8" />
              <Bar dataKey="Pass Rate" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted px-4 py-3 border-b">
          <h3 className="font-medium">Top Performing Classes</h3>
        </div>
        <div className="divide-y">
          {topPerformers.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4"
            >
              <div className="space-y-1">
                <div className="font-medium">
                  {item.class} - {item.subject}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.school} • {item.teacher}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-medium">
                  {item.average}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
