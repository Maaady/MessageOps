import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface MessageFormProps {
  onSend: (message: string, scheduledDate?: Date) => void;
}

export function MessageForm({ onSend }: MessageFormProps) {
  const [message, setMessage] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSend(message, scheduleDate ? new Date(scheduleDate) : undefined);
    setMessage('');
    setScheduleDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={4}
          placeholder="Type your message here..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Schedule (optional)</label>
        <input
          type="datetime-local"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Send className="w-4 h-4 mr-2" />
        Send Message
      </button>
    </form>
  );
}