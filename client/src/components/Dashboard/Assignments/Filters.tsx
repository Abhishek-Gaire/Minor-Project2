import { ChevronDown, Filter, Search } from "lucide-react";

const Filters = ({
  searchTerm,
  setSearchTerm,
  setSelectedStatus,
  selectedStatus,
}) => {
  return (
    <div className="p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <div className="relative flex-grow">
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Search assignments..."
          className="pl-10 pr-4 py-2 border-input bg-input text-foreground rounded-lg w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="relative">
        <select
          className="appearance-none pl-4 pr-10 py-2 border rounded-lg bg-card"
          value={selectedStatus || ""}
          onChange={(e) => setSelectedStatus(e.target.value || null)}
        >
          <option value="">All Statuses</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Open">Open</option>
          <option value="Grading">Grading</option>
          <option value="Closed">Closed</option>
        </select>
        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground pointer-events-none"
        />
      </div>
      <button className="px-4 py-2 border rounded-lg flex items-center">
        <Filter size={18} className="mr-2" />
        More Filters
      </button>
    </div>
  );
};

export default Filters;
