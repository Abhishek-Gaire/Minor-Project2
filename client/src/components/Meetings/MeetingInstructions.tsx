export function MeetingInstructions() {
  return (
    <div className="text-sm text-gray-500">
      <p className="font-medium mb-2">Instructions:</p>
      <ol className="list-decimal list-inside space-y-1">
        <li>Copy the meeting link</li>
        <li>Share it with participants</li>
        <li>Click "Start Meeting" to begin</li>
        <li>Participants can join using the shared link</li>
      </ol>
    </div>
  );
}
