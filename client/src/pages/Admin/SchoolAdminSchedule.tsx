import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ClassEvent {
    id: string;
    courseId: string;
    courseTitle: string;
    type: 'Lecture' | 'Lab' | 'Discussion' | 'Exam';
    day: string;
    startTime: string;
    endTime: string;
    location: string;
    instructor: string;
    notes?: string;
}

interface WeekDay {
    name: string;
    date: string;
    isToday: boolean;
}

const SchedulePage: React.FC = () => {
    const [selectedView, setSelectedView] = useState('week');
    const [currentWeek, setCurrentWeek] = useState(0);

    // Mock data for the week days
    const weekDays: WeekDay[] = [
        { name: 'Mon', date: 'Mar 3', isToday: true },
        { name: 'Tue', date: 'Mar 4', isToday: false },
        { name: 'Wed', date: 'Mar 5', isToday: false },
        { name: 'Thu', date: 'Mar 6', isToday: false },
        { name: 'Fri', date: 'Mar 7', isToday: false },
    ];

    // Mock data for the class events
    const classEvents: ClassEvent[] = [
        {
            id: 'evt-001',
            courseId: 'CS101',
            courseTitle: 'Introduction to Computer Science',
            type: 'Lecture',
            day: 'Mon',
            startTime: '09:00 AM',
            endTime: '10:30 AM',
            location: 'Science Building 101',
            instructor: 'Dr. Sarah Johnson',
        },
        {
            id: 'evt-002',
            courseId: 'CS101',
            courseTitle: 'Introduction to Computer Science',
            type: 'Lab',
            day: 'Wed',
            startTime: '02:00 PM',
            endTime: '04:00 PM',
            location: 'Computer Lab 305',
            instructor: 'TA: Michael Lee',
        },
        {
            id: 'evt-003',
            courseId: 'MATH201',
            courseTitle: 'Linear Algebra',
            type: 'Lecture',
            day: 'Tue',
            startTime: '11:00 AM',
            endTime: '12:30 PM',
            location: 'Math Building 204',
            instructor: 'Prof. Michael Chen',
        },
        {
            id: 'evt-004',
            courseId: 'MATH201',
            courseTitle: 'Linear Algebra',
            type: 'Discussion',
            day: 'Thu',
            startTime: '10:00 AM',
            endTime: '11:00 AM',
            location: 'Math Building 110',
            instructor: 'TA: Jennifer Lopez',
        },
        {
            id: 'evt-005',
            courseId: 'BIO150',
            courseTitle: 'Introduction to Biology',
            type: 'Lecture',
            day: 'Mon',
            startTime: '01:00 PM',
            endTime: '02:30 PM',
            location: 'Life Sciences 220',
            instructor: 'Dr. Emily Rodriguez',
        },
        {
            id: 'evt-006',
            courseId: 'BIO150',
            courseTitle: 'Introduction to Biology',
            type: 'Lab',
            day: 'Fri',
            startTime: '09:00 AM',
            endTime: '12:00 PM',
            location: 'Bio Lab 105',
            instructor: 'TA: David Thompson',
        },
        {
            id: 'evt-007',
            courseId: 'HIST210',
            courseTitle: 'World History: 1800-Present',
            type: 'Lecture',
            day: 'Tue',
            startTime: '02:00 PM',
            endTime: '03:30 PM',
            location: 'Humanities 301',
            instructor: 'Prof. James Wilson',
        },
        {
            id: 'evt-008',
            courseId: 'CS101',
            courseTitle: 'Introduction to Computer Science',
            type: 'Exam',
            day: 'Fri',
            startTime: '01:00 PM',
            endTime: '03:00 PM',
            location: 'Science Building 101',
            instructor: 'Dr. Sarah Johnson',
            notes: 'Midterm Exam, Covers Chapters 1-5',
        },
    ];

    // Filter events by day
    const getEventsByDay = (day: string) => {
        return classEvents.filter(event => event.day === day);
    };

    // Get event type badge style
    const getEventTypeBadge = (type: string) => {
        switch (type) {
            case 'Lecture':
                return 'bg-blue-100 text-blue-800';
            case 'Lab':
                return 'bg-green-100 text-green-800';
            case 'Discussion':
                return 'bg-purple-100 text-purple-800';
            case 'Exam':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Class Schedule</h1>
                <p className="text-gray-600">Manage your weekly academic schedule</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentWeek(prev => prev - 1)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-lg font-medium">
                        {currentWeek === 0 ? 'Current Week' : currentWeek > 0 ? `Week ${currentWeek} ahead` : `Week ${Math.abs(currentWeek)} ago`}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentWeek(prev => prev + 1)}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    {currentWeek !== 0 && (
                        <Button
                            variant="ghost"
                            onClick={() => setCurrentWeek(0)}
                        >
                            Today
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <Select value={selectedView} onValueChange={setSelectedView}>
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="View" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="day">Day</SelectItem>
                            <SelectItem value="week">Week</SelectItem>
                            <SelectItem value="month">Month</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Tabs defaultValue="week" value={selectedView} className="mb-8">
                <TabsList className="mb-6">
                    <TabsTrigger value="day">Day</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>

                <TabsContent value="day" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monday, March 3, 2025</CardTitle>
                            <CardDescription>Today's Schedule</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {getEventsByDay('Mon').map((event) => (
                                    <Card key={event.id} className="overflow-hidden border-l-4 border-blue-500">
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="text-lg">{event.courseTitle}</CardTitle>
                                                    <CardDescription className="flex items-center mt-1">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        {event.startTime} - {event.endTime}
                                                    </CardDescription>
                                                </div>
                                                <Badge className={getEventTypeBadge(event.type)}>{event.type}</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                                <div className="flex items-center text-gray-600">
                                                    <MapPin className="h-3 w-3 mr-1" /> {event.location}
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <User className="h-3 w-3 mr-1" /> {event.instructor}
                                                </div>
                                            </div>
                                            {event.notes && (
                                                <div className="mt-2 text-sm bg-amber-50 p-2 rounded border border-amber-200">
                                                    {event.notes}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="week" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {weekDays.map((day) => (
                            <Card key={day.name} className={day.isToday ? "border-blue-500" : ""}>
                                <CardHeader className={`pb-2 ${day.isToday ? "bg-blue-50" : ""}`}>
                                    <CardTitle className="text-center text-lg">{day.name}</CardTitle>
                                    <CardDescription className="text-center">{day.date}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-3">
                                    <div className="space-y-3">
                                        {getEventsByDay(day.name).length === 0 ? (
                                            <div className="text-center text-gray-400 text-sm py-6">No classes</div>
                                        ) : (
                                            getEventsByDay(day.name).map((event) => (
                                                <Card key={event.id} className="overflow-hidden border-l-4 border-blue-500">
                                                    <div className="p-3">
                                                        <div className="mb-1">
                                                            <Badge className={getEventTypeBadge(event.type)} variant="secondary">
                                                                {event.type}
                                                            </Badge>
                                                        </div>
                                                        <div className="font-medium text-sm mb-1">{event.courseId}</div>
                                                        <div className="text-xs text-gray-600 mb-1">
                                                            <Clock className="h-3 w-3 inline mr-1" />
                                                            {event.startTime} - {event.endTime}
                                                        </div>
                                                        <div className="text-xs text-gray-600">
                                                            <MapPin className="h-3 w-3 inline mr-1" /> {event.location}
                                                        </div>
                                                        {event.notes && (
                                                            <div className="mt-1 text-xs bg-amber-50 p-1 rounded border border-amber-200">
                                                                {event.notes}
                                                            </div>
                                                        )}
                                                    </div>
                                                </Card>
                                            ))
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="month" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>March 2025</CardTitle>
                            <CardDescription>Monthly view - click on a day to see details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-7 gap-1">
                                {/* Day headers */}
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="text-center font-medium py-2">{day}</div>
                                ))}

                                {/* Empty days from previous month */}
                                {[...Array(6)].map((_, index) => (
                                    <div key={`empty-start-${index}`} className="h-24 p-1 bg-gray-50 border border-gray-100"></div>
                                ))}

                                {/* Days in current month */}
                                {[...Array(31)].map((_, index) => {
                                    const day = index + 1;
                                    const isToday = day === 3; // March 3rd is today
                                    const hasEvents = day % 2 === 1; // Just for visual example

                                    return (
                                        <div
                                            key={`day-${day}`}
                                            className={`h-24 p-1 border ${isToday ? 'bg-blue-50 border-blue-300' : 'border-gray-100'}`}
                                        >
                                            <div className="flex justify-between">
                                                <span className={`text-sm ${isToday ? 'font-bold' : ''}`}>{day}</span>
                                                {hasEvents && (
                                                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                                                )}
                                            </div>
                                            {day === 3 && (
                                                <div className="mt-1">
                                                    <div className="text-xs p-1 bg-blue-100 text-blue-800 rounded mb-1 truncate">CS101 Lecture</div>
                                                    <div className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate">BIO150 Lecture</div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SchedulePage;