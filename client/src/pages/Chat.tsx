import ChatRoom from "../components/Chat/ChatRoom.tsx";
const Chat = () => {
    const {loading,student} = false;

    if(loading){
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    if(!student){
        return (
            <div className="text-center">
                <p className="text-gray-500">Chat is only available for students</p>
            </div>
        )
    }
    return(
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Class Chat</h2>
            </div>
            <ChatRoom gradeLevel={1}/>
        </div>
    )
}

export default Chat;