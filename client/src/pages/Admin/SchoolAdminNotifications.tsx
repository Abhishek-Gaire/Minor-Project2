import React, { useState } from 'react';
import { Bell, Calendar, CheckCircle, FileText, Info, Search, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    type: 'assignment' | 'announcement' | 'deadline' | 'grade' | 'system';
    courseId?: string;
    courseName?: string;
    read: boolean;
    actionRequired?: boolean;
    link?: string;
}

interface NotificationSetting {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
}

const NotificationsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 'notif-001',
            title: 'Assignment Due Soon',
            message: 'Your CS101 Programming Assignment #3 is due in 48 hours.',
            timestamp: '2 hours ago',
            type: 'deadline',
            courseId: 'CS101',
            courseName: 'Introduction to Computer Science',
            read: false,
            actionRequired: true,
            link: '/assignments/cs101-pa3'
        },
        {
            id: 'notif-002',
            title: 'New Announcement',
            message: 'Dr. Sarah Johnson posted a new announcement in CS101 regarding the upcoming midterm exam.',
            timestamp: '3 hours ago',
            type: 'announcement',
            courseId: 'CS101',
            courseName: 'Introduction to Computer Science',
            read: false,
            link: '/courses/cs101/announcements/12'
        },
        {
            id: 'notif-003',
            title: 'Grade Posted',
            message: 'Your grade for MATH201 Quiz #2 has been posted. You received 85/100.',
            timestamp: 'Yesterday',
            type: 'grade',
            courseId: 'MATH201',
            courseName: 'Linear Algebra',
            read: true,
            link: '/courses/math201/grades'
        },
        {
            id: 'notif-004',
            title: 'New Assignment Posted',
            message: 'Prof. Wilson has posted a new research paper assignment for HIST210.',
            timestamp: 'Yesterday',
            type: 'assignment',
            courseId: 'HIST210',
            courseName: 'World History: 1800-Present',
            read: true,
            link: '/courses/hist210/assignments/5'
        },
        {
            id: 'notif-005',
            title: 'Lab Session Rescheduled',
            message: 'The BIO150 lab session scheduled for Friday has been moved to Monday next week.',
            timestamp: '2 days ago',
            type: 'announcement',
            courseId: 'BIO150',
            courseName: 'Introduction to Biology',
            read: true,
            link: '/courses/bio150/lab-schedule'
        },
        {
            id: 'notif-006',
            title: 'System Maintenance',
            message: 'The learning management system will be undergoing maintenance tonight from 2 AM to 4 AM.',
            timestamp: '3 days ago',
            type: 'system',
            read: true
        }
    ]);

    const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
        {
            id: 'setting-001',
            name: 'Assignment Notifications',
            description: 'Receive notifications when new assignments are posted',
            enabled: true
        },
        {
            id: 'setting-002',
            name: 'Deadline Reminders',
            description: 'Get reminders for upcoming assignment deadlines',
            enabled: true
        },
        {
            id: 'setting-003',
            name: 'Grade Alerts',
            description: 'Be notified when new grades are posted',
            enabled: true
        },
        {
            id: 'setting-004',
            name: 'Announcements',
            description: 'Receive instructor announcements',
            enabled: true
        },
        {
            id: 'setting-005',
            name: 'System Updates',
            description: 'Get notified about system maintenance and updates',
            enabled: false
        },
        {
            id: 'setting-006',
            name: 'Email Notifications',
            description: 'Also send notifications to your email',
            enabled: true
        },
        {
            id: 'setting-007',
            name: 'Push Notifications',
            description: 'Receive push notifications on your devices',
            enabled: true
        }
    ]);

    const filteredNotifications = notifications.filter(notification =>
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (notification.courseName && notification.courseName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const getUnreadCount = () => notifications.filter(n => !n.read).length;

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        );
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    const toggleSetting = (id: string) => {
        setNotificationSettings(prev =>
            prev.map(setting =>
                setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
            )
        );
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'assignment':
                return <FileText className="h-5 w-5 text-blue-500" />;
            case 'announcement':
                return <Info className="h-5 w-5 text-purple-500" />;
            case 'deadline':
                return <Calendar className="h-5 w-5 text-red-500" />;
            case 'grade':
                return <Star className="h-5 w-5 text-amber-500" />;
            case 'system':
                return <Bell className="h-5 w-5 text-gray-500" />;
            default:
                return <Bell className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Notifications</h1>
                <p className="text-gray-600">Stay updated with your courses and assignments</p>
            </div>

            <Tabs defaultValue="all">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                    <TabsList>
                        <TabsTrigger value="all">
                            All
                            {getUnreadCount() > 0 && (
                                <Badge className="ml-2 bg-blue-500 hover:bg-blue-600">{getUnreadCount()}</Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="unread">Unread</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search notifications..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <TabsContent value="all" className="mt-6">
                    <div className="flex justify-end mb-4">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-sm"
                            onClick={markAllAsRead}
                        >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark all as read
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {filteredNotifications.length === 0 ? (
                            <Card>
                                <CardContent className="py-8 text-center text-gray-500">
                                    <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    <p>No notifications match your search</p>
                                </CardContent>
                            </Card>
                        ) : (
                            filteredNotifications.map((notification) => (
                                <Card
                                    key={notification.id}
                                    className={`overflow-hidden ${!notification.read ? 'border-l-4 border-blue-500 bg-blue-50' : ''}`}
                                >
                                    <CardHeader className="pb-2 flex flex-row items-start justify-between">
                                        <div className="flex items-start space-x-4">
                                            <div className="mt-1">
                                                {getTypeIcon(notification.type)}
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg font-semibold">{notification.title}</CardTitle>
                                                {notification.courseId && (
                                                    <CardDescription className="mt-1">
                                                        {notification.courseId}: {notification.courseName}
                                                    </CardDescription>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            {!notification.read && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => markAsRead(notification.id)}
                                                >
                                                    <CheckCircle className="h-4 w-4 text-blue-500" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => deleteNotification(notification.id)}
                                            >
                                                <X className="h-4 w-4 text-gray-500" />
                                            </Button>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-gray-700">{notification.message}</p>
                                    </CardContent>

                                    <CardFooter className="pt-2 pb-4 flex justify-between items-center">
                                        <span className="text-sm text-gray-500">{notification.timestamp}</span>
                                        {notification.link && (
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        )}
                                    </CardFooter>
                                </Card>
                            ))
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="unread" className="mt-6">
                    <div className="space-y-4">
                        {filteredNotifications.filter(n => !n.read).length === 0 ? (
                            <Card>
                                <CardContent className="py-8 text-center text-gray-500">
                                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    <p>No unread notifications</p>
                                </CardContent>
                            </Card>
                        ) : (
                            filteredNotifications
                                .filter(n => !n.read)
                                .map((notification) => (
                                    <Card
                                        key={notification.id}
                                        className="overflow-hidden border-l-4 border-blue-500 bg-blue-50"
                                    >
                                        <CardHeader className="pb-2 flex flex-row items-start justify-between">
                                            <div className="flex items-start space-x-4">
                                                <div className="mt-1">
                                                    {getTypeIcon(notification.type)}
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg font-semibold">{notification.title}</CardTitle>
                                                    {notification.courseId && (
                                                        <CardDescription className="mt-1">
                                                            {notification.courseId}: {notification.courseName}
                                                        </CardDescription>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => markAsRead(notification.id)}
                                                >
                                                    <CheckCircle className="h-4 w-4 text-blue-500" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => deleteNotification(notification.id)}
                                                >
                                                    <X className="h-4 w-4 text-gray-500" />
                                                </Button>
                                            </div>
                                        </CardHeader>

                                        <CardContent>
                                            <p className="text-gray-700">{notification.message}</p>
                                        </CardContent>

                                        <CardFooter className="pt-2 pb-4 flex justify-between items-center">
                                            <span className="text-sm text-gray-500">{notification.timestamp}</span>
                                            {notification.link && (
                                                <Button variant="outline" size="sm">
                                                    View Details
                                                </Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                ))
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Customize which notifications you want to receive</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-3">Notification Types</h3>
                                    <div className="space-y-4">
                                        {notificationSettings.slice(0, 5).map((setting) => (
                                            <div key={setting.id} className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-medium">{setting.name}</h4>
                                                    <p className="text-sm text-gray-500">{setting.description}</p>
                                                </div>
                                                <Switch
                                                    checked={setting.enabled}
                                                    onCheckedChange={() => toggleSetting(setting.id)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-lg font-medium mb-3">Delivery Methods</h3>
                                    <div className="space-y-4">
                                        {notificationSettings.slice(5).map((setting) => (
                                            <div key={setting.id} className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-medium">{setting.name}</h4>
                                                    <p className="text-sm text-gray-500">{setting.description}</p>
                                                </div>
                                                <Switch
                                                    checked={setting.enabled}
                                                    onCheckedChange={() => toggleSetting(setting.id)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                            <Button variant="outline">Reset to Default</Button>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default NotificationsPage;