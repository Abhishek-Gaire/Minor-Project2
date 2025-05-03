import { lazy } from "react";
import {
  HMSRoomProvider,
} from "@100mslive/react-sdk";
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard.tsx"));
// const Students = lazy(() => import("@/pages/Dashboard/Students.tsx"));
const Courses = lazy(() => import("@/pages/Dashboard/Courses.tsx"));
const Assignments = lazy(() => import("@/pages/Dashboard/Assignments.tsx"));
const AssignmentDetails = lazy(
  () => import("@/pages/Dashboard/AssignmentDetails")
);
const ClassRoom = lazy(() => import("@/pages/Dashboard/ClassRoom.tsx"));
const ClassChatPage = lazy(() => import("@/pages/Dashboard/ClassChat.tsx"));
const MessagesPage = lazy(() => import("@/pages/Dashboard/Messages.tsx"));
const OnlineClassPage = lazy(() => import("@/pages/Dashboard/OnlineClass.tsx"));
const Grades = lazy(() => import("@/pages/Dashboard/Grades.tsx"));
const ProfilePage = lazy(() => import("@/pages/Dashboard/ProfilePage"));
const StudyMaterialsPage = lazy(
  () => import("@/pages/Dashboard/StudyMaterials")
);
const CalendarPage = lazy(() => import("@/pages/Dashboard/CalendarPage"));

const dashboardRoutes = [
  { index: true, element: <ProfilePage /> },
  // { path: "students", element: <Students /> },
  { path: "courses", element: <Courses /> },
  {
    path: "assignments",
    children: [
      { index: true, element: <Assignments /> },
      { path: ":id", element: <AssignmentDetails /> },
    ],
  },
  { path: "chat", element: <ClassChatPage /> },
  { path: "grades", element: <Grades /> },
  { path: "gradebook", element: <Grades /> },
  { path: "messages", element: <MessagesPage /> },
  { path: "materials", element: <StudyMaterialsPage /> },
  { path: "calendar", element: <CalendarPage /> },
  { path: "resources", element: <StudyMaterialsPage /> },
  // { path: "attendance", element: <TeacherAttendancePage /> },
  {
    path: "live-classes",
    element: (
      <HMSRoomProvider>
        <OnlineClassPage />
      </HMSRoomProvider>
    ),
  },
  {
    path: "classroom/:roomId",
    element: (
      <HMSRoomProvider>
        <ClassRoom />
      </HMSRoomProvider>
    ),
  },
  { path: "profile", element: <ProfilePage /> },
];

export default dashboardRoutes;
