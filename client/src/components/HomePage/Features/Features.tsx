
import {features} from "../../../constants/constants.ts";
import {FeatureList} from "./FeatureList.tsx";


export function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform provides all the tools needed fot effective online
            education.
          </p>
        </div>
        <div className="grid gride-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
              <FeatureList feature={feature} key={feature.title} />
            ))}
        </div>
      </div>
    </section>
  );
}
