import { CheckCircle, Clock, Video } from "lucide-react";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-700 mb-6">
      <button
        className={`px-4 py-2 mr-4 ${
          activeTab === "upcoming"
            ? "border-b-2 border-blue-400 text-blue-400"
            : "text-gray-400"
        }`}
        onClick={() => setActiveTab("upcoming")}
      >
        <div className="flex items-center">
          <Clock size={16} className="mr-2" />
          Upcoming
        </div>
      </button>
      <button
        className={`px-4 py-2 mr-4 ${
          activeTab === "ongoing"
            ? "border-b-2 border-blue-400 text-blue-400"
            : "text-gray-400"
        }`}
        onClick={() => setActiveTab("ongoing")}
      >
        <div className="flex items-center">
          <Video size={16} className="mr-2" />
          Ongoing
        </div>
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === "finished"
            ? "border-b-2 border-blue-400 text-blue-400"
            : "text-gray-400"
        }`}
        onClick={() => setActiveTab("finished")}
      >
        <div className="flex items-center">
          <CheckCircle size={16} className="mr-2" />
          Finished
        </div>
      </button>
    </div>
  );
};

export default TabNavigation;
