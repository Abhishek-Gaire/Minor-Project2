import Message from "./Message";

const MessagesList = ({ messages, loading }) => {
  if (loading) {
    return <div className="flex justify-center p-4 ">Loading messages....</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages?.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};

export default MessagesList;
