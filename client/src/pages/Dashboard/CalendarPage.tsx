import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  ArrowLeft,
  ArrowRight,
  Plus,
  Info,
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");

  // Mock data for events and schedule
  const events = [
    {
      id: 1,
      title: "Math Lecture",
      course: "Mathematics",
      start: "10:00 AM",
      end: "11:30 AM",
      location: "Room 101",
      color: "bg-blue-100 border-blue-500",
    },
    {
      id: 2,
      title: "Physics Lab",
      course: "Physics",
      start: "2:00 PM",
      end: "4:00 PM",
      location: "Science Building",
      color: "bg-green-100 border-green-500",
    },
    {
      id: 3,
      title: "CS Tutorial",
      course: "Computer Science",
      start: "3:00 PM",
      end: "4:30 PM",
      location: "Computer Lab",
      color: "bg-purple-100 border-purple-500",
    },
    {
      id: 4,
      title: "Literature Seminar",
      course: "Literature",
      start: "1:00 PM",
      end: "2:30 PM",
      location: "Room 205",
      color: "bg-amber-100 border-amber-500",
    },
    {
      id: 5,
      title: "Study Group",
      course: "Mathematics",
      start: "5:00 PM",
      end: "6:30 PM",
      location: "Library",
      color: "bg-blue-100 border-blue-500",
    },
    {
      id: 6,
      title: "Office Hours",
      course: "Physics",
      start: "11:00 AM",
      end: "12:00 PM",
      location: "Science Building",
      color: "bg-green-100 border-green-500",
    },
  ];

  const deadlines = [
    {
      id: 1,
      title: "Calculus Problem Set",
      course: "Mathematics",
      dueDate: "Mar 18, 2025",
      type: "assignment",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      course: "Physics",
      dueDate: "Mar 20, 2025",
      type: "assignment",
    },
    {
      id: 3,
      title: "Midterm Exam",
      course: "Computer Science",
      dueDate: "Mar 25, 2025",
      type: "exam",
    },
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get days in month for calendar view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const calendarDays = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }

    return calendarDays;
  };

  // Generate week days for week view
  const generateWeekDays = () => {
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDate.getDay());

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      weekDays.push(day);
    }

    return weekDays;
  };

  // Navigation functions
  const previousPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setDate(currentDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const nextPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") {
      newDate.setMonth(currentDate.getMonth() + 1);
    } else if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() + 7);
    } else {
      newDate.setDate(currentDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Format date display based on view mode
  const getHeaderDate = () => {
    if (viewMode === "month") {
      return `${
        monthNames[currentDate.getMonth()]
      } ${currentDate.getFullYear()}`;
    } else if (viewMode === "week") {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      if (weekStart.getMonth() === weekEnd.getMonth()) {
        return `${
          monthNames[weekStart.getMonth()]
        } ${weekStart.getDate()} - ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
      } else {
        return `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${
          monthNames[weekEnd.getMonth()]
        } ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
      }
    } else {
      return `${weekDays[currentDate.getDay()]}, ${
        monthNames[currentDate.getMonth()]
      } ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    }
  };

  // Check if a day has events (for month view indicators)
  const hasEvents = (day) => {
    if (!day) return false;

    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return date.getDate() % 3 === 0; // Mock data - just for demonstration
  };

  // Check if a day has deadlines (for month view indicators)
  const hasDeadlines = (day) => {
    if (!day) return false;

    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return date.getDate() % 5 === 0; // Mock data - just for demonstration
  };

  // Render month view
  const renderMonthView = () => {
    const calendarDays = generateCalendarDays();

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-600 py-1"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`
                h-24 p-1 border rounded-md ${
                  day === null
                    ? "invisible"
                    : "cursor-pointer hover:bg-gray-100"
                }
                ${
                  day === currentDate.getDate() &&
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear()
                    ? "border-blue-500 border-2"
                    : "border-gray-200"
                }
              `}
              onClick={() =>
                day &&
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    day
                  )
                )
              }
            >
              <div className="flex flex-col h-full">
                <div className="text-right mb-1">
                  <span
                    className={`inline-block w-6 h-6 rounded-full text-sm text-center leading-6
                    ${
                      day === currentDate.getDate() &&
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear()
                        ? "bg-blue-500 text-white"
                        : ""
                    }
                  `}
                  >
                    {day}
                  </span>
                </div>
                {day && hasEvents(day) && (
                  <div className="text-xs bg-blue-100 border-l-4 border-blue-500 px-1 py-0.5 mb-1 truncate">
                    Class
                  </div>
                )}
                {day && hasDeadlines(day) && (
                  <div className="text-xs bg-red-100 border-l-4 border-red-500 px-1 py-0.5 truncate">
                    Due
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const weekDays = generateWeekDays();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-sm font-medium text-gray-600">
                {weekDays[index].getDate() === currentDate.getDate() &&
                weekDays[index].getMonth() === currentDate.getMonth()
                  ? "Today"
                  : dayNames[day.getDay()]}
              </div>
              <div
                className={`text-lg font-bold ${
                  weekDays[index].getDate() === currentDate.getDate() &&
                  weekDays[index].getMonth() === currentDate.getMonth()
                    ? "text-blue-500"
                    : ""
                }`}
              >
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>
        <div className="border rounded-md overflow-hidden">
          <div className="grid grid-cols-7 h-96 divide-x">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`overflow-y-auto p-1 ${
                  weekDays[index].getDate() === currentDate.getDate() &&
                  weekDays[index].getMonth() === currentDate.getMonth()
                    ? "bg-blue-50"
                    : ""
                }`}
              >
                {index % 2 === 0 && (
                  <div className="text-xs bg-blue-100 border-l-4 border-blue-500 p-1 mb-1 rounded-r">
                    <div className="font-semibold">Class</div>
                    <div>10:00 AM</div>
                  </div>
                )}
                {index % 3 === 0 && (
                  <div className="text-xs bg-green-100 border-l-4 border-green-500 p-1 mb-1 rounded-r">
                    <div className="font-semibold">Study Group</div>
                    <div>2:00 PM</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render day view
  const renderDayView = () => {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-sm text-gray-600">
            {weekDays[currentDate.getDay()]}
          </div>
          <div className="text-2xl font-bold">{currentDate.getDate()}</div>
        </div>
        <div className="border rounded-md bg-white p-4 space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Morning</h3>
            <div className="pl-4 border-l-2 border-blue-500 py-2 bg-blue-50 rounded-r-md">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Math Lecture</div>
                  <div className="text-sm text-gray-600">Room 101</div>
                </div>
                <div className="text-sm font-medium">10:00 AM - 11:30 AM</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Afternoon</h3>
            <div className="pl-4 border-l-2 border-green-500 py-2 bg-green-50 rounded-r-md">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Physics Lab</div>
                  <div className="text-sm text-gray-600">Science Building</div>
                </div>
                <div className="text-sm font-medium">2:00 PM - 4:00 PM</div>
              </div>
            </div>
            <div className="pl-4 border-l-2 border-purple-500 py-2 bg-purple-50 rounded-r-md">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Study Session</div>
                  <div className="text-sm text-gray-600">Library</div>
                </div>
                <div className="text-sm font-medium">5:00 PM - 6:30 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full bg-[hsl(var(--card))] p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[hsl(var(--card-foreground))]">
          Calendar
        </h1>
        <div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Mini calendar for date selection */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>March 2025</CardTitle>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid grid-cols-7 gap-1 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="text-xs text-gray-500">
                    {day}
                  </div>
                ))}
                {Array(35)
                  .fill(null)
                  .map((_, i) => {
                    const day = i - 3;
                    return (
                      <div
                        key={i}
                        className={`text-xs h-6 w-6 flex items-center justify-center rounded-full 
                        ${
                          day === 14
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-100 cursor-pointer"
                        }
                        ${
                          day < 1 || day > 31
                            ? "text-gray-300"
                            : "text-[hsl(var(--card-foreground))]"
                        }
                      `}
                      >
                        {day > 0 && day <= 31 ? day : ""}
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming deadlines */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {deadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className="p-2 border rounded-md hover:bg-gray-50"
                >
                  <div className="flex justify-between">
                    <div className="font-medium">{deadline.title}</div>
                    <Badge
                      variant={
                        deadline.type === "exam" ? "destructive" : "default"
                      }
                    >
                      {deadline.type === "exam" ? "Exam" : "Assignment"}
                    </Badge>
                  </div>
                  <div className="text-sm text-[hsl(var(--card-foreground))] flex justify-between mt-1">
                    <span>{deadline.course}</span>
                    <span>{deadline.dueDate}</span>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Deadlines
              </Button>
            </CardFooter>
          </Card>

          {/* Color legend */}
          <Card>
            <CardHeader>
              <CardTitle>Color Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                <span>Mathematics</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span>Physics</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                <span>Computer Science</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-amber-500 rounded-full mr-2"></div>
                <span>Literature</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main calendar area */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <CardTitle>{getHeaderDate()}</CardTitle>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button variant="outline" size="sm" onClick={previousPeriod}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    {viewMode === "month"
                      ? "Prev"
                      : viewMode === "week"
                      ? "Prev Week"
                      : "Prev Day"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={goToToday}>
                    Today
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextPeriod}>
                    {viewMode === "month"
                      ? "Next"
                      : viewMode === "week"
                      ? "Next Week"
                      : "Next Day"}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                  <Select
                    defaultValue={viewMode}
                    onValueChange={(value) => setViewMode(value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="View" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="day">Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === "month" && renderMonthView()}
              {viewMode === "week" && renderWeekView()}
              {viewMode === "day" && renderDayView()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
