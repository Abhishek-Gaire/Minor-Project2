import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const engagementData = [
  {
    name: "Week 1",
    "Content Views": 4000,
    "Quiz Attempts": 2400,
    "Discussion Posts": 1800,
    "Assignment Submissions": 3200,
  },
  {
    name: "Week 2",
    "Content Views": 4200,
    "Quiz Attempts": 2100,
    "Discussion Posts": 1400,
    "Assignment Submissions": 3000,
  },
  {
    name: "Week 3",
    "Content Views": 3800,
    "Quiz Attempts": 2500,
    "Discussion Posts": 2000,
    "Assignment Submissions": 3400,
  },
  {
    name: "Week 4",
    "Content Views": 4100,
    "Quiz Attempts": 2800,
    "Discussion Posts": 2200,
    "Assignment Submissions": 3100,
  },
  {
    name: "Week 5",
    "Content Views": 3700,
    "Quiz Attempts": 2300,
    "Discussion Posts": 1900,
    "Assignment Submissions": 2900,
  },
  {
    name: "Week 6",
    "Content Views": 4500,
    "Quiz Attempts": 2600,
    "Discussion Posts": 2100,
    "Assignment Submissions": 3300,
  },
  {
    name: "Week 7",
    "Content Views": 4800,
    "Quiz Attempts": 2900,
    "Discussion Posts": 2400,
    "Assignment Submissions": 3700,
  },
  {
    name: "Week 8",
    "Content Views": 5000,
    "Quiz Attempts": 3100,
    "Discussion Posts": 2500,
    "Assignment Submissions": 3800,
  },
];

export function EngagementChart() {
  const [dataType, setDataType] = React.useState("all");

  // Filter data based on selected type
  const getFilteredData = () => {
    if (dataType === "all") return engagementData;

    return engagementData.map((week) => {
      const filteredWeek: any = { name: week.name };

      if (dataType === "views")
        filteredWeek["Content Views"] = week["Content Views"];
      if (dataType === "quizzes")
        filteredWeek["Quiz Attempts"] = week["Quiz Attempts"];
      if (dataType === "discussions")
        filteredWeek["Discussion Posts"] = week["Discussion Posts"];
      if (dataType === "assignments")
        filteredWeek["Assignment Submissions"] = week["Assignment Submissions"];

      return filteredWeek;
    });
  };

  return (
    <div className="space-y-4">
      <Tabs value={dataType} onValueChange={setDataType}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Activity</TabsTrigger>
          <TabsTrigger value="views">Content Views</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={getFilteredData()}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [
                `${value.toLocaleString()} interactions`,
                "",
              ]}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Legend />
            {(dataType === "all" || dataType === "views") && (
              <Line
                type="monotone"
                dataKey="Content Views"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            )}
            {(dataType === "all" || dataType === "quizzes") && (
              <Line type="monotone" dataKey="Quiz Attempts" stroke="#82ca9d" />
            )}
            {(dataType === "all" || dataType === "discussions") && (
              <Line
                type="monotone"
                dataKey="Discussion Posts"
                stroke="#ffc658"
              />
            )}
            {(dataType === "all" || dataType === "assignments") && (
              <Line
                type="monotone"
                dataKey="Assignment Submissions"
                stroke="#ff8042"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border rounded-md p-4">
          <div className="text-sm font-medium text-muted-foreground">
            Avg. Content Views
          </div>
          <div className="text-2xl font-bold">4,262</div>
          <div className="text-xs text-muted-foreground">Per week</div>
        </div>
        <div className="border rounded-md p-4">
          <div className="text-sm font-medium text-muted-foreground">
            Avg. Quiz Attempts
          </div>
          <div className="text-2xl font-bold">2,587</div>
          <div className="text-xs text-muted-foreground">Per week</div>
        </div>
        <div className="border rounded-md p-4">
          <div className="text-sm font-medium text-muted-foreground">
            Avg. Discussion Posts
          </div>
          <div className="text-2xl font-bold">2,037</div>
          <div className="text-xs text-muted-foreground">Per week</div>
        </div>
        <div className="border rounded-md p-4">
          <div className="text-sm font-medium text-muted-foreground">
            Avg. Submissions
          </div>
          <div className="text-2xl font-bold">3,300</div>
          <div className="text-xs text-muted-foreground">Per week</div>
        </div>
      </div>
    </div>
  );
}
