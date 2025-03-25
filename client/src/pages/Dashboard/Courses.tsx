// pages/Courses.tsx
import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  BookOpen,
  MoreHorizontal,
  Star,
  StarHalf,
} from "lucide-react";

interface Course {
  id: number;
  name: string;
  instructor: string;
  category: string;
  startDate: string;
  endDate: string;
  schedule: string;
  students: number;
  rating: number;
  status: "Active" | "Upcoming" | "Completed" | "Canceled";
}

const coursesData: Course[] = [
  {
    id: 1,
    name: "Introduction to Programming",
    instructor: "Dr. James Wilson",
    category: "Computer Science",
    startDate: "2024-01-15",
    endDate: "2024-05-10",
    schedule: "Mon, Wed, Fri 10:00 AM",
    students: 32,
    rating: 4.5,
    status: "Active",
  },
  {
    id: 2,
    name: "Advanced Data Structures",
    instructor: "Prof. Sarah Johnson",
    category: "Computer Science",
    startDate: "2024-01-20",
    endDate: "2024-05-15",
    schedule: "Tue, Thu 2:00 PM",
    students: 24,
    rating: 4.8,
    status: "Active",
  },
  {
    id: 3,
    name: "UI/UX Design Principles",
    instructor: "Jennifer Smith",
    category: "Design",
    startDate: "2024-03-10",
    endDate: "2024-06-20",
    schedule: "Mon, Wed 1:00 PM",
    students: 28,
    rating: 4.2,
    status: "Upcoming",
  },
  {
    id: 4,
    name: "Database Management",
    instructor: "Dr. Michael Chen",
    category: "Information Systems",
    startDate: "2024-02-05",
    endDate: "2024-05-25",
    schedule: "Tue, Thu 11:00 AM",
    students: 30,
    rating: 4.0,
    status: "Active",
  },
  {
    id: 5,
    name: "Web Development Bootcamp",
    instructor: "Alex Rodriguez",
    category: "Web Development",
    startDate: "2023-09-15",
    endDate: "2024-01-10",
    schedule: "Mon, Wed, Fri 3:00 PM",
    students: 35,
    rating: 4.7,
    status: "Completed",
  },
];

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses] = useState<Course[]>(coursesData);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      case "Canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={16} className="text-yellow-500 fill-current" />
        ))}
        {hasHalfStar && (
          <StarHalf size={16} className="text-yellow-500 fill-current" />
        )}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-gray-600">Manage your courses and curriculum</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus size={18} className="mr-2" />
          Create New Course
        </button>
      </header>

      <div className="bg-[hsl(var(--background))] rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-grow">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
            />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-4 py-2 border rounded-lg flex items-center">
            <Filter size={18} className="mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-[hsl(var(--background))] rounded-lg shadow overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center">
                    <h2 className="text-xl font-semibold">{course.name}</h2>
                    <span
                      className={`ml-3 px-2 py-1 text-xs rounded-full ${getStatusColor(
                        course.status
                      )}`}
                    >
                      {course.status}
                    </span>
                  </div>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">
                    {course.instructor}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-[hsl(var(--muted-foreground))]">
                    <BookOpen size={16} className="mr-1" />
                    <span>{course.category}</span>
                  </div>
                </div>
                <div>
                  <button className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--muted-foreground))]">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <Calendar size={20} className="text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Course Period</p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {new Date(course.startDate).toLocaleDateString()} -{" "}
                      {new Date(course.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock size={20} className="text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Schedule</p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {course.schedule}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users size={20} className="text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Students</p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {course.students} enrolled
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star size={20} className="text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Rating</p>
                    {renderRatingStars(course.rating)}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                  View Details
                </button>
                <button className="px-4 py-2 bg-blue-600 text-[hsl(var(--primary-foreground))] rounded-lg hover:bg-blue-700">
                  Manage Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
