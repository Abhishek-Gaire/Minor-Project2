// pages/Assignments.tsx
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  FileText, 
  Clock,
  CheckCircle,
  AlertCircle,
  Book,
  MoreVertical,
  ChevronDown
} from 'lucide-react';

interface Assignment {
  id: number;
  title: string;
  course: string;
  description: string;
  dueDate: string;
  pointsPossible: number;
  status: 'Upcoming' | 'Open' | 'Closed' | 'Grading';
  submissions: number;
  totalStudents: number;
}

const assignmentsData: Assignment[] = [
  {
    id: 1,
    title: 'Variables and Data Types',
    course: 'Introduction to Programming',
    description: 'Create a program demonstrating the use of different data types in Python.',
    dueDate: '2024-03-15T23:59:59',
    pointsPossible: 100,
    status: 'Open',
    submissions: 28,
    totalStudents: 32
  },
  {
    id: 2,
    title: 'Linked Lists Implementation',
    course: 'Advanced Data Structures',
    description: 'Implement a doubly linked list with insertion, deletion, and traversal operations.',
    dueDate: '2024-03-10T23:59:59',
    pointsPossible: 100,
    status: 'Open',
    submissions: 18,
    totalStudents: 24
  },
  {
    id: 3,
    title: 'SQL Queries',
    course: 'Database Management',
    description: 'Write SQL queries to retrieve and manipulate data from the provided database schema.',
    dueDate: '2024-03-05T23:59:59',
    pointsPossible: 100,
    status: 'Grading',
    submissions: 30,
    totalStudents: 30
  },
  {
    id: 4,
    title: 'HTML/CSS Basics',
    course: 'Web Development Bootcamp',
    description: 'Create a responsive webpage using HTML and CSS based on the provided mockup.',
    dueDate: '2024-02-20T23:59:59',
    pointsPossible: 100,
    status: 'Closed',
    submissions: 33,
    totalStudents: 35
  },
  {
    id: 5,
    title: 'UX Research Methods',
    course: 'UI/UX Design Principles',
    description: 'Conduct a user research study using at least two different methods and document your findings.',
    dueDate: '2024-04-05T23:59:59',
    pointsPossible: 100,
    status: 'Upcoming',
    submissions: 0,
    totalStudents: 28
  }
];

const Assignments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [assignments] = useState<Assignment[]>(assignmentsData);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredAssignments = assignments.filter(assignment => 
    (assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.course.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!selectedStatus || assignment.status === selectedStatus)
  );

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'Open': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Grading': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Assignment['status']) => {
    switch (status) {
      case 'Upcoming': return <Calendar size={16} className="mr-1" />;
      case 'Open': return <Clock size={16} className="mr-1" />;
      case 'Closed': return <CheckCircle size={16} className="mr-1" />;
      case 'Grading': return <AlertCircle size={16} className="mr-1" />;
      default: return null;
    }
  };

  const formatTimeRemaining = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due.getTime() - now.getTime();
    
    if (diff <= 0) return 'Past due';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} remaining`;
    }
    return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Assignments</h1>
          <p className="text-gray-600">Create and manage course assignments</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus size={18} className="mr-2" />
          Create Assignment
        </button>
      </header>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search assignments..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none pl-4 pr-10 py-2 border rounded-lg bg-white"
              value={selectedStatus || ''}
              onChange={e => setSelectedStatus(e.target.value || null)}
            >
              <option value="">All Statuses</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Open">Open</option>
              <option value="Grading">Grading</option>
              <option value="Closed">Closed</option>
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button className="px-4 py-2 border rounded-lg flex items-center">
            <Filter size={18} className="mr-2" />
            More Filters
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {filteredAssignments.map(assignment => (
          <div key={assignment.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center">
                    <h2 className="text-xl font-semibold">{assignment.title}</h2>
                    <span className={`ml-3 px-2 py-1 text-xs rounded-full flex items-center ${getStatusColor(assignment.status)}`}>
                      {getStatusIcon(assignment.status)}
                      {assignment.status}
                    </span>
                  </div>
                  <div className="flex items-center mt-1 text-gray-600">
                    <Book size={16} className="mr-1" />
                    <span>{assignment.course}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>

              <p className="mt-4 text-gray-700">{assignment.description}</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Calendar size={20} className="text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Due Date</p>
                    <p className="text-sm text-gray-500">
                      {new Date(assignment.dueDate).toLocaleDateString()} at {new Date(assignment.dueDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                    {assignment.status === 'Open' && (
                      <p className="text-sm text-orange-500 font-medium">
                        {formatTimeRemaining(assignment.dueDate)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <FileText size={20} className="text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Points</p>
                    <p className="text-sm text-gray-500">{assignment.pointsPossible} possible points</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={20} className="text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Submissions</p>
                    <p className="text-sm text-gray-500">
                      {assignment.submissions} / {assignment.totalStudents} students
                      {assignment.submissions > 0 && (
                        <span className="ml-1">
                          ({Math.round((assignment.submissions / assignment.totalStudents) * 100)}%)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                {assignment.status === 'Grading' && (
                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                    Grade Submissions
                  </button>
                )}
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                  View Details
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Edit Assignment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;