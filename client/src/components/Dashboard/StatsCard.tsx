import * as Icons from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: keyof typeof Icons;
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
  const Icon = Icons[icon];

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">
                {value}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
