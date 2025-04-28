import { Search } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

interface InputSectionProps {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      status: string;
      grade: string;
    }>
  >;
  handleSearch: (term: string) => void;
}

const InputSection = ({ setFilters, handleSearch }: InputSectionProps) => {
  return (
    <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students..."
          className="pl-8"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        <Select onValueChange={(v) => setFilters((p) => ({ ...p, grade: v }))}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            <SelectItem value="G5">G5</SelectItem>
            <SelectItem value="G6">G6</SelectItem>
            <SelectItem value="G7">G7</SelectItem>
            <SelectItem value="G8">G8</SelectItem>
            <SelectItem value="G9">G9</SelectItem>
            <SelectItem value="G10">G10</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default InputSection;
