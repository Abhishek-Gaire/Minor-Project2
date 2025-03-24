import { Save } from "lucide-react";

const SecurityTab = () => {
  return (
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
  );
};

export default SecurityTab;
