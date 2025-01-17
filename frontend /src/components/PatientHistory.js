import React from 'react';
import { History } from 'lucide-react';

const MOCK_HISTORY = [
  {
    id: 1,
    date: '2024-02-15',
    type: 'Visit',
    provider: 'Dr. Smith',
    notes: 'Routine checkup. Patient reported mild headaches.',
  },
  {
    id: 2,
    date: '2024-01-20',
    type: 'Lab Result',
    provider: 'Quest Diagnostics',
    notes: 'Blood work within normal ranges. Vitamin D slightly low.',
  },
  {
    id: 3,
    date: '2023-12-05',
    type: 'Visit',
    provider: 'Dr. Johnson',
    notes: 'Follow-up for respiratory infection. Symptoms resolved.',
  },
];

export default function PatientHistory() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center mb-3">
        <History className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Patient History</h2>
      </div>
      
      <div className="space-y-4">
        {MOCK_HISTORY.map((entry) => (
          <div key={entry.id} className="border-l-4 border-blue-600 pl-4 py-2">
            <div className="flex justify-between items-start">
              <div className="font-medium text-gray-900">{entry.type}</div>
              <div className="text-sm text-gray-500">{entry.date}</div>
            </div>
            <div className="text-sm text-gray-600 mt-1">Provider: {entry.provider}</div>
            <div className="text-sm text-gray-700 mt-2">{entry.notes}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
