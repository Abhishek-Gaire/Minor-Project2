import { useParams, Link } from "react-router-dom";
import Layout  from "@/components/Layout";
import { MapPin, Mail, Phone, User, Building, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

interface SchoolData {
  id: string;
  schoolName: string;
  schoolAddress: string;
  city: string;
  contactPerson: string;
  role: string;
  email: string;
  phone: string;
  imageUrl: string;
  createdAt: string;
}

export function SchoolProfile() {
  const { id } = useParams();
  const [school, setSchool] = useState<SchoolData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await fetch(`${BACKEND_URI}/api/v1/schools/${id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch school data");
        }
        
        const data = await response.json();
        setSchool(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolData();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !school) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-red-50 p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
              <h2 className="text-lg font-medium text-red-700">Error Loading School Profile</h2>
            </div>
            <p className="text-gray-700">{error || "School not found"}</p>
            <Link to="/" className="mt-4 inline-block text-indigo-600 hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Date(school.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* School Image Banner */}
          <div className="h-72 w-full relative bg-gray-100">
            {school.imageUrl ? (
              <img 
                src={school.imageUrl} 
                alt={school.schoolName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <Building className="h-16 w-16 text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>

          {/* School Profile Content */}
          <div className="px-6 py-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{school.schoolName}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <p>{school.schoolAddress}, {school.city}</p>
              </div>
              <p className="text-sm text-gray-500 mt-1">Registered on {formattedDate}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Contact Information */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h2 className="font-medium text-lg text-gray-900 mb-3">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">{school.contactPerson}</p>
                      <p className="text-sm text-gray-600">{school.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-2" />
                    <a href={`mailto:${school.email}`} className="text-blue-600 hover:underline">
                      {school.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-2" />
                    <a href={`tel:${school.phone}`} className="text-blue-600 hover:underline">
                      {school.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h2 className="font-medium text-lg text-gray-900 mb-3">Quick Actions</h2>
                <div className="space-y-3">
                  <Link
                    to="/admin/login"
                    className="flex items-center justify-center w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700 transition-colors"
                  >
                    Access Admin Dashboard
                  </Link>
                  <Link
                    to={`/school/${id}/edit`}
                    className="flex items-center justify-center w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors"
                  >
                    Edit School Information
                  </Link>
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="font-medium text-lg text-gray-900 mb-4">About This Institution</h2>
              <p className="text-gray-600">
                This is the official profile page for {school.schoolName}. Administrators can manage 
                school information, student records, and more through the admin dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}