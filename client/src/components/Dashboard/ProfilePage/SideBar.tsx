import { Bell, HelpCircle, Settings, Shield, User } from "lucide-react";

const SideBar = ({ userData, activeTab, setActiveTab }) => {
  return (
    <div className="w-full md:w-64 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] rounded-lg shadow">
      <div className="flex flex-col p-4">
        <div className="flex items-center justify-center mb-6 flex-col">
          <img
            src={userData.avatar}
            alt="Profile"
            className="rounded-full w-24 h-24 mb-3"
          />
          <h3 className="font-semibold text-lg">{userData.name}</h3>
          <p className="text-[hsl(var(--muted-foreground))] text-sm">
            {userData.role}
          </p>
        </div>

        <div className="space-y-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center w-full p-3 rounded-md ${
              activeTab === "profile"
                ? "bg-[hsl(var(--primary-foreground))] text-[hsl(var(--primary))]"
                : "hover:bg-[hsl(var(--accent))]"
            }`}
          >
            <User className="h-5 w-5 mr-3" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center w-full p-3 rounded-md ${
              activeTab === "notifications"
                ? "bg-[hsl(var(--primary-foreground))] text-[hsl(var(--primary))]"
                : "hover:bg-[hsl(var(--accent))]"
            }`}
          >
            <Bell className="h-5 w-5 mr-3" />
            <span>Notifications</span>
          </button>

          <button
            onClick={() => setActiveTab("appearance")}
            className={`flex items-center w-full p-3 rounded-md ${
              activeTab === "appearance"
                ? "bg-[hsl(var(--primary-foreground))] text-[hsl(var(--primary))]"
                : "hover:bg-[hsl(var(--accent))]"
            }`}
          >
            <Settings className="h-5 w-5 mr-3" />
            <span>Appearance</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center w-full p-3 rounded-md ${
              activeTab === "security"
                ? "bg-[hsl(var(--primary-foreground))] text-[hsl(var(--primary))]"
                : "hover:bg-[hsl(var(--accent))]"
            }`}
          >
            <Shield className="h-5 w-5 mr-3" />
            <span>Security</span>
          </button>

          <button
            onClick={() => setActiveTab("help")}
            className={`flex items-center w-full p-3 rounded-md ${
              activeTab === "help"
                ? "bg-[hsl(var(--primary-foreground))] text-[hsl(var(--primary))]"
                : "hover:bg-[hsl(var(--accent))]"
            }`}
          >
            <HelpCircle className="h-5 w-5 mr-3" />
            <span>Help & Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
