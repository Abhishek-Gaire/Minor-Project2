import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/useAuth";
import { ClassSession } from "@/utils/types";
import { ClassFormData } from "@/constants/types";
import DashboardView from "@/components/Dashboard/OnlineClass/DashboardView";
import { useNavigate } from "react-router-dom";
import { onlineClassService } from "@/services/onlineClassServices";
import { toast } from "react-hot-toast";
import { useHMSActions } from "@100mslive/react-sdk";

const teacherRoomCode = import.meta.env.VITE_TEACHER_ROOMCODE!;
const studentRoomCode = import.meta.env.VITE_STUDENT_ROOMCODE!;

const OnlineClassPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const hmsActions = useHMSActions();

  const userRole = user?.role || "student";
  const userName = user?.name || "User";
  const userId = user?.id;

  const [isLoading, setIsLoading] = useState(true);
  const [showAddClassForm, setShowAddClassForm] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "upcoming" | "ongoing" | "finished"
  >("ongoing");
  const [classSessions, setClassSessions] = useState<ClassSession[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchClasses = useCallback(async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      const res = await onlineClassService.getClasses(userId);
      setClassSessions(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch classes:", err);
      setError("Failed to load classes. Please try again later.");
      toast.error("Failed to load classes");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const fetchToken = async () => {
    try {
      const token = await hmsActions.getAuthTokenByRoomCode({
        roomCode: userRole === "teacher" ? teacherRoomCode : studentRoomCode,
      });
      return token;
    } catch (err) {
      console.error("Failed to fetch token:", err);
      throw err;
    }
  };

  const handleCreateRoom = async (id: string) => {
    if (userRole !== "teacher") {
      toast.error("Only teachers can create classrooms");
      return;
    }

    try {
      toast.loading("Creating classroom...");
      const token = await fetchToken();
      await hmsActions.join({
        userName,
        authToken: token,
        settings: { isAudioMuted: false, isVideoMuted: false },
      });

      toast.dismiss();
      toast.success("Classroom created successfully!");
      localStorage.setItem("userName", userName);
      localStorage.setItem("userRole", "teacher");
      localStorage.setItem("classId", id);
      navigate(`/dashboard/${userRole}/classroom/${id}`);
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to create classroom");
      console.error("Create room error:", err);
    }
  };

  const handleJoinClass = async (id: string) => {
    try {
      toast.loading("Joining classroom...");
      const token = await fetchToken();
      await hmsActions.join({
        userName,
        authToken: token,
        settings: { isAudioMuted: false, isVideoMuted: false },
      });

      toast.dismiss();
      toast.success("Joined classroom successfully!");
      localStorage.setItem("userName", userName);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("classId", id);
      navigate(`/dashboard/${userRole}/classroom/${id}`);
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to join classroom");
      console.error("Join room error:", err);
    }
  };

  const handleAddClass = async (formData: ClassFormData) => {
    try {
      toast.loading("Adding new class...");
      const newClass = {
        subject: formData.subject,
        description: formData.description,
        teacherName: userName,
        teacherId: userId,
        classNumber: formData.classNumber,
        startTime: new Date(formData.startTime),
        endTime: new Date(formData.endTime),
      };

      const res = await onlineClassService.addClass(newClass);
      setClassSessions((prev) => [...prev, res.data]);

      toast.dismiss();
      toast.success("Class added successfully!");
      setShowAddClassForm(false);
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to add class");
      console.error("Failed to add class:", err);
    }
  };

  const handleDeleteClass = async (id: string) => {
    try {
      toast.loading("Deleting class...");
      await onlineClassService.deleteClass(id);
      setClassSessions((prev) => prev.filter((cls) => cls.id !== id));
      toast.dismiss();
      toast.success("Class deleted successfully!");
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to delete class");
      console.error("Failed to delete class:", err);
    }
  };

  const handleStartClass = async (id: string) => {
    if (userRole !== "teacher") {
      toast.error("Only teachers can start classes");
      return;
    }

    try {
      toast.loading("Starting class...");
      await onlineClassService.updateClassStatus(id, { status: "ongoing" });
      setClassSessions((prev) =>
        prev.map((cls) => (cls.id === id ? { ...cls, status: "ongoing" } : cls))
      );
      toast.dismiss();
      toast.success("Class started!");
      handleCreateRoom(id);
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to start class");
      console.error("Failed to start class:", err);
    }
  };

  const handleEndClass = async (id: string) => {
    try {
      toast.loading("Ending class...");
      await onlineClassService.updateClassStatus(id, { status: "finished" });
      setClassSessions((prev) =>
        prev.map((cls) =>
          cls.id === id ? { ...cls, status: "finished" } : cls
        )
      );
      toast.dismiss();
      toast.success("Class ended!");
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to end class");
      console.error("Failed to end class:", err);
    }
  };

  const filteredClasses = classSessions.filter(
    (cls) => cls.status === activeTab
  );

  return (
    <div className="flex flex-col h-[87vh] bg-primary-foreground text-primary-background">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 mb-4 rounded-md">
          {error}
          <button className="ml-2 underline" onClick={fetchClasses}>
            Retry
          </button>
        </div>
      )}

      <DashboardView
        user={user}
        setShowAddClassForm={setShowAddClassForm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredClasses={filteredClasses}
        handleAddClass={handleAddClass}
        handleDeleteClass={handleDeleteClass}
        handleCreateRoom={handleCreateRoom}
        handleJoinClass={handleJoinClass}
        handleStartClass={handleStartClass}
        handleEndClass={handleEndClass}
        showAddClassForm={showAddClassForm}
        isLoading={isLoading}
      />
    </div>
  );
};

export default OnlineClassPage;
