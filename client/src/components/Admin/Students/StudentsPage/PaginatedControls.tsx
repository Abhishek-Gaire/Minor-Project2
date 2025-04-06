import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";

const PaginatedControls = ({currentPage,
                           itemsPerPage,
                           filteredStudents,
                           setItemsPerPage,
                           setCurrentPage,
                           totalPages}) => {
    return (
        <div className="p-4 border-t flex items-center justify-between">
            <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} -
                {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of{" "}
                {filteredStudents.length} students
            </span>
                <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(v) => setItemsPerPage(Number(v))}
                >
                    <SelectTrigger className="w-[100px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export default PaginatedControls;