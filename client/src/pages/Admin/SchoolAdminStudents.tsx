import { useState, useEffect } from "react";
import { debounce } from "lodash-es";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Admin/Students/StudentsPage/Header.tsx";
import InputSection from "@/components/Admin/Students/StudentsPage/InputSection.tsx";
import TableSelection from "@/components/Admin/Students/StudentsPage/TableSelection.tsx";
import PaginatedControls from "@/components/Admin/Students/StudentsPage/PaginatedControls.tsx";

const StudentsPage = () => {
  const [originalStudents] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      grade: "10th",
      status: "active",
      attendance: "95%",
      fees: "Paid",
      enrolledCourses: 4,
    },
    {
      id: 2,
      name: "Samantha Lee",
      grade: "11th",
      status: "active",
      attendance: "92%",
      fees: "Paid",
      enrolledCourses: 5,
    },
    {
      id: 3,
      name: "David Martinez",
      grade: "9th",
      status: "active",
      attendance: "87%",
      fees: "Pending",
      enrolledCourses: 3,
    },
    {
      id: 4,
      name: "Emily Wilson",
      grade: "12th",
      status: "inactive",
      attendance: "78%",
      fees: "Overdue",
      enrolledCourses: 2,
    },
    {
      id: 5,
      name: "Michael Brown",
      grade: "10th",
      status: "active",
      attendance: "91%",
      fees: "Paid",
      enrolledCourses: 4,
    },
    {
      id: 6,
      name: "Olivia Davis",
      grade: "11th",
      status: "active",
      attendance: "94%",
      fees: "Paid",
      enrolledCourses: 5,
    },
    {
      id: 7,
      name: "John Smith",
      grade: "9th",
      status: "inactive",
      attendance: "65%",
      fees: "Overdue",
      enrolledCourses: 3,
    },
    {
      id: 8,
      name: "Emma Thomas",
      grade: "10th",
      status: "active",
      attendance: "89%",
      fees: "Pending",
      enrolledCourses: 4,
    },
  ]);
  const [filteredStudents, setFilteredStudents] = useState(originalStudents);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    grade: "",
    fees: "",
  });

  const navigate = useNavigate();
  // Pagination calculations
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedData = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Debounced search handler
  const handleSearch = debounce((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, 300);

  // Filter and search logic
  useEffect(() => {
    const result = originalStudents.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.grade.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters =
        (!filters.status || student.status === filters.status) &&
        (!filters.grade || student.grade === filters.grade) &&
        (!filters.fees || student.fees === filters.fees);

      return matchesSearch && matchesFilters;
    });

    setFilteredStudents(result);
  }, [searchTerm, filters, originalStudents]);

  const handleAddStudent = () => {
    navigate("/admin/students/addStudent");
  };

  return (
    <div className="p-6">
      <Header
        handleAddStudent={handleAddStudent}
        originalStudents={originalStudents}
      />

      {/* Enhanced Filters */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <InputSection handleSearch={handleSearch} setFilters={setFilters} />

        {/* Enhanced Table with Selection */}
        <TableSelection paginatedData={paginatedData} />

        {/* Pagination Controls */}
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
