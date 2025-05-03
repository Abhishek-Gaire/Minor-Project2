import { useState } from "react";
import { Save, AlertCircle, CheckCircle } from "lucide-react";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

const SecurityTab = ({ user }: { user: any }) => {
  const userRole = user.role;
  
  // Form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  // Form validation
  const [validationErrors, setValidationErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const validateForm = () => {
    const errors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    };
    let isValid = true;

    if (!currentPassword) {
      errors.currentPassword = "Current password is required";
      isValid = false;
    }

    if (!newPassword) {
      errors.newPassword = "New password is required";
      isValid = false;
    } else if (newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your new password";
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    // Reset status messages
    setErrorMsg("");
    setSuccessMsg("");
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    const baseUrl = `${BACKEND_URI}/api/v1/admin`;
    const fullUrl =
      userRole === "teacher"
        ? `${baseUrl}/teacher/${user.id}/password`
        : `${baseUrl}/student/${user.id}/password`;

   
    try {
      const response = await fetch(fullUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to update password");
      }
      
      // Success case
      setSuccessMsg("Password updated successfully!");
      // Clear form after successful update
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setErrorMsg(error.message || "An error occurred while updating password");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

      <div className="space-y-6">
        {/* Feedback messages */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        
        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleUpdatePassword}>
          <div>
            <h3 className="text-lg font-medium mb-3">Change Password</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className={`w-full p-2 border text-primary-foreground ${
                    validationErrors.currentPassword ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                {validationErrors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.currentPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className={`w-full p-2 border text-primary-foreground ${
                    validationErrors.newPassword ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {validationErrors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.newPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className={`w-full p-2 border text-primary-foreground ${
                    validationErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {validationErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>
                )}
              </div>
            </div>

            <button 
              type="submit"
              className={`bg-blue-600 text-white px-4 py-2 rounded-md flex items-center mt-4 ${
                isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecurityTab;