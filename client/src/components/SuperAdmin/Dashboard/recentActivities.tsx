import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, Video, FileText, CheckCircle2, Calendar } from "lucide-react";

interface Activity {
  id: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  type:
    | "course_started"
    | "lesson_completed"
    | "quiz_submitted"
    | "certificate_earned"
    | "assignment_submitted";
  content: string;
  timestamp: string;
  course?: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

export const RecentActivities: React.FC<RecentActivitiesProps> = ({
  activities = [],
}) => {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "course_started":
        return <Book className="h-4 w-4" />;
      case "lesson_completed":
        return <Video className="h-4 w-4" />;
      case "quiz_submitted":
        return <FileText className="h-4 w-4" />;
      case "certificate_earned":
        return <CheckCircle2 className="h-4 w-4" />;
      case "assignment_submitted":
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getActivityLabel = (type: Activity["type"]) => {
    switch (type) {
      case "course_started":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600">
            Started Course
          </Badge>
        );
      case "lesson_completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600">
            Completed Lesson
          </Badge>
        );
      case "quiz_submitted":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600">
            Submitted Quiz
          </Badge>
        );
      case "certificate_earned":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600">
            Earned Certificate
          </Badge>
        );
      case "assignment_submitted":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-600">
            Submitted Assignment
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return `${Math.round(diffInHours * 60)} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.round(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Recent Activities</CardTitle>
        <CardDescription>Latest activities from your users</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 pb-4 border-b border-gray-100"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={activity.user.avatar}
                      alt={activity.user.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {activity.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {activity.user.name}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(activity.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {getActivityIcon(activity.type)}
                      </span>
                      {getActivityLabel(activity.type)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.content}
                    </p>
                    {activity.course && (
                      <p className="text-xs text-muted-foreground">
                        in {activity.course}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p>No recent activities</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
