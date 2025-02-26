import React, {useState,useEffect,useRef} from "react";
import {ChatRoomProps} from "../../utils/types.ts";
import {supabase} from "../../lib/supabase.ts";
import {Send} from "lucide-react";

const ChatRoom = ({gradeLevel}:ChatRoomProps) => {
    // use context here
    const {user} = false;
    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState("");
    const messageEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // load initial messages
        loadMessages();

        // Subscribe to new messages
        const subscription = supabase
            .channel(`grade-${gradeLevel}-chat`)
            .on("postgres_changes",{
                event:"INSERT",
                schema:"public",
                table:"chat_messages",
                filter:`grade_level=eq.${ gradeLevel }`,
            },
                (payload) => {
                setMessages(prev => [...prev, payload.new])
                })
        .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [gradeLevel]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadMessages = async() => {
        const {data,error} = await supabase
            .from("chat_messages")
            .select("*")
            .eq("grade_level",gradeLevel)
            .order("created_at",{ascending:true});

        if(error) {
            console.log("error", error);
            return;
        }

        setMessages(data)
    }

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({behavior: "smooth"});

    }

    const sendMessage = async(e:React.FormEvent) => {
        e.preventDefault();
        if(!newMessage.trim() || !user) return;

        const {error} = await supabase
            .from("chat_messages")
            .insert([
                {
                    grade_level:gradeLevel,
                    user_id:user.id,
                    content:newMessage.trim(),
                }
            ])

            if(error){
                console.log("error", error);
                return;
            }

            setNewMessage("");
    }

    return(
        <div className="flex flex-col h-[600px] bg-white rounded-lg shadow">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Grade {gradeLevel} Chat Room</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.user_id === user?.id ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] rounded-lg p-3 ${
                            message.user_id === user?.id 
                            ? "bg-indigo-100 text-indigo-600"
                                : "bg-gray-100 text-gray-900"
                        }`}>
                            <p className="text-sm">{message.content}</p>
                            <span className="text-xs text-gray-500 mt-1">
                                {new Date(message.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={messageEndRef}/>
            </div>

            <form onSubmit={sendMessage} className="p-4 border-t">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your Message"
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                    type="submit"
                    className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <Send className="h-5 w-5"/>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChatRoom;