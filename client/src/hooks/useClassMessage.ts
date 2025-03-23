import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-config";
import { ClassMessage } from "@/constants/types";
import { useAuth } from "@/contexts/useAuth";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

const useClassMessage = () => {
  const { user } = useAuth();
  const [classMessages, setClassMessages] = useState<ClassMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassMessages = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URI}/api/v1/classMessages/${user.grade}`
        );
        const responseData = await response.json();

        setClassMessages(responseData.data);
      } catch (error) {
        console.error("Error fetching class messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClassMessages();

    const channel = supabase
      .channel(`class_chat_${user.grade}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ClassChatMessages",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setClassMessages((prev) => [...prev, payload.new as ClassMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { classMessages, loading, user };
};

export default useClassMessage;
