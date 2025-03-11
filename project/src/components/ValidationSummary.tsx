import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ValidationSummaryProps {
  numbers: Array<{
    number: string;
    isValid: boolean;
    formatted: string;
  }>;
}

export function ValidationSummary({ numbers }: ValidationSummaryProps) {
  const validCount = numbers.filter(n => n.isValid).length;
  const invalidCount = numbers.length - validCount;

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-green-600">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span>{validCount} valid numbers</span>
        </div>
        <div className="flex items-center text-red-600">
          <XCircle className="w-5 h-5 mr-2" />
          <span>{invalidCount} invalid numbers</span>
        </div>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Original Number</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Formatted Number</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {numbers.map((entry, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  {entry.isValid ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Valid
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <XCircle className="w-4 h-4 mr-2" />
                      Invalid
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{entry.number}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{entry.formatted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}