import React, { useState } from 'react';

export default function ClinicalNotes() {
  const [note, setNote] = useState('');

  const handleSaveNote = () => {
    console.log("Saved Note:", note);
    setNote('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Clinical Notes</h2>
      <textarea
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter clinical notes here..."
        rows="8"
      />
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSaveNote}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Note
        </button>
      </div>
    </div>
  );
}
