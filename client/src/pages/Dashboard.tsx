import { StatsCard } from "../components/Dashboard/StatsCard";
import { RecentActivity } from "../components/Dashboard/RecentActivity";

const Dashboard =()=> {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
      </div>

      <div>
        <StatsCard title="Total Students" value="--" icon="Users" />
        <StatsCard title="Active Courses" value="--" icon="BookOpen" />
        <StatsCard title="Assignments Due" value="--" icon="ClipboardList" />
        <StatsCard title="Average Grade" value="--" icon="TrendingUp" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
      </div>
    </div>
  );
}
export default Dashboard;