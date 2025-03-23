import { useState } from "react";
import { X, Copy, ExternalLink } from "lucide-react";

import { generateMeetingLink } from "../../utils/generateMeetingLink";
import { MeetingInstructions } from "./MeetingInstructions";

interface MeetingModalProps {
  onClose: () => void;
}

export function MeetingModal({ onClose }: MeetingModalProps) {
  const [meetingLink, setMeetingLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [hostName, setHostName] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [showForm, setShowForm] = useState(true);

  const fallbackCopy = () => {
    const textarea = document.createElement("textarea");
    textarea.value = meetingLink;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy"); // Use deprecated execCommand as a fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Fallback copy failed:", err);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const copyToClipboard = async () => {
    if (!navigator.clipboard) {
      console.warn("Clipboard API not supported, using fallback.");
      fallbackCopy();
      return;
    }

    try {
      await navigator.clipboard.writeText(meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Primary copy failed, trying fallback:", error);
      fallbackCopy();
    }
  };
  const handleConfirmNames = () => {
    setMeetingLink(generateMeetingLink({ hostName, meetingName }));
    setShowForm(false);
  };

  const handleStartMeeting = () => {
    if (hostName.trim() && meetingName.trim()) {
      window.open(`${meetingLink}`, "_blank");
      setShowForm(false); // Reset form state after starting the meeting
    } else {
      alert("Please enter both Host Name and Meeting Name.");
    }
  };
  return (
    <div className="fixed mt-[450px] inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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

        {!showForm && (
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
        )}

        <div className="space-y-4">
          {!showForm ? (
            <>
              <button
                onClick={handleStartMeeting}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Start Meeting
              </button>
              <button
                onClick={onClose}
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Host Name
                </label>
                <input
                  type="text"
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-2 mb-2 px-4 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Meeting Name
                </label>
                <input
                  type="text"
                  value={meetingName}
                  onChange={(e) => setMeetingName(e.target.value)}
                  placeholder="Enter meeting name"
                  className="mt-2 mb-2 px-4 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <button
                onClick={handleConfirmNames}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
        <MeetingInstructions />
      </div>
    </div>
  );
}
