import axios from "axios";
import { ClassSession } from "@/utils/types";

// Define base URL for API calls
const API_BASE_URL = import.meta.env.VITE_BACKEND_URI!;

export const onlineClassService = {
  // Get all classes based on user.id
  async getClasses(userId: string) {
    try {
      const url = `${API_BASE_URL}/api/v1/classes/get/${userId}`;

      const response = await axios.get(url, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.error(`Error fetching classes for user ${userId}:`, error);
      throw error;
    }
  },

  // Add a new class session
  async addClass(classData: Omit<ClassSession, "id">) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/classes/create`,
        classData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding new class:", error);
      throw error;
    }
  },

  // Update an existing class session
  async updateClassStatus(classId: string, classData: Partial<ClassSession>) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/v1/classes/update/${classId}`,
        classData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating class ${classId}:`, error);
      throw error;
    }
  },

  // Delete a class session
  async deleteClass(classId: string) {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/v1/classes/delete/${classId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting class ${classId}:`, error);
      throw error;
    }
  },
};
