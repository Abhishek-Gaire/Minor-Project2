import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { useAuth } from "@/contexts/useAuth";
import { useTheme } from "@/contexts/useTheme";
import HelpTab from "@/components/Dashboard/ProfilePage/HelpTab";
import SecurityTab from "@/components/Dashboard/ProfilePage/SecurityTab";
import NotificationsTab from "@/components/Dashboard/ProfilePage/NotificationsTab";
import ProfileTab from "@/components/Dashboard/ProfilePage/ProfileTab";
import SideBar from "@/components/Dashboard/ProfilePage/SideBar";

const ProfilePage = ({ initialActiveTab = "profile" }) => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  // Demo user data
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    subject: "Mathematics",
    bio: "Passionate math educator with 5 years of experience teaching high school algebra and calculus.",
    avatar: "/api/placeholder/150/150",
  });

  // Demo notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    assignmentReminders: true,
    gradeUpdates: true,
    systemAnnouncements: false,
    parentMessages: true,
  });

  // Demo appearance settings - initialize with current theme from context
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: theme, // Use the theme from context
    fontSize: "medium",
    compactView: false,
    highContrast: false,
  });

  // Update appearance settings when theme context changes
  useEffect(() => {
    setAppearanceSettings((prevSettings) => ({
      ...prevSettings,
      theme: theme,
    }));
  }, [theme]);

  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  const handleAppearanceChange = (setting, value) => {
    // If the setting is theme, also update the global theme
    if (setting === "theme") {
      setTheme(value);
    }

    setAppearanceSettings({
      ...appearanceSettings,
      [setting]: value,
    });
  };

  const handleProfileUpdate = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  // Function to save all appearance settings at once
  const saveAppearanceSettings = () => {
    // Update the global theme state with current appearance settings
    setTheme(appearanceSettings.theme);

    // Here you could also save other appearance settings to user preferences
    // For example: saveUserPreferences(appearanceSettings)
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto p-4 gap-6">
      {/* Sidebar */}
      <SideBar
        userData={userData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {/* Main Content */}
      <div className="flex-1 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] rounded-lg shadow p-6">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <ProfileTab
            userData={userData}
            handleProfileUpdate={handleProfileUpdate}
          />
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <NotificationsTab
            notificationSettings={notificationSettings}
            handleNotificationChange={handleNotificationChange}
          />
        )}

        {/* Appearance Tab */}
        {activeTab === "appearance" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Appearance Settings</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={`border p-4 rounded-lg cursor-pointer flex flex-col items-center ${
                      appearanceSettings.theme === "light"
                        ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary-foreground))]"
                        : "border-[hsl(var(--border))]"
                    }`}
                    onClick={() => handleAppearanceChange("theme", "light")}
                  >
                    <div className="w-16 h-16 mb-2 bg-white border border-[hsl(var(--border))] rounded-md"></div>
                    <span>Light</span>
                  </div>

                  <div
                    className={`border p-4 rounded-lg cursor-pointer flex flex-col items-center ${
                      appearanceSettings.theme === "dark"
                        ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary-foreground))]"
                        : "border-[hsl(var(--border))]"
                    }`}
                    onClick={() => handleAppearanceChange("theme", "dark")}
                  >
                    <div className="w-16 h-16 mb-2 bg-gray-800 rounded-md"></div>
                    <span>Dark</span>
                  </div>

                  <div
                    className={`border p-4 rounded-lg cursor-pointer flex flex-col items-center ${
                      appearanceSettings.theme === "system"
                        ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary-foreground))]"
                        : "border-[hsl(var(--border))]"
                    }`}
                    onClick={() => handleAppearanceChange("theme", "system")}
                  >
                    <div className="w-16 h-16 mb-2 bg-gradient-to-r from-white to-gray-800 rounded-md"></div>
                    <span>System</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Font Size</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Small</span>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="1"
                    value={
                      appearanceSettings.fontSize === "small"
                        ? 1
                        : appearanceSettings.fontSize === "medium"
                        ? 2
                        : 3
                    }
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      handleAppearanceChange(
                        "fontSize",
                        value === 1 ? "small" : value === 2 ? "medium" : "large"
                      );
                    }}
                    className="w-full h-2 bg-[hsl(var(--muted))] rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-lg">Large</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Display Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Compact View</h4>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm">
                        Reduce spacing between elements
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={appearanceSettings.compactView}
                        onChange={() =>
                          handleAppearanceChange(
                            "compactView",
                            !appearanceSettings.compactView
                          )
                        }
                      />
                      <div className="w-11 h-6 bg-[hsl(var(--muted))] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[hsl(var(--ring))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-[hsl(var(--primary-foreground))] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[hsl(var(--background))] after:border-[hsl(var(--border))] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[hsl(var(--primary))]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">High Contrast</h4>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm">
                        Increase contrast for better visibility
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={appearanceSettings.highContrast}
                        onChange={() =>
                          handleAppearanceChange(
                            "highContrast",
                            !appearanceSettings.highContrast
                          )
                        }
                      />
                      <div className="w-11 h-6 bg-[hsl(var(--muted))] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[hsl(var(--ring))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-[hsl(var(--primary-foreground))] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[hsl(var(--background))] after:border-[hsl(var(--border))] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[hsl(var(--primary))]"></div>
                    </label>
                  </div>
                </div>
              </div>

              <button
                onClick={saveAppearanceSettings}
                className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-md flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Appearance Settings
              </button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && <SecurityTab />}

        {/* Help Tab */}
        {activeTab === "help" && <HelpTab role={user.role} />}
      </div>
    </div>
  );
};

export default ProfilePage;
