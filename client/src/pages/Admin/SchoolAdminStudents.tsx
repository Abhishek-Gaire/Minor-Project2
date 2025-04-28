import { useState, useEffect } from "react";
import { debounce } from "lodash-es";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Admin/Students/StudentsPage/Header.tsx";
import InputSection from "@/components/Admin/Students/StudentsPage/InputSection.tsx";
import TableSelection from "@/components/Admin/Students/StudentsPage/TableSelection.tsx";
import PaginatedControls from "@/components/Admin/Students/StudentsPage/PaginatedControls.tsx";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const StudentsPage = () => {
  const [originalStudents, setOriginalStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    grade: "",
    fees: "",
  });

  const navigate = useNavigate();

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${BACKEND_URI}/api/v1/admin/student`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await res.json();
        setOriginalStudents(data.data || []);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const result = originalStudents.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.grade.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters =
        (!filters.status || true) &&
        (!filters.grade || student.grade === filters.grade) &&
        (!filters.fees || true);

      return matchesSearch && matchesFilters;
    });

    setFilteredStudents(result);
  }, [searchTerm, filters, originalStudents]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedData = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStudentDeleted = (deletedId: string) => {
    setOriginalStudents((prev) =>
      prev.filter((student) => student.id !== deletedId)
    );
  };

  const handleEditStudent = (student: any) => {
    navigate(`/admin/students/edit/${student.id}`);
  };

  const handleSearch = debounce((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, 300);

  const handleAddStudent = () => {
    navigate("/admin/students/addStudent");
  };

  return (
    <div className="p-6">
      <Header
        handleAddStudent={handleAddStudent}
        originalStudents={originalStudents}
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <InputSection handleSearch={handleSearch} setFilters={setFilters} />

        <TableSelection
          paginatedData={paginatedData}
          onStudentDeleted={handleStudentDeleted}
          onEditStudent={handleEditStudent}
        />

        <PaginatedControls
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          filteredStudents={filteredStudents}
          setItemsPerPage={setItemsPerPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default StudentsPage;
