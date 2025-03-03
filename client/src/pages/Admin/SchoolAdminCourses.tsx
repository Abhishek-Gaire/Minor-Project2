import React, { useState } from 'react';
import {  BookOpen, Filter, Search, Star, StarHalf } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Course {
    id: string;
    title: string;
    instructor: string;
    department: string;
    credits: number;
    rating: number;
    enrolled: number;
    description: string;
    status: 'In Progress' | 'Completed' | 'Not Started';
}

const CoursesPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const courses: Course[] = [
        {
            id: 'CS101',
            title: 'Introduction to Computer Science',
            instructor: 'Dr. Sarah Johnson',
            department: 'Computer Science',
            credits: 3,
            rating: 4.5,
            enrolled: 120,
            description: 'A foundational course covering basic programming concepts, algorithms, and data structures.',
            status: 'In Progress',
        },
        {
            id: 'MATH201',
            title: 'Linear Algebra',
            instructor: 'Prof. Michael Chen',
            department: 'Mathematics',
            credits: 4,
            rating: 4.8,
            enrolled: 85,
            description: 'Study of vector spaces, linear transformations, matrices, and systems of linear equations.',
            status: 'Not Started',
        },
        {
            id: 'BIO150',
            title: 'Introduction to Biology',
            instructor: 'Dr. Emily Rodriguez',
            department: 'Biology',
            credits: 3,
            rating: 4.2,
            enrolled: 150,
            description: 'Overview of cell structure, genetics, evolution, and ecosystem dynamics.',
            status: 'Completed',
        },
        {
            id: 'HIST210',
            title: 'World History: 1800-Present',
            instructor: 'Prof. James Wilson',
            department: 'History',
            credits: 3,
            rating: 4.0,
            enrolled: 95,
            description: 'Examination of major historical events and developments from the 19th century to modern times.',
            status: 'Not Started',
        },
    ];

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Not Started': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const renderRatingStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
            </div>
        );
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">My Courses</h1>
                <p className="text-gray-600">View and manage your enrolled courses</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search courses..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filter
                </Button>
            </div>

            <Tabs defaultValue="all" className="mb-8">
                <TabsList>
                    <TabsTrigger value="all">All Courses</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <Card key={course.id} className="overflow-hidden">
                                <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start">
                                        <Badge variant="outline">{course.id}</Badge>
                                        <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
                                    </div>
                                    <CardTitle className="mt-2">{course.title}</CardTitle>
                                    <CardDescription>{course.instructor}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                                    <div className="flex justify-between text-sm">
                                        <span>{course.department}</span>
                                        <span>{course.credits} credits</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between bg-gray-50 pt-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <BookOpen className="h-4 w-4 mr-1" /> {course.enrolled} enrolled
                                    </div>
                                    {renderRatingStars(course.rating)}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="in-progress" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.filter(c => c.status === 'In Progress').map((course) => (
                            <Card key={course.id} className="overflow-hidden">
                                <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start">
                                        <Badge variant="outline">{course.id}</Badge>
                                        <Badge className="bg-blue-100 text-blue-800">{course.status}</Badge>
                                    </div>
                                    <CardTitle className="mt-2">{course.title}</CardTitle>
                                    <CardDescription>{course.instructor}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                                    <div className="flex justify-between text-sm">
                                        <span>{course.department}</span>
                                        <span>{course.credits} credits</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between bg-gray-50 pt-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <BookOpen className="h-4 w-4 mr-1" /> {course.enrolled} enrolled
                                    </div>
                                    {renderRatingStars(course.rating)}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="completed" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.filter(c => c.status === 'Completed').map((course) => (
                            <Card key={course.id} className="overflow-hidden">
                                <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start">
                                        <Badge variant="outline">{course.id}</Badge>
                                        <Badge className="bg-green-100 text-green-800">{course.status}</Badge>
                                    </div>
                                    <CardTitle className="mt-2">{course.title}</CardTitle>
                                    <CardDescription>{course.instructor}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                                    <div className="flex justify-between text-sm">
                                        <span>{course.department}</span>
                                        <span>{course.credits} credits</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between bg-gray-50 pt-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <BookOpen className="h-4 w-4 mr-1" /> {course.enrolled} enrolled
                                    </div>
                                    {renderRatingStars(course.rating)}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CoursesPage;