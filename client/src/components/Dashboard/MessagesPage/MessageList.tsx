import Message from "./Message";

const MessagesList = ({ messages, loading, selectedUser }) => {
  if (loading) {
    return <div className="flex justify-center p-4 ">Loading messages....</div>;
  }

  if (!messages?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <p>No Messages Yet</p>
        <p className="text-sm">Start the conversation by sending a message!</p>
      </div>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};

export default MessagesList;
