import { Bell, Clock, FileText, Mail, Save } from "lucide-react";

const NotificationsTab = ({
  notificationSettings,
  handleNotificationChange,
}) => {
  return (
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
              onChange={() => handleNotificationChange("emailNotifications")}
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
              onChange={() => handleNotificationChange("pushNotifications")}
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
              onChange={() => handleNotificationChange("assignmentReminders")}
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
  );
};

export default NotificationsTab;
