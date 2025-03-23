import { XIcon } from "lucide-react";

const ShowOnlineClassChat = ({ setShowChat }) => {
  return (
    <div className="w-1/3 bg-gray-800 p-4 flex flex-col border-l border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium">Class Chat</h2>
        <button
          onClick={() => setShowChat(false)}
          className="text-gray-400 hover:text-white"
        >
          <XIcon />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mb-4">
        <div className="mb-4">
          <div className="text-xs text-gray-400 mb-1">Dr. Johnson</div>
          <div className="bg-gray-700 rounded-lg p-2">
            Please type your questions here. I'll pause for Q&A in 5 minutes.
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs text-gray-400 mb-1">Jamie Williams</div>
          <div className="bg-gray-700 rounded-lg p-2">
            Could you explain the relationship between wavelength and energy
            again?
          </div>
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default ShowOnlineClassChat;
