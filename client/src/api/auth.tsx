
import axios from 'axios';

export const resetPassword = async (token: string | undefined, newPassword: string) => {
  const response = await axios.post(
    `http://localhost:5000/api/auth/reset-password/${token}`,
    { password: newPassword }
  );
  return response.data;
};
