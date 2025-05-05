import React from "react";

const ClinicalNotesInput = ({ clinicalNote, setClinicalNote, handleSubmit }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Clinical Notes Processor</h1>
      
      <textarea
        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
        rows="8"
        placeholder="Enter clinical notes here..."
        value={clinicalNote}
        onChange={(e) => setClinicalNote(e.target.value)}
      />
      
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg mb-8"
        onClick={handleSubmit}
      >
        Extract Medical Terms
      </button>
    </div>
  );
};

export default ClinicalNotesInput;