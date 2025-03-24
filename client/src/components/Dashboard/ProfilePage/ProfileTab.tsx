import { Save } from "lucide-react";

const ProfileTab = ({ userData, handleProfileUpdate }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-[hsl(var(--border))] rounded-md text-[hsl(var(--muted-foreground))]"
            value={userData.name}
            onChange={(e) => handleProfileUpdate("name", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] rounded-md"
            value={userData.email}
            onChange={(e) => handleProfileUpdate("email", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-1">
            Role
          </label>
          <select
            className="w-full p-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))]"
            value={userData.role}
            onChange={(e) => handleProfileUpdate("role", e.target.value)}
          >
            <option>teacher</option>
            <option>student</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-1">
            Subject
          </label>
          <input
            type="text"
            className="w-full p-2 border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] rounded-md"
            value={userData.subject}
            onChange={(e) => handleProfileUpdate("subject", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-1">
            Bio
          </label>
          <textarea
            className="w-full p-2 border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] rounded-md h-32"
            value={userData.bio}
            onChange={(e) => handleProfileUpdate("bio", e.target.value)}
          />
        </div>

        <button className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-md flex items-center">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;
