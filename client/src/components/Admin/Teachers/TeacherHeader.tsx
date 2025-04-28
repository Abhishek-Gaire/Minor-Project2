import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TeacherHeader = ({
  onAddTeacher,
  totalTeachersCount,
  fullTimeCount,
  partTimeCount,
  searchTerm,
  setSearchTerm,
  subjectFilter,
  setSubjectFilter,
  allSubjects,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Teachers Management
        </h1>
        <Button onClick={() => onAddTeacher()}>
          + Add New Teacher
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Teachers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalTeachersCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Full-time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{fullTimeCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Part-time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{partTimeCount}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-4 items-center flex-wrap">
        <Input
          placeholder="Search teachers..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded-md"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option>All Subjects</option>
          {allSubjects.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
        <select
          className="p-2 border rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Statuses</option>
          <option>Active</option>
          <option>On Leave</option>
          <option>Inactive</option>
          <option>Terminated</option>
        </select>
      </div>
    </>
  );
};

export default TeacherHeader;
