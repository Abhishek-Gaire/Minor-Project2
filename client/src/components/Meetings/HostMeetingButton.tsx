import React, { useState } from "react";
import { Video } from "lucide-react";

import { MeetingModal } from "./MeetingModal";

export function HostMeetingButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outine-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Video className="w-4 h-4 mr-2" />
        Host Meeting
      </button>

      {isModalOpen && <MeetingModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
