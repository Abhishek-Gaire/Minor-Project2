import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export const getAvatarColor = (type) => {
  switch (type) {
    case "student":
      return "bg-blue-500";
    case "teacher":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};

export function getTimeDifference(timestamp) {
  const messageDate = new Date(timestamp);
  const today = new Date();

  // Normalize dates to midnight for date-only comparison
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ).getTime();
  const messageMidnight = new Date(
    messageDate.getFullYear(),
    messageDate.getMonth(),
    messageDate.getDate()
  ).getTime();

  // Calculate the difference in days
  const diffInTime = todayMidnight - messageMidnight;
  const diffInDays = diffInTime / (1000 * 60 * 60 * 24); // Convert ms to days

  if (diffInDays === 0) {
    // Format the time if it's today
    const hours = messageDate.getHours();
    const minutes = messageDate.getMinutes().toString().padStart(2, "0"); // Ensure two-digit minutes
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
    return `${formattedHours}:${minutes} ${ampm}`;
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays > 1) {
    return `${diffInDays} days ago`;
  } else {
    return "Future date";
  }
}
