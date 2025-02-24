import {Feature} from "../../../constants/types.ts";

export const FeatureList = ({feature} :{feature:Feature}) => {
    const Icon = feature.icon;
    return (
        <div
            key={feature.title}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
            <Icon className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
        </div>
    )
};