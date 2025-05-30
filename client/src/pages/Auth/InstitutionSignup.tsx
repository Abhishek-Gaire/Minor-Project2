import { useState } from "react";
import { School } from "lucide-react";

import { RegistrationForm } from "@/components/Registration/RegistrationForm";
import { RegistrationBenefits } from "@/components/Registration/RegistrationBenefits";
import Layout from "@/components/Layout.tsx";

const InstitutionSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <School className="mx-auto h-12 w-12 text-indigo-600" />
            <h1 className="mt-4 text-4xl font-bold text-gray-900">
              Join EduConnect
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Transform your institution with our comprehensive education
              platform
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <RegistrationBenefits />
            <div className="bg-white shadow-lg rounded-lg p-8">
              <RegistrationForm
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InstitutionSignup;
