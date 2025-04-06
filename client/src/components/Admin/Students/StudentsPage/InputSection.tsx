import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

const InputSection = ({setFilters,handleSearch}) => {
    return(

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
                <Select
                    onValueChange={(v) => setFilters((p) => ({ ...p, grade: v }))}
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Grades</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="9">9</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
};

export default InputSection