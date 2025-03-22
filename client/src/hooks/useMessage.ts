import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-config";
import { Message } from "@/constants/types";
import { useAuth } from "@/contexts/useAuth";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

export const useMessages = (
  selectedUser?: string,
  activeConversation?: string,
  conversationId?: string
) => {
  const { user } = useAuth();
  const [privateMessages, setPrivateMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState([]);
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedUser) return;
    const fetchPrivateMessages = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URI}/api/v1/messages/conversation/${conversationId}`
        );
        const responseData = await response.json();

        setPrivateMessages(responseData.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    const makeDeliverTrue = async () => {
      // Mark messages as delivered when user comes online
      await fetch(`${BACKEND_URI}/api/v1/messages/deliver`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiver: user, sender: selectedUser }),
      });

      await supabase
        .from("Messages")
        .update({ delivered: true }) // Assuming the 'delivered' column needs to be updated
        .match({ sender: selectedUser, receiver: user.name }); // Match the sender and receiver
    };

    if (activeConversation) {
      makeDeliverTrue();
    }

    fetchPrivateMessages();

    const channel = supabase
      .channel(`private_chat_${user.name}_${selectedUser}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Messages" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setPrivateMessages((prevMessages) => [
              ...prevMessages,
              payload.new as Message,
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, selectedUser, activeConversation]);

  useEffect(() => {
    const fetchAllConversations = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URI}/api/v1/messages/user/${user.name}`
        );
        const responseData = await response.json();

        setConversations(responseData.data.filteredMessages);
        setStudents(responseData.data.students);
      } catch (error) {
        console.error("Error While Fetching all conversations");
      }
    };
    fetchAllConversations();
  }, [user]);

  return { privateMessages, loading, conversations, students, conversationId };
};
