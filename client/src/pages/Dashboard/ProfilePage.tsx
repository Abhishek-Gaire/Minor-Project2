import { useState } from "react";
import {
  User,
  Settings,
  Bell,
  Mail,
  Shield,
  HelpCircle,
  FileText,
  Clock,
  Save,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/contexts/useAuth";

const ProfilePage = ({ initialActiveTab = "profile" }) => {
  const { user } = useAuth();
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

  // Demo appearance settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    fontSize: "medium",
    compactView: false,
    highContrast: false,
  });

  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  const handleAppearanceChange = (setting, value) => {
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

  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto p-4 gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white rounded-lg shadow">
        <div className="flex flex-col p-4">
          <div className="flex items-center justify-center mb-6 flex-col">
            <img
              src={userData.avatar}
              alt="Profile"
              className="rounded-full w-24 h-24 mb-3"
            />
            <h3 className="font-semibold text-lg">{userData.name}</h3>
            <p className="text-gray-500 text-sm">{userData.role}</p>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center w-full p-3 rounded-md ${
                activeTab === "profile"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <User className="h-5 w-5 mr-3" />
              <span>Profile</span>
            </button>

            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center w-full p-3 rounded-md ${
                activeTab === "notifications"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <Bell className="h-5 w-5 mr-3" />
              <span>Notifications</span>
            </button>

            <button
              onClick={() => setActiveTab("appearance")}
              className={`flex items-center w-full p-3 rounded-md ${
                activeTab === "appearance"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <Settings className="h-5 w-5 mr-3" />
              <span>Appearance</span>
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center w-full p-3 rounded-md ${
                activeTab === "security"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <Shield className="h-5 w-5 mr-3" />
              <span>Security</span>
            </button>

            <button
              onClick={() => setActiveTab("help")}
              className={`flex items-center w-full p-3 rounded-md ${
                activeTab === "help"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <HelpCircle className="h-5 w-5 mr-3" />
              <span>Help & Support</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={userData.name}
                  onChange={(e) => handleProfileUpdate("name", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={userData.email}
                  onChange={(e) => handleProfileUpdate("email", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md bg-white"
                  value={userData.role}
                  onChange={(e) => handleProfileUpdate("role", e.target.value)}
                >
                  <option>teacher</option>
                  <option>student</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={userData.subject}
                  onChange={(e) =>
                    handleProfileUpdate("subject", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md h-32"
                  value={userData.bio}
                  onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                />
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Notification Settings</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-gray-600" />
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-gray-500 text-sm">
                      Receive notifications via email
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationSettings.emailNotifications}
                    onChange={() =>
                      handleNotificationChange("emailNotifications")
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-3 text-gray-600" />
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-gray-500 text-sm">
                      Receive notifications in-app
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationSettings.pushNotifications}
                    onChange={() =>
                      handleNotificationChange("pushNotifications")
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3 text-gray-600" />
                  <div>
                    <h3 className="font-medium">Assignment Reminders</h3>
                    <p className="text-gray-500 text-sm">
                      Get notified about upcoming assignments
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationSettings.assignmentReminders}
                    onChange={() =>
                      handleNotificationChange("assignmentReminders")
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-gray-600" />
                  <div>
                    <h3 className="font-medium">Grade Updates</h3>
                    <p className="text-gray-500 text-sm">
                      Get notified when grades are updated
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationSettings.gradeUpdates}
                    onChange={() => handleNotificationChange("gradeUpdates")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center mt-4">
                <Save className="h-4 w-4 mr-2" />
                Save Notification Preferences
              </button>
            </div>
          </div>
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
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleAppearanceChange("theme", "light")}
                  >
                    <div className="w-16 h-16 mb-2 bg-white border border-gray-200 rounded-md"></div>
                    <span>Light</span>
                  </div>

                  <div
                    className={`border p-4 rounded-lg cursor-pointer flex flex-col items-center ${
                      appearanceSettings.theme === "dark"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleAppearanceChange("theme", "dark")}
                  >
                    <div className="w-16 h-16 mb-2 bg-gray-800 rounded-md"></div>
                    <span>Dark</span>
                  </div>

                  <div
                    className={`border p-4 rounded-lg cursor-pointer flex flex-col items-center ${
                      appearanceSettings.theme === "system"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
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
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
                      <p className="text-gray-500 text-sm">
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
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">High Contrast</h4>
                      <p className="text-gray-500 text-sm">
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
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Save Appearance Settings
              </button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Change Password</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center mt-4">
                  <Save className="h-4 w-4 mr-2" />
                  Update Password
                </button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">
                  Two-Factor Authentication
                </h3>
                <p className="text-gray-500 mb-3">
                  Add an extra layer of security to your account by enabling
                  two-factor authentication.
                </p>

                <button className="bg-green-600 text-white px-4 py-2 rounded-md">
                  Enable Two-Factor Authentication
                </button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Login Sessions</h3>
                <p className="text-gray-500 mb-3">
                  Review and manage your active login sessions.
                </p>

                <div className="border rounded-md divide-y">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Chrome on Windows</h4>
                      <p className="text-gray-500 text-sm">
                        Last active: 2 minutes ago
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Current Session
                    </span>
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Safari on iPhone</h4>
                      <p className="text-gray-500 text-sm">
                        Last active: 3 hours ago
                      </p>
                    </div>
                    <button className="text-red-600 text-sm hover:underline">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Tab */}
        {activeTab === "help" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Help & Support</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">
                  Frequently Asked Questions
                </h3>

                <div className="space-y-3">
                  <div className="border rounded-md overflow-hidden">
                    <button className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100">
                      <span className="font-medium">
                        How do I create a new class?
                      </span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="border rounded-md overflow-hidden">
                    <button className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100">
                      <span className="font-medium">
                        How do I add students to my class?
                      </span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="border rounded-md overflow-hidden">
                    <button className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100">
                      <span className="font-medium">
                        How do I create and assign homework?
                      </span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="border rounded-md overflow-hidden">
                    <button className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100">
                      <span className="font-medium">
                        How do I generate reports?
                      </span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Contact Support</h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                      <option>Technical Issue</option>
                      <option>Billing Question</option>
                      <option>Feature Request</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md h-32"
                      placeholder="Describe your issue or question..."
                    />
                  </div>
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center mt-4">
                  Send Message
                </button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">
                  Documentation & Tutorials
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium mb-1">Getting Started Guide</h4>
                    <p className="text-gray-500 text-sm">
                      Learn the basics of Smart Class Management.
                    </p>
                  </div>

                  <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium mb-1">Video Tutorials</h4>
                    <p className="text-gray-500 text-sm">
                      Watch step-by-step guides for common tasks.
                    </p>
                  </div>

                  <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium mb-1">Advanced Features</h4>
                    <p className="text-gray-500 text-sm">
                      Discover tips and tricks for power users.
                    </p>
                  </div>

                  <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium mb-1">API Documentation</h4>
                    <p className="text-gray-500 text-sm">
                      Integrate with other tools and services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
