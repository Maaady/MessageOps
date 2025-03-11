import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { MessageForm } from './components/MessageForm';
import { ValidationSummary } from './components/ValidationSummary';
import { MessageHistory } from './components/MessageHistory';
import { Toaster, toast } from 'react-hot-toast';
import { messageStore } from './lib/messageStore';

interface ValidatedNumber {
  number: string;
  isValid: boolean;
  formatted: string;
}

function App() {
  const [validatedNumbers, setValidatedNumbers] = useState<ValidatedNumber[]>([]);

  const handleFileUpload = (numbers: ValidatedNumber[]) => {
    setValidatedNumbers(numbers);
    const validCount = numbers.filter(n => n.isValid).length;
    toast.success(`Validated ${numbers.length} numbers (${validCount} valid)`);
  };

  const handleSendMessage = async (message: string, scheduledDate?: Date) => {
    try {
      const validNumbers = validatedNumbers.filter(n => n.isValid);
      
      if (validNumbers.length === 0) {
        toast.error('No valid phone numbers to send to');
        return;
      }

      messageStore.addMessages(
        validNumbers.map(({ formatted }) => ({
          phone_number: formatted,
          message,
          scheduled_for: scheduledDate?.toISOString() || null,
          status: scheduledDate ? 'scheduled' : 'pending',
          sent_at: null,
          error: null
        }))
      );
      
      toast.success(`Messages ${scheduledDate ? 'scheduled' : 'queued'} for ${validNumbers.length} recipients`);
      setValidatedNumbers([]); // Clear the list after sending
    } catch (error) {
      console.error('Error sending messages:', error);
      toast.error('Failed to send messages');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              SMS Messaging Tool
            </h1>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  1. Upload Contact List
                </h2>
                <FileUpload onUpload={handleFileUpload} />
                {validatedNumbers.length > 0 && (
                  <ValidationSummary numbers={validatedNumbers} />
                )}
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  2. Compose Message
                </h2>
                <MessageForm onSend={handleSendMessage} />
              </div>

              <div>
                <MessageHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App