import React, { useState } from "react";
import { X, Copy, ExternalLink } from "lucide-react";

import { generateMeetingLink } from "../../utils/generateMeetingLink";

interface MeetingModalProps {
  onClose: () => void;
}

export function MeetingModal({ onClose }: MeetingModalProps) {
  const [meetingLink] = useState(generateMeetingLink());
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy", error);
    }
  };
  const startMeeting = () => {
    window.open(`${meetingLink}`, "_blank");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Host A Meeting
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hoveer:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meeting Link
          </label>
          <div className="flex">
            <input
              type="text"
              readOnly
              value={meetingLink}
              className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {copied ? "Copied" : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={startMeeting}
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Start Meeting
          </button>
          <div className="text-sm text-gray-500">
            <p className="font-medium mb-2">Instructions:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Copy the meeting link</li>
              <li>Share it with participants</li>
              <li>Click "Start Meeting" to begin</li>
              <li>Participants can join using the shared link</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
