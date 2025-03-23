import Layout from "../../components/Layout.tsx";
import { allFeatures } from "../../constants/constants.ts";
import { FeatureList } from "../../components/HomePage/Features/FeatureList.tsx";

const FeaturesPage = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-indigo-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Platform Features
            </h1>
            <p className="text-xl text-gray-600 max-2-2xl mx-auto">
              Discover all the powerful tools and features that make EduConnect
              the perfect platform for modern education.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allFeatures.map((feature) => (
              <FeatureList feature={feature} key={feature.title} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeaturesPage;
