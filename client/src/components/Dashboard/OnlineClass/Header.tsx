import { Plus } from "lucide-react";

const Header = ({ userRole, setShowAddClassForm }) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">My Classes</h2>
        <p className="text-gray-400">
          {userRole === "student"
            ? "View and join your classes"
            : "Manage your teaching schedule"}
        </p>
      </div>

      {userRole === "teacher" && (
        <button
          className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
          onClick={() => setShowAddClassForm(true)}
        >
          <Plus size={18} className="mr-2" />
          Add Class
        </button>
      )}
    </div>
  );
};
export default Header;
