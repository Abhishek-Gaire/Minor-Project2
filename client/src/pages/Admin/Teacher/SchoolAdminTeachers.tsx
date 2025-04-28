import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TeacherHeader from "@/components/Admin/Teachers/TeacherHeader";
import TeacherDetailsCard from "@/components/Admin/Teachers/TeacherDetailsCard";
import { allSubjects, statusMap } from "@/constants/constants";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const TeachersManagementPage = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [isLoading,setIsLoading]  =useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchTeachers = async () => {
      setIsLoading(true)
      const response = await fetch(`${BACKEND_URI}/api/v1/admin/teacher`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        toast.error("Error While Fetching the Teachers");
      }
      const resData = await response.json();
      setTeachers(resData.data);
      setIsLoading(false)
    };
    fetchTeachers();
  }, []);

  // Navigation handlers
  const handleAddTeacher = () => {
    navigate("/admin/teachers/add");
  };

  const handleViewTeacher = (teacher) => {
    navigate(`/admin/teachers/view/${teacher.id}`, { state: { teacher } });
  };

  const handleEditTeacher = (teacher) => {
    navigate(`/admin/teachers/edit/${teacher.id}`, { state: { teacher } });
  };

  const handleDeleteTeacher = async (id:string) => {
    const response = await fetch(`${BACKEND_URI}/api/v1/admin/teacher/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      toast.error("Error While Deleting the Teacher");
    }
    toast.success("Teacher Deleted Successfully");
    setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.id !== id));
  };

  // Filter teachers based on search and filters
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject =
      subjectFilter === "All Subjects" ||
      teacher.subjects.includes(subjectFilter);

    const matchesStatus =
      statusFilter === "All Statuses" ||
      statusMap[teacher.status] === statusFilter ||
      teacher.status === statusFilter;

    return matchesSearch && matchesSubject && matchesStatus;
  });

  // Get current teachers to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTeachers = filteredTeachers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

  // Counts for summary cards
  const totalTeachersCount = teachers.length;
  const fullTimeCount = teachers.filter(
    (t) => t.employmentType === "FULLTIME"
  ).length;
  const partTimeCount = teachers.filter(
    (t) => t.employmentType === "PARTTIME"
  ).length;

  return (
    <div className="space-y-6">
      <TeacherHeader
        onAddTeacher={handleAddTeacher}
        totalTeachersCount={totalTeachersCount}
        fullTimeCount={fullTimeCount}
        partTimeCount={partTimeCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        subjectFilter={subjectFilter}
        setSubjectFilter={setSubjectFilter}
        allSubjects={allSubjects}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <TeacherDetailsCard
        isLoading={isLoading}
        currentTeachers={currentTeachers}
        statusMap={statusMap}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        onViewTeacher={handleViewTeacher}
        onEditTeacher={handleEditTeacher}
        onDeleteTeacher={handleDeleteTeacher}
      />
    </div>
  );
};

export default TeachersManagementPage;