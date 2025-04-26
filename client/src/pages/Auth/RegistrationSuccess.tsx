
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { CheckCircleIcon } from "lucide-react";

export function RegistrationSuccess() {
  const { id } = useParams();

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircleIcon className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Registration Successful!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Your school has been successfully registered in our system. 
            An admin password has been sent to the email address you provided during registration.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-md mb-8">
            <p className="text-blue-700 font-medium">
              Please check your email inbox for login credentials and important next steps.
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <Link
              to={`/school/${id}`}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              View School Profile
            </Link>
            
            <Link
              to="/admin/login"
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors shadow-md"
            >
              Go to Admin Login
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}