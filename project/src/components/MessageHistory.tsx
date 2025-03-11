import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { messageStore, Message } from '../lib/messageStore';
import { MessageCircle, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const statusIcons = {
  pending: Clock,
  sent: CheckCircle,
  failed: XCircle,
  scheduled: Calendar
};

const statusColors = {
  pending: 'text-yellow-500',
  sent: 'text-green-500',
  failed: 'text-red-500',
  scheduled: 'text-blue-500'
};

export function MessageHistory() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const unsubscribe = messageStore.subscribe(setMessages);
    return () => unsubscribe();
  }, []);

  if (messages.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No messages yet. Start by uploading contacts and sending a message.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Message History</h2>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone Number</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Message</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Scheduled/Sent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {messages.map((message) => {
              const StatusIcon = statusIcons[message.status] || MessageCircle;
              const statusColor = statusColors[message.status] || 'text-gray-500';
              
              return (
                <tr key={message.id}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <div className="flex items-center">
                      <StatusIcon className={`h-5 w-5 ${statusColor} mr-2`} />
                      <span className="capitalize">{message.status}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {message.phone_number}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900">
                    {message.message}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {format(new Date(message.created_at), 'MMM d, yyyy HH:mm')}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {message.scheduled_for
                      ? format(new Date(message.scheduled_for), 'MMM d, yyyy HH:mm')
                      : message.sent_at
                      ? format(new Date(message.sent_at), 'MMM d, yyyy HH:mm')
                      : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}