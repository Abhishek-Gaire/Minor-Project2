import axios from 'axios';

// Define base URL for API calls
const API_BASE_URL = import.meta.env.VITE_BACKEND_URI!;

// Types
export interface StudyMaterial {
  id: number;
  title: string;
  description: string;
  type: string;
  subject: string;
  grade: number;
  fileUrl: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  teacherId: number;
}

export interface CreateMaterialForm {
  title: string;
  subject: string;
  type: string;
  file: File;
  uploadedBy: string;
}

// API Functions
export const materialService = {
  // Get all study materials (with filtering capability)
  async getMaterials(filters?: { subject?: string; grade?: number; type?: string; searchTerm?: string }) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/teacher/materials`, { 
        params: filters,
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching study materials:', error);
      throw error;
    }
  },

  // Get a single material by ID
  async getMaterialById(id: number) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/teacher/materials/${id}`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching material with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new study material (teachers only)
  async createMaterial(materialData: CreateMaterialForm) {
    try {
      // Create FormData for the file upload
      const formData = new FormData();
      
      // Add the file
      formData.append('file', materialData.file);
      
      // Add other material data as separate fields
      Object.keys(materialData).forEach((key) => {
        if (key !== 'file') {
          formData.append(key, materialData[key]);
        }
      });
      
      const response = await axios.post(`${API_BASE_URL}/api/v1/teacher/materials`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      
      return response.data;
    } catch (error) {
      console.error('Error creating study material:', error);
      throw error;
    }
  },

  // Update an existing study material (teachers only)
  async updateMaterial(id: number, materialData: Partial<StudyMaterial>) {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/v1/teacher/materials/${id}`, materialData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating material with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a study material (teachers only)
  async deleteMaterial(id: number) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/v1/teacher/materials/${id}`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting material with ID ${id}:`, error);
      throw error;
    }
  },

  // Download a study material
  async downloadMaterial(material: StudyMaterial) {
    try {
      if (material.fileUrl) {
        window.open(material.fileUrl, '_blank');
        return true;
      } else {
        throw new Error("No file URL available");
      }
    } catch (error) {
      console.error('Error downloading material:', error);
      throw error;
    }
  },

  // View a study material
  async viewMaterial(material: StudyMaterial) {
    try {
      if (!material.fileUrl) {
        throw new Error("No file URL available");
      }

      if (material.fileType === "application/pdf") {
        // For PDFs - return URL to be used in iframe or viewer component
        return {
          viewType: 'pdf',
          url: material.fileUrl,
          title: material.fileName
        };
      } else if (material.fileType.includes("video/")) {
        // For videos - return URL to be used in video player
        return {
          viewType: 'video',
          url: material.fileUrl,
          title: material.fileName
        };
      } else if (material.fileType.includes("word")) {
        // For Word documents - use Office Online viewer
        const viewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(material.fileUrl)}`;
        return {
          viewType: 'office',
          url: viewerUrl,
          title: material.fileName
        };
      } else {
        // Default case - just return the URL
        return {
          viewType: 'default',
          url: material.fileUrl,
          title: material.fileName
        };
      }
    } catch (error) {
      console.error('Error viewing material:', error);
      throw error;
    }
  }
};

export default materialService;