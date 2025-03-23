interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative";
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {change && (
            <p
              className={`text-sm mt-2 ${
                changeType === "positive" ? "text-green-500" : "text-red-500"
              }`}
            >
              {change}
            </p>
          )}
        </div>
        <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;
