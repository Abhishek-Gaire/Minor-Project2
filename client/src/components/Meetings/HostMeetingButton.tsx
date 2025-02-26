import { useState } from "react";
import { Video } from "lucide-react";

import { MeetingModal } from "./MeetingModal";

interface Props {
  from: string;
  className?: string;
}

export function HostMeetingButton({ from, className }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className={`${className} ${
        from === "mobileNav" ? "flex justify-center border-b pb-2" : ""
      }`}
    >
      <button
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center py-2 text-base font-semibold focus:outine-none  focus:ring-indigo-500 ${
          from === "desktopNav"
            ? "bg-indigo-600 text-white px-3 rounded-md hover:bg-indigo-500 transition-transform duration-200 transform hover:scale-105"
            : " text-indigo-500"
        }`}
      >
        <Video className="w-4 h-4 mr-2" />
        Host Meeting
      </button>

      {isModalOpen && <MeetingModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
