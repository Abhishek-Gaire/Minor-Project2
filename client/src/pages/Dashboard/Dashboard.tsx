import React from "react";
import { Users, BookOpen, Clock, Calendar } from "lucide-react";

import StatsCard from "@/components/Dashboard/DashboardHome/StatsCard";
import { useAuth } from "@/contexts/useAuth";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! {user.role}: {user.name}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Students"
          value="245"
          icon={<Users size={24} className="text-blue-700" />}
          change="+12% from last semester"
          changeType="positive"
        />
        <StatsCard
          title="Active Courses"
          value="8"
          icon={<BookOpen size={24} className="text-blue-700" />}
        />
        <StatsCard
          title="Upcoming Classes"
          value="3"
          icon={<Calendar size={24} className="text-blue-700" />}
          change="Next class in 2 hours"
        />
        <StatsCard
          title="Assignments Due"
          value="12"
          icon={<Clock size={24} className="text-blue-700" />}
          change="5 need grading"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center p-3 border-b last:border-0"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <Users size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">
                    Student {i} submitted assignment
                  </p>
                  <p className="text-sm text-gray-500">{i * 2} hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Schedule</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex p-3 border-b last:border-0">
                <div className="w-16 mr-4 text-center">
                  <p className="text-sm font-bold">FEB</p>
                  <p className="text-xl font-bold">{20 + i}</p>
                </div>
                <div>
                  <p className="font-medium">Introduction to Programming</p>
                  <p className="text-sm text-gray-500">10:00 AM - 11:30 AM</p>
                  <div className="flex items-center mt-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                      <span className="text-white text-xs">32</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      students enrolled
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
