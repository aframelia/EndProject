import React, { useState } from 'react';
import { FileText } from 'lucide-react';

export default function ClinicalNotes() {
  const [note, setNote] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center mb-3">
        <FileText className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Clinical Notes</h2>
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full h-48 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter clinical notes here..."
      />
    </div>
  );
}