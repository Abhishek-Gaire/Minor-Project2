import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-config";
import { Message } from "@/constants/types";
import { useAuth } from "@/contexts/useAuth";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

export const useMessages = (selectedUser?: string) => {
  const { user } = useAuth();
  const [privateMessages, setPrivateMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState([]);
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivateMessages = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URI}/api/v1/messages?sender=${user.name}&receiver=${selectedUser}`
        );
        const responseData = await response.json();

        setPrivateMessages(responseData.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllConversations = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URI}/api/v1/messages/${user.name}`
        );
        const responseData = await response.json();

        setConversations(responseData.data.filteredMessages);
        setStudents(responseData.data.students);
      } catch (error) {
        console.error("Error While Fetching all conversations");
      }
    };

    fetchPrivateMessages();
    fetchAllConversations();
  }, [user, selectedUser]);

  return { privateMessages, loading, conversations, students };
};
