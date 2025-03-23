import { faker } from "@faker-js/faker";

// Overview Component Data
export const overviewData = {
  totalUsers: 4782,
  activeUsers: 3255,
  totalCourses: 87,
  completionRate: 76.4,
  avgTimeSpent: "2h 46m",
};

// RecentActivities Component Data
export interface Activity {
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

export const generateRecentActivities = (count: number = 20): Activity[] => {
  const activityTypes: Activity["type"][] = [
    "course_started",
    "lesson_completed",
    "quiz_submitted",
    "certificate_earned",
    "assignment_submitted",
  ];

  const courses = [
    "Introduction to Web Development",
    "Advanced JavaScript Frameworks",
    "UI/UX Design Principles",
    "Data Science Fundamentals",
    "Cybersecurity Essentials",
    "Mobile App Development",
    "Machine Learning Algorithms",
    "DevOps and Continuous Integration",
    "Blockchain Technology",
  ];

  return Array.from({ length: count }, (_, i) => {
    const type =
      activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const course = courses[Math.floor(Math.random() * courses.length)];

    let content = "";
    switch (type) {
      case "course_started":
        content = `Started the ${course} course`;
        break;
      case "lesson_completed":
        content = `Completed lesson ${
          Math.floor(Math.random() * 12) + 1
        } in ${course}`;
        break;
      case "quiz_submitted":
        content = `Submitted quiz for Module ${
          Math.floor(Math.random() * 5) + 1
        } with score ${Math.floor(Math.random() * 30) + 70}%`;
        break;
      case "certificate_earned":
        content = `Earned a certificate for completing ${course}`;
        break;
      case "assignment_submitted":
        content = `Submitted assignment ${
          Math.floor(Math.random() * 5) + 1
        } for ${course}`;
        break;
    }

    // Generate a random timestamp within the last 3 days
    const timestamp = new Date(
      Date.now() - Math.floor(Math.random() * 3 * 24 * 60 * 60 * 1000)
    );

    return {
      id: `activity-${i + 1}`,
      user: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        avatar: Math.random() > 0.3 ? faker.image.avatar() : undefined,
      },
      type,
      content,
      timestamp: timestamp.toISOString(),
      course,
    };
  });
};

export const recentActivitiesData = generateRecentActivities(20);

// AttendanceReports Component Data
export interface AttendanceData {
  id: string;
  name: string;
  email: string;
  attendanceRate: number;
  sessionsAttended: number;
  totalSessions: number;
  lastAttended: string;
  course: string;
}

export const coursesList = [
  "Introduction to Web Development",
  "Advanced JavaScript Frameworks",
  "UI/UX Design Principles",
  "Data Science Fundamentals",
  "Cybersecurity Essentials",
  "Mobile App Development",
  "Machine Learning Algorithms",
  "DevOps and Continuous Integration",
  "Blockchain Technology",
];

export const generateAttendanceData = (
  count: number = 50
): AttendanceData[] => {
  return Array.from({ length: count }, (_, i) => {
    const totalSessions = Math.floor(Math.random() * 15) + 10;
    const sessionsAttended = Math.floor(Math.random() * totalSessions);
    const attendanceRate = Math.round((sessionsAttended / totalSessions) * 100);

    // Random date in the last 14 days
    const lastAttended = new Date(
      Date.now() - Math.floor(Math.random() * 14 * 24 * 60 * 60 * 1000)
    );

    return {
      id: `student-${i + 1}`,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      attendanceRate,
      sessionsAttended,
      totalSessions,
      lastAttended: lastAttended.toISOString(),
      course: coursesList[Math.floor(Math.random() * coursesList.length)],
    };
  });
};

export const attendanceData = generateAttendanceData(50);

// UsageStatistics Component Data
export interface UsageData {
  daily: Array<{
    date: string;
    sessions: number;
    users: number;
    duration: number;
  }>;
  weekly: Array<{
    week: string;
    sessions: number;
    users: number;
    duration: number;
  }>;
  monthly: Array<{
    month: string;
    sessions: number;
    users: number;
    duration: number;
  }>;
}

export interface PlatformData {
  courseViews: number;
  lessonCompletions: number;
  quizAttempts: number;
  assignmentSubmissions: number;
  certificatesIssued: number;
  timeSpent: {
    hours: number;
    minutes: number;
  };
}

export const generateDailyData = (days: number = 30) => {
  const result = [];
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i);

    // Generate some variations in the data
    const dayFactor = 1 + Math.sin(i / 5) * 0.3; // Creates a wave pattern

    result.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      sessions: Math.floor((Math.random() * 80 + 120) * dayFactor),
      users: Math.floor((Math.random() * 60 + 80) * dayFactor),
      duration: Math.floor((Math.random() * 45 + 60) * dayFactor),
    });
  }

  return result;
};

export const generateWeeklyData = (weeks: number = 12) => {
  const result = [];
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - weeks * 7);

  for (let i = 0; i < weeks; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i * 7);

    const weekFactor = 1 + Math.sin(i / 3) * 0.2;

    result.push({
      week: `Week ${i + 1}`,
      sessions: Math.floor((Math.random() * 500 + 800) * weekFactor),
      users: Math.floor((Math.random() * 300 + 500) * weekFactor),
      duration: Math.floor((Math.random() * 280 + 400) * weekFactor),
    });
  }

  return result;
};

export const generateMonthlyData = (months: number = 12) => {
  const result = [];
  const baseDate = new Date();
  baseDate.setMonth(baseDate.getMonth() - months);

  for (let i = 0; i < months; i++) {
    const date = new Date(baseDate);
    date.setMonth(date.getMonth() + i);

    const monthFactor = 1 + Math.sin(i / 2) * 0.15;

    result.push({
      month: date.toLocaleDateString("en-US", { month: "short" }),
      sessions: Math.floor((Math.random() * 2000 + 3000) * monthFactor),
      users: Math.floor((Math.random() * 1200 + 1800) * monthFactor),
      duration: Math.floor((Math.random() * 1200 + 1500) * monthFactor),
    });
  }

  return result;
};

export const usageStatisticsData = {
  usageData: {
    daily: generateDailyData(30),
    weekly: generateWeeklyData(12),
    monthly: generateMonthlyData(12),
  },
  platformData: {
    courseViews: 28457,
    lessonCompletions: 16893,
    quizAttempts: 12576,
    assignmentSubmissions: 8945,
    certificatesIssued: 3254,
    timeSpent: {
      hours: 4862,
      minutes: 35,
    },
  },
};
