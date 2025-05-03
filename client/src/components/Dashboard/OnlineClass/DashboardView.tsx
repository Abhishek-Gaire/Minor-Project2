import Header from "./Header";
import TabNavigation from "./TabNavigation";
import FilteredClasses from "./FilteredClasses";
import { Calendar, Loader } from "lucide-react";
import AddClassForm from "./AddClassForm";

const DashboardView = ({
  user,
  setShowAddClassForm,
  activeTab,
  setActiveTab,
  filteredClasses,
  handleAddClass,
  handleDeleteClass,
  handleCreateRoom,
  handleJoinClass,
  handleStartClass,
  handleEndClass,
  showAddClassForm,
  isLoading,
}) => {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <Header userRole={user?.role} setShowAddClassForm={setShowAddClassForm} />

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Class List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin h-8 w-8 text-blue-600" />
          <span className="ml-2">Loading classes...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.length > 0 ? (
            filteredClasses.map((cls) => (
              <FilteredClasses
                cls={cls}
                userRole={user?.role}
                key={cls.id}
                handleDeleteClass={handleDeleteClass}
                handleCreateRoom={handleCreateRoom}
                handleJoinClass={handleJoinClass}
                handleStartClass={handleStartClass}
                handleEndClass={handleEndClass}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-16 text-primary-background">
              <Calendar size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">No {activeTab} classes found</p>
              {user?.role === "teacher" && activeTab === "upcoming" && (
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                  onClick={() => setShowAddClassForm(true)}
                >
                  Add Your First Class
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Add Class Form Modal */}
      {showAddClassForm && (
        <AddClassForm
          onSubmit={handleAddClass}
          onCancel={() => setShowAddClassForm(false)}
        />
      )}
    </div>
  );
};

export default DashboardView;
