import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TeacherDetailsCard = ({
  currentTeachers,
  statusMap,
  currentPage,
  totalPages,
  setCurrentPage,
  setIsViewDialogOpen,
  setCurrentTeacher,
  openEditDialog,
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Grades</TableHead>
              <TableHead>Classes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTeachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">{teacher.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.slice(0, 2).map((subject) => (
                      <span
                        key={subject}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                      >
                        {subject}
                      </span>
                    ))}
                    {teacher.subjects.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        +{teacher.subjects.length - 2}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{teacher.phone}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {teacher.grades.slice(0, 2).map((grade: string) => (
                      <span
                        key={grade}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                      >
                        {grade}
                      </span>
                    ))}
                    {teacher.grades.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        +{teacher.grades.length - 2}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{teacher.classes}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      teacher.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : teacher.status === "ONLEAVE"
                        ? "bg-yellow-100 text-yellow-800"
                        : teacher.status === "INACTIVE"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {statusMap[teacher.status] || teacher.status}
                  </span>
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCurrentTeacher(teacher);
                      setIsViewDialogOpen(true);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(teacher)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {currentTeachers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No teachers found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TeacherDetailsCard;
