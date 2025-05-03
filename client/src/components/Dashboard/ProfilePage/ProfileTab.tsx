const ProfileTab = ({ userData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-primary mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-border rounded-md bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            value={userData.name}
            disabled
            // onChange={(e) => handleProfileUpdate("name", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 border border-border bg-muted rounded-md"
            value={userData.email}
            disabled
            // onChange={(e) => handleProfileUpdate("email", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-1">
            Role
          </label>
          <select
            className="w-full p-2 border border-border rounded-md bg-muted"
            value={userData.role}
            disabled
            // onChange={(e) => handleProfileUpdate("role", e.target.value)}
          >
            <option>teacher</option>
            <option>student</option>
          </select>
        </div>

        {userData.role === "teacher" && (
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Subject
            </label>
            <input
              type="text"
              className="w-full p-2 border border-border bg-muted rounded-md"
              value={userData.subject}
              disabled
              // onChange={(e) => handleProfileUpdate("subject", e.target.value)}
            />
          </div>
        )}

        {/* <div>
          <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-1">
            Bio
          </label>
          <textarea
            className="w-full p-2 border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] rounded-md h-32"
            value={userData.bio}
            // onChange={(e) => handleProfileUpdate("bio", e.target.value)}
          />
        </div>

        <button className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-md flex items-center">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button> */}
      </div>
    </div>
  );
};

export default ProfileTab;
