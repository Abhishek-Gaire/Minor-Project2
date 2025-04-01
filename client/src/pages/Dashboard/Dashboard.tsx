import React from "react";
import { Users, BookOpen, Clock, Calendar, GraduationCap } from "lucide-react";
import StatsCard from "@/components/Dashboard/DashboardHome/StatsCard";
import { useAuth } from "@/contexts/useAuth";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  user.role = "teacher";
  const renderTeacherDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="My Classes"
          value="5"
          icon={<BookOpen size={24} className="text-blue-700" />}
          change="Grades 5-10"
        />
        <StatsCard
          title="Total Students"
          value="132"
          icon={<Users size={24} className="text-blue-700" />}
          change="+5 this semester"
          changeType="positive"
        />
        <StatsCard
          title="Upcoming Classes"
          value="8"
          icon={<Calendar size={24} className="text-blue-700" />}
          change="Next class in 2 hours"
        />
        <StatsCard
          title="Assignments Pending"
          value="24"
          icon={<Clock size={24} className="text-blue-700" />}
          change="5 need grading"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Class Performance</h2>
          <div className="space-y-4">
            {[
              { class: "Mathematics (Grade 7)", avgScore: 82.5 },
              { class: "Science (Grade 8)", avgScore: 79.3 },
              { class: "English (Grade 6)", avgScore: 85.1 },
              { class: "History (Grade 9)", avgScore: 76.8 },
            ].map((classData, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 border-b last:border-0"
              >
                <span className="font-medium">{classData.class}</span>
                <span className="font-bold text-blue-600">
                  {classData.avgScore}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Schedule</h2>
          <div className="space-y-4">
            {[
              { subject: "Mathematics", grade: 7, time: "10:00 AM - 11:30 AM" },
              { subject: "Science", grade: 8, time: "1:00 PM - 2:30 PM" },
              { subject: "English", grade: 6, time: "3:00 PM - 4:30 PM" },
            ].map((schedule, i) => (
              <div key={i} className="flex p-3 border-b last:border-0">
                <div className="w-16 mr-4 text-center">
                  <p className="text-sm font-bold">MAR</p>
                  <p className="text-xl font-bold">{25 + i}</p>
                </div>
                <div>
                  <p className="font-medium">
                    {schedule.subject} (Grade {schedule.grade})
                  </p>
                  <p className="text-sm text-secondary-foreground">
                    {schedule.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderStudentDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Ongoing Courses"
          value="6"
          icon={<BookOpen size={24} className="text-blue-700" />}
        />
        <StatsCard
          title="Current Grade"
          value="B+"
          icon={<GraduationCap size={24} className="text-blue-700" />}
          change="Improved from last semester"
          changeType="positive"
        />
        <StatsCard
          title="Upcoming Assignments"
          value="4"
          icon={<Clock size={24} className="text-blue-700" />}
          change="2 due this week"
        />
        <StatsCard
          title="Attendance"
          value="92%"
          icon={<Calendar size={24} className="text-blue-700" />}
          change="Excellent"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Grades</h2>
          <div className="space-y-4">
            {[
              { subject: "Mathematics", grade: "A-", date: "Feb 15" },
              { subject: "Science", grade: "B+", date: "Feb 22" },
              { subject: "English", grade: "A", date: "Mar 1" },
              { subject: "History", grade: "B", date: "Mar 10" },
            ].map((gradeItem, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 border-b last:border-0"
              >
                <span className="font-medium">{gradeItem.subject}</span>
                <div>
                  <span className="font-bold mr-2">{gradeItem.grade}</span>
                  <span className="text-secondary-foreground text-sm">
                    {gradeItem.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Classes</h2>
          <div className="space-y-4">
            {[
              {
                subject: "Mathematics",
                time: "10:00 AM - 11:30 AM",
                room: "Lab 3",
              },
              {
                subject: "Science",
                time: "1:00 PM - 2:30 PM",
                room: "Science Block",
              },
              {
                subject: "English",
                time: "3:00 PM - 4:30 PM",
                room: "Classroom 7B",
              },
            ].map((classItem, i) => (
              <div key={i} className="flex p-3 border-b last:border-0">
                <div className="w-16 mr-4 text-center">
                  <p className="text-sm font-bold">MAR</p>
                  <p className="text-xl font-bold">{25 + i}</p>
                </div>
                <div>
                  <p className="font-medium">{classItem.subject}</p>
                  <p className="text-sm text-secondary-foreground">
                    {classItem.time}
                  </p>
                  <p className="text-sm text-secondary-foreground">
                    {classItem.room}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-foreground">
          Welcome back, {user.name} ({user.role})
        </p>
      </header>

      {user.role === "teacher" && renderTeacherDashboard()}
      {user.role === "student" && renderStudentDashboard()}
    </div>
  );
};

export default Dashboard;
